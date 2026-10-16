import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B0A0C",
          color: "#FF5A1F",
          fontFamily: "Jakarta",
          fontWeight: 800,
          fontSize: 120,
        }}
      >
        D
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
