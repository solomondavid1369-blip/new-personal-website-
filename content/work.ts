// All portfolio content lives here. To add a project, add one entry to `work`.
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
};

export type EmailItem = {
  slug: string;
  title: string;
  brand: string;
  description: string;
  image: string;
  imageAlt: string;
  period: string;
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
    slug: "isaac-fala",
    title: "Isaac Fala",
    description: "Personal site for [his role].",
    tags: ["Website"],
    year: 2026,
    image: "/work/isaac-fala.jpg",
    imageAlt: "Isaac Fala personal website homepage",
    url: "https://solomondavid1369-blip.github.io/Fala.isaac/",
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
  },
  // [More sites from the 32-site sprint get added here as they ship.]
];

export const emails: EmailItem[] = [
  {
    slug: "showert-serum",
    title: "The £60 serum",
    brand: "Milky Plant",
    description: "ShowerT, skincare angle.",
    image: "/emails/showert-serum.jpg",
    imageAlt: "Milky Plant ShowerT email, the £60 serum",
    period: "Q4 2026",
  },
  {
    slug: "carton-breakup",
    title: "Dear carton",
    brand: "Milky Plant",
    description: "Milky Plant Plus, written as a breakup letter to milk cartons.",
    image: "/emails/carton-breakup.jpg",
    imageAlt: "Milky Plant Plus email written as a breakup letter to milk cartons",
    period: "Q4 2026",
  },
  {
    slug: "showert-hard-water",
    title: "Hard water, explained",
    brand: "Milky Plant",
    description: "ShowerT education email.",
    image: "/emails/showert-hard-water.jpg",
    imageAlt: "Milky Plant ShowerT email explaining hard water",
    period: "Q4 2026",
  },
  {
    slug: "mpp-hero",
    title: "Milky Plant Plus hero",
    brand: "Milky Plant",
    description: "Product launch email.",
    image: "/emails/mpp-hero.jpg",
    imageAlt: "Milky Plant Plus product launch email",
    period: "Q4 2026",
  },
  {
    slug: "oat-milk-season",
    title: "It's oat milk season",
    brand: "Milky Plant",
    description: "[One line on what it was for.]",
    image: "/emails/oat-milk-season.jpg",
    imageAlt: "Milky Plant email, it's oat milk season",
    period: "Q4 2026",
  },
  {
    slug: "plant-milk-3-minutes",
    title: "Turn any nut, grain or seed into plant milk",
    brand: "Milky Plant",
    description: "[One line on what it was for.]",
    image: "/emails/plant-milk-3-minutes.jpg",
    imageAlt: "Milky Plant Plus email, turn any nut, grain or seed into plant milk in 3 minutes",
    period: "Q4 2026",
  },
  // [Add when their images are ready: The Watery pre-order postcard, Monthly newsletter.]
  // Each email image is rendered from emails-src/<slug>.html by scripts/render-emails.mjs.
];

export const clients = ["Milky Plant", "[add more]"];

export const contact = {
  email: "solomonethics@gmail.com",
  linkedin: "https://linkedin.com/in/solomon-ethics",
};

export const workFilters = ["All", "Websites", "Emails", "Shopify"] as const;
