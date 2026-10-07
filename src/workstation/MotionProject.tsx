import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  type CalculateMetadataFunction,
} from "remotion";
import {
  workstationProjectSchema,
  type WorkstationItem,
  type WorkstationProject,
} from "./schema";

const resolveAsset = (src: string) => {
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  return staticFile(src.replace(/^\//, ""));
};

const ItemShell: React.FC<{
  item: WorkstationItem;
  children: React.ReactNode;
}> = ({item, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - item.timing.from;
  const entrance = spring({
    fps,
    frame: Math.max(0, local),
    config: {damping: 18, stiffness: 140, mass: 0.9},
  });
  const exitStart = Math.max(0, item.timing.durationInFrames - Math.round(fps * 0.35));
  const exit = interpolate(
    local,
    [exitStart, item.timing.durationInFrames],
    [1, 0],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp"},
  );
  const t = item.transform;

  return (
    <div
      style={{
        position: "absolute",
        left: t.x,
        top: t.y,
        width: t.width,
        height: t.height,
        opacity: t.opacity * entrance * exit,
        transform: `rotate(${t.rotation}deg) scale(${t.scale * (0.96 + entrance * 0.04)}) translateY(${(1 - entrance) * 20}px)`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};

const WorkstationItemView: React.FC<{item: WorkstationItem}> = ({item}) => {
  if (item.type === "solid") {
    return (
      <ItemShell item={item}>
        <div style={{width: "100%", height: "100%", background: item.color, borderRadius: item.radius}} />
      </ItemShell>
    );
  }

  if (item.type === "text") {
    return (
      <ItemShell item={item}>
        <div
          style={{
            width: "100%",
            height: "100%",
            color: item.style.color,
            fontFamily: item.style.fontFamily,
            fontSize: item.style.fontSize,
            fontWeight: item.style.fontWeight,
            textAlign: item.style.textAlign,
            lineHeight: item.style.lineHeight,
            whiteSpace: "pre-wrap",
          }}
        >
          {item.text}
        </div>
      </ItemShell>
    );
  }

  if (item.type === "image") {
    return (
      <ItemShell item={item}>
        <Img
          src={resolveAsset(item.src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: item.fit,
            borderRadius: item.radius,
          }}
        />
      </ItemShell>
    );
  }

  return (
    <ItemShell item={item}>
      <div
        style={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          borderRadius: 34,
          background: item.background,
          color: item.foreground,
          padding: 46,
          boxShadow: "0 34px 90px rgba(0,0,0,0.28)",
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div style={{height: 10, width: 96, borderRadius: 99, background: item.accent}} />
        <div style={{fontSize: 48, fontWeight: 700, fontFamily: "Arial"}}>{item.title}</div>
        <div style={{fontSize: 28, lineHeight: 1.45, color: "#475569", fontFamily: "Arial"}}>{item.body}</div>
        <div
          style={{
            marginTop: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              style={{
                height: 70,
                borderRadius: 16,
                background: index === 0 ? item.accent : "#EEF2F7",
              }}
            />
          ))}
        </div>
      </div>
    </ItemShell>
  );
};

export const calculateWorkstationMetadata: CalculateMetadataFunction<WorkstationProject> = ({props}) => {
  const project = workstationProjectSchema.parse(props);
  return {
    durationInFrames: project.durationInFrames,
    fps: project.fps,
    width: project.width,
    height: project.height,
    props: project,
  };
};

export const MotionProject: React.FC<WorkstationProject> = (input) => {
  const project = workstationProjectSchema.parse(input);

  return (
    <AbsoluteFill style={{background: project.background, overflow: "hidden"}}>
      {project.tracks
        .filter((track) => track.visible)
        .flatMap((track) => track.items)
        .map((item) => (
          <Sequence
            key={item.id}
            name={item.name}
            from={item.timing.from}
            durationInFrames={item.timing.durationInFrames}
            layout="none"
          >
            <WorkstationItemView item={item} />
          </Sequence>
        ))}
    </AbsoluteFill>
  );
};
