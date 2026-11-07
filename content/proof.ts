// The proof block after Experience. Anything starting with "[PLACEHOLDER"
// is hidden on the live site and flagged in development (see lib/placeholder.ts).

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type Stat = {
  value: string;
  label: string;
};

export const testimonial: Testimonial = {
  quote: "[PLACEHOLDER QUOTE]",
  name: "Michael",
  role: "[PLACEHOLDER ROLE]",
  company: "Milky Plant",
};

/** Up to 3. The row only shows when there are entries. Example: { value: "32", label: "sites shipped" } */
export const stats: Stat[] = [];
