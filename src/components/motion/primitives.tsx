import { Children, type CSSProperties, type ReactNode } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { revealProgress } from "../../engine/motion/timing";
import { useCreative } from "../layout/CreativeContext";

interface MotionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  intensity?: number;
  style?: CSSProperties;
}
const useReveal = (props: Omit<MotionProps, "children">, physics = false) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme, design } = useCreative();
  return {
    progress: revealProgress(
      frame,
      fps,
      theme,
      design,
      props.delay,
      props.duration,
      physics,
    ),
    intensity: props.intensity ?? design.motionIntensity,
    theme,
  };
};
export const FadeIn = ({ children, ...props }: MotionProps) => {
  const { progress } = useReveal(props);
  return <div style={{ ...props.style, opacity: progress }}>{children}</div>;
};
export const SlideIn = ({
  children,
  direction = "up",
  distance,
  ...props
}: MotionProps & {
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}) => {
  const { progress, intensity, theme } = useReveal(props);
  const delta =
    (1 - progress) * (distance ?? theme.motion.distance) * intensity;
  const x = direction === "left" ? delta : direction === "right" ? -delta : 0;
  const y = direction === "up" ? delta : direction === "down" ? -delta : 0;
  return (
    <div
      style={{
        ...props.style,
        opacity: progress,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {children}
    </div>
  );
};
export const ScaleIn = ({ children, ...props }: MotionProps) => {
  const { progress, intensity, theme } = useReveal(props);
  return (
    <div
      style={{
        ...props.style,
        opacity: progress,
        transform: `scale(${1 - (1 - theme.motion.scaleFrom) * (1 - progress) * intensity})`,
      }}
    >
      {children}
    </div>
  );
};
export const SpringReveal = ({ children, ...props }: MotionProps) => {
  const { progress, intensity, theme } = useReveal(props, true);
  return (
    <div
      style={{
        ...props.style,
        opacity: progress,
        transform: `translateY(${(1 - progress) * theme.motion.distance * intensity}px) scale(${1 - (1 - progress) * (1 - theme.motion.scaleFrom) * intensity})`,
      }}
    >
      {children}
    </div>
  );
};
export const Stagger = ({
  children,
  delay = 0,
  interval,
  style,
}: MotionProps & { interval?: number }) => {
  const { theme } = useCreative();
  return (
    <div style={style}>
      {Children.toArray(children).map((child, index) => (
        <SlideIn
          key={index}
          delay={delay + index * (interval ?? theme.motion.stagger)}
        >
          {child}
        </SlideIn>
      ))}
    </div>
  );
};
export const Parallax = ({
  children,
  distance,
  style,
}: {
  children: ReactNode;
  distance?: number;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { theme, design } = useCreative();
  const y =
    Math.sin((frame / fps) * design.motionSpeed * 0.5) *
    (distance ?? theme.motion.parallax) *
    design.motionIntensity;
  return (
    <div style={{ ...style, transform: `translateY(${y}px)` }}>{children}</div>
  );
};
export const MaskReveal = ({ children, ...props }: MotionProps) => {
  const { progress } = useReveal(props);
  return (
    <div
      style={{
        ...props.style,
        clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
      }}
    >
      {children}
    </div>
  );
};
/** The full text keeps its layout; opacity reveals words without reflow. */
export const TypeReveal = ({
  text,
  delay = 0,
}: {
  text: string;
  delay?: number;
}) => {
  const { progress } = useReveal({ delay });
  const words = text.split(" ");
  return (
    <span aria-label={text}>
      {words.map((word, index) => (
        <span
          key={index}
          aria-hidden
          style={{ opacity: progress >= (index + 1) / words.length ? 1 : 0 }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
};
