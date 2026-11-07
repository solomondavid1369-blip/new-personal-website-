import "server-only";
import { emails } from "@/content/emails";
import { stats, testimonial } from "@/content/proof";
import { work } from "@/content/work";
import { isPlaceholder } from "./placeholder";

let reported = false;

/** Lists any "[PLACEHOLDER" copy in the build log, so it is not forgotten. */
export function reportPlaceholders() {
  if (reported) return;
  reported = true;
  const found: string[] = [];
  const scan = (where: string, value: unknown) => {
    if (typeof value === "string" && isPlaceholder(value)) found.push(`${where}: ${value}`);
    else if (value && typeof value === "object")
      for (const [k, v] of Object.entries(value)) scan(`${where}.${k}`, v);
  };
  scan("work", work);
  scan("emails", emails);
  scan("proof.testimonial", testimonial);
  scan("proof.stats", stats);
  if (found.length) {
    console.warn(`\n⚠ ${found.length} placeholder(s) still in content (hidden on the live site):\n  ${found.join("\n  ")}\n`);
  }
}
