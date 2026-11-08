// Projects, experience and contact details. To add a project, add one entry to `work`.
// Emails live in content/emails.ts.

export type WorkTag = "Website" | "Emails" | "Shopify";

export type WorkItem = {
  slug: string;
  title: string;
  description: string;
  tags: WorkTag[];
  /** "Client" shows a solid orange badge, "Concept" an outlined one. */
  kind: "Client" | "Concept";
  year: number;
  /** Homepage screenshot, 1440 wide, top of the page. */
  image: string;
  imageAlt: string;
  url?: string;
  /** Slug of this brand's email in content/emails.ts; adds "See the email". */
  emailSlug?: string;
  /** Turns the card into an expandable case study. */
  caseStudy?: CaseStudy;
};

export type CaseStudy = {
  problem: string;
  built: string;
  /** Leave as "[PLACEHOLDER: ...]" until there is a real, measured result. */
  result: string;
};

// Shown in this order in Recent work and in the cards under the hero.
export const work: WorkItem[] = [
  {
    slug: "halcyon",
    title: "Halcyon",
    description: "Skincare brand site built around a skin forecast, with an interactive humidity slider.",
    tags: ["Website"],
    kind: "Concept",
    year: 2026,
    image: "/work/halcyon.jpg",
    imageAlt: "Halcyon skincare website homepage",
    url: "https://hlacyon-site.vercel.app/",
    emailSlug: "halcyon",
  },
  {
    slug: "lumen-brew",
    title: "Lumen Brew",
    description: "Coffee subscription site that moves from night to dawn as you scroll, with a plan builder.",
    tags: ["Website"],
    kind: "Concept",
    year: 2026,
    image: "/work/lumen-brew.jpg",
    imageAlt: "Lumen Brew coffee subscription website homepage",
    url: "https://lumen-brew-site-6knp.vercel.app/",
    emailSlug: "lumen-brew",
  },
  {
    slug: "orbit-audio",
    title: "Orbit Audio",
    description: "Premium headphone site with a space mission theme and a noise-cancelling demo.",
    tags: ["Website"],
    kind: "Concept",
    year: 2026,
    image: "/work/orbit-audio.jpg",
    imageAlt: "Orbit Audio headphone website homepage",
    url: "https://orbit-audio-site.vercel.app/",
    emailSlug: "orbit-audio",
  },
  {
    slug: "mp-advertorial",
    title: "Milky Plant: ShowerT advertorial",
    description:
      "Long-form sales page built as a custom Shopify section after the page builder could not handle the layout.",
    tags: ["Shopify"],
    kind: "Client",
    year: 2026,
    image: "/work/mp-advertorial.jpg",
    imageAlt: "Milky Plant ShowerT advertorial sales page",
    url: "https://milkyplant.com/pages/adv-0002-showert-6-reasons-hair",
    caseStudy: {
      problem: "The page builder couldn't handle the long-form sales page layout.",
      built: "A custom Shopify section coded from scratch for the full advertorial.",
      result: "[PLACEHOLDER: result to add]",
    },
  },
];

export type ExperienceItem = {
  role: string;
  company?: string;
  description: string;
  dates: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Email & Website Coordinator",
    company: "Milky Plant",
    description:
      "UK wellness brand on Shopify. Email design and Klaviyo flows, store builds, French localisation.",
    dates: "March 2026 to now",
  },
  {
    role: "Freelance Web Developer & Email Marketer",
    description: "Websites, Shopify stores and Klaviyo email for clients in Nigeria, the UK and Canada.",
    dates: "2025 to now",
  },
  {
    role: "Email & Landing Page",
    company: "Crusspair (freelance)",
    description: "Klaviyo setup, launch landing page and launch emails for a Canadian sneaker startup.",
    dates: "2026",
  },
];

export const contact = {
  email: "solomonethics@gmail.com",
  linkedin: "https://linkedin.com/in/solomon-ethics",
  whatsapp: `https://wa.me/2347049038308?text=${encodeURIComponent(
    "Hi David, I saw your portfolio and I'd like to talk about a project.",
  )}`,
};

export const workFilters = ["All", "Websites", "Emails", "Shopify"] as const;
