import type { DesignTheme } from "../../../engine/themes/types";

/** Logo colours sampled from the user-supplied gperp-clinic branding exports.
 * Supporting tints, typography and motion remain template design choices.
 */
export const drHealthTheme = {
  status: "source-aligned",
  colors: {
    primary: "#005B6C",
    ink: "#003F4B",
    muted: "#47666B",
    paper: "#FFFFFF",
    white: "#FFFFFF",
    mint: "#E0F1EF",
    accent: "#10BA31",
    line: "#C2DDDE",
    dark: "#00252C",
  },
  typography: {
    body: '"Poppins", Arial, sans-serif',
    display: '"Montserrat", Arial, sans-serif',
    weight: { regular: 400, medium: 500, bold: 700 },
    size: { micro: 20, label: 24, body: 32, title: 48, display: 108 },
    lineHeight: { tight: 0.98, heading: 1.08, body: 1.4 },
    tracking: { display: "-0.035em", label: "0.13em" },
  },
  spacing: { xs: 12, sm: 20, md: 32, lg: 48, xl: 64, xxl: 96 },
  radius: { small: 18, card: 36, large: 64, pill: 999 },
  shadow: {
    card: "0 24px 64px #005B6C14, 0 2px 4px #005B6C08",
    floating: "0 46px 96px #005B6C26, 0 6px 18px #005B6C14",
  },
  opacity: { quiet: 0.55, decorative: 0.22, glass: 0.92 },
  layout: { maxCopyWidth: 820, border: 2, rule: 3 },
  depth: { flat: 0, layered: 1, rotation: -3 },
  image: { minScale: 0.85, maxScale: 1.15, circleInset: 8 },
  shapes: { sparse: 1, balanced: 3, rich: 5, diameter: 780 },
  // Seconds, adapted to the renderer's fps by engine/motion.
  motion: {
    quick: 0.3,
    normal: 0.65,
    slow: 1.1,
    stagger: 0.12,
    distance: 44,
    parallax: 22,
    scaleFrom: 0.94,
    spring: { damping: 24, stiffness: 110, mass: 1, overshootClamping: true },
  },
} satisfies DesignTheme;
