import { useEffect, useState } from "react";
import {
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";

let fontPromise: Promise<void> | undefined;
const loadFonts = () => {
  fontPromise ??= Promise.all([
    new FontFace(
      "Manrope",
      `url(${staticFile("brands/dr-health/fonts/Manrope-Variable.ttf")})`,
      { weight: "200 800" },
    ).load(),
    new FontFace(
      "DM Serif Display",
      `url(${staticFile("brands/dr-health/fonts/DMSerifDisplay-Regular.ttf")})`,
      { weight: "400" },
    ).load(),
    new FontFace(
      "Montserrat",
      `url(${staticFile("brands/dr-health/fonts/Montserrat-Variable.ttf")})`,
      { weight: "100 900" },
    ).load(),
    new FontFace(
      "Poppins",
      `url(${staticFile("brands/dr-health/fonts/Poppins-Regular.ttf")})`,
      { weight: "400" },
    ).load(),
    new FontFace(
      "Poppins",
      `url(${staticFile("brands/dr-health/fonts/Poppins-Medium.ttf")})`,
      { weight: "500" },
    ).load(),
    new FontFace(
      "Poppins",
      `url(${staticFile("brands/dr-health/fonts/Poppins-SemiBold.ttf")})`,
      { weight: "600" },
    ).load(),
    new FontFace(
      "Poppins",
      `url(${staticFile("brands/dr-health/fonts/Poppins-Bold.ttf")})`,
      { weight: "700" },
    ).load(),
  ]).then((faces) => {
    faces.forEach((face) => document.fonts.add(face));
  });
  return fontPromise;
};

/** Every render waits for locally bundled fonts; failures never silently change typography. */
export const useBrandFonts = () => {
  const [handle] = useState(() =>
    delayRender("Loading licensed local brand-development fonts"),
  );
  useEffect(() => {
    loadFonts()
      .then(() => continueRender(handle))
      .catch(cancelRender);
  }, [handle]);
};
