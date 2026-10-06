# Using the DrHealth motion workspace

## Start one Studio

From `C:\xampp\htdocs\drhealth-motion`, run:

```powershell
npm.cmd run studio
```

Use only `http://localhost:3000`. The launcher stops with a clear message when port 3000 is already occupied, which prevents Remotion from silently creating another preview on a different port. Close an older preview before starting this one.

## Edit a composition

1. Open the **Start-Here** folder in the left sidebar.
2. Select **DrHealthServicePromo15-Vertical**, **Square** or **Landscape**.
3. Open **Props** in the right sidebar.
4. Edit **content** for wording, service, practitioner, practice, appointment times and CTA.
5. Edit **design** for the approved logo, fonts, colours, layout, placement, imagery and motion.
6. Scrub or play the timeline to review the whole 15-second composition.
7. Use the save button beside the props to write the chosen defaults back to `src/Root.tsx`.

The two available composition logos are:

- `wordmark`: the original `logo.png` DrHealth wordmark.
- `powered-by-gperp`: the original `drhealth.png` lockup.

The round application icon is intentionally unavailable in the composition controls.

The font selectors use the locally bundled Montserrat and Poppins files. The default canvas is white (`#FFFFFF`), with the logo-derived teal (`#005B6C`) and green (`#10BA31`). Colour fields open as colour controls in Studio.

`contentPosition`, `textAlign`, `contentOffsetX` and `contentOffsetY` control the shared placement of the scene content. `logoPosition` and `logoScale` control the persistent header logo.

## Export an MP4

1. Select the composition and finish editing its props.
2. Click **Render** in Remotion Studio.
3. Choose **H.264** and confirm the output filename.
4. Start the render and use **Reveal in Explorer** when it completes.

The command-line shortcuts remain available:

```powershell
npm.cmd run render:vertical
npm.cmd run render:square
npm.cmd run render:landscape
```

They write to `out/dr-health-vertical.mp4`, `out/dr-health-square.mp4` and `out/dr-health-landscape.mp4`.

## Ask for a new composition

Starting a genuinely new animation still happens through the coding agent because Remotion compositions are React components. A useful request includes the format, duration, message, logo, font, colours, placement and movement. For example:

> Create a 10-second vertical DrHealth service announcement. Use the powered-by-Gperp logo, a white background, Montserrat headings, Poppins body copy, a centred service card and subtle upward movement. Expose the message, colours, logo scale and placement in Studio.

Once created, the new composition appears in the left sidebar and its exposed values can be reused without editing code.

## Replace an approved logo export

The render-ready copies are in `public/brands/dr-health/logos`. The source clinic repository remains read-only. Replace a local export only with its approved original, then update `provenance.json` and run the project checks. Routine wording, colour and logo-choice changes should use Studio props instead of replacing files.
