export type AssetType =
  | "logo"
  | "person"
  | "background"
  | "illustration"
  | "icon"
  | "shape"
  | "device"
  | "texture"
  | "video"
  | "audio";
export interface CreativeAsset {
  id: string;
  brand: string;
  type: AssetType;
  /** Relative to public/. Authoring formats and remote URLs are intentionally excluded. */
  source: string;
  tags: readonly string[];
  alt: string;
  status: "placeholder" | "approved";
  provenance: { creator: string; license: string; sourceReference: string };
  properties?: {
    orientation?: "portrait" | "square" | "landscape";
    transparent?: boolean;
    facing?: "left" | "right" | "center";
    composition?: "centered" | "left-space" | "right-space";
    brightness?: "light" | "dark";
  };
}
export interface AssetRequirement {
  brand?: string;
  type?: AssetType;
  tags?: readonly string[];
  transparent?: boolean;
  approvedOnly?: boolean;
}
const extensions: Record<AssetType, readonly string[]> = {
  logo: ["svg", "png", "webp"],
  person: ["svg", "png", "webp", "jpg", "jpeg"],
  background: ["svg", "png", "webp", "jpg", "jpeg"],
  illustration: ["svg", "png", "webp", "jpg", "jpeg"],
  icon: ["svg", "png", "webp"],
  shape: ["svg", "png", "webp"],
  device: ["svg", "png", "webp"],
  texture: ["png", "webp", "jpg", "jpeg"],
  video: ["mp4", "webm", "mov"],
  audio: ["mp3", "wav", "m4a", "ogg"],
};
export const createAssetRegistry = (assets: readonly CreativeAsset[]) => {
  const byId = new Map<string, CreativeAsset>();
  for (const asset of assets) {
    if (byId.has(asset.id)) throw new Error(`Duplicate asset ID: ${asset.id}`);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(asset.id))
      throw new Error(`Invalid asset ID: ${asset.id}`);
    if (
      !/^[a-zA-Z0-9_./-]+$/.test(asset.source) ||
      asset.source.startsWith("/") ||
      asset.source.split("/").includes("..")
    ) {
      throw new Error(
        `Asset source must be a safe public-relative path: ${asset.id}`,
      );
    }
    const extension = asset.source.split(".").pop()?.toLowerCase() ?? "";
    if (!extensions[asset.type].includes(extension))
      throw new Error(`Unsupported render format: ${asset.source}`);
    byId.set(asset.id, asset);
  }
  const select = (requirement: AssetRequirement = {}) =>
    assets.filter(
      (asset) =>
        (!requirement.brand || asset.brand === requirement.brand) &&
        (!requirement.type || asset.type === requirement.type) &&
        (!requirement.tags ||
          requirement.tags.every((tag) => asset.tags.includes(tag))) &&
        (requirement.transparent === undefined ||
          asset.properties?.transparent === requirement.transparent) &&
        (!requirement.approvedOnly || asset.status === "approved"),
    );
  return {
    all: assets,
    get: (id: string) => {
      const asset = byId.get(id);
      if (!asset) throw new Error(`Unknown asset: ${id}`);
      return asset;
    },
    optional: (id?: string, type?: AssetType) => {
      const asset = id ? byId.get(id) : undefined;
      return asset && (!type || asset.type === type) ? asset : undefined;
    },
    byType: (type: AssetType) => select({ type }),
    byTags: (tags: readonly string[]) => select({ tags }),
    select,
  };
};
