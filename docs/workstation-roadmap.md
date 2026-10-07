# VMT Motion Workstation

## Objective

Turn this repository from a Dr Health-specific Remotion project into a reusable motion-authoring environment for ERP explainers, product promos, UI walkthroughs, social content and training media.

Dr Health remains a sample brand/template. It is no longer the architectural centre of the system.

## Authoring model

The neutral model is:

```text
Project
  -> Tracks
    -> Items
      -> timing
      -> transform
      -> content
      -> styling/effects
```

This mirrors a conventional NLE / motion graphics mental model while remaining serializable and render-safe.

## Phase 1 — neutral project model

Implemented on the `codex/general-motion-workstation` branch:

- generic project/track/item schema
- text, solid, image and ERP UI-card item types
- frame-based timing
- transform data for position, scale, rotation, size and opacity
- reusable Remotion renderer
- neutral ERP explainer demo

## Phase 2 — modern Remotion Studio authoring

Upgrade all Remotion packages in lockstep from 4.0.527 to the current pinned version, then adopt the newer Studio authoring capabilities:

- interactive canvas elements
- timeline editing gestures
- keyframes
- effects
- visual controls
- Browse Elements / reusable element libraries
- Studio codemods for add/delete/duplicate/reorder/update operations

The goal is to make common edits happen visually in Studio instead of through giant JSON prop forms.

## Phase 3 — brand packs

Create independent brand packs:

```text
src/brands/
  dr-health/
  yaw/
  khita/
  program-of-action/
  ab4ir/
  vmt/
```

Each pack should provide logos, fonts, colours, UI screenshots, media and reusable scene elements without changing the neutral workstation engine.

## Phase 4 — ERP explainer toolkit

Add reusable elements tailored to VMT's products:

- browser/window/device frames
- cursor and click indicators
- dashboard spotlight
- zoom-to-feature
- table row highlight
- KPI counter
- process flow
- before/after comparison
- callout arrows
- notification/toast
- role/user badges
- captions and lower thirds
- logo sting / end card

## Phase 5 — After Effects-like workspace

Build or adopt a richer timeline UI around Remotion Player if Studio alone does not cover the desired workflow:

- multi-track drag/drop
- trim handles
- snapping
- zoomable timeline
- layer reorder
- asset bin
- inspector
- undo/redo
- copy/paste
- keyboard shortcuts
- presets
- project persistence

Remotion's official Timeline and Editor Starter should be evaluated before duplicating those capabilities.

## Non-goals

- Dr Health-specific data must not leak into the neutral engine.
- A scene template is not the editor data model.
- Brand palettes must not be hard-coded in `src/engine` or `src/workstation`.
- Live ERP APIs should not be called during deterministic rendering. Export snapshots/assets first.
