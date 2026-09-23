import {
  Img,
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  type CalculateMetadataFunction,
} from "remotion";
import {
  GrammarArtwork,
  type ImageRenderer,
  type MotionSlotProps,
} from "../shared/GrammarArtwork";
import {
  parseGrammarPromo,
  resolveComposition,
} from "../../engine/grammar/resolve";
import type { GrammarPromoProps } from "../../engine/grammar/models";
import { resolveMotion } from "../../engine/grammar/motion";
import { useBrandFonts } from "../../engine/typography/fonts";
import { getVideoFormat } from "../../engine/layout/formats";
import { CreativeProvider } from "../../components/layout/CreativeContext";
import {
  SlideIn,
  SpringReveal,
  Parallax,
} from "../../components/motion/primitives";
import demo from "../../brands/dr-health/data/demo.json";
import { parseServicePromo } from "../../engine/schemas/promo";
import { createContext, useContext } from "react";

const MotionContext = createContext<ReturnType<
  typeof resolveComposition
> | null>(null);
const RemotionImage: ImageRenderer = ({ src, alt, style }) => (
  <Img src={src!} alt={alt} style={style} />
);
function MotionSlot({ role, children }: MotionSlotProps) {
  const r = useContext(MotionContext);
  if (!r) throw new Error("Motion context required");
  const motion = resolveMotion(r.motion, r.axes.dynamic, role);
  const entrance =
    r.motion.entrance === "spring-scale" ? (
      <SpringReveal {...motion}>{children}</SpringReveal>
    ) : (
      <SlideIn {...motion}>{children}</SlideIn>
    );
  return role === "subject" && motion.parallax > 0 ? (
    <Parallax distance={motion.parallax}>{entrance}</Parallax>
  ) : (
    entrance
  );
}
export const calculateGrammarMetadata: CalculateMetadataFunction<
  GrammarPromoProps
> = ({ props }) => ({ props: parseGrammarPromo(props) });
export function GrammarPromo(input: GrammarPromoProps) {
  useBrandFonts();
  const { width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const r = resolveComposition(input, getVideoFormat(width, height));
  const design = {
    ...parseServicePromo(demo).design,
    motionStyle:
      r.motion.id === "premium" ? ("smooth" as const) : ("subtle" as const),
    motionIntensity: 0.25 + r.axes.dynamic * 0.65,
    motionSpeed: 1,
  };
  const theme = {
    ...r.tokens,
    motion: {
      ...r.tokens.motion,
      distance: resolveMotion(r.motion, r.axes.dynamic, "headline").distance,
      spring: r.motion.spring,
    },
  };
  const opacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames - 1],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <AbsoluteFill style={{ background: "white" }}>
      <CreativeProvider theme={theme} design={design} format={r.format}>
        <MotionContext.Provider value={r}>
          <AbsoluteFill style={{ opacity }}>
            <GrammarArtwork
              resolved={r}
              Image={RemotionImage}
              Slot={MotionSlot}
              assetUrl={staticFile}
            />
          </AbsoluteFill>
        </MotionContext.Provider>
      </CreativeProvider>
    </AbsoluteFill>
  );
}
