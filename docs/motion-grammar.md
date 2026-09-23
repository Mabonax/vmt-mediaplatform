# Motion grammar

Motion is independent of static composition. `MotionGrammar` records entrance, exit, duration, stagger, travel, parallax, spring physics and the semantic role order. Every family supports both implementations:

| Grammar | Behavior |
| --- | --- |
| subtle | Short fade/slide, small travel, copy first, no continuous parallax |
| premium | Spring/scale reveal, subject first, longer stagger, restrained subject parallax |

The same content, layout and DNA can use either grammar. Changing motion never changes asset identity or rearranges the static spatial relationships. `resolveMotion()` maps dynamic character to related timing/distance/intensity parameters. The Remotion adapter reuses existing `SlideIn`, `SpringReveal` and `Parallax` primitives and their frame/fps-derived functions. Both grammars fade out during the final 15 frames of a six-second example. White remains the canvas during exits.

`GrammarArtwork` has no Remotion imports. Motion is injected through role slots and an image adapter; the static renderer supplies identity slots and native images. Remotion injects `Img` and waits for the same local fonts. All timing is deterministic under out-of-order seeks; there are no CSS animations or wall-clock timers.

Verification samples initial, intermediate, settled and exit frames for both styles and asserts that an intermediate frame differs. Pure tests validate grammar data and correlated timing. The existing motion tests continue to assert bounded deterministic reveal progress. Exact screenshot repeat comparison uses a flat/subtle preset because blurred shadow rasterisation can differ by a few color levels across Chrome captures.

Only these two motion styles are advertised. Cinematic, energetic and arbitrary motion-graph authoring remain future extensions requiring intentional design and validation.
