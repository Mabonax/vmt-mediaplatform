import type {WorkstationProject} from "../workstation/schema";
import {workstationDemoProject} from "../workstation/defaults";

export type MotionTemplate = {
  id: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  project: WorkstationProject;
};

export const motionTemplates: MotionTemplate[] = [
  {
    id: "erp-explainer",
    name: "ERP Explainer",
    category: "Product walkthrough",
    description:
      "Browser frame, cursor movement, callouts and process flow for explaining enterprise software.",
    tags: ["ERP", "software", "walkthrough"],
    project: workstationDemoProject,
  },
  {
    id: "blank-motion",
    name: "Blank Motion Project",
    category: "Start from scratch",
    description:
      "An empty composition for building a motion design from individual layers.",
    tags: ["blank", "custom"],
    project: {
      schemaVersion: 1,
      name: "Untitled Motion Project",
      fps: 30,
      width: 1920,
      height: 1080,
      durationInFrames: 300,
      background: "#111318",
      tracks: [
        {
          id: "layers",
          name: "Layers",
          visible: true,
          locked: false,
          items: [],
        },
      ],
    },
  },
];
