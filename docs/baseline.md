# Baseline — 22 September 2026

Inspected before implementation in `C:\xampp\htdocs\drhealth-motion`.

- Git: `main`, initial commit `069d4e5` (`Create new Remotion video`). Only pre-existing untracked file: `package-lock.json`; no tracked edits. Command-scoped `-c safe.directory=C:/xampp/htdocs/drhealth-motion` required by this sandbox's different Windows account. No global Git configuration changed.
- Remotion CLI/core/Tailwind integration/ESLint preset: **4.0.527**. React/React DOM **19.2.3**, TypeScript **5.9.3**, Tailwind **4.0.0**, ESLint **9.19.0**. Node **24.16.0**.
- Strict TypeScript, no emit, unused-local checks; flat Remotion ESLint config. Rspack bundler and Tailwind integration already enabled.
- `src/index.ts` registers `Root.tsx`; `Composition.tsx` registers a blank `MyComp`, 1280×720, 30 fps, 60 frames. No actual design work to preserve. `public/` empty; no authoritative logo, palette, photography, typography, audio or brand guidelines.
- Existing scripts: `dev`, `build`, `upgrade`, `lint` (ESLint followed by TypeScript). No test suite.
- Baseline ESLint and TypeScript passed (also run directly through Node). `npm.cmd run build` passed. CLI composition discovery using installed Chrome passed and returned `MyComp`. The installation is valid and runnable.
- Existing npm wrapper/first bundle had a slow startup on this machine; direct Node CLI invocation was also verified. No dependency upgrade was needed.

The blank starter registration will be replaced by the requested three compositions; its unused source is retained as a starter reference. The existing lockfile is adopted and updated only for explicitly declared dependencies already present in the installation.
