import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

export const alt = "David Solomon. Websites and emails that sell.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const portrait = await readFile(join(process.cwd(), "assets/og-portrait.jpg"));
  const src = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0B0A0C", fontFamily: "Jakarta" }}>
        <img src={src} width={560} height={630} alt="" style={{ position: "absolute", right: 0, top: 0 }} />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 560,
            height: 630,
            display: "flex",
            background: "linear-gradient(to right, #0B0A0C 0%, rgba(11,10,12,0) 45%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 72px", width: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(245,243,240,0.7)", fontSize: 22, letterSpacing: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#FF5A1F" }} />
            DAVID SOLOMON
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#F5F3F0", fontSize: 88, fontWeight: 800, lineHeight: 0.98, letterSpacing: -3 }}>
            <span>Websites and</span>
            <span style={{ display: "flex", gap: 22 }}>
              emails that
              <span style={{ fontFamily: "Instrument", fontStyle: "italic", fontWeight: 400, color: "#FF5A1F", letterSpacing: 0 }}>
                sell.
              </span>
            </span>
          </div>
          <div style={{ display: "flex", color: "rgba(245,243,240,0.7)", fontSize: 26, fontWeight: 700 }}>
            Websites · Shopify · Email design · Klaviyo flows
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
