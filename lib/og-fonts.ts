import { readFile } from "node:fs/promises";
import { join } from "node:path";

const font = (pkg: string, file: string) =>
  readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

/** Site fonts for next/og images (it needs .woff/.ttf, not .woff2). */
export async function ogFonts() {
  const [bold, extra, serif] = await Promise.all([
    font("plus-jakarta-sans", "plus-jakarta-sans-latin-700-normal.woff"),
    font("plus-jakarta-sans", "plus-jakarta-sans-latin-800-normal.woff"),
    font("instrument-serif", "instrument-serif-latin-400-italic.woff"),
  ]);
  return [
    { name: "Jakarta", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Jakarta", data: extra, weight: 800 as const, style: "normal" as const },
    { name: "Instrument", data: serif, weight: 400 as const, style: "italic" as const },
  ];
}
