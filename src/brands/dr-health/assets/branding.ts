import type { CreativeAsset } from "../../../engine/assets/registry";

const suppliedLogo = (
  id: string,
  file: string,
  alt: string,
  artwork: NonNullable<CreativeAsset["artwork"]>,
  tags: string[],
): CreativeAsset => ({
  id,
  brand: "dr-health",
  type: "logo",
  source: `brands/dr-health/logos/${file}`,
  tags: ["branding", "user-supplied", ...tags],
  alt,
  status: "approved",
  provenance: {
    creator: "Dr. Health / Gperp branding supplied by the user",
    license:
      "User-authorized existing project branding; no additional license inferred",
    sourceReference: `C:/xampp/htdocs/gperp-clinic/public/branding/png/${file === "glass-icon.png" ? "glass- icon.png" : file}`,
  },
  artwork,
  properties: { transparent: true },
});

// Alpha bounds measured from the original PNGs. PNG bytes are never modified.
export const brandingAssets = {
  wordmark: suppliedLogo(
    "dr-health-wordmark",
    "logo.png",
    "DrHealth",
    {
      canvasWidth: 1080,
      canvasHeight: 1080,
      x: 294,
      y: 495,
      width: 600,
      height: 156,
    },
    ["wordmark"],
  ),
  lockup: suppliedLogo(
    "dr-health-gperp-lockup",
    "drhealth.png",
    "DrHealth powered by Gperp",
    {
      canvasWidth: 1080,
      canvasHeight: 1080,
      x: 212,
      y: 363,
      width: 735,
      height: 354,
    },
    ["wordmark", "powered-by"],
  ),
  appIcon: suppliedLogo(
    "dr-health-app-icon",
    "app-icon.png",
    "DrHealth app icon",
    {
      canvasWidth: 1080,
      canvasHeight: 1080,
      x: 180,
      y: 183,
      width: 697,
      height: 696,
    },
    ["icon", "round"],
  ),
  logoIcon: suppliedLogo(
    "dr-health-logo-icon",
    "logo-icon.png",
    "DrHealth square app icon",
    {
      canvasWidth: 1080,
      canvasHeight: 1080,
      x: 132,
      y: 186,
      width: 793,
      height: 777,
    },
    ["icon", "square"],
  ),
  glassIcon: suppliedLogo(
    "dr-health-glass-icon",
    "glass-icon.png",
    "DrHealth glass icon",
    {
      canvasWidth: 1028,
      canvasHeight: 1137,
      x: 0,
      y: 5,
      width: 1022,
      height: 1090,
    },
    ["icon", "glass"],
  ),
  poweredBy: suppliedLogo(
    "gperp-powered-by",
    "powered-by-gperp.png",
    "Powered by Gperp",
    {
      canvasWidth: 914,
      canvasHeight: 299,
      x: 0,
      y: 15,
      width: 914,
      height: 284,
    },
    ["powered-by"],
  ),
} as const;
