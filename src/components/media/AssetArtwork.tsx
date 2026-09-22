import { Img, staticFile } from "remotion";
import type { CreativeAsset } from "../../engine/assets/registry";

/** Display alpha bounds without editing, recolouring or stretching supplied art. */
export const AssetArtwork = ({
  asset,
  width,
}: {
  asset: CreativeAsset;
  width: number;
}) => {
  const box = asset.artwork;
  if (!box) throw new Error(`Artwork dimensions required for ${asset.id}`);
  const scale = width / box.width;
  return (
    <div
      style={{
        position: "relative",
        width,
        height: box.height * scale,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Img
        src={staticFile(asset.source)}
        alt={asset.alt}
        style={{
          position: "absolute",
          width: box.canvasWidth * scale,
          height: box.canvasHeight * scale,
          maxWidth: "none",
          left: -box.x * scale,
          top: -box.y * scale,
          translate: "22.6px 0px"
        }}
      />
    </div>
  );
};
