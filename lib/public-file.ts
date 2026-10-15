import "server-only";
import fs from "node:fs";
import path from "node:path";

/** True when a file like "/work/foo.jpg" exists in /public. */
export function publicFileExists(src: string) {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}
