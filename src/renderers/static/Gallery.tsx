import { useState } from "react";
import { grammarDefaults } from "../../brands/dr-health/grammar/defaults";
import { familyRegistry } from "../../brands/dr-health/grammar/families";
import {
  resolveComposition,
  type GrammarFormat,
} from "../../engine/grammar/resolve";
import type { FamilyId, GrammarPromoProps } from "../../engine/grammar/models";
import { GrammarArtwork, OriginalLogo } from "../shared/GrammarArtwork";
import { BookingDemo } from "./BookingDemo";

export function Gallery() {
  const [props, setProps] = useState(grammarDefaults());
  const [format, setFormat] = useState<GrammarFormat>("square");
  const [view, setView] = useState<"gallery" | "booking">("gallery");
  const [comparison, setComparison] = useState(false);
  const r = resolveComposition(props, format);
  const ratio =
    format === "vertical" ? "9 / 16" : format === "landscape" ? "16 / 9" : "1";
  return (
    <div className="gallery">
      <header className="gallery-header">
        <OriginalLogo />
        <span className="gallery-title">
          Design studies <span>/ 01</span>
        </span>
        <nav aria-label="Preview mode">
          <button
            aria-pressed={view === "gallery"}
            onClick={() => setView("gallery")}
          >
            Composition gallery
          </button>
          <button
            aria-pressed={view === "booking"}
            onClick={() => setView("booking")}
          >
            Booking UI experiment
          </button>
        </nav>
      </header>
      {view === "booking" ? (
        <BookingDemo
          resolved={resolveComposition(
            { ...props, familyId: "minimal-clinical" },
            "landscape",
          )}
        />
      ) : (
        <>
          <div className="intro">
            <p className="eyebrow">ONE BRAND. MULTIPLE EXPRESSIONS.</p>
            <h1>Care, consistently expressed.</h1>
            <p>
              The same content and original assets, composed three ways. White
              backgrounds throughout.
            </p>
          </div>
          <div className="gallery-workspace">
            <aside className="controls">
              <h2>Composition controls</h2>
              <label>
                Composition family
                <select
                  value={props.familyId}
                  onChange={(e) => {
                    const id = e.target.value as FamilyId;
                    setProps({
                      ...props,
                      familyId: id,
                      axes: familyRegistry.get(id).reference.designDNA
                        .character,
                    });
                  }}
                >
                  {familyRegistry.all.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.reference.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Layout variation
                <select
                  value={props.variation.layoutVariant}
                  onChange={(e) =>
                    setProps({
                      ...props,
                      variation: {
                        ...props.variation,
                        layoutVariant: e.target
                          .value as GrammarPromoProps["variation"]["layoutVariant"],
                      },
                    })
                  }
                >
                  <option value="split">Copy first</option>
                  <option value="portrait-first">Portrait first</option>
                  <option value="stacked">Centered stack</option>
                </select>
              </label>
              <label>
                Aspect ratio
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as GrammarFormat)}
                >
                  <option value="square">1:1 / Square</option>
                  <option value="vertical">9:16 / Vertical</option>
                  <option value="landscape">16:9 / Landscape</option>
                </select>
              </label>
              <label>
                Content example
                <select
                  value={
                    props.content.doctor.imageAssetId
                      ? "standard"
                      : "long-missing"
                  }
                  onChange={(e) => {
                    const content = grammarDefaults().content;
                    if (e.target.value === "long-missing") {
                      content.doctor.name =
                        "Dr Alexandria Nomthandazo-Mahlangu";
                      content.service.name =
                        "Comprehensive General Consultation";
                      content.copy.brandHeadline =
                        "Care and appointments at your connected clinic.";
                      delete content.doctor.imageAssetId;
                      content.availability = [
                        "08:00",
                        "10:00",
                        "13:30",
                        "16:00",
                      ];
                    }
                    setProps({ ...props, content });
                  }}
                >
                  <option value="standard">Standard demo</option>
                  <option value="long-missing">
                    Long copy / missing portrait
                  </option>
                </select>
              </label>
              <fieldset>
                <legend>Design axes</legend>
                {(
                  Object.keys(props.axes) as Array<keyof typeof props.axes>
                ).map((axis) => (
                  <label key={axis}>
                    {axis}
                    <output>{props.axes[axis].toFixed(2)}</output>
                    <input
                      aria-label={axis}
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={props.axes[axis]}
                      onChange={(e) =>
                        setProps({
                          ...props,
                          axes: {
                            ...props.axes,
                            [axis]: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </label>
                ))}
              </fieldset>
              <fieldset>
                <legend>Fine variation</legend>
                {(
                  [
                    "typographyScale",
                    "imageScale",
                    "whitespace",
                    "shapeDensity",
                    "depth",
                    "expressiveness",
                  ] as const
                ).map((key) => (
                  <label key={key}>
                    {key}
                    <output>{props.variation[key].toFixed(2)}</output>
                    <input
                      aria-label={key}
                      type="range"
                      min={key.endsWith("Scale") ? 0.85 : 0}
                      max={
                        key === "imageScale"
                          ? 1.15
                          : key === "typographyScale"
                            ? 1.1
                            : 1
                      }
                      step="0.05"
                      value={props.variation[key]}
                      onChange={(e) =>
                        setProps({
                          ...props,
                          variation: {
                            ...props.variation,
                            [key]: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </label>
                ))}
              </fieldset>
              <button
                onClick={() => setComparison(!comparison)}
                aria-pressed={comparison}
              >
                {comparison ? "Single composition" : "Compare three families"}
              </button>
              <button onClick={() => setProps(grammarDefaults(props.familyId))}>
                Reset family defaults
              </button>
              <p className="muted">
                Static React preview. Motion alternatives are available in
                Remotion Studio under “Design-Grammar”.
              </p>
            </aside>
            <div
              className={
                comparison ? "preview-area comparison" : "preview-area"
              }
            >
              {(comparison
                ? familyRegistry.all.map((f) => f.id)
                : [props.familyId]
              ).map((id) => (
                <figure key={id}>
                  <div
                    className="composition-preview"
                    style={{
                      aspectRatio: ratio,
                      maxWidth: format === "vertical" ? 480 : undefined,
                    }}
                  >
                    <GrammarArtwork
                      resolved={resolveComposition(
                        { ...props, familyId: id },
                        format,
                      )}
                    />
                  </div>
                  <figcaption>
                    {familyRegistry.get(id).reference.name} ·{" "}
                    {props.variation.layoutVariant} · {format}
                  </figcaption>
                </figure>
              ))}
              <p className="muted">{r.family.reference.source.license}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
