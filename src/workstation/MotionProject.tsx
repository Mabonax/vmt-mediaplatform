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
  type WorkstationKeyframePoint,
  type WorkstationProject,
} from "./schema";

const resolveAsset = (src: string) => {
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  return staticFile(src.replace(/^\//, ""));
};

const applyEasing = (
  value: number,
  easing: WorkstationKeyframePoint["easing"],
) => {
  if (easing === "linear") return value;
  if (easing === "ease-in") return value * value;
  if (easing === "ease-out") return 1 - (1 - value) * (1 - value);
  return value < 0.5
    ? 2 * value * value
    : 1 - Math.pow(-2 * value + 2, 2) / 2;
};

const resolveKeyframedValue = (
  frame: number,
  fallback: number,
  points: WorkstationKeyframePoint[] | undefined,
) => {
  if (!points || points.length === 0) return fallback;
  if (frame <= points[0].frame) return points[0].value;
  if (frame >= points[points.length - 1].frame)
    return points[points.length - 1].value;

  const nextIndex = points.findIndex((point) => point.frame >= frame);
  const next = points[nextIndex];
  const previous = points[nextIndex - 1];

  const rawProgress =
    (frame - previous.frame) / Math.max(1, next.frame - previous.frame);
  const progress = applyEasing(rawProgress, next.easing);

  return previous.value + (next.value - previous.value) * progress;
};

const ItemShell: React.FC<{
  item: WorkstationItem;
  children: React.ReactNode;
}> = ({item, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Sequence shifts the frame clock for children, so this frame is already
  // relative to item.timing.from.
  const local = frame;
  const intensity = item.motion.intensity;
  const springValue = spring({
    fps,
    frame: Math.max(0, local),
    config: {
      damping: 18,
      stiffness: 140 + intensity * 50,
      mass: 0.9,
    },
  });
  const fadeIn = interpolate(
    local,
    [0, Math.max(1, Math.round(fps * 0.25))],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const entrance =
    item.motion.entrance === "none"
      ? 1
      : item.motion.entrance === "fade"
        ? fadeIn
        : springValue;

  const exitStart = Math.max(
    0,
    item.timing.durationInFrames - Math.round(fps * 0.35),
  );
  const exit =
    item.motion.exit === "none"
      ? 1
      : interpolate(
          local,
          [exitStart, item.timing.durationInFrames],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

  const rise =
    item.motion.entrance === "rise"
      ? (1 - entrance) * (12 + intensity * 26)
      : 0;
  const scaleEntrance =
    item.motion.entrance === "scale" ? 0.9 + entrance * 0.1 : 1;

  const t = item.transform;
  const animatedX = resolveKeyframedValue(local, t.x, item.animation?.x);
  const animatedY = resolveKeyframedValue(local, t.y, item.animation?.y);
  const animatedScale = resolveKeyframedValue(
    local,
    t.scale,
    item.animation?.scale,
  );
  const animatedRotation = resolveKeyframedValue(
    local,
    t.rotation,
    item.animation?.rotation,
  );
  const animatedOpacity = resolveKeyframedValue(
    local,
    t.opacity,
    item.animation?.opacity,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: animatedX,
        top: animatedY,
        width: t.width,
        height: t.height,
        opacity: animatedOpacity * entrance * exit,
        transform: `rotate(${animatedRotation}deg) scale(${animatedScale * scaleEntrance}) translateY(${rise}px)`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};

const BrowserWindow: React.FC<{
  item: Extract<WorkstationItem, {type: "browser-window"}>;
}> = ({item}) => {
  const chromeBg = item.chrome === "dark" ? "#151B2B" : "#EEF2F7";
  const chromeFg = item.chrome === "dark" ? "#D9E1EE" : "#445067";

  return (
    <ItemShell item={item}>
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 28,
          overflow: "hidden",
          background: "#FFFFFF",
          boxShadow: "0 32px 90px rgba(0,0,0,0.32)",
          border: "1px solid rgba(148,163,184,0.22)",
        }}
      >
        <div
          style={{
            height: 74,
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "0 24px",
            background: chromeBg,
            color: chromeFg,
            fontFamily: "Arial",
          }}
        >
          <div style={{display: "flex", gap: 9}}>
            {["#FF6B6B", "#FFD166", "#06D6A0"].map((c) => (
              <div
                key={c}
                style={{
                  width: 13,
                  height: 13,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              height: 38,
              borderRadius: 12,
              background: item.chrome === "dark" ? "#20283B" : "#FFFFFF",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              fontSize: 16,
              overflow: "hidden",
            }}
          >
            {item.url}
          </div>
          <div style={{fontSize: 16, fontWeight: 700}}>{item.title}</div>
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "calc(100% - 74px)",
          }}
        >
          {item.screenshotSrc ? (
            <Img
              src={resolveAsset(item.screenshotSrc)}
              style={{width: "100%", height: "100%", objectFit: "cover"}}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg,#F8FAFC,#E2E8F0)",
                padding: 36,
                boxSizing: "border-box",
                display: "grid",
                gridTemplateColumns: "220px 1fr",
                gap: 26,
              }}
            >
              <div style={{background: "#0F172A", borderRadius: 22}} />
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: "150px 1fr",
                  gap: 24,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 18,
                  }}
                >
                  {[0, 1, 2].map((n) => (
                    <div
                      key={n}
                      style={{
                        borderRadius: 18,
                        background: n === 0 ? item.accent : "#FFFFFF",
                      }}
                    />
                  ))}
                </div>
                <div style={{borderRadius: 22, background: "#FFFFFF"}} />
              </div>
            </div>
          )}
        </div>
      </div>
    </ItemShell>
  );
};

const Cursor: React.FC<{
  item: Extract<WorkstationItem, {type: "cursor"}>;
}> = ({item}) => {
  const frame = useCurrentFrame();
  const local = frame;
  const clicking =
    item.clickAtFrame !== undefined &&
    Math.abs(local - item.clickAtFrame) <= 4;
  const scale = clicking ? 0.82 : 1;

  return (
    <ItemShell item={item}>
      <div style={{position: "relative", width: "100%", height: "100%"}}>
        {clicking ? (
          <div
            style={{
              position: "absolute",
              width: 90,
              height: 90,
              borderRadius: "50%",
              border: `5px solid ${item.color}`,
              opacity: 0.45,
              left: -26,
              top: -26,
            }}
          />
        ) : null}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "18px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: `44px solid ${item.color}`,
            transform: `rotate(-42deg) scale(${scale})`,
            transformOrigin: "center",
            filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.35))",
          }}
        />
      </div>
    </ItemShell>
  );
};

