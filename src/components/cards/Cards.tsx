import type { CSSProperties, ReactNode } from "react";
import type { PromoContent } from "../../engine/schemas/promo";
import type { CreativeAsset } from "../../engine/assets/registry";
import { useCreative } from "../layout/CreativeContext";
import { PersonCutout } from "../media/MediaFrame";
import { CareMark } from "../brand/BrandLogo";
import { Eyebrow } from "../typography/Text";

export const GlassCard = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: CSSProperties;
}) => {
  const { theme, design, unit } = useCreative();
  return (
    <div
      style={{
        borderRadius: theme.radius.card,
        background: theme.colors.white,
        border: `${theme.layout.border}px solid ${theme.colors.line}`,
        padding: theme.spacing.md * unit,
        boxShadow:
          design.visualDepth === "layered" ? theme.shadow.card : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
export const Arrow = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
    <path
      d="M8 20h24M22 10l10 10-10 10"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export const ServiceCard = ({
  service,
}: {
  service: PromoContent["service"];
}) => {
  const { theme, unit } = useCreative();
  return (
    <GlassCard
      style={{
        padding: theme.spacing.lg * unit,
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing.lg * unit,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <CareMark size={116 * unit} />
        <span
          style={{
            fontSize: theme.typography.size.micro * unit,
            color: theme.colors.muted,
          }}
        >
          01 / CARE
        </span>
      </div>
      <div
        data-fit-text
        style={{
          fontSize: theme.typography.size.title * unit,
          fontWeight: theme.typography.weight.medium,
          lineHeight: theme.typography.lineHeight.heading,
          overflowWrap: "anywhere",
        }}
      >
        {service.name}
      </div>
      <div
        style={{ height: theme.layout.border, background: theme.colors.line }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: theme.typography.size.label * unit,
        }}
      >
        Explore your care
        <Arrow size={42 * unit} />
      </div>
    </GlassCard>
  );
};
export const DoctorCard = ({
  content,
  asset,
}: {
  content: PromoContent;
  asset?: CreativeAsset;
}) => {
  const { theme, design, metrics, unit } = useCreative();
  const imageHeight = metrics.visualHeight * 0.64;
  return (
    <GlassCard style={{ padding: theme.spacing.sm * unit }}>
      <div
        style={{
          height: imageHeight,
          width: design.imageTreatment === "circle" ? imageHeight : "100%",
          maxWidth: "100%",
          margin: "0 auto",
        }}
      >
        <PersonCutout asset={asset} />
      </div>
      <div
        style={{
          padding: theme.spacing.sm * unit,
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing.xs * unit,
        }}
      >
        <Eyebrow>{content.doctor.speciality}</Eyebrow>
        <div
          data-fit-text
          style={{
            fontSize: 38 * unit,
            fontWeight: theme.typography.weight.bold,
            lineHeight: theme.typography.lineHeight.heading,
            overflowWrap: "anywhere",
          }}
        >
          {content.doctor.name}
        </div>
        <div
          data-fit-text
          style={{
            fontSize: theme.typography.size.label * unit,
            color: theme.colors.muted,
            overflowWrap: "anywhere",
          }}
        >
          {content.practice.name}
        </div>
      </div>
    </GlassCard>
  );
};
export const AppointmentSlot = ({
  time,
  selected = false,
}: {
  time: string;
  selected?: boolean;
}) => {
  const { theme, unit } = useCreative();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: `${theme.spacing.sm * unit}px ${theme.spacing.md * unit}px`,
        borderRadius: theme.radius.small,
        border: `${theme.layout.border}px solid ${selected ? theme.colors.primary : theme.colors.line}`,
        background: selected ? theme.colors.primary : theme.colors.paper,
        color: selected ? theme.colors.paper : theme.colors.ink,
        fontSize: theme.typography.size.body * unit,
        fontWeight: theme.typography.weight.bold,
        fontVariantNumeric: "tabular-nums",
      }}
    >
      <span>{time}</span>
      {selected ? (
        <span style={{ fontSize: theme.typography.size.micro * unit }}>
          Selected ✓
        </span>
      ) : (
        <Arrow size={28 * unit} />
      )}
    </div>
  );
};
export const CTA = ({
  title,
  inverse = false,
}: {
  title: string;
  inverse?: boolean;
}) => {
  const { theme, unit } = useCreative();
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: theme.spacing.md * unit,
        background: inverse ? theme.colors.accent : theme.colors.primary,
        color: inverse ? theme.colors.ink : theme.colors.paper,
        borderRadius: theme.radius.pill,
        padding: `${theme.spacing.sm * unit}px ${theme.spacing.md * unit}px`,
        fontSize: theme.typography.size.body * unit,
        fontWeight: theme.typography.weight.bold,
      }}
    >
      <span data-fit-text>{title}</span>
      <Arrow size={40 * unit} />
    </div>
  );
};
