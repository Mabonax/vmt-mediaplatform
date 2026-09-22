export const videoFormats = {
  vertical: {
    width: 1080,
    height: 1920,
    safeX: 76,
    safeTop: 90,
    safeBottom: 170,
    heading: 108,
    body: 34,
    visualWidth: 760,
    visualHeight: 670,
    contentTop: 260,
  },
  square: {
    width: 1080,
    height: 1080,
    safeX: 60,
    safeTop: 54,
    safeBottom: 76,
    heading: 66,
    body: 25,
    visualWidth: 450,
    visualHeight: 520,
    contentTop: 190,
  },
  landscape: {
    width: 1920,
    height: 1080,
    safeX: 100,
    safeTop: 62,
    safeBottom: 80,
    heading: 100,
    body: 32,
    visualWidth: 710,
    visualHeight: 580,
    contentTop: 210,
  },
} as const;
export type VideoFormat = keyof typeof videoFormats;
export const getVideoFormat = (width: number, height: number): VideoFormat =>
  width === height ? "square" : width > height ? "landscape" : "vertical";
