import { createContext, useContext, type ReactNode } from "react";
import type { DesignTheme } from "../../engine/themes/types";
import { videoFormats, type VideoFormat } from "../../engine/layout/formats";
import type { DesignConfig } from "../../engine/schemas/promo";

interface CreativeContextValue {
  theme: DesignTheme;
  design: DesignConfig;
  format: VideoFormat;
}
const CreativeContext = createContext<CreativeContextValue | null>(null);
export const CreativeProvider = ({
  children,
  ...value
}: CreativeContextValue & { children: ReactNode }) => (
  <CreativeContext.Provider value={value}>{children}</CreativeContext.Provider>
);
export const useCreative = () => {
  const value = useContext(CreativeContext);
  if (!value) throw new Error("Visual components require CreativeProvider.");
  return {
    ...value,
    metrics: videoFormats[value.format],
    unit: value.format === "square" ? 0.76 : 1,
  };
};
