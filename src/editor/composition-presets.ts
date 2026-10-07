import type {WorkstationProject} from "../workstation/schema";

export type CompositionPresetId =
  | "landscape-1080"
  | "square-1080"
  | "vertical-1080";

export type CompositionPreset = {
  id: CompositionPresetId;
  name: string;
  shortName: string;
  width: number;
  height: number;
  aspectLabel: string;
  useCase: string;
};

export const compositionPresets: CompositionPreset[] = [
  {
    id: "landscape-1080",
    name: "Landscape Full HD",
    shortName: "Landscape",
    width: 1920,
    height: 1080,
    aspectLabel: "16:9",
    useCase: "Web, YouTube, presentations, desktop screens",
  },
  {
    id: "square-1080",
    name: "Square",
    shortName: "Square",
    width: 1080,
    height: 1080,
    aspectLabel: "1:1",
    useCase: "Social feeds, cards and square displays",
  },
  {
    id: "vertical-1080",
    name: "Vertical Full HD",
    shortName: "Vertical",
    width: 1080,
    height: 1920,
    aspectLabel: "9:16",
    useCase: "Mobile, Reels, Stories and portrait screens",
  },
];

export const getCompositionPreset = (id: CompositionPresetId) => {
  const preset = compositionPresets.find((candidate) => candidate.id === id);
  if (!preset) throw new Error(`Unknown composition preset: ${id}`);
  return preset;
};

export const fitProjectToPreset = (
  project: WorkstationProject,
  presetId: CompositionPresetId,
): WorkstationProject => {
  const preset = getCompositionPreset(presetId);
  const next = structuredClone(project);

  const scale = Math.min(
    preset.width / project.width,
    preset.height / project.height,
  );
  const contentWidth = project.width * scale;
  const contentHeight = project.height * scale;
  const offsetX = (preset.width - contentWidth) / 2;
  const offsetY = (preset.height - contentHeight) / 2;

  next.width = preset.width;
  next.height = preset.height;

  for (const track of next.tracks) {
    for (const item of track.items) {
      item.transform.x = offsetX + item.transform.x * scale;
      item.transform.y = offsetY + item.transform.y * scale;
      item.transform.width *= scale;
      item.transform.height *= scale;
      item.transform.anchorX =
        (item.transform.anchorX ?? item.transform.width / (2 * scale)) * scale;
      item.transform.anchorY =
        (item.transform.anchorY ?? item.transform.height / (2 * scale)) * scale;
      item.transform.scale *= 1;
    }
  }

  return next;
};

export type ExportTarget = {
  presetId: CompositionPresetId;
  enabled: boolean;
};
