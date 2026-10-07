import React, {useMemo, useState} from "react";
import type {WorkstationProject} from "../workstation/schema";
import {
  compositionPresets,
  fitProjectToPreset,
  type CompositionPresetId,
} from "./composition-presets";
import {motionTemplates} from "./templates";

export const TemplateHome: React.FC<{
  onOpenProject: (project: WorkstationProject) => void;
}> = ({onOpenProject}) => {
  const [selectedTemplateId, setSelectedTemplateId] =
    useState("erp-explainer");
  const [selectedPresetId, setSelectedPresetId] =
    useState<CompositionPresetId>("landscape-1080");
  const [batchTargets, setBatchTargets] = useState<CompositionPresetId[]>([
    "landscape-1080",
    "square-1080",
    "vertical-1080",
  ]);
  const [referencePrompt, setReferencePrompt] = useState("");

  const template = useMemo(
    () =>
      motionTemplates.find((candidate) => candidate.id === selectedTemplateId) ??
      motionTemplates[0],
    [selectedTemplateId],
  );

  const toggleBatchTarget = (id: CompositionPresetId) => {
    setBatchTargets((current) =>
      current.includes(id)
        ? current.filter((candidate) => candidate !== id)
        : [...current, id],
    );
  };

  return (
    <div className="template-studio">
      <header className="template-header">
        <div>
          <div className="brand-kicker">VMT Motion</div>
          <h1>Template Studio</h1>
        </div>
        <div className="template-header-actions">
          <span>{batchTargets.length} export formats selected</span>
          <button
            type="button"
            className="primary-action"
            onClick={() =>
              onOpenProject(
                fitProjectToPreset(template.project, selectedPresetId),
              )
            }
          >
            Open in Editor
          </button>
        </div>
      </header>

      <div className="template-layout">
        <aside className="template-sidebar">
          <div className="template-sidebar-intro">
            <strong>Your creative toolkit</strong>
            <h2>A style for every story.</h2>
            <p>
              Start from a VMT template, a blank composition, or recreate a
              reference style with AI assistance.
            </p>
          </div>

          <div className="template-list-heading">
            <span>Template Library</span>
            <span>{motionTemplates.length}</span>
          </div>

          <div className="template-list">
            {motionTemplates.map((candidate) => (
              <button
                type="button"
                key={candidate.id}
                className={
                  selectedTemplateId === candidate.id
                    ? "template-card selected"
                    : "template-card"
                }
                onClick={() => setSelectedTemplateId(candidate.id)}
              >
                <div className="template-card-icon">
                  {candidate.id === "erp-explainer" ? "ERP" : "+"}
                </div>
                <div>
                  <strong>{candidate.name}</strong>
                  <span>{candidate.category}</span>
                  <p>{candidate.description}</p>
                </div>
              </button>
            ))}
          </div>

          <button type="button" className="save-style-button">
            + Save current style
          </button>
        </aside>

        <main className="template-preview-column">
          <div className="template-preview-toolbar">
            <div>
              <span className="live-dot" />
              Live preview
            </div>
            <span>
              {
                compositionPresets.find(
                  (preset) => preset.id === selectedPresetId,
                )?.name
              }
            </span>
          </div>

          <div className="template-preview-stage">
            <div
              className={[
                "format-preview-frame",
                selectedPresetId,
              ].join(" ")}
            >
              <div className="format-preview-content">
                <span>{template.category}</span>
                <strong>{template.name}</strong>
                <p>{template.description}</p>
              </div>
            </div>
          </div>

          <div className="template-preset-strip">
            {compositionPresets.map((preset) => (
              <button
                type="button"
                key={preset.id}
                className={
                  selectedPresetId === preset.id
                    ? "preset-chip selected"
                    : "preset-chip"
                }
                onClick={() => setSelectedPresetId(preset.id)}
              >
                <strong>{preset.shortName}</strong>
                <span>
                  {preset.width}×{preset.height} · {preset.aspectLabel}
                </span>
              </button>
            ))}
          </div>
        </main>

        <aside className="template-settings">
          <div className="template-tabs">
            <button type="button">Content</button>
            <button type="button" className="active">
              Style
            </button>
            <button type="button">Assets</button>
          </div>

          <section className="template-setting-section">
            <h3>Reference / AI direction</h3>
            <textarea
              value={referencePrompt}
              onChange={(event) => setReferencePrompt(event.target.value)}
              placeholder="Paste a style description or describe the reference you want recreated..."
            />
            <button type="button" className="secondary-action">
              Generate style draft
            </button>
          </section>

          <section className="template-setting-section">
            <h3>Edit format</h3>
            <div className="format-choice-grid">
              {compositionPresets.map((preset) => (
                <button
                  type="button"
                  key={preset.id}
                  className={
                    selectedPresetId === preset.id
                      ? "format-choice selected"
                      : "format-choice"
                  }
                  onClick={() => setSelectedPresetId(preset.id)}
                >
                  <span
                    className={[
                      "format-icon",
                      preset.id,
                    ].join(" ")}
                  />
                  <strong>{preset.aspectLabel}</strong>
                  <small>{preset.shortName}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="template-setting-section">
            <h3>Batch export targets</h3>
            <p className="settings-help">
              Keep several format variants attached to the same motion project.
            </p>
            <div className="batch-target-list">
              {compositionPresets.map((preset) => (
                <label key={preset.id} className="batch-target">
                  <input
                    type="checkbox"
                    checked={batchTargets.includes(preset.id)}
                    onChange={() => toggleBatchTarget(preset.id)}
                  />
                  <span>
                    <strong>{preset.shortName}</strong>
                    <small>
                      {preset.width}×{preset.height}
                    </small>
                  </span>
                </label>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};
