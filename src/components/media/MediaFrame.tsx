import { useState, type ReactNode } from "react";
import { Img, staticFile } from "remotion";
import type { CreativeAsset } from "../../engine/assets/registry";
import { useCreative } from "../layout/CreativeContext";

export const MediaFrame = ({ children }: { children: ReactNode }) => {
  const { theme, design } = useCreative();
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius:
          design.imageTreatment === "circle"
            ? theme.radius.pill
            : theme.radius.card,
        background: theme.colors.mint,
      }}
    >
      {children}
    </div>
  );
};
export const PersonCutout = ({ asset }: { asset?: CreativeAsset }) => {
  const { theme, design, unit } = useCreative();
  const [failed, setFailed] = useState(false);
  return (
    <MediaFrame>
      {asset && !failed ? (
        <Img
          src={staticFile(asset.source)}
          alt={asset.alt}
          onError={() => setFailed(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: asset.properties?.transparent ? "contain" : "cover",
            objectPosition: "center bottom",
            transform: `scale(${design.imageScale})`,
            transformOrigin: "center bottom",
            backgroundColor: "rgba(255, 0, 0, 0)"
          }}
        />
      ) : (
        <div
          style={{
            height: "100%",
            display: "grid",
            placeItems: "center",
            padding: theme.spacing.lg,
            textAlign: "center",
            color: theme.colors.muted,
            fontSize: theme.typography.size.body * unit,
          }}
        >
          Portrait pending
          <br />
          No approved photograph
        </div>
      )}
      {(!asset || failed || asset.status === "placeholder") && (
        <div
          style={{
            position: "absolute",
            bottom: theme.spacing.sm,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: theme.typography.size.micro * unit,
            color: theme.colors.ink,
          }}
        >
          <span
            style={{
              background: theme.colors.paper,
              padding: "6px 14px",
              borderRadius: theme.radius.pill,
            }}
          >
            {asset && !failed ? "DEMO ILLUSTRATION" : "PORTRAIT PLACEHOLDER"}
          </span>
        </div>
      )}
    </MediaFrame>
  );
};
