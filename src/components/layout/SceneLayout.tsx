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
        alignItems: "center",
        justifyContent: "center",
        gap: vertical ? theme.spacing.xl : theme.spacing.lg,
      }}
    >
      <div
        data-layout-copy
        style={{
          width: vertical ? "100%" : undefined,
          flex: vertical ? "0 0 auto" : 1,
          minWidth: 0,
          textAlign: hero && vertical ? "center" : "left",
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
