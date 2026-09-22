import { Easing, interpolate, spring } from "remotion";
import type { DesignConfig } from "../schemas/promo";
import type { DesignTheme } from "../themes/types";

export const secondsToFrames = (seconds: number, fps: number) =>
  Math.max(1, Math.round(seconds * fps));
export const revealProgress = (
  frame: number,
  fps: number,
  theme: DesignTheme,
  design: DesignConfig,
  delay = 0,
  duration = theme.motion.normal,
  physics = false,
) => {
  const localFrame =
    frame - secondsToFrames(delay, fps) + (delay === 0 ? 1 : 0);
  const durationInFrames = secondsToFrames(duration / design.motionSpeed, fps);
  if (localFrame < 0) return 0;
  return physics && design.motionStyle === "smooth"
    ? spring({
        frame: localFrame,
        fps,
        durationInFrames,
        config: theme.motion.spring,
      })
    : interpolate(localFrame, [0, durationInFrames], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.bezier(0.22, 1, 0.36, 1),
      });
};
