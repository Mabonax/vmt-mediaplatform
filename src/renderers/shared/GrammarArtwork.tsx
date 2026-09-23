import {
  createElement,
  Fragment,
  type ComponentType,
  type CSSProperties,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import type { CreativeAsset } from "../../engine/assets/registry";
import type { ElementRole } from "../../engine/grammar/models";
import type { ResolvedComposition } from "../../engine/grammar/resolve";
import { brandingAssets } from "../../brands/dr-health/assets/branding";

export type ImageRenderer = ComponentType<ImgHTMLAttributes<HTMLImageElement>>;
// The static renderer deliberately uses a native image; the motion adapter injects Remotion Img.
export const BrowserImage: ImageRenderer = (props) =>
  createElement("img", props);
export type MotionSlotProps = { role: ElementRole; children: ReactNode };
const StillSlot = ({ children }: MotionSlotProps) => (
  <Fragment>{children}</Fragment>
);
export function OriginalLogo({
  asset = brandingAssets.wordmark,
  width = 150,
  unit = "px",
  Image = BrowserImage,
  assetUrl = (path) => `/${path}`,
}: {
  asset?: CreativeAsset;
  width?: number;
  unit?: string;
  Image?: ImageRenderer;
  assetUrl?: (path: string) => string;
}) {
  const box = asset.artwork;
  if (!box) throw new Error("Logo requires artwork bounds");
  return (
    <div
      style={{
        position: "relative",
        width: `${width}${unit}`,
        height: `${(width * box.height) / box.width}${unit}`,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Image
        src={assetUrl(asset.source)}
        alt={asset.alt}
        style={{
          position: "absolute",
          maxWidth: "none",
          width: `${(100 * box.canvasWidth) / box.width}%`,
          height: `${(100 * box.canvasHeight) / box.height}%`,
          left: `${(-100 * box.x) / box.width}%`,
          top: `${(-100 * box.y) / box.height}%`,
        }}
      />
    </div>
  );
}

/** Renderer-neutral markup. It knows neither frames, Remotion, nor backend routes. */
export function GrammarArtwork({
  resolved: r,
  Image = BrowserImage,
  Slot = StillSlot,
  assetUrl = (path) => `/${path}`,
}: {
  resolved: ResolvedComposition;
  Image?: ImageRenderer;
  Slot?: ComponentType<MotionSlotProps>;
  assetUrl?: (path: string) => string;
}) {
  const {
    style: s,
    dna,
    props: { content: c },
    format,
  } = r;
  const colors = r.tokens.colors;
  const vertical = format === "vertical";
  const tech = dna.layout.grid === "technical";
  const clinical = dna.layout.grid === "modular";
  const stackedCompact = r.stacked && !vertical;
  const bodySize = vertical ? 2.9 : format === "landscape" ? 1.65 : 2.05;
  const labelSize = vertical ? 1.9 : 1.25;
  const rule = `${s.border}px solid ${colors.line}`;
  const label: CSSProperties = {
    fontSize: `${labelSize}cqw`,
    letterSpacing: ".13em",
    textTransform: "uppercase",
    fontWeight: 700,
    color: colors.muted,
  };
  const body: CSSProperties = {
    fontSize: `${bodySize}cqw`,
    lineHeight: 1.45,
    margin: 0,
    overflowWrap: "anywhere",
  };
  const widths = r.family.grammar.elements;
  const copy = (
    <div
      data-grammar-element="copy"
      style={{
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: `${s.gap * 0.5}cqw`,
        textAlign:
          r.props.variation.layoutVariant === "stacked"
            ? "center"
            : dna.layout.alignment,
        alignItems:
          r.props.variation.layoutVariant === "stacked" ? "center" : "stretch",
      }}
    >
      <Slot role="headline">
        <div
          data-fit-text
          style={{
            maxWidth: `${widths.headline.maxWidth * 100}%`,
            paddingBottom: "1.2cqw",
          }}
        >
          <div
            style={{ ...label, color: colors.primary, marginBottom: "1.5cqw" }}
          >
            {tech
              ? "CONNECTED TO YOUR CLINIC"
              : clinical
                ? "YOUR NEXT APPOINTMENT"
                : "A LITTLE TIME FOR YOUR HEALTH"}
          </div>
          <h1
            style={{
              fontFamily: s.headingFamily,
              fontSize: `${s.headingSize * (stackedCompact ? 0.8 : 1)}cqw`,
              fontWeight: s.headingWeight,
              lineHeight: s.lineHeight,
              letterSpacing: `${s.tracking}em`,
              margin: 0,
              overflowWrap: "anywhere",
            }}
          >
            {c.copy.brandHeadline}
          </h1>
        </div>
      </Slot>
      <Slot role="body">
        <div
          data-fit-text
          style={{ maxWidth: `${widths.body.maxWidth * 100}%` }}
        >
          <p style={{ ...body, color: colors.muted }}>
            {c.copy.brandSupporting}
          </p>
        </div>
      </Slot>
      <Slot role="cta">
        <div
          data-fit-text
          style={{
            maxWidth: `${widths.cta.maxWidth * 100}%`,
            display: "flex",
            flexDirection: "column",
            alignItems:
              r.props.variation.layoutVariant === "stacked"
                ? "center"
                : "flex-start",
            gap: "0.8cqw",
          }}
        >
          <div
            style={{
              background: colors.primary,
              color: "white",
              padding: `${bodySize * 0.65}cqw ${bodySize}cqw`,
              borderRadius: s.buttonRadius,
              fontSize: `${bodySize}cqw`,
              fontWeight: s.ctaWeight,
              lineHeight: 1.25,
            }}
          >
            {c.copy.bookingAction} <span aria-hidden>↗</span>
          </div>
          <p
            style={{
              ...body,
              fontSize: `${labelSize}cqw`,
              color: colors.muted,
            }}
          >
            Practice confirmation follows your request.
          </p>
        </div>
      </Slot>
    </div>
  );
  const subject = (
    <div
      data-grammar-element="subject"
      style={{
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1.4cqw",
      }}
    >
      <Slot role="subject">
        <div
          style={{
            height: `${vertical ? 42 : stackedCompact ? 20 : format === "landscape" ? 16 : 35}cqw`,
            position: "relative",
            overflow: "hidden",
            border:
              clinical || tech || r.subject.treatment === "framed"
                ? rule
                : undefined,
            borderRadius:
              dna.imagery.treatment === "arch" ? "48% 48% 8% 8%" : s.radius,
            background: "white",
            boxShadow: s.shadow,
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: "5%",
              overflow: "hidden",
              opacity: s.shapeOpacity,
              transform: `rotate(${s.shapeRotation}deg)`,
            }}
          >
            {Array.from({ length: s.shapeCount }, (_, index) => (
              <div
                key={index}
                style={{
                  position: "absolute",
                  inset: `${8 + index * 7}%`,
                  border: `${dna.shapes.stroke}px solid ${colors.primary}`,
                  borderRadius: dna.shapes.language === "rings" ? "50%" : 0,
                  transform: `scale(${r.family.grammar.primaryShape.scaleRelativeToSubject})`,
                  ...(dna.shapes.language === "rules"
                    ? { borderLeft: 0, borderRight: 0, borderBottom: 0 }
                    : {}),
                }}
              />
            ))}
            {tech && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(${colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)`,
                  backgroundSize: "3.8cqw 3.8cqw",
                  opacity: 0.35,
                }}
              />
            )}
          </div>
          {r.subject.asset ? (
            <Image
              src={assetUrl(r.subject.asset.source)}
              alt={r.subject.asset.alt}
              style={{
                position: "absolute",
                width: `${s.imageScale * 100}%`,
                height: `${s.imageScale * 100}%`,
                left: `${(1 - s.imageScale) * 50}%`,
                bottom: 0,
                objectFit: "contain",
                objectPosition: "center bottom",
              }}
            />
          ) : (
            <div
              role="img"
              aria-label="No portrait supplied"
              style={{
                position: "absolute",
                inset: "22%",
                display: "grid",
                placeItems: "center",
                border: rule,
                borderRadius: "50%",
                color: colors.primary,
                fontSize: "8cqw",
                fontFamily: s.headingFamily,
              }}
            >
              {c.doctor.name
                .split(" ")
                .filter((part) => part !== "Dr")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </div>
          )}
          {tech && (
            <div
              style={{
                ...label,
                position: "absolute",
                left: "1.2cqw",
                top: "1.2cqw",
                background: "white",
                padding: "0.4cqw",
              }}
            >
              01 / PRACTITIONER
            </div>
          )}
        </div>
      </Slot>
      <Slot role="metadata">
        <div
          data-fit-text
          style={{
            borderTop: clinical || tech ? rule : undefined,
            paddingTop: "1cqw",
            display: "grid",
            gap: ".45cqw",
            maxWidth: `${widths.metadata.maxWidth * 100}%`,
          }}
        >
          <strong
            style={{
              fontSize: `${bodySize * 1.04}cqw`,
              lineHeight: 1.25,
              overflowWrap: "anywhere",
            }}
          >
            {c.doctor.name}
          </strong>
          <span
            style={{ fontSize: `${bodySize * 0.78}cqw`, color: colors.muted }}
          >
            {c.doctor.speciality} · {c.practice.name}
          </span>
          <span
            style={{
              ...label,
              fontSize: `${labelSize * 0.9}cqw`,
              marginTop: ".7cqw",
            }}
          >
            {c.service.name}
          </span>
        </div>
      </Slot>
    </div>
  );
  return (
    <div
      data-grammar-root={r.family.id}
      data-layout={r.props.variation.layoutVariant}
      style={{
        containerType: "size",
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#FFFFFF",
        color: colors.ink,
        fontFamily: r.tokens.typography.body,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: `${s.padding}cqw`,
          display: "flex",
          flexDirection: "column",
          gap: `${s.gap}cqw`,
        }}
      >
        <header
          data-grammar-element="header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "1.6cqw",
            borderBottom: dna.layout.edge === "ruled" ? rule : undefined,
          }}
        >
          <OriginalLogo
            Image={Image}
            assetUrl={assetUrl}
            width={vertical ? 28 : format === "landscape" ? 15 : 20}
            unit="cqw"
          />
          <span style={{ ...label, textAlign: "right" }}>
            {c.dataMode === "demo" ? "DEMO CAMPAIGN" : "CAMPAIGN PREVIEW"}
            <br />
            <span style={{ fontWeight: 400 }}>DrHealth / Patient services</span>
          </span>
        </header>
        <main
          data-grammar-element="main"
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: r.stacked ? "1fr" : s.columns,
            alignContent: "center",
            gap: `${s.gap}cqw`,
            width: `${dna.layout.contentWidth * 100}%`,
            alignSelf: "center",
          }}
        >
          {r.subjectFirst || r.side === "left" ? (
            <>
              {subject}
              {copy}
            </>
          ) : (
            <>
              {copy}
              {subject}
            </>
          )}
        </main>
        <footer
          data-grammar-element="footer"
          style={{
            borderTop: rule,
            paddingTop: "1.5cqw",
            display: "grid",
            gap: "1.5cqw",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "2cqw",
              alignItems: "center",
            }}
          >
            <div style={{ ...label, maxWidth: "32%" }}>
              {c.availabilityLabel}
            </div>
            <div style={{ display: "flex", gap: ".8cqw" }}>
              {c.availability.map((time, index) => (
                <div
                  key={time}
                  style={{
                    border: `${s.border}px solid ${index === 0 ? colors.primary : colors.line}`,
                    borderRadius: s.radius * 0.4,
                    padding: ".7cqw 1.1cqw",
                    fontSize: `${bodySize * 0.85}cqw`,
                    fontWeight: 700,
                  }}
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ fontSize: `${labelSize * 0.86}cqw`, color: colors.muted }}
          >
            {c.dataMode === "demo"
              ? "Fictional practice & clinician · Illustrative times · No appointment booked"
              : "Availability and booking are subject to practice confirmation"}
          </div>
        </footer>
      </div>
    </div>
  );
}
