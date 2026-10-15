import WorkThumb from "@/components/WorkThumb";
import { clients, emails, work } from "@/content/work";

// Sections A to E. They scroll over the pinned hero sequence.
// Desktop: text in the clear left half. Mobile: text at the bottom over the gradient.

const services = ["Websites", "Shopify", "Email design", "Klaviyo flows"];
const steps = ["Brief and research", "Design in Figma", "Build and test", "Launch and hand over"];

const site = work.find((w) => w.slug === "chidinma-obi")!;
const shopify = work.find((w) => w.tags.includes("Shopify"))!;
const email = emails[0];

const sectionBase =
  "relative flex min-h-svh flex-col justify-end px-4 pb-16 md:justify-center md:px-12 md:pb-0";

export default function PortraitZone() {
  return (
    <>
      {/* A. Hero */}
      <section id="top" aria-labelledby="hero-title" className={`${sectionBase} pt-28`}>
        <div className="flex max-w-xl flex-col gap-6 lg:max-w-2xl">
          <span className="dot-label">Hey, I&apos;m David</span>
          <h1 id="hero-title" className="text-hero font-extrabold">
            Websites and emails that <span className="accent-word">sell</span>.
          </h1>
          <p className="max-w-md text-text-dim">
            I design and build websites, Shopify stores and Klaviyo emails for brands that want
            more from every visitor.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-accent py-1 pr-1 pl-5 font-semibold text-bg"
            >
              See the work
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-bg text-accent">
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 12 12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-text/40 px-5 py-2.5 font-semibold transition-colors hover:border-text"
            >
              Get in touch
            </a>
          </div>
        </div>
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-2 font-mono text-xs tracking-[0.12em] uppercase md:absolute md:inset-x-12 md:bottom-10 md:mt-0 md:flex md:justify-between">
          {services.map((s, i) => (
            <li key={s} className="text-text-dim">
              <span className="text-accent">0{i + 1}</span> {s}
            </li>
          ))}
        </ul>
      </section>

      {/* B. Intro */}
      <section aria-label="Intro" className={sectionBase}>
        <div className="flex max-w-xl flex-col gap-8">
          <p className="text-2xl leading-snug font-semibold md:text-4xl md:leading-tight">
            I&apos;m a web developer and email designer based in Nigeria, working with brands in the
            UK, Canada and at home.
          </p>
          <div className="grid grid-cols-3 gap-3">
            <WorkThumb src={site.image} alt={site.imageAlt} title={site.title} sizes="(min-width: 768px) 180px, 30vw" className="aspect-[3/4]" />
            <WorkThumb src={email.image} alt={email.imageAlt} title={email.title} sizes="(min-width: 768px) 180px, 30vw" className="aspect-[3/4] md:translate-y-8" />
            <WorkThumb src={shopify.image} alt={shopify.imageAlt} title={shopify.title} sizes="(min-width: 768px) 180px, 30vw" className="aspect-[3/4] md:translate-y-4" />
          </div>
        </div>
      </section>

      {/* C. Trusted by */}
      <section aria-label="Clients" className="relative flex min-h-[60svh] flex-col justify-end px-4 pb-16 md:justify-center md:px-12 md:pb-0">
        <div className="glass flex w-full max-w-xl flex-wrap items-center gap-x-8 gap-y-3 rounded-[20px] px-6 py-5">
          <span className="font-mono text-xs tracking-[0.12em] text-text-dim uppercase">Work for</span>
          {clients.map((c) => (
            <span key={c} className="text-lg font-bold tracking-tight">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* D. Process */}
      <section id="process" aria-labelledby="process-title" className={sectionBase}>
        <div className="flex max-w-xl flex-col gap-6">
          <span className="dot-label">How I work</span>
          <h2 id="process-title" className="text-section">
            From brief to <span className="accent-word">live</span> in [two weeks / your real
            timeframe].
          </h2>
          <ol className="flex flex-col items-start gap-3">
            {steps.map((s, i) => (
              <li key={s} className="glass inline-flex items-center gap-3 rounded-full py-2 pr-5 pl-2">
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-text/10 font-mono text-xs text-accent">
                  0{i + 1}
                </span>
                <span className="font-medium">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* E. Web × Email word-mark. The portrait fades to the page colour here. */}
      <section aria-label="Web and email" className="relative flex min-h-[120svh] flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg/70 via-50% to-bg" />
        <div className="relative px-4 text-center md:px-12">
          <div aria-hidden="true" className="flex flex-col items-center text-wordmark font-extrabold tracking-[-0.04em] uppercase">
            <span>
              Web <span className="accent-word normal-case">×</span>
            </span>
            <WorkThumb
              src={site.image}
              alt=""
              title={site.title}
              sizes="(min-width: 768px) 240px, 40vw"
              className="relative z-10 -my-[0.22em] aspect-[4/3] w-[42vw] max-w-60 -rotate-3 shadow-2xl shadow-black/60"
            />
            <span>Email</span>
          </div>
          <span className="sr-only">Web and email</span>
        </div>
      </section>
    </>
  );
}
