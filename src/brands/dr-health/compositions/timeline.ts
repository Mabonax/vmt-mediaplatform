/** Editorial boundaries in frames. 15 seconds at 30 fps, including the final held frame. */
export const promoTiming = {
  fps: 30,
  durationInFrames: 450,
  transitionFrames: 10,
} as const;
export const promoScenes = [
  { id: "brand", from: 0, to: 60, label: "A simpler way to care" },
  { id: "service", from: 60, to: 120, label: "Find your care" },
  { id: "doctor", from: 120, to: 210, label: "Meet your doctor" },
  { id: "availability", from: 210, to: 300, label: "Choose your time" },
  { id: "booking", from: 300, to: 360, label: "Plan your visit" },
  { id: "confirmation", from: 360, to: 420, label: "A little more clarity" },
  { id: "cta", from: 420, to: 450, label: "Your next moment of care" },
] as const;
export type PromoSceneId = (typeof promoScenes)[number]["id"];
