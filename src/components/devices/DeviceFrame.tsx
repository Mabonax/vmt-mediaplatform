import type { PromoContent } from "../../engine/schemas/promo";
import { useCreative } from "../layout/CreativeContext";
import { CareMark } from "../brand/BrandLogo";

/** A concept interface, with no backend interaction or claim of a real booking. */
export const DeviceFrame = ({ content }: { content: PromoContent }) => {
  const { theme, design, metrics } = useCreative();
  const height =
    metrics.visualHeight +
    (metrics.height > metrics.width ? theme.spacing.xxl : 0);
  const scale = height / 700;
  return (
    <div
      style={{
        width: 390 * scale,
        height,
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 390,
          height: 700,
          transform: `scale(${scale}) rotate(${design.visualDepth === "layered" ? theme.depth.rotation : 0}deg)`,
          transformOrigin: "top left",
          borderRadius: theme.radius.large,
          background: theme.colors.dark,
          padding: theme.spacing.xs,
          boxShadow:
            design.visualDepth === "layered" ? theme.shadow.floating : "none",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: theme.radius.large - theme.spacing.xs,
            overflow: "hidden",
            background: theme.colors.paper,
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 92,
              height: 8,
              margin: "0 auto 12px",
              borderRadius: theme.radius.pill,
              background: theme.colors.dark,
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.xs,
              fontSize: 20,
              fontWeight: theme.typography.weight.bold,
            }}
          >
            <CareMark size={36} />
            Dr. Health
          </div>
          <div
            style={{
              fontSize: 12,
              letterSpacing: theme.typography.tracking.label,
              color: theme.colors.muted,
            }}
          >
            BOOKING CONCEPT · DEMO
          </div>
          <div
            data-fit-text
            style={{
              fontSize: 29,
              lineHeight: 1.1,
              fontFamily: theme.typography.display,
            }}
          >
            Your next visit
          </div>
          <div
            style={{
              padding: 18,
              background: theme.colors.white,
              border: `1px solid ${theme.colors.line}`,
              borderRadius: theme.radius.small,
            }}
          >
            <div
              data-fit-text
              style={{
                fontSize: 20,
                fontWeight: theme.typography.weight.bold,
                overflowWrap: "anywhere",
              }}
            >
              {content.doctor.name}
            </div>
            <div
              data-fit-text
              style={{
                fontSize: 15,
                marginTop: 8,
                color: theme.colors.muted,
                overflowWrap: "anywhere",
              }}
            >
              {content.practice.name}
            </div>
            <div
              data-fit-text
              style={{ fontSize: 17, marginTop: 16, overflowWrap: "anywhere" }}
            >
              {content.service.name}
            </div>
          </div>
          <div style={{ fontSize: 14, color: theme.colors.muted }}>
            {content.availabilityLabel}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {content.availability.map((time, index) => (
              <div
                key={time}
                style={{
                  fontSize: 16,
                  padding: "10px 14px",
                  borderRadius: theme.radius.small,
                  background:
                    index === 0 ? theme.colors.primary : theme.colors.white,
                  color: index === 0 ? theme.colors.paper : theme.colors.ink,
                }}
              >
                {time}
              </div>
            ))}
          </div>
          <div
            data-fit-text
            style={{
              marginTop: "auto",
              textAlign: "center",
              padding: "16px 12px",
              borderRadius: theme.radius.pill,
              background: theme.colors.primary,
              color: theme.colors.paper,
              fontSize: 17,
              fontWeight: theme.typography.weight.bold,
            }}
          >
            {content.copy.bookingAction}
          </div>
          <div
            style={{
              fontSize: 12,
              color: theme.colors.muted,
              textAlign: "center",
            }}
          >
            Preview only · No appointment is booked
          </div>
        </div>
      </div>
    </div>
  );
};
