// Renders each email in emails-src/*.html to a full-length JPG in
// public/emails/ (the 600px .email block at 2x, so 1200px wide).
//
//   node scripts/render-emails.mjs
//
// Needs open internet: the emails pull fonts and product photos from the
// Milky Plant CDNs. The "Render emails" GitHub Action runs this for us.
import { readdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "emails-src");
const outDir = path.join(root, "public/emails");

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 700, height: 1000 }, deviceScaleFactor: 2 });

const files = (await readdir(srcDir)).filter((f) => f.endsWith(".html")).sort();

for (const file of files) {
  const slug = file.replace(/\.html$/, "");
  await page.goto(`file://${path.join(srcDir, file)}`, { waitUntil: "networkidle", timeout: 60_000 });
  await page.evaluate(() => document.fonts.ready);
  // Make sure lazy images have arrived before the capture.
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((r) => img.addEventListener("load", r, { once: true }) || setTimeout(r, 10_000))),
    ),
  );
  const email = page.locator(".email").first();
  await email.screenshot({ path: path.join(outDir, `${slug}.jpg`), type: "jpeg", quality: 82 });
  console.log(`${slug}.jpg`);
}

await browser.close();

