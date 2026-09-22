import { brandingAssets } from "../../brands/dr-health/assets/branding";
import { useCreative } from "../layout/CreativeContext";
import { AssetArtwork } from "../media/AssetArtwork";

export const CareMark = ({ size = 64 }: { size?: number }) => (
  <AssetArtwork asset={brandingAssets.appIcon} width={size} />
);

/** Native black-text logos sit on a light plate on dark backgrounds. */
export const BrandLogo = ({
  inverse = false,
  large = false,
  width,
}: {
  inverse?: boolean;
  large?: boolean;
  width?: number;
}) => {
  const { theme, unit } = useCreative();
  return (
    <div
      style={{
        display: "inline-flex",
        flexShrink: 0,
        padding: inverse ? theme.spacing.sm * unit : 0,
        background: inverse ? theme.colors.white : "transparent",
        borderRadius: theme.radius.small,
      }}
    >
      <AssetArtwork
        asset={large ? brandingAssets.lockup : brandingAssets.wordmark}
        width={width ?? (large ? 420 : 280) * unit}
      />
    </div>
  );
};
