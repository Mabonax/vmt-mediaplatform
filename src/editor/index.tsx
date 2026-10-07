import React, {useEffect, useMemo, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import {Player, type PlayerRef} from "@remotion/player";
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

type CanvasGesture = {
  itemId: string;
  mode: "move" | "resize";
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
};

const App: React.FC = () => {
  const [project, setProject] = useState<WorkstationProject>(
    () => structuredClone(workstationDemoProject),
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>("browser");
  const [currentFrame, setCurrentFrame] = useState(0);
  const [gesture, setGesture] = useState<CanvasGesture | null>(null);
  const playerRef = useRef<PlayerRef>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => findItem(project, selectedItemId),
    [project, selectedItemId],
  );

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onFrameUpdate = (event: {detail: {frame: number}}) => {
      setCurrentFrame(event.detail.frame);
    };

    player.addEventListener("frameupdate", onFrameUpdate);
    return () => player.removeEventListener("frameupdate", onFrameUpdate);
  }, []);

  const durationSeconds = project.durationInFrames / project.fps;

  const patchTransform = (
    item: WorkstationItem,
    patch: Partial<WorkstationItem["transform"]>,
  ) => {
    setProject((current) => updateItemTransform(current, item.id, patch));
  };

  const activeCanvasItems = useMemo(() => {
    const items = project.tracks
      .filter((track) => track.visible && !track.locked)
      .flatMap((track) =>
        track.items
          .filter(
            (item) =>
              currentFrame >= item.timing.from &&
              currentFrame < item.timing.from + item.timing.durationInFrames,
          )
          .map((item) => ({track, item, active: true})),
      );

    if (
      selected &&
      !selected.track.locked &&
      !items.some(({item}) => item.id === selected.item.id)
    ) {
      items.push({...selected, active: false});
    }

    return items;
  }, [currentFrame, project, selected]);

  const beginCanvasGesture = (
    event: React.PointerEvent<HTMLDivElement>,
    item: WorkstationItem,
    mode: CanvasGesture["mode"],
  ) => {
    event.preventDefault();
    event.stopPropagation();
    playerRef.current?.pause();
    setSelectedItemId(item.id);
    event.currentTarget.setPointerCapture(event.pointerId);
    setGesture({
      itemId: item.id,
      mode,
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startX: item.transform.x,
      startY: item.transform.y,
      startWidth: item.transform.width,
      startHeight: item.transform.height,
    });
  };

  const updateCanvasGesture = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!gesture || event.pointerId !== gesture.pointerId) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    const bounds = overlay.getBoundingClientRect();
    const dx =
      ((event.clientX - gesture.startClientX) / Math.max(1, bounds.width)) *
      project.width;
    const dy =
      ((event.clientY - gesture.startClientY) / Math.max(1, bounds.height)) *
      project.height;

    if (gesture.mode === "move") {
      setProject((current) =>
        updateItemTransform(current, gesture.itemId, {
          x: Math.round(gesture.startX + dx),
          y: Math.round(gesture.startY + dy),
        }),
      );
      return;
    }

    setProject((current) =>
      updateItemTransform(current, gesture.itemId, {
        width: Math.max(8, Math.round(gesture.startWidth + dx)),
        height: Math.max(8, Math.round(gesture.startHeight + dy)),
      }),
    );
  };

  const endCanvasGesture = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!gesture || event.pointerId !== gesture.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setGesture(null);
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
          <span>{currentFrame}f</span>
          <button
            type="button"
            onClick={() => {
              setProject(structuredClone(workstationDemoProject));
              setSelectedItemId("browser");
              setCurrentFrame(0);
              playerRef.current?.seekTo(0);
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
            <span>Click, drag and resize layers directly on the canvas</span>
          </div>

          <div className="canvas-stage">
            <div
              className="player-editor-wrap"
              style={{aspectRatio: `${project.width} / ${project.height}`}}
            >
              <Player
                ref={playerRef}
                component={MotionProject}
                inputProps={project}
                durationInFrames={project.durationInFrames}
                fps={project.fps}
                compositionWidth={project.width}
                compositionHeight={project.height}
                controls
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />

              <div
                ref={overlayRef}
                className="canvas-overlay"
                aria-label="Composition editing overlay"
              >
                {activeCanvasItems.map(({item, active}, index) => {
                  const selectedNow = selectedItemId === item.id;
                  const t = item.transform;
                  return (
                    <div
                      key={item.id}
                      className={[
                        "canvas-hitbox",
                        selectedNow ? "selected" : "",
                        active ? "" : "inactive",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{
                        left: `${(t.x / project.width) * 100}%`,
                        top: `${(t.y / project.height) * 100}%`,
                        width: `${(t.width / project.width) * 100}%`,
                        height: `${(t.height / project.height) * 100}%`,
                        transform: `rotate(${t.rotation}deg) scale(${t.scale})`,
                        zIndex: 20 + index,
                      }}
                      onPointerDown={(event) =>
                        beginCanvasGesture(event, item, "move")
                      }
                      onPointerMove={updateCanvasGesture}
                      onPointerUp={endCanvasGesture}
                      onPointerCancel={endCanvasGesture}
                      onDoubleClick={(event) => {
                        event.stopPropagation();
                        playerRef.current?.seekTo(item.timing.from);
                        setCurrentFrame(item.timing.from);
                      }}
                    >
                      {selectedNow ? (
                        <>
                          <span className="canvas-selection-label">
                            {item.name}
                            {!active ? " · outside playhead" : ""}
                          </span>
                          <div
                            className="resize-handle resize-se"
                            title="Resize"
                            onPointerDown={(event) =>
                              beginCanvasGesture(event, item, "resize")
                            }
                            onPointerMove={updateCanvasGesture}
                            onPointerUp={endCanvasGesture}
                            onPointerCancel={endCanvasGesture}
                          />
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
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
                <button
                  className="seek-layer-button"
                  type="button"
                  onClick={() => {
                    playerRef.current?.seekTo(selected.item.timing.from);
                    setCurrentFrame(selected.item.timing.from);
                  }}
                >
                  Go to layer start
                </button>
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
            {currentFrame}f — {project.durationInFrames}f
          </span>
        </div>

        <div className="timeline-scroll">
          {[...project.tracks].reverse().map((track) => (
            <div className="timeline-track" key={track.id}>
              <div className="timeline-track-name">{track.name}</div>
              <div className="timeline-lane">
                <div
                  className="timeline-playhead"
                  style={{
                    left: `${(currentFrame / project.durationInFrames) * 100}%`,
                  }}
                />
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
                      onClick={() => {
                        setSelectedItemId(item.id);
                        if (
                          currentFrame < item.timing.from ||
                          currentFrame >=
                            item.timing.from + item.timing.durationInFrames
                        ) {
                          playerRef.current?.seekTo(item.timing.from);
                          setCurrentFrame(item.timing.from);
                        }
                      }}
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
