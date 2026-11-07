import Placeholder from "@/components/Placeholder";
import { stats, testimonial } from "@/content/proof";
import { isPlaceholder, showPlaceholders } from "@/lib/placeholder";

// Proof: one quote and an optional row of up to three stats, from content/proof.ts.
// On the live site, placeholder copy is hidden; if nothing real is left, so is the section.
export default function Proof() {
  const quoteReady = !isPlaceholder(testimonial.quote);
  const showQuote = quoteReady || showPlaceholders;
  const realStats = stats.filter((s) => s.value && s.label).slice(0, 3);
  if (!showQuote && realStats.length === 0) return null;

  const text = (value: string) => (isPlaceholder(value) ? <Placeholder text={value} /> : value);

  return (
    <section aria-label="What clients say" className="relative px-4 py-16 md:px-12 md:py-24">
      <div className="max-w-3xl rounded-[20px] border border-line bg-bg/80 p-6 backdrop-blur-md md:p-10">
        {showQuote && (
          <figure className="flex flex-col gap-6">
            <span className="dot-label">Proof</span>
            <blockquote className="text-2xl leading-snug font-semibold md:text-4xl md:leading-tight">
              {quoteReady ? <>&ldquo;{testimonial.quote}&rdquo;</> : text(testimonial.quote)}
            </blockquote>
            <figcaption className="flex flex-col gap-1">
              <span className="font-semibold">{text(testimonial.name)}</span>
              <span className="text-sm text-text-dim">
                {text(testimonial.role)}
                {", "}
                {text(testimonial.company)}
              </span>
            </figcaption>
          </figure>
        )}

        {realStats.length > 0 && (
          <dl className={`grid grid-cols-1 gap-6 sm:grid-cols-3 ${showQuote ? "mt-10 border-t border-line pt-8" : ""}`}>
            {realStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="order-2 font-mono text-xs tracking-[0.12em] text-text-dim uppercase">{s.label}</dt>
                <dd className="order-1 text-4xl font-extrabold tracking-tight md:text-5xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
