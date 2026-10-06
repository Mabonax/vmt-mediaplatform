import type { ReactNode } from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type CalculateMetadataFunction,
} from "remotion";
import { getVideoFormat } from "../../../engine/layout/formats";
import {
  parseServicePromo,
  type ServicePromoProps,
} from "../../../engine/schemas/promo";
import { useBrandFonts } from "../../../engine/typography/fonts";
import { BrandLogo } from "../../../components/brand/BrandLogo";
import { Arrow } from "../../../components/cards/Cards";
import {
  CreativeProvider,
  useCreative,
} from "../../../components/layout/CreativeContext";
import { GradientBackground } from "../../../components/shapes/Background";
import { PromoScene } from "../scenes/PromoScenes";
import { drHealthTheme } from "../theme/tokens";
import { promoScenes, promoTiming } from "./timeline";

const Dissolve = ({
  children,
  length,
  first,
  last,
}: {
  children: ReactNode;
  length: number;
  first: boolean;
  last: boolean;
}) => {
  const frame = useCurrentFrame();
  const enter = first
    ? 1
    : interpolate(frame, [0, promoTiming.transitionFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const leave = last
    ? 1
    : interpolate(
        frame,
        [length - promoTiming.transitionFrames, length],
        [1, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
      );
  return (
    <AbsoluteFill
      style={{
        opacity: enter * leave
      }}
    >{children}</AbsoluteFill>
  );
};
const Chrome = ({ content }: ServicePromoProps) => {
  const { theme, metrics, unit, design } = useCreative();
  const frame = useCurrentFrame();
  const inverse = false; // Original logo and white canvas throughout.
  const scene =
    [...promoScenes].reverse().find((item) => frame >= item.from) ??
    promoScenes[0];
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        color: inverse ? theme.colors.paper : theme.colors.ink
      }}
    >
      <div
        style={{
          position: "absolute",
          left: metrics.safeX,
          right: metrics.safeX,
          top: metrics.safeTop,
          height: 170 * unit,
        }}
      >
        <div
          style={{
            position: "absolute",
            left:
              design.logoPosition === "left"
                ? 0
                : design.logoPosition === "center"
                  ? "50%"
                  : undefined,
            right: design.logoPosition === "right" ? 0 : undefined,
            transform:
              design.logoPosition === "center" ? "translateX(-50%)" : undefined,
          }}
        >
          <BrandLogo inverse={inverse} />
        </div>
        <div
          style={{
            position: "absolute",
            left: design.logoPosition === "right" ? 0 : undefined,
            right: design.logoPosition === "right" ? undefined : 0,
            fontSize: theme.typography.size.micro * unit,
            textAlign: design.logoPosition === "right" ? "left" : "right",
            color: inverse ? theme.colors.mint : theme.colors.muted,
            lineHeight: theme.typography.lineHeight.body,
          }}
        >
          MOTION STUDY / 01
          <br />
          {content.dataMode === "demo" ? "DEMO CONTENT" : "APPROVED CONTENT"}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: metrics.safeX,
          right: metrics.safeX,
          bottom: metrics.safeBottom,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: theme.spacing.md,
        }}
      >
        <div style={{ fontSize: theme.typography.size.label * unit }}>
          {scene.label}
        </div>
        <div
          style={{
            display: "flex",
            gap: theme.spacing.xs,
            alignItems: "center",
            fontSize: theme.typography.size.label * unit,
          }}
        >
          {content.cta.title}
          <Arrow size={32 * unit} />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: metrics.safeX,
          right: metrics.safeX,
          bottom: metrics.safeBottom - theme.spacing.md,
          height: theme.layout.rule,
          background: inverse ? `${theme.colors.mint}44` : theme.colors.line,
        }}
      >
        <div
          style={{
            width: `${((frame + 1) / promoTiming.durationInFrames) * 100}%`,
            height: "100%",
            background: inverse ? theme.colors.accent : theme.colors.primary,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: metrics.safeX,
          bottom: metrics.safeBottom - theme.spacing.xl,
          fontSize: theme.typography.size.micro * unit,
          color: inverse ? theme.colors.mint : theme.colors.muted,
        }}
      >
        DEMO CAMPAIGN ·{" "}
        {content.dataMode === "demo"
          ? "FICTIONAL PRACTICE & DOCTOR"
          : "CONCEPT INTERFACE"}
      </div>
    </AbsoluteFill>
  );
};

export const calculatePromoMetadata: CalculateMetadataFunction<
  ServicePromoProps
> = ({ props }) => ({ props: parseServicePromo(props) });
export const DrHealthServicePromo15 = (input: ServicePromoProps) => {
  useBrandFonts();
  const props = parseServicePromo(input);
  const { width, height } = useVideoConfig();
  const fontFamily = {
    Montserrat: '"Montserrat", Arial, sans-serif',
    Poppins: '"Poppins", Arial, sans-serif',
  } as const;
  const theme = {
    ...drHealthTheme,
    colors: {
      ...drHealthTheme.colors,
      primary: props.design.primaryColor,
      accent: props.design.accentColor,
      ink: props.design.textColor,
    },
    typography: {
      ...drHealthTheme.typography,
      display: fontFamily[props.design.headingFont],
      body: fontFamily[props.design.bodyFont],
    },
  };
  return (
    <CreativeProvider
      theme={theme}
      design={props.design}
      format={getVideoFormat(width, height)}
    >
      <AbsoluteFill
        style={{
          fontFamily: theme.typography.body,
          color: theme.colors.ink,
          overflow: "hidden",
          backgroundColor: props.design.backgroundColor
        }}
      >
        <GradientBackground />
        {promoScenes.map((scene, index) => {
          const last = index === promoScenes.length - 1;
          const length =
            scene.to - scene.from + (last ? 0 : promoTiming.transitionFrames);
          return (
            <Sequence
              key={scene.id}
              name={scene.id}
              from={scene.from}
              durationInFrames={length}
            >
              <Dissolve length={length} first={index === 0} last={last}>
                <PromoScene id={scene.id} content={props.content} />
              </Dissolve>
            </Sequence>
          );
        })}
        <Chrome {...props} />
      </AbsoluteFill>
    </CreativeProvider>
  );
};
