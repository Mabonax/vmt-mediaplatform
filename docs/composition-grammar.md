# Composition grammar

DNA states the visual character. `CompositionGrammar` states relationships: zones, maximum widths, priorities, follows edges, anchors, overlap policy, subject-relative shapes, responsive modes and asset requirements. These are separately validated records.

The current executor is intentionally a constrained flow graph:

```text
header / original logo
main
  copy: headline -> body -> CTA
  portrait: subject -> metadata
footer / illustrative appointment times
```

Body must follow headline; CTA must follow body; metadata must follow subject. The registry rejects incompatible/cyclic versions of this graph, duplicate family IDs, duplicate variants and mismatched ownership. It does not pretend to solve arbitrary constraint graphs. Priority and zone metadata preserve intended hierarchy; the renderer implements this supported role ordering rather than a general-purpose optimiser.

`split` places copy first; `portrait-first` reverses the main groups; `stacked` centers them in square/vertical. At 16:9, the centered variant resolves to a balanced row, retaining the landscape column constraint. Vertical always uses a stack. Column proportions, content widths, outer padding and gaps are resolved from DNA and axes. Container-relative units allow the exact same markup to render at native video resolution and within smaller React previews.

Header/main/footer occupy separate flow areas. Decorative shapes are clipped inside the subject region, behind imagery; they cannot cross into headline copy. Text wraps, long headlines receive a measured conservative size reduction and portrait assets use `contain` instead of an assumed crop.

## Asset compatibility

The subject rule requires a DrHealth person, transparency and an inward-facing preference. `resolveSubject()` works with the existing registry:

- Missing, unknown, wrong-type, wrong-brand or unapproved production portraits use initials derived from the content name.
- Opaque, outward-facing or landscape portraits use a contained frame and retain their original pixels.
- Compatible transparent portraits use the family treatment.
- Approved content never silently uses the development illustration. No person is auto-substituted for another practitioner.

Fallbacks do not mirror faces or logos. The original development illustration is labelled as fictional. Tests exercise all compatibility outcomes; the gallery's long-copy/missing-portrait fixture exposes the text fallback interactively.
