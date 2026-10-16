import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: 8,
          color: "#FF5A1F",
          fontFamily: "Jakarta",
          fontWeight: 800,
          fontSize: 22,
        }}
      >
        D
      </div>
    ),
    { ...size, fonts: await ogFonts() },
  );
}
