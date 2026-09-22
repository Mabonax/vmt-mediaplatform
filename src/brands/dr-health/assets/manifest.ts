import {
  createAssetRegistry,
  type CreativeAsset,
} from "../../../engine/assets/registry";

export const drHealthAssets = [
  {
    id: "doctor-demo-01",
    brand: "dr-health",
    type: "person",
    source: "brands/dr-health/people/doctors/doctor-demo-01.svg",
    tags: ["demo", "portrait", "illustration"],
    alt: "Abstract clinician illustration; not a real doctor",
    status: "placeholder",
    provenance: {
      creator: "Dr. Health motion project",
      license: "Project-owned original SVG",
      sourceReference:
        "Created for this development template; no stock imagery",
    },
    properties: {
      orientation: "portrait",
      transparent: true,
      facing: "center",
      composition: "centered",
      brightness: "light",
    },
  },
] as const satisfies readonly CreativeAsset[];
export const assetRegistry = createAssetRegistry(drHealthAssets);
