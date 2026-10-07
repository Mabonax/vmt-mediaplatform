import React, {useEffect, useMemo, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import {Player, type CallbackListener, type PlayerRef} from "@remotion/player";
import {MotionProject} from "../workstation/MotionProject";
import {workstationDemoProject} from "../workstation/defaults";
import {
  moveItemInTime,
  removeTransformKeyframe,
  setItemParent,
  setItemZIndex,
  setTransformKeyframe,
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

type HierarchyEntry = {
  item: WorkstationItem;
  depth: number;
};

const flattenHierarchy = (items: WorkstationItem[]): HierarchyEntry[] => {
  const children = new Map<string, WorkstationItem[]>();
  const roots: WorkstationItem[] = [];

  for (const item of items) {
    if (!item.parentId) {
      roots.push(item);
      continue;
    }
    const list = children.get(item.parentId) ?? [];
    list.push(item);
    children.set(item.parentId, list);
  }

  const sortTopFirst = (a: WorkstationItem, b: WorkstationItem) =>
    (b.zIndex ?? 0) - (a.zIndex ?? 0);

  const walk = (item: WorkstationItem, depth: number): HierarchyEntry[] => [
    {item, depth},
    ...(children.get(item.id) ?? [])
      .slice()
      .sort(sortTopFirst)
      .flatMap((child) => walk(child, depth + 1)),
  ];

  return roots
    .slice()
    .sort(sortTopFirst)
    .flatMap((item) => walk(item, 0));
};

const itemLabel = (item: WorkstationItem) =>
  item.type === "group" ? `▾ ${item.name}` : item.name;

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
  mode: "move" | "resize" | "anchor";
  pointerId: number;
  startClientX: number;
  startClientY: number;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startAnchorX: number;
  startAnchorY: number;
};

type TimelineGesture = {
  itemId: string;
  mode: "move" | "trim-start" | "trim-end";
  pointerId: number;
  startClientX: number;
  startFrom: number;
  startDuration: number;
  laneWidth: number;
};

type KeyframeProperty =
  | "anchorX"
  | "anchorY"
  | "x"
  | "y"
  | "scale"
  | "rotation"
  | "opacity";

const transformPropertyRows: Array<{
  id: string;
  label: string;
  channels: KeyframeProperty[];
}> = [
  {id: "anchor", label: "Anchor Point", channels: ["anchorX", "anchorY"]},
  {id: "position", label: "Position", channels: ["x", "y"]},
  {id: "scale", label: "Scale", channels: ["scale"]},
  {id: "rotation", label: "Rotation", channels: ["rotation"]},
  {id: "opacity", label: "Opacity", channels: ["opacity"]},
];

const App: React.FC = () => {
  const [project, setProject] = useState<WorkstationProject>(
    () => structuredClone(workstationDemoProject),
  );
  const [selectedItemId, setSelectedItemId] = useState<string | null>("browser");
  const [currentFrame, setCurrentFrame] = useState(0);
  const [gesture, setGesture] = useState<CanvasGesture | null>(null);
  const [timelineGesture, setTimelineGesture] =
    useState<TimelineGesture | null>(null);
  const [scrubPointerId, setScrubPointerId] = useState<number | null>(null);
  const [expandedTransforms, setExpandedTransforms] = useState<string[]>([
    "browser",
  ]);
  const playerRef = useRef<PlayerRef>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => findItem(project, selectedItemId),
    [project, selectedItemId],
  );

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const onFrameUpdate: CallbackListener<"frameupdate"> = (event) => {
      setCurrentFrame(event.detail.frame);
    };

    player.addEventListener("frameupdate", onFrameUpdate);
    return () => player.removeEventListener("frameupdate", onFrameUpdate);
  }, []);

  const durationSeconds = project.durationInFrames / project.fps;

  const seekToFrame = (frame: number) => {
    const nextFrame = Math.max(
      0,
      Math.min(project.durationInFrames - 1, Math.round(frame)),
    );
    playerRef.current?.pause();
    playerRef.current?.seekTo(nextFrame);
    setCurrentFrame(nextFrame);
  };

  const seekFromRulerPointer = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = Math.max(
      0,
      Math.min(1, (event.clientX - bounds.left) / Math.max(1, bounds.width)),
    );
    seekToFrame(ratio * (project.durationInFrames - 1));
  };

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
      startAnchorX: item.transform.anchorX ?? item.transform.width / 2,
      startAnchorY: item.transform.anchorY ?? item.transform.height / 2,
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

    if (gesture.mode === "anchor") {
      setProject((current) =>
        updateItemTransform(current, gesture.itemId, {
          anchorX: Math.round(gesture.startAnchorX + dx),
          anchorY: Math.round(gesture.startAnchorY + dy),
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

  const beginTimelineGesture = (
    event: React.PointerEvent<HTMLElement>,
    item: WorkstationItem,
    mode: TimelineGesture["mode"],
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const lane = event.currentTarget.closest(".timeline-lane");
    if (!(lane instanceof HTMLElement)) return;

    playerRef.current?.pause();
    setSelectedItemId(item.id);
    event.currentTarget.setPointerCapture(event.pointerId);
    setTimelineGesture({
      itemId: item.id,
      mode,
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startFrom: item.timing.from,
      startDuration: item.timing.durationInFrames,
      laneWidth: Math.max(1, lane.getBoundingClientRect().width),
    });
  };

  const updateTimelineGesture = (
    event: React.PointerEvent<HTMLElement>,
  ) => {
    if (!timelineGesture || event.pointerId !== timelineGesture.pointerId) return;

    const deltaFrames = Math.round(
      ((event.clientX - timelineGesture.startClientX) /
        timelineGesture.laneWidth) *
        project.durationInFrames,
    );

    if (timelineGesture.mode === "move") {
      const maxFrom = Math.max(
        0,
        project.durationInFrames - timelineGesture.startDuration,
      );
      const nextFrom = Math.max(
        0,
        Math.min(maxFrom, timelineGesture.startFrom + deltaFrames),
      );
      setProject((current) =>
        moveItemInTime(current, timelineGesture.itemId, nextFrom),
      );
      return;
    }

    if (timelineGesture.mode === "trim-end") {
      const maxDuration =
        project.durationInFrames - timelineGesture.startFrom;
      const nextDuration = Math.max(
        1,
        Math.min(
          maxDuration,
          timelineGesture.startDuration + deltaFrames,
        ),
      );
      setProject((current) =>
        trimItem(current, timelineGesture.itemId, nextDuration),
      );
      return;
    }

    const originalEnd =
      timelineGesture.startFrom + timelineGesture.startDuration;
    const nextFrom = Math.max(
      0,
      Math.min(originalEnd - 1, timelineGesture.startFrom + deltaFrames),
    );
    const nextDuration = originalEnd - nextFrom;
    setProject((current) => {
      const moved = moveItemInTime(current, timelineGesture.itemId, nextFrom);
      return trimItem(moved, timelineGesture.itemId, nextDuration);
    });
  };

  const endTimelineGesture = (
    event: React.PointerEvent<HTMLElement>,
  ) => {
    if (!timelineGesture || event.pointerId !== timelineGesture.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setTimelineGesture(null);
  };

  const setKeyframeAtPlayhead = (
    item: WorkstationItem,
    property: KeyframeProperty,
  ) => {
    const localFrame = currentFrame - item.timing.from;
    if (localFrame < 0 || localFrame >= item.timing.durationInFrames) return;

    setProject((current) =>
      setTransformKeyframe(current, item.id, property, {
        frame: localFrame,
        value: item.transform[property],
        easing: "ease-in-out",
      }),
    );
  };

  const removeKeyframeAtPlayhead = (
    item: WorkstationItem,
    property: KeyframeProperty,
  ) => {
    const localFrame = currentFrame - item.timing.from;
    if (localFrame < 0 || localFrame >= item.timing.durationInFrames) return;
    setProject((current) =>
      removeTransformKeyframe(current, item.id, property, localFrame),
    );
  };

  const channelValue = (
    item: WorkstationItem,
    property: KeyframeProperty,
  ) => {
    if (property === "anchorX")
      return item.transform.anchorX ?? item.transform.width / 2;
    if (property === "anchorY")
      return item.transform.anchorY ?? item.transform.height / 2;
    return item.transform[property];
  };

  const setPropertyKeyframeAtPlayhead = (
    item: WorkstationItem,
    channels: KeyframeProperty[],
  ) => {
    const localFrame = currentFrame - item.timing.from;
    if (localFrame < 0 || localFrame >= item.timing.durationInFrames) return;
    setProject((current) =>
      channels.reduce(
        (next, channel) =>
          setTransformKeyframe(next, item.id, channel, {
            frame: localFrame,
            value: channelValue(item, channel),
            easing: "ease-in-out",
          }),
        current,
      ),
    );
  };

  const removePropertyKeyframeAtPlayhead = (
    item: WorkstationItem,
    channels: KeyframeProperty[],
  ) => {
    const localFrame = currentFrame - item.timing.from;
    if (localFrame < 0 || localFrame >= item.timing.durationInFrames) return;
    setProject((current) =>
      channels.reduce(
        (next, channel) =>
          removeTransformKeyframe(next, item.id, channel, localFrame),
        current,
      ),
    );
  };

  const toggleTransformDisclosure = (itemId: string) => {
    setExpandedTransforms((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId],
    );
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
              seekToFrame(0);
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
                {flattenHierarchy(track.items).map(({item, depth}) => (
                  <button
                    type="button"
                    key={item.id}
                    className={
                      selectedItemId === item.id
                        ? "layer-row selected"
                        : "layer-row"
                    }
                    style={{paddingLeft: 12 + depth * 16}}
                    onClick={() => setSelectedItemId(item.id)}
                  >
                    <span className="layer-type">{item.type}</span>
                    <span className="layer-name">{itemLabel(item)}</span>
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
                        transformOrigin: `${t.anchorX ?? t.width / 2}px ${t.anchorY ?? t.height / 2}px`,
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
                        seekToFrame(item.timing.from);
                      }}
                    >
                      {selectedNow ? (
                        <>
                          <span className="canvas-selection-label">
                            {item.name}
                            {!active ? " · outside playhead" : ""}
                          </span>
                          <div
                            className="anchor-handle"
                            title="Anchor Point"
                            style={{
                              left: `${((t.anchorX ?? t.width / 2) / t.width) * 100}%`,
                              top: `${((t.anchorY ?? t.height / 2) / t.height) * 100}%`,
                            }}
                            onPointerDown={(event) =>
                              beginCanvasGesture(event, item, "anchor")
                            }
                            onPointerMove={updateCanvasGesture}
                            onPointerUp={endCanvasGesture}
                            onPointerCancel={endCanvasGesture}
                          >
                            <span />
                          </div>
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
                    label="Anchor X"
                    value={
                      selected.item.transform.anchorX ??
                      selected.item.transform.width / 2
                    }
                    onChange={(value) =>
                      patchTransform(selected.item, {anchorX: value})
                    }
                  />
                  <NumericField
                    label="Anchor Y"
                    value={
                      selected.item.transform.anchorY ??
                      selected.item.transform.height / 2
                    }
                    onChange={(value) =>
                      patchTransform(selected.item, {anchorY: value})
                    }
                  />
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
                <div className="section-title">Hierarchy</div>
                <label className="inspector-field hierarchy-field">
                  <span>Parent group</span>
                  <select
                    value={selected.item.parentId ?? ""}
                    onChange={(event) =>
                      setProject((current) =>
                        setItemParent(
                          current,
                          selected.item.id,
                          event.target.value || null,
                        ),
                      )
                    }
                  >
                    <option value="">None</option>
                    {project.tracks
                      .flatMap((track) => track.items)
                      .filter(
                        (item) =>
                          item.type === "group" &&
                          item.id !== selected.item.id,
                      )
                      .map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                  </select>
                </label>
                <NumericField
                  label="Z order"
                  value={selected.item.zIndex ?? 0}
                  step={1}
                  onChange={(value) =>
                    setProject((current) =>
                      setItemZIndex(
                        current,
                        selected.item.id,
                        Math.round(value),
                      ),
                    )
                  }
                />
                <div className="hierarchy-help">
                  Higher Z values render above lower values. Parenting lets the
                  group transform affect the child while the child keeps its own
                  animation.
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
                    seekToFrame(selected.item.timing.from);
                  }}
                >
                  Go to layer start
                </button>
              </div>

              <div className="inspector-section">
                <div className="section-title">Animation</div>
                <div className="keyframe-editor">
                  {transformPropertyRows.map((propertyRow) => {
                    const localFrame =
                      currentFrame - selected.item.timing.from;
                    const inRange =
                      localFrame >= 0 &&
                      localFrame < selected.item.timing.durationInFrames;
                    const pointCount = propertyRow.channels.reduce(
                      (sum, channel) =>
                        sum +
                        (selected.item.animation?.[channel]?.length ?? 0),
                      0,
                    );
                    const hasCurrent = propertyRow.channels.every((channel) =>
                      (selected.item.animation?.[channel] ?? []).some(
                        (point) => point.frame === localFrame,
                      ),
                    );

                    return (
                      <div
                        className="keyframe-property-row"
                        key={propertyRow.id}
                      >
                        <div>
                          <strong>{propertyRow.label}</strong>
                          <span>{pointCount} channel keyframes</span>
                        </div>
                        <div className="keyframe-actions">
                          <button
                            type="button"
                            disabled={!inRange}
                            title="Add or replace keyframe at playhead"
                            onClick={() =>
                              setPropertyKeyframeAtPlayhead(
                                selected.item,
                                propertyRow.channels,
                              )
                            }
                          >
                            ◆+
                          </button>
                          <button
                            type="button"
                            disabled={!inRange || !hasCurrent}
                            title="Remove keyframe at playhead"
                            onClick={() =>
                              removePropertyKeyframeAtPlayhead(
                                selected.item,
                                propertyRow.channels,
                              )
                            }
                          >
                            ◆−
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="keyframe-help">
                  The same Transform properties are available directly below
                  each layer in the timeline.
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
          <div className="timeline-transport">
            <button
              type="button"
              title="Previous frame"
              onClick={() => seekToFrame(currentFrame - 1)}
            >
              −1f
            </button>
            <label className="frame-field">
              <span>Frame</span>
              <input
                type="number"
                min={0}
                max={project.durationInFrames - 1}
                value={currentFrame}
                onChange={(event) =>
                  seekToFrame(numberValue(event.target.value, currentFrame))
                }
              />
            </label>
            <button
              type="button"
              title="Next frame"
              onClick={() => seekToFrame(currentFrame + 1)}
            >
              +1f
            </button>
            <span>{(currentFrame / project.fps).toFixed(2)} sec</span>
          </div>
        </div>

        <div className="timeline-scroll">
          <div className="timeline-ruler-row">
            <div className="timeline-ruler-label">Playhead</div>
            <div
              className="timeline-ruler"
              role="slider"
              aria-label="Timeline playhead"
              aria-valuemin={0}
              aria-valuemax={project.durationInFrames - 1}
              aria-valuenow={currentFrame}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  seekToFrame(currentFrame - (event.shiftKey ? 10 : 1));
                }
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  seekToFrame(currentFrame + (event.shiftKey ? 10 : 1));
                }
              }}
              onPointerDown={(event) => {
                event.preventDefault();
                playerRef.current?.pause();
                event.currentTarget.setPointerCapture(event.pointerId);
                setScrubPointerId(event.pointerId);
                seekFromRulerPointer(event);
              }}
              onPointerMove={(event) => {
                if (scrubPointerId === event.pointerId) {
                  seekFromRulerPointer(event);
                }
              }}
              onPointerUp={(event) => {
                if (scrubPointerId !== event.pointerId) return;
                seekFromRulerPointer(event);
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                  event.currentTarget.releasePointerCapture(event.pointerId);
                }
                setScrubPointerId(null);
              }}
              onPointerCancel={() => setScrubPointerId(null)}
            >
              {Array.from({length: 13}, (_, index) => {
                const frame = Math.round(
                  (index / 12) * (project.durationInFrames - 1),
                );
                return (
                  <div
                    className="timeline-ruler-tick"
                    key={index}
                    style={{left: `${(index / 12) * 100}%`}}
                  >
                    <span>{frame}</span>
                  </div>
                );
              })}
              <div
                className="timeline-ruler-playhead"
                style={{
                  left: `${(currentFrame / (project.durationInFrames - 1)) * 100}%`,
                }}
              />
            </div>
          </div>
          {[...project.tracks].reverse().flatMap((track) => {
            const rows = flattenHierarchy(track.items);
            return [
              <div className="timeline-section-row" key={`${track.id}-section`}>
                <div className="timeline-section-name">{track.name}</div>
                <div className="timeline-section-line" />
              </div>,
              ...rows.flatMap(({item, depth}) => {
                const left =
                  (item.timing.from / project.durationInFrames) * 100;
                const width =
                  (item.timing.durationInFrames /
                    project.durationInFrames) *
                  100;
                const expanded = expandedTransforms.includes(item.id);
                const localFrame = currentFrame - item.timing.from;
                const inRange =
                  localFrame >= 0 &&
                  localFrame < item.timing.durationInFrames;

                const layerRow = (
                  <div
                    className={
                      item.type === "group"
                        ? "timeline-track timeline-group-row"
                        : "timeline-track"
                    }
                    key={item.id}
                  >
                    <div
                      className="timeline-track-name"
                      style={{paddingLeft: 12 + depth * 16}}
                    >
                      <button
                        type="button"
                        className="timeline-disclosure"
                        title="Show Transform properties"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleTransformDisclosure(item.id);
                        }}
                      >
                        {expanded ? "▾" : "▸"}
                      </button>
                      <span className="timeline-layer-type">{item.type}</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="timeline-lane">
                      <div
                        className="timeline-playhead"
                        style={{
                          left: `${(currentFrame / project.durationInFrames) * 100}%`,
                        }}
                      />
                      <button
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
                            seekToFrame(item.timing.from);
                          }
                        }}
                        onPointerDown={(event) =>
                          beginTimelineGesture(event, item, "move")
                        }
                        onPointerMove={updateTimelineGesture}
                        onPointerUp={endTimelineGesture}
                        onPointerCancel={endTimelineGesture}
                      >
                        <span
                          className="timeline-trim-handle trim-left"
                          title="Trim start"
                          onPointerDown={(event) =>
                            beginTimelineGesture(event, item, "trim-start")
                          }
                          onPointerMove={updateTimelineGesture}
                          onPointerUp={endTimelineGesture}
                          onPointerCancel={endTimelineGesture}
                        />
                        <span className="timeline-item-label">{item.name}</span>
                        <span
                          className="timeline-trim-handle trim-right"
                          title="Trim end"
                          onPointerDown={(event) =>
                            beginTimelineGesture(event, item, "trim-end")
                          }
                          onPointerMove={updateTimelineGesture}
                          onPointerUp={endTimelineGesture}
                          onPointerCancel={endTimelineGesture}
                        />
                      </button>
                    </div>
                  </div>
                );

                const propertyRows = expanded
                  ? transformPropertyRows.map((propertyRow) => {
                      const allPoints = propertyRow.channels.flatMap(
                        (channel) =>
                          (item.animation?.[channel] ?? []).map((point) => ({
                            channel,
                            point,
                          })),
                      );
                      const hasCurrent = propertyRow.channels.every((channel) =>
                        (item.animation?.[channel] ?? []).some(
                          (point) => point.frame === localFrame,
                        ),
                      );
                      const values = propertyRow.channels
                        .map((channel) =>
                          Number(channelValue(item, channel).toFixed(2)),
                        )
                        .join(", ");

                      return (
                        <div
                          className="timeline-property-row"
                          key={`${item.id}-${propertyRow.id}`}
                        >
                          <div
                            className="timeline-property-name"
                            style={{paddingLeft: 42 + depth * 16}}
                          >
                            <button
                              type="button"
                              className={
                                hasCurrent
                                  ? "property-keyframe-button active"
                                  : "property-keyframe-button"
                              }
                              title={
                                hasCurrent
                                  ? "Remove keyframe at playhead"
                                  : "Add keyframe at playhead"
                              }
                              disabled={!inRange}
                              onClick={() =>
                                hasCurrent
                                  ? removePropertyKeyframeAtPlayhead(
                                      item,
                                      propertyRow.channels,
                                    )
                                  : setPropertyKeyframeAtPlayhead(
                                      item,
                                      propertyRow.channels,
                                    )
                              }
                            >
                              ◆
                            </button>
                            <span>{propertyRow.label}</span>
                            <span className="timeline-property-value">
                              {values}
                            </span>
                          </div>
                          <div className="timeline-property-lane">
                            <div
                              className="timeline-playhead"
                              style={{
                                left: `${(currentFrame / project.durationInFrames) * 100}%`,
                              }}
                            />
                            {allPoints.map(({channel, point}, pointIndex) => (
                              <button
                                type="button"
                                className="timeline-property-keyframe"
                                key={`${channel}-${pointIndex}`}
                                title={`${propertyRow.label} · ${channel} @ ${item.timing.from + point.frame}f`}
                                style={{
                                  left: `${((item.timing.from + point.frame) / project.durationInFrames) * 100}%`,
                                }}
                                onClick={() =>
                                  seekToFrame(item.timing.from + point.frame)
                                }
                              />
                            ))}
                          </div>
                        </div>
                      );
                    })
                  : [];

                return [layerRow, ...propertyRows];
              }),
            ];
          })}
        </div>
      </section>
    </div>
  );
};

const root = document.getElementById("root");
if (!root) throw new Error("Editor root element was not found");

createRoot(root).render(<App />);
