// Takes a desktop screenshot (1440 x 900, top of the page) of every project in
// content/work.ts that has a live URL, and saves it over its image.
//
//   node scripts/capture-sites.mjs
//
// Needs open internet; the "Capture site screenshots" GitHub Action runs it.
// The list comes from content/work.ts: every item with a live URL.
import { readFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const source = await readFile(path.join(root, "content/work.ts"), "utf8");

// Pull slug, url and image out of each work entry without needing a TS loader.
const sites = [...source.matchAll(/slug: "([^"]+)"[\s\S]*?image: "([^"]+)"[\s\S]*?url: "([^"]+)"/g)].map(
  ([, slug, image, url]) => ({ slug, image, url }),
);

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

let failed = 0;
for (const site of sites) {
  try {
    await page.goto(site.url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready);
    // Let intro animations settle, then dismiss any pop-up (newsletter, cookies).
    await page.waitForTimeout(3000);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(root, "public", site.image), type: "jpeg", quality: 85 });
    console.log(`${site.slug}: ${site.url} -> public${site.image}`);
  } catch (err) {
    failed++;
    console.error(`${site.slug}: could not capture ${site.url}: ${err.message}`);
  }
}

await browser.close();
if (failed) process.exitCode = 1;
