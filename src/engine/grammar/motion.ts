import {
  motionGrammarSchema,
  type MotionGrammar,
  type ElementRole,
} from "./models";

export const motionGrammars: Readonly<
  Record<MotionGrammar["id"], MotionGrammar>
> = {
  subtle: motionGrammarSchema.parse({
    id: "subtle",
    name: "Subtle / quiet sequence",
    entrance: "fade-slide",
    exit: "fade",
    duration: 0.6,
    stagger: 0.09,
    travel: 18,
    parallax: 0,
    spring: { damping: 30, stiffness: 100, mass: 1, overshootClamping: true },
    order: ["headline", "body", "subject", "metadata", "cta"],
  }),
  premium: motionGrammarSchema.parse({
    id: "premium",
    name: "Premium / layered reveal",
    entrance: "spring-scale",
    exit: "fade",
    duration: 1.05,
    stagger: 0.16,
    travel: 48,
    parallax: 8,
    spring: { damping: 24, stiffness: 110, mass: 1, overshootClamping: true },
    order: ["subject", "headline", "body", "metadata", "cta"],
  }),
};
export function resolveMotion(
  grammar: MotionGrammar,
  dynamic: number,
  role: ElementRole,
) {
  const index = grammar.order.indexOf(role);
  return {
    delay: index * grammar.stagger * (1.15 - dynamic * 0.3),
    duration: grammar.duration * (1.15 - dynamic * 0.3),
    distance: grammar.travel * (0.5 + dynamic),
    parallax: grammar.parallax * dynamic,
    intensity: 0.25 + dynamic * 0.65,
  };
}
