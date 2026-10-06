import { brandingAssets } from "../../brands/dr-health/assets/branding";
import { useCreative } from "../layout/CreativeContext";
import { AssetArtwork } from "../media/AssetArtwork";

/** Compact brand use. The round app icon is intentionally excluded from compositions. */
export const CareMark = ({ size = 160 }: { size?: number }) => (
  <BrandLogo width={size} variant="wordmark" />
);

/** Native black-text logos sit on a light plate on dark backgrounds. */
export const BrandLogo = ({
  inverse = false,
  large = false,
  width,
  variant,
}: {
  inverse?: boolean;
  large?: boolean;
  width?: number;
  variant?: "wordmark" | "powered-by-gperp";
}) => {
  const { theme, unit, design } = useCreative();
  const selectedVariant = variant ?? design.logoVariant;
  const asset =
    selectedVariant === "powered-by-gperp"
      ? brandingAssets.lockup
      : brandingAssets.wordmark;
  const needsPlate =
    inverse || design.backgroundColor.toLowerCase() !== "#ffffff";
  return (
    <div
      style={{
        display: "inline-flex",
        flexShrink: 0,
        padding: needsPlate ? theme.spacing.sm * unit : 0,
        background: needsPlate ? theme.colors.white : "transparent",
        borderRadius: theme.radius.small,
      }}
    >
      <AssetArtwork
        asset={asset}
        width={(width ?? (large ? 420 : 280) * unit) * design.logoScale}
      />
    </div>
  );
};
