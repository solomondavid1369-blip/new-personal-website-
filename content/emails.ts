// Every email in the "Emails people actually scroll." section.
// To add one: drop the image in /public/emails (or /public/emails/concepts)
// and add an entry here. Client emails are listed first, then concepts.

export type EmailType = "Launch" | "Sale" | "Welcome" | "Abandoned cart" | "Newsletter";
export type EmailKind = "Client" | "Concept";

export type Email = {
  slug: string;
  brand: string;
  title: string;
  description: string;
  type: EmailType;
  kind: EmailKind;
  /** Full-length image under /public, 1200px wide. */
  image: string;
  imageAlt: string;
};

/** Filter tabs, in order. Tabs with no emails are hidden. */
export const emailTypes: EmailType[] = ["Launch", "Sale", "Welcome", "Abandoned cart", "Newsletter"];

export const emails: Email[] = [
  // Client work
  {
    slug: "carton-breakup",
    brand: "Milky Plant",
    title: "Dear carton",
    description: "Milky Plant Plus email written as a breakup letter to milk cartons.",
    type: "Launch",
    kind: "Client",
    image: "/emails/carton-breakup.jpg",
    imageAlt: "Milky Plant Plus email written as a breakup letter to milk cartons",
  },
  {
    slug: "showert-serum",
    brand: "Milky Plant",
    title: "The £60 serum",
    description: "ShowerT email selling a filter shower head through a skincare angle.",
    type: "Sale",
    kind: "Client",
    image: "/emails/showert-serum.jpg",
    imageAlt: "Milky Plant ShowerT email, the £60 serum",
  },
  {
    slug: "showert-hard-water",
    brand: "Milky Plant",
    title: "Hard water, explained",
    description: "Education email showing what hard water does to hair and skin, and how ShowerT fixes it.",
    type: "Newsletter",
    kind: "Client",
    image: "/emails/showert-hard-water.jpg",
    imageAlt: "Milky Plant ShowerT email explaining hard water",
  },

  // Concepts
  {
    slug: "halcyon",
    brand: "Halcyon",
    title: "Dry spell ahead",
    description: "Skincare launch told as a weather forecast for your skin.",
    type: "Launch",
    kind: "Concept",
    image: "/emails/concepts/halcyon.jpg",
    imageAlt: "Halcyon Rain Serum launch email, dry spell ahead",
  },
  {
    slug: "stride",
    brand: "Stride & Co",
    title: "Rain day? Run day.",
    description: "Running shoe launch with the product laid out as a 21K route map.",
    type: "Launch",
    kind: "Concept",
    image: "/emails/concepts/stride.jpg",
    imageAlt: "Stride and Co Pacer 3 launch email, rain day? Run day.",
  },
  {
    slug: "pantry-ghost",
    brand: "Pantry Ghost",
    title: "The usual suspects",
    description: "Snack flavour launch told as a crime story with a police lineup.",
    type: "Launch",
    kind: "Concept",
    image: "/emails/concepts/pantry-ghost.jpg",
    imageAlt: "Pantry Ghost snack launch email, the usual suspects",
  },
  {
    slug: "orbit-audio",
    brand: "Orbit Audio",
    title: "Black Friday launches early",
    description: "Headphones Black Friday email styled as a space launch countdown.",
    type: "Sale",
    kind: "Concept",
    image: "/emails/concepts/orbit-audio.jpg",
    imageAlt: "Orbit Audio Black Friday email, Black Friday launches early",
  },
  {
    slug: "kettle-crumb",
    brand: "Kettle & Crumb",
    title: "Sunday is for buns",
    description: "Bakery newsletter built around a recipe card.",
    type: "Newsletter",
    kind: "Concept",
    image: "/emails/concepts/kettle-crumb.jpg",
    imageAlt: "Kettle and Crumb newsletter, Sunday is for buns",
  },
  {
    slug: "nomad",
    brand: "Nomad",
    title: "Your bag is boarding",
    description: "Luggage sale designed as a boarding pass.",
    type: "Sale",
    kind: "Concept",
    image: "/emails/concepts/nomad.jpg",
    imageAlt: "Nomad luggage sale email designed as a boarding pass",
  },
  {
    slug: "fizzwell",
    brand: "Fizzwell",
    title: "The 3pm slump never saw it coming",
    description: "Soda launch told as a comic strip.",
    type: "Launch",
    kind: "Concept",
    image: "/emails/concepts/fizzwell.jpg",
    imageAlt: "Fizzwell soda launch email told as a comic strip",
  },
  {
    slug: "lumen-brew",
    brand: "Lumen Brew",
    title: "Roasted while you sleep",
    description: "Coffee subscription welcome email from the night-shift roaster.",
    type: "Welcome",
    kind: "Concept",
    image: "/emails/concepts/lumen-brew.jpg",
    imageAlt: "Lumen Brew welcome email, roasted while you sleep",
  },
  {
    slug: "petal-post",
    brand: "Petal Post",
    title: "Your flowers are still waiting",
    description: "Funny abandoned cart email with drooping tulips.",
    type: "Abandoned cart",
    kind: "Concept",
    image: "/emails/concepts/petal-post.jpg",
    imageAlt: "Petal Post abandoned cart email with drooping tulips",
  },
  {
    slug: "voltage",
    brand: "Voltage",
    title: "Low battery? Not anymore.",
    description: "EV charging app onboarding where a battery fills up as you scroll.",
    type: "Welcome",
    kind: "Concept",
    image: "/emails/concepts/voltage.jpg",
    imageAlt: "Voltage EV charging app onboarding email",
  },
];