const Callout: React.FC<{
  item: Extract<WorkstationItem, {type: "callout"}>;
}> = ({item}) => {
  const horizontal =
    item.direction === "left" || item.direction === "right";
  return (
    <ItemShell item={item}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: horizontal
            ? item.direction === "left"
              ? "row-reverse"
              : "row"
            : item.direction === "up"
              ? "column-reverse"
              : "column",
          gap: 14,
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
            minHeight: 0,
            borderRadius: 18,
            padding: "18px 24px",
            boxSizing: "border-box",
            background: item.background,
            color: item.foreground,
            border: `2px solid ${item.accent}`,
            fontFamily: "Arial",
            fontSize: 24,
            fontWeight: 700,
            boxShadow: "0 14px 36px rgba(0,0,0,0.16)",
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            width: horizontal ? 56 : 4,
            height: horizontal ? 4 : 56,
            background: item.accent,
            borderRadius: 99,
          }}
        />
      </div>
    </ItemShell>
  );
};

const Flow: React.FC<{
  item: Extract<WorkstationItem, {type: "flow"}>;
}> = ({item}) => (
  <ItemShell item={item}>
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      {item.steps.map((step, index) => (
        <React.Fragment key={step + index}>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              borderRadius: 18,
              background: item.surface,
              color: item.foreground,
              border: `2px solid ${index === item.steps.length - 1 ? item.accent : "#CBD5E1"}`,
              padding: "20px 18px",
              fontFamily: "Arial",
              fontWeight: 700,
              fontSize: 22,
              textAlign: "center",
            }}
          >
            {step}
          </div>
          {index < item.steps.length - 1 ? (
            <div
              style={{
                fontFamily: "Arial",
                fontSize: 30,
                color: item.accent,
              }}
            >
              →
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  </ItemShell>
);

const WorkstationItemView: React.FC<{item: WorkstationItem}> = ({item}) => {
  if (item.type === "group") return null;

  if (item.type === "solid") {
    return (
      <ItemShell item={item}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: item.color,
            borderRadius: item.radius,
          }}
        />
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

  if (item.type === "browser-window") return <BrowserWindow item={item} />;
  if (item.type === "cursor") return <Cursor item={item} />;
  if (item.type === "callout") return <Callout item={item} />;
  if (item.type === "flow") return <Flow item={item} />;

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
        <div
          style={{
            height: 10,
            width: 96,
            borderRadius: 99,
            background: item.accent,
          }}
        />
        <div
          style={{fontSize: 48, fontWeight: 700, fontFamily: "Arial"}}
        >
          {item.title}
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.45,
            color: "#475569",
            fontFamily: "Arial",
          }}
        >
          {item.body}
        </div>
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

export const calculateWorkstationMetadata: CalculateMetadataFunction<WorkstationProject> =
  ({props}) => {
    const project = workstationProjectSchema.parse(props);
    return {
      durationInFrames: project.durationInFrames,
      fps: project.fps,
      width: project.width,
      height: project.height,
      props: project,
    };
  };

const byZIndex = (a: WorkstationItem, b: WorkstationItem) =>
  (a.zIndex ?? 0) - (b.zIndex ?? 0);

const HierarchyNode: React.FC<{
  item: WorkstationItem;
  childrenByParent: Map<string, WorkstationItem[]>;
  parentStart: number;
}> = ({item, childrenByParent, parentStart}) => {
  const relativeFrom = item.timing.from - parentStart;

  return (
    <Sequence
      name={item.name}
      from={relativeFrom}
      durationInFrames={item.timing.durationInFrames}
      layout="none"
    >
      {item.type === "group" ? (
        <ItemShell item={item}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
            }}
          >
            {(childrenByParent.get(item.id) ?? [])
              .slice()
              .sort(byZIndex)
              .map((child) => (
                <HierarchyNode
                  key={child.id}
                  item={child}
                  childrenByParent={childrenByParent}
                  parentStart={item.timing.from}
                />
              ))}
          </div>
        </ItemShell>
      ) : (
        <WorkstationItemView item={item} />
      )}
    </Sequence>
  );
};

export const MotionProject: React.FC<WorkstationProject> = (input) => {
  const project = workstationProjectSchema.parse(input);
  const visibleItems = project.tracks
    .filter((track) => track.visible)
    .flatMap((track) => track.items);

  const childrenByParent = new Map<string, WorkstationItem[]>();
  for (const item of visibleItems) {
    if (!item.parentId) continue;
    const existing = childrenByParent.get(item.parentId) ?? [];
    existing.push(item);
    childrenByParent.set(item.parentId, existing);
  }

  const roots = visibleItems
    .filter((item) => !item.parentId)
    .slice()
    .sort(byZIndex);

  return (
    <AbsoluteFill
      style={{background: project.background, overflow: "hidden"}}
    >
      {roots.map((item) => (
        <HierarchyNode
          key={item.id}
          item={item}
          childrenByParent={childrenByParent}
          parentStart={0}
        />
      ))}
    </AbsoluteFill>
  );
};
