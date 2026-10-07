import type {WorkstationProject} from "../workstation/schema";
import type {CompositionPresetId} from "./composition-presets";

export type EditorSession = {
  project: WorkstationProject;
  activePresetId: CompositionPresetId;
  exportTargets: CompositionPresetId[];
};
