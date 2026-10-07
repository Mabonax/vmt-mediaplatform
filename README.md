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

Open **Workstation → VMT-MotionProject** to inspect the new neutral ERP explainer foundation.

The legacy Dr Health compositions remain available under **Start-Here** and **Design-Grammar** while the workstation matures.

## Verification

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd test
npm.cmd run build
```

## Remotion version

The repository is currently pinned to Remotion **4.0.527**. Keep all `remotion` and `@remotion/*` packages on exactly the same version.

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
