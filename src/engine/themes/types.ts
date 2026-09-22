/** Portable design language: no React, browser, or Remotion imports. */
export interface DesignTheme {
  status: "development" | "source-aligned" | "approved";
  colors: {
    primary: string;
    ink: string;
    muted: string;
    paper: string;
    white: string;
    mint: string;
    accent: string;
    line: string;
    dark: string;
  };
  typography: {
    body: string;
    display: string;
    weight: { regular: number; medium: number; bold: number };
    size: {
      micro: number;
      label: number;
      body: number;
      title: number;
      display: number;
    };
    lineHeight: { tight: number; heading: number; body: number };
    tracking: { display: string; label: string };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  radius: { small: number; card: number; large: number; pill: number };
  shadow: { card: string; floating: string };
  opacity: { quiet: number; decorative: number; glass: number };
  layout: { maxCopyWidth: number; border: number; rule: number };
  depth: { flat: number; layered: number; rotation: number };
  image: { minScale: number; maxScale: number; circleInset: number };
  shapes: { sparse: number; balanced: number; rich: number; diameter: number };
  motion: {
    quick: number;
    normal: number;
    slow: number;
    stagger: number;
    distance: number;
    parallax: number;
    scaleFrom: number;
    spring: {
      damping: number;
      stiffness: number;
      mass: number;
      overshootClamping: boolean;
    };
  };
}
