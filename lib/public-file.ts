import "server-only";
import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

const resolve = (src: string) => path.join(process.cwd(), "public", src);

/** True when a file like "/work/foo.jpg" exists in /public. */
export function publicFileExists(src: string) {
  return fs.existsSync(resolve(src));
}

/** Pixel size of an image in /public, or null if it is not there yet. */
export function publicImageSize(src: string) {
  if (!publicFileExists(src)) return null;
  const { width, height } = imageSize(fs.readFileSync(resolve(src)));
  return width && height ? { width, height } : null;
}
