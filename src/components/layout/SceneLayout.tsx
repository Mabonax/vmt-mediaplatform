import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { useCreative } from "./CreativeContext";

export const SceneLayout = ({
  copy,
  visual,
}: {
  copy: ReactNode;
  visual: ReactNode;
}) => {
  const { theme, design, format, metrics } = useCreative();
  const vertical = format === "vertical";
  const hero = design.layout === "hero";
  const verticalPosition = {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
  } as const;
  return (
    <AbsoluteFill
      style={{
        top: metrics.contentTop,
        bottom: metrics.safeBottom + theme.spacing.xl,
        left: metrics.safeX,
        right: metrics.safeX,
        width: "auto",
        height: "auto",
        display: "flex",
        flexDirection: vertical ? "column" : hero ? "row-reverse" : "row",
        alignItems: vertical ? "center" : verticalPosition[design.contentPosition],
        justifyContent: vertical ? verticalPosition[design.contentPosition] : "center",
        gap: vertical ? theme.spacing.xl : theme.spacing.lg,
        transform: `translate(${design.contentOffsetX}px, ${design.contentOffsetY}px)`,
        backgroundColor: "rgba(255, 0, 0, 0)"
      }}
    >
      <div
        data-layout-copy
        style={{
          width: vertical ? "100%" : undefined,
          flex: vertical ? "0 0 auto" : 1,
          minWidth: 0,
          textAlign: design.textAlign,
        }}
      >
        {copy}
      </div>
      <div
        data-layout-visual
        style={{
          width: metrics.visualWidth,
          maxWidth: "100%",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {visual}
      </div>
    </AbsoluteFill>
  );
};
