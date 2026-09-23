# DesignDNA

DNA describes a visual language. It is separate from content, tokens, spatial rules, motion and renderer state. Schemas validate numerical ranges and supported categorical values. The white palette is constrained to semantic token references, so a family cannot quietly invent a different background or brand palette.

| Group | Encoded attributes | Current rendering use |
| --- | --- | --- |
| Palette | Canvas, surface, foreground, accents, muted, contrast | White canvas and surfaces; source-aligned token colors |
| Typography | Families/categories, scale, weight, tracking, casing, line height, relationship | Serif/sans selection, scale, weight, tracking and line height |
| Layout | Grid, content width, alignment, asymmetry, whitespace, density, overlap, edge | Grid family, width, alignment, column proportion, inset/rules |
| Hierarchy | Relative headline, image, support, CTA, decoration, metadata importance | Recorded intent; current hierarchy also constrained by spatial priority and fixed role structure |
| Imagery | Placement, scale, crop, treatment, mask, foreground relation, facing | Side, contain sizing, arch/card/technical treatment |
| Shapes | Language, density, scale, repetition, position, stroke/fill | Rings/rules/grid, number, scaling, stroke and subject-only placement |
| Surfaces | Panels, cards, buttons, borders, shadows, treatment | Radius, button shape, border and shadow |
| Character | Expressive, friendly, dimensional, spacious, dynamic | Correlated controls below |

Not every descriptive field is an independently supported control. For example, arbitrary hierarchy permutations, overlap and glass rendering are not implemented. The schema excludes unsupported choices where they could imply executable behavior; descriptive categorical metadata is documented as intent. Future renderers should add executable semantics with tests before advertising those fields as controls.

`resolveComposition()` combines the family character with normalized user axes at equal weight, then blends applicable fine variation at equal weight. This retains a recognisable family even at axis extremes.

| Axis | Correlated effects |
| --- | --- |
| Expressive | Headline scale, image scale, shape count/opacity, CTA weight |
| Friendly | Radius, button corners, tracking, line height |
| Dimensional | Surface border and shadow offset/blur/opacity; clinical flat treatment retains its flat constraint |
| Spacious | Outer inset and internal gaps |
| Dynamic | Decorative rotation plus motion delay, duration, travel, parallax and intensity |

All values are bounded and deterministic. No random seeds, network responses, clock time or animation timers enter resolution. The retained theme status is `source-aligned`, not a claim that derived type/motion choices are an approved corporate manual.
