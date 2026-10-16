import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { contact } from "@/content/work";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Variable fonts: one file covers every weight we use.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  preload: false,
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  preload: false,
});

const description =
  "I design and build websites, Shopify stores and Klaviyo emails for brands that want more from every visitor.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "David Solomon | Websites and emails that sell",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "David Solomon",
    title: "David Solomon | Websites and emails that sell",
    description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image", title: "David Solomon | Websites and emails that sell", description },
};

// Tells search engines who the site is about.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "David Solomon",
  url: siteUrl,
  jobTitle: "Web developer and email designer",
  email: `mailto:${contact.email}`,
  sameAs: [contact.linkedin],
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
      <head>
        {/* Hide reveal text until the motion script splits it, so there is no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("motion")`,
          }}
        />
      </head>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
