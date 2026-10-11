import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "David Solomon | Websites and emails that sell",
  description:
    "I design and build websites, Shopify stores and Klaviyo emails for brands that want more from every visitor.",
};

export const viewport: Viewport = {
  themeColor: "#0B0A0C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${jakarta.variable} ${instrument.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
