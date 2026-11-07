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
    slug: "voltage-onboarding",
    title: "Low battery? Not anymore.",
    brand: "Voltage",
    description: "Onboarding email for an EV charging app, told through a battery that fills up as you scroll.",
    image: "/emails/voltage-onboarding.jpg",
    imageAlt: "Voltage onboarding email, low battery? Not anymore.",
    period: "Concept",
  },
  {
    slug: "petal-post",
    title: "Your flowers are still waiting.",
    brand: "Petal Post",
    description: "Abandoned cart email for a flower delivery brand, with flowers that wilt a little more each day.",
    image: "/emails/petal-post.jpg",
    imageAlt: "Petal Post abandoned cart email, your flowers are still waiting",
    period: "Concept",
  },
  {
    slug: "lumen-brew",
    title: "Roasted while you sleep",
    brand: "Lumen Brew",
    description: "Welcome email for a coffee subscription, following one bag from the 3am roast to sunrise.",
    image: "/emails/lumen-brew.jpg",
    imageAlt: "Lumen Brew welcome email, your beans are roasting right now",
    period: "Concept",
  },
  {
    slug: "fizzwell-comic",
    title: "The 3pm slump never saw it coming",
    brand: "Fizzwell",
    description: "Comic book style launch email for a sparkling drink flavour.",
    image: "/emails/fizzwell-comic.jpg",
    imageAlt: "Fizzwell comic style email, the 3pm slump never saw it coming",
    period: "Concept",
  },
  {
    slug: "nomad-boarding",
    title: "Your bag is boarding.",
    brand: "Nomad",
    description: "Sale email for a carry-on bag brand, designed around a boarding pass.",
    image: "/emails/nomad-boarding.jpg",
    imageAlt: "Nomad sale email designed as a boarding pass, your bag is boarding",
    period: "Concept",
  },
  {
    slug: "orbit-audio-bf",
    title: "Black Friday launches early.",
    brand: "Orbit Audio",
    description: "Space-themed Black Friday email for a headphone brand, with a launch countdown.",
    image: "/emails/orbit-audio-bf.jpg",
    imageAlt: "Orbit Audio Black Friday email, Black Friday launches early",
    period: "Concept",
  },
  {
    slug: "pantry-ghost",
    title: "The usual suspects",
    brand: "Pantry Ghost",
    description: "Crime-scene launch email for three new crisp flavours.",
    image: "/emails/pantry-ghost.jpg",
    imageAlt: "Pantry Ghost email, the usual suspects",
    period: "Concept",
  },
  {
    slug: "stride-pacer3",
    title: "Rain day? Run day.",
    brand: "Stride & Co",
    description: "Launch email for a running shoe, mapped kilometre by kilometre along a half marathon.",
    image: "/emails/stride-pacer3.jpg",
    imageAlt: "Stride and Co Pacer 3 launch email, rain day? Run day.",
    period: "Concept",
  },
  {
    slug: "halcyon-rain-serum",
    title: "Dry spell ahead.",
    brand: "Halcyon",
    description: "Skincare launch email told as a weather forecast for dry skin.",
    image: "/emails/halcyon-rain-serum.jpg",
    imageAlt: "Halcyon Rain Serum email, dry spell ahead",
    period: "Concept",
  },
  {
    slug: "kettle-crumb",
    title: "Sunday is for buns.",
    brand: "Kettle & Crumb",
    description: "Bake-along recipe email for a bakery brand that sells the kit at the end.",
    image: "/emails/kettle-crumb.jpg",
    imageAlt: "Kettle and Crumb recipe email, Sunday is for buns",
    period: "Concept",
  },
  {
    slug: "showert-serum",
    title: "The £60 serum",
    brand: "Milky Plant",
    description: "ShowerT email selling a filter shower head through a skincare angle.",
    image: "/emails/showert-serum.jpg",
    imageAlt: "Milky Plant ShowerT email, the £60 serum",
    period: "Q4 2026",
  },
  {
    slug: "carton-breakup",
    title: "Dear carton",
    brand: "Milky Plant",
    description: "Milky Plant Plus email written as a breakup letter to milk cartons.",
    image: "/emails/carton-breakup.jpg",
    imageAlt: "Milky Plant Plus email written as a breakup letter to milk cartons",
    period: "Q4 2026",
  },
  {
    slug: "showert-hard-water",
    title: "Hard water, explained",
    brand: "Milky Plant",
    description: "Education email showing what hard water does to hair and skin, and how ShowerT fixes it.",
    image: "/emails/showert-hard-water.jpg",
    imageAlt: "Milky Plant ShowerT email explaining hard water",
    period: "Q4 2026",
  },
  {
    slug: "mpp-hero",
    title: "Milky Plant Plus hero",
    brand: "Milky Plant",
    description: "Launch email for the Milky Plant Plus machine.",
    image: "/emails/mpp-hero.jpg",
    imageAlt: "Milky Plant Plus product launch email",
    period: "Q4 2026",
  },
  {
    slug: "oat-milk-season",
    title: "It's oat milk season",
    brand: "Milky Plant",
    description: "Seasonal email pushing homemade oat milk for autumn.",
    image: "/emails/oat-milk-season.jpg",
    imageAlt: "Milky Plant email, it's oat milk season",
    period: "Q4 2026",
  },
  {
    slug: "plant-milk-3-minutes",
    title: "Turn any nut, grain or seed into plant milk",
    brand: "Milky Plant",
    description: "Product email introducing the Milky Plant Plus machine to new customers.",
    image: "/emails/plant-milk-3-minutes.jpg",
    imageAlt: "Milky Plant Plus email, turn any nut, grain or seed into plant milk in 3 minutes",
    period: "Q4 2026",
  },
  // [Add when their images are ready: The Watery pre-order postcard, Monthly newsletter.]
  // Each email image is rendered from emails-src/<slug>.html by scripts/render-emails.mjs.
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
