# VMT Motion Workstation

A Remotion-based motion authoring environment for ERP explainers, product walkthroughs, training media, social content and reusable branded compositions.

The repository began as a Dr Health motion project. Dr Health is now treated as a **sample brand/template**, not as the architectural centre of the system.

## Current direction

The new `Workstation/VMT-MotionProject` composition introduces a neutral editor-oriented model:

```text
Project
  -> Tracks
    -> Items
      -> timing
      -> transform
      -> motion
      -> content / style
```

Current neutral item types:

- text
- solid
- image
- ERP UI card
- browser/application window
- cursor + click pulse
- feature callout
- process-flow strip

This is the foundation for an After Effects-style authoring model where content is arranged as layers/tracks rather than hard-coded campaign scenes.

See [VMT Motion Workstation roadmap](docs/workstation-roadmap.md).

## Run locally on Windows

```powershell
npm.cmd ci
npm.cmd run studio
```

Open **Workstation → VMT-MotionProject** to inspect the neutral ERP explainer render composition.

## Product model

The product now has three explicit stages:

```text
Template Studio
      ↓
Motion Editor
      ↓
Multi-format Export
```

### Template Studio

The first screen is a template/style engine inspired by modern creative tools rather than a raw timeline.

It is responsible for:

- choosing a reusable motion template
- choosing the active composition format
- selecting several export targets at once
- starting from a blank project
- describing or referencing a visual style for future AI-assisted generation
- opening the result in the detailed motion editor

Built-in composition presets currently include:

- Landscape Full HD — 1920×1080 — 16:9
- Square — 1080×1080 — 1:1
- Vertical Full HD — 1080×1920 — 9:16

A project may target several formats. The long-term layout model is format-aware rather than requiring three separately maintained projects.

### Motion Editor

The workstation also has a standalone browser authoring shell built with `@remotion/player`.

Run:

```powershell
npm.cmd run editor
```

Then open:

```text
http://127.0.0.1:3102
```

The editor now includes:

- Remotion Player composition preview
- direct canvas selection, move, resize and anchor-point editing
- hierarchical parent/child groups and explicit z-order
- one timeline row per visual layer
- AE-style Transform disclosure under each layer
- Anchor Point, Position, Scale, Rotation and Opacity property rows
- per-property keyframes
- independent playhead ruler and frame stepping
- timeline clip move and trim
- sticky timeline ruler while layer/property rows scroll
- immutable edits against the same project model used by the renderer

The editor is intentionally separate from Remotion Studio. Studio remains the composition/render development environment; the VMT Motion Editor is the product-facing authoring workspace.

The legacy Dr Health compositions remain available under **Start-Here** and **Design-Grammar** while the workstation matures.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

## Remotion version

The repository has been upgraded to Remotion **4.0.533** for the core runtime/editor packages used by the current branch. Keep all `remotion` and `@remotion/*` packages on exactly the same version.

The next upgrade should be performed atomically with the lockfile so the project can adopt newer Studio/canvas features such as richer interactive editing and editable keyframes without leaving `package.json` and `package-lock.json` out of sync.

## Architecture

### Neutral workstation

- `src/workstation/schema.ts` — serializable project, track and item contracts
- `src/workstation/MotionProject.tsx` — generic Remotion renderer
- `src/workstation/defaults.ts` — ERP explainer starter project
- `src/AppRoot.tsx` — combines new workstation and legacy compositions

### Legacy/sample Dr Health system

- `src/brands/dr-health/`
- `public/brands/dr-health/`
- `src/engine/grammar/`
- `src/renderers/`

The long-term goal is to decouple brand-specific assets and design systems from the neutral authoring engine.

## Planned ERP explainer toolkit

The workstation roadmap includes:

- browser / device frames
- screenshots and screen recordings
- animated cursors and click indicators
- zoom-to-feature
- UI spotlight
- callout arrows
- table-row highlighting
- KPI counters
- workflow/process diagrams
- notification/toast animations
- lower thirds
- captions
- logo stings and end cards
- asset library
- keyframes
- multi-track timeline editing
- undo/redo
- presets
- project persistence

## Legacy Dr Health commands

These remain available during migration:

```powershell
npm.cmd run render:vertical
npm.cmd run render:square
npm.cmd run render:landscape
npm.cmd run verify:visual
npm.cmd run gallery
npm.cmd run verify:grammar
```

The project remains private/UNLICENSED. Bundled fonts include their licenses; Remotion licensing terms also apply.
