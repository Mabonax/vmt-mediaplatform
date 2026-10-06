import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { useCreative } from "../layout/CreativeContext";

export const ShapeLayer = () => {
  const { theme, design, metrics } = useCreative();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = theme.shapes[design.shapeDensity];
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        pointerEvents: "none"
      }}
    >
      {Array.from({ length: count }, (_, index) => {
        const diameter = theme.shapes.diameter + index * theme.spacing.xxl;
        const drift =
          Math.sin((frame / fps) * 0.22 * design.motionSpeed + index) *
          theme.motion.parallax *
          design.motionIntensity;
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              width: diameter,
              height: diameter,
              right: -diameter * 0.45 + drift,
              top: metrics.height * 0.23 + index * theme.spacing.md + drift,
              border: `${theme.layout.border}px solid ${
                design.background === "mint" || index % 2 === 1
                  ? theme.colors.accent
                  : theme.colors.primary
              }`,
              opacity: theme.opacity.decorative / (index + 1),
              borderRadius:
                design.shapeStyle === "rings" ? "50%" : "50% 8% 50% 50%",
              transform: `rotate(${index * 22 + (design.shapeStyle === "petals" ? -32 : 0)}deg)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
export const GradientBackground = () => {
  const { design } = useCreative();
  return (
    <AbsoluteFill
      style={{
        background: design.backgroundColor
      }}
      from={-1}
    >
      <ShapeLayer />
    </AbsoluteFill>
  );
};
