import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import {Player} from "@remotion/player";
import {MotionProject} from "../workstation/MotionProject";
import {workstationDemoProject} from "../workstation/defaults";
import {
  moveItemInTime,
  trimItem,
  updateItemTransform,
} from "../workstation/mutations";
import type {
  WorkstationItem,
  WorkstationProject,
} from "../workstation/schema";
import "./editor.css";

const findItem = (project: WorkstationProject, itemId: string | null) => {
  if (!itemId) return null;
  for (const track of project.tracks) {
    const item = track.items.find((candidate) => candidate.id === itemId);
    if (item) return {track, item};
  }
  return null;
};

const numberValue = (value: string, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const NumericField: React.FC<{
  label: string;
  value: number;
  step?: number;
  min?: number;
  onChange: (value: number) => void;
}> = ({label, value, step = 1, min, onChange}) => (
  <label className="inspector-field">
    <span>{label}</span>
    <input
      type="number"
      value={value}
      step={step}
      min={min}
      onChange={(event) => onChange(numberValue(event.target.value, value))}
    />
  </label>
);

const App: React.FC = () => {
  const [project, setProject] = useState<WorkstationProject>(
    () => structuredClone(workstationDemoProject),
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>("browser");

  const selected = useMemo(
    () => findItem(project, selectedItemId),
    [project, selectedItemId],
  );

  const durationSeconds = project.durationInFrames / project.fps;

  const patchTransform = (
    item: WorkstationItem,
    patch: Partial<WorkstationItem["transform"]>,
  ) => {
    setProject((current) => updateItemTransform(current, item.id, patch));
  };

  return (
    <div className="editor-shell">
      <header className="topbar">
        <div>
          <div className="brand-kicker">VMT Motion</div>
          <div className="project-title">{project.name}</div>
        </div>
        <div className="topbar-meta">
          <span>{project.width}×{project.height}</span>
          <span>{project.fps} fps</span>
          <span>{durationSeconds.toFixed(1)} sec</span>
          <button
            type="button"
            onClick={() => {
              setProject(structuredClone(workstationDemoProject));
              setSelectedItemId("browser");
            }}
          >
            Reset demo
          </button>
        </div>
      </header>

      <main className="workspace">
        <aside className="layers-panel">
          <div className="panel-heading">
            <strong>Layers</strong>
            <span>{project.tracks.length} tracks</span>
          </div>

          <div className="track-list">
            {[...project.tracks].reverse().map((track) => (
              <section key={track.id} className="track-group">
                <div className="track-heading">
                  <span>{track.name}</span>
                  <span className="track-status">
                    {track.locked ? "Locked" : track.visible ? "Visible" : "Hidden"}
                  </span>
                </div>
                {[...track.items].reverse().map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    className={
                      selectedItemId === item.id
                        ? "layer-row selected"
                        : "layer-row"
                    }
                    onClick={() => setSelectedItemId(item.id)}
                  >
                    <span className="layer-type">{item.type}</span>
                    <span className="layer-name">{item.name}</span>
                  </button>
                ))}
              </section>
            ))}
          </div>
        </aside>

        <section className="canvas-column">
          <div className="canvas-toolbar">
            <span>Composition preview</span>
            <span>Click a layer or timeline block to edit it</span>
          </div>

          <div className="canvas-stage">
            <Player
              component={MotionProject}
              inputProps={project}
              durationInFrames={project.durationInFrames}
              fps={project.fps}
              compositionWidth={project.width}
              compositionHeight={project.height}
              controls
              style={{
                width: "100%",
                maxHeight: "100%",
                aspectRatio: `${project.width} / ${project.height}`,
              }}
            />
          </div>
        </section>

        <aside className="inspector-panel">
          <div className="panel-heading">
            <strong>Inspector</strong>
            <span>{selected?.item.type ?? "No selection"}</span>
          </div>

          {selected ? (
            <div className="inspector-content">
              <div className="selection-name">{selected.item.name}</div>
              <div className="selection-path">
                {selected.track.name} / {selected.item.id}
              </div>

              <div className="inspector-section">
                <div className="section-title">Transform</div>
                <div className="field-grid">
                  <NumericField
                    label="X"
                    value={selected.item.transform.x}
                    onChange={(value) =>
                      patchTransform(selected.item, {x: value})
                    }
                  />
                  <NumericField
                    label="Y"
                    value={selected.item.transform.y}
                    onChange={(value) =>
                      patchTransform(selected.item, {y: value})
                    }
                  />
                  <NumericField
                    label="Width"
                    value={selected.item.transform.width}
                    min={1}
                    onChange={(value) =>
                      patchTransform(selected.item, {
                        width: Math.max(1, value),
                      })
                    }
                  />
                  <NumericField
                    label="Height"
                    value={selected.item.transform.height}
                    min={1}
                    onChange={(value) =>
                      patchTransform(selected.item, {
                        height: Math.max(1, value),
                      })
                    }
                  />
                  <NumericField
                    label="Scale"
                    value={selected.item.transform.scale}
                    step={0.05}
                    min={0.01}
                    onChange={(value) =>
                      patchTransform(selected.item, {
                        scale: Math.max(0.01, value),
                      })
                    }
                  />
                  <NumericField
                    label="Rotation"
                    value={selected.item.transform.rotation}
                    step={1}
                    onChange={(value) =>
                      patchTransform(selected.item, {rotation: value})
                    }
                  />
                  <NumericField
                    label="Opacity"
                    value={selected.item.transform.opacity}
                    step={0.05}
                    min={0}
                    onChange={(value) =>
                      patchTransform(selected.item, {
                        opacity: Math.max(0, Math.min(1, value)),
                      })
                    }
                  />
                </div>
              </div>

              <div className="inspector-section">
                <div className="section-title">Timing</div>
                <div className="field-grid">
                  <NumericField
                    label="Start frame"
                    value={selected.item.timing.from}
                    min={0}
                    onChange={(value) =>
                      setProject((current) =>
                        moveItemInTime(
                          current,
                          selected.item.id,
                          Math.max(0, Math.round(value)),
                        ),
                      )
                    }
                  />
                  <NumericField
                    label="Duration"
                    value={selected.item.timing.durationInFrames}
                    min={1}
                    onChange={(value) =>
                      setProject((current) =>
                        trimItem(
                          current,
                          selected.item.id,
                          Math.max(1, Math.round(value)),
                        ),
                      )
                    }
                  />
                </div>
              </div>

              <div className="inspector-section">
                <div className="section-title">Animation</div>
                <div className="animation-summary">
                  {selected.item.animation
                    ? Object.entries(selected.item.animation)
                        .filter(([, points]) => points && points.length)
                        .map(([property, points]) => (
                          <div key={property} className="animation-row">
                            <span>{property}</span>
                            <strong>{points?.length ?? 0} keyframes</strong>
                          </div>
                        ))
                    : "No keyframes on this layer"}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-panel">Select a layer.</div>
          )}
        </aside>
      </main>

      <section className="timeline-panel">
        <div className="timeline-toolbar">
          <strong>Timeline</strong>
          <span>
            0f — {project.durationInFrames}f
          </span>
        </div>

        <div className="timeline-scroll">
          {[...project.tracks].reverse().map((track) => (
            <div className="timeline-track" key={track.id}>
              <div className="timeline-track-name">{track.name}</div>
              <div className="timeline-lane">
                {track.items.map((item) => {
                  const left =
                    (item.timing.from / project.durationInFrames) * 100;
                  const width =
                    (item.timing.durationInFrames /
                      project.durationInFrames) *
                    100;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      title={`${item.name}: ${item.timing.from}f → ${item.timing.from + item.timing.durationInFrames}f`}
                      className={
                        selectedItemId === item.id
                          ? "timeline-item selected"
                          : "timeline-item"
                      }
                      style={{
                        left: `${left}%`,
                        width: `${Math.max(width, 1.25)}%`,
                      }}
                      onClick={() => setSelectedItemId(item.id)}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const root = document.getElementById("root");
if (!root) throw new Error("Editor root element was not found");

createRoot(root).render(<App />);
