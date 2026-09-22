import type { CSSProperties, ReactNode } from "react";
import { useCreative } from "../layout/CreativeContext";

export const DisplayText = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const { theme, design, metrics } = useCreative();
  return (
    <h1
      data-fit-text
      style={{
        margin: 0,
        fontFamily:
          design.typographyStyle === "editorial"
            ? theme.typography.display
            : theme.typography.body,
        fontWeight:
          design.typographyStyle === "editorial"
            ? theme.typography.weight.regular
            : theme.typography.weight.medium,
        fontSize: metrics.heading * design.typographyScale,
        lineHeight: theme.typography.lineHeight.heading,
        letterSpacing: theme.typography.tracking.display,
        textWrap: "balance",
        overflowWrap: "anywhere",
        ...style,
      }}
    >
      {children}
    </h1>
  );
};
export const BodyText = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const { theme, metrics } = useCreative();
  return (
    <p
      data-fit-text
      style={{
        margin: 0,
        fontSize: metrics.body,
        lineHeight: theme.typography.lineHeight.body,
        color: theme.colors.muted,
        textWrap: "pretty",
        overflowWrap: "anywhere",
        ...style,
      }}
    >
      {children}
    </p>
  );
};
export const Eyebrow = ({
  children,
  inverse = false,
}: {
  children: ReactNode;
  inverse?: boolean;
}) => {
  const { theme, unit } = useCreative();
  return (
    <div
      style={{
        fontSize: theme.typography.size.label * unit,
        fontWeight: theme.typography.weight.bold,
        letterSpacing: theme.typography.tracking.label,
        textTransform: "uppercase",
        color: inverse ? theme.colors.accent : theme.colors.primary,
      }}
    >
      {children}
    </div>
  );
};
