// Projects, experience and contact details. To add a project, add one entry to `work`.
// Emails live in content/emails.ts.
// Anything in [square brackets] is a placeholder still to be filled in.

export type WorkTag = "Website" | "Emails" | "Shopify";

export type WorkItem = {
  slug: string;
  title: string;
  description: string;
  tags: WorkTag[];
  year: number;
  image: string;
  imageAlt: string;
  url?: string;
  concept?: boolean;
  stack?: string[];
  /** Turns the card into an expandable case study. */
  caseStudy?: CaseStudy;
};

export type CaseStudy = {
  problem: string;
  built: string;
  /** Leave as "[PLACEHOLDER: ...]" until there is a real, measured result. */
  result: string;
};

export const work: WorkItem[] = [
  {
    slug: "chidinma-obi",
    title: "Chidinma Obi",
    description: "Portfolio site for a career coach and virtual assistant.",
    tags: ["Website"],
    year: 2026,
    image: "/work/chidinma-obi.jpg",
    imageAlt: "Chidinma Obi portfolio website homepage",
    url: "https://ugomma-portfolio.vercel.app",
    concept: true,
    stack: ["Next.js", "Tailwind", "GSAP", "Lenis", "Framer Motion"],
  },
  {
    slug: "mp-advertorial",
    title: "Milky Plant: ShowerT advertorial",
    description:
      "Long-form sales page built as a custom Shopify section after the page builder could not handle the layout.",
    tags: ["Shopify"],
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
  {
    slug: "mp-french",
    title: "Milky Plant: French store",
    description:
      "Full French localisation with Shopify Markets, translations and rebuilt Klaviyo flows.",
    tags: ["Shopify", "Emails"],
    year: 2026,
    image: "/work/mp-french.jpg",
    imageAlt: "Milky Plant French Shopify store",
    url: "https://milkyplant.com/fr",
    caseStudy: {
      problem: "Milky Plant needed to sell properly to French customers.",
      built: "Full French localisation with Shopify Markets, translations and rebuilt Klaviyo flows.",
      result: "[PLACEHOLDER: result to add]",
    },
  },
  // [More sites from the 32-site sprint get added here as they ship.]
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
