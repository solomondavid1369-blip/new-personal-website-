"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, m } from "framer-motion";
import MotionProvider from "./MotionProvider";
import Placeholder from "./Placeholder";
import Thumb from "./Thumb";
import { isPlaceholder, showPlaceholders } from "@/lib/placeholder";
import { workFilters, type WorkItem, type WorkTag } from "@/content/work";

type Item = WorkItem & { hasImage: boolean };
type Filter = (typeof workFilters)[number];

const filterTag: Record<Exclude<Filter, "All">, WorkTag> = {
  Websites: "Website",
  Emails: "Emails",
  Shopify: "Shopify",
};

const isLiveUrl = (url?: string) => !!url && /^https?:\/\//.test(url);

export default function WorkGrid({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? items : items.filter((i) => i.tags.includes(filterTag[filter]));

  // The grid height changes with the filter, which moves every scroll-driven
  // section below it. Recalculate their positions once the layout settles.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => clearTimeout(t);
  }, [filter]);

  return (
    <MotionProvider>
      <div role="group" aria-label="Filter work" className="mb-8 flex flex-wrap gap-2">
        {workFilters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                active ? "text-bg" : "border border-line text-text-dim hover:text-text"
              }`}
            >
              {active && (
                <m.span
                  layoutId="active-chip"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          );
        })}
      </div>

      <m.ul layout className="grid gap-x-6 gap-y-12 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((item) => (
            <m.li
              key={item.slug}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <WorkCard item={item} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>
    </MotionProvider>
  );
}

function WorkCard({ item }: { item: Item }) {
  const live = isLiveUrl(item.url);
  const media = (
    <div className="relative">
      <Thumb
        src={item.image}
        alt={item.imageAlt}
        title={item.title}
        hasImage={item.hasImage}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="aspect-[4/5] transition-transform duration-500 group-hover:scale-[0.985]"
      />
      <div className="absolute top-3 right-3 flex gap-1.5">
        {item.concept && (
          <span className="rounded-full border border-accent bg-bg/90 px-3 py-1 text-xs font-semibold text-accent backdrop-blur">
            Concept
          </span>
        )}
        {item.tags.map((t) => (
          <span key={t} className="rounded-full border border-line bg-bg/90 px-3 py-1 text-xs font-medium backdrop-blur">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
  const meta = (
    <div className="mt-5 flex flex-col gap-1.5">
      <span className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
        {item.tags.join(" · ")}
        {item.concept && " · Concept"}
      </span>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-bold md:text-2xl">{item.title}</h3>
        <span className="font-mono text-xs text-text-dim">{item.year}</span>
      </div>
      <p className="text-text-dim">{item.description}</p>
    </div>
  );

  if (item.caseStudy) return <CaseStudyCard item={item} media={media} meta={meta} />;

  return live ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
      {media}
      {meta}
      <span className="mt-2 inline-block text-sm font-semibold underline-offset-4 group-hover:underline">Visit site ↗</span>
    </a>
  ) : (
    <div className="group">
      {media}
      {meta}
    </div>
  );
}

function CaseStudyCard({ item, media, meta }: { item: Item; media: ReactNode; meta: ReactNode }) {
  const [open, setOpen] = useState(false);
  const study = item.caseStudy!;
  const panelId = `case-${item.slug}`;
  const rows: [string, string][] = [
    ["The problem", study.problem],
    ["What I built", study.built],
    ["The result", study.result],
  ];

  // Opening the panel changes the page height; re-measure scroll-driven sections below.
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <div className="group">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="block w-full text-left"
      >
        {media}
        {meta}
        <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-text/40 px-4 py-2 text-sm font-semibold transition-colors group-hover:border-text">
          {open ? "Close case study" : "Read the case study"}
          <span aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
            +
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            className="overflow-hidden"
          >
            <dl className="mt-5 grid gap-5 rounded-[20px] border border-line bg-bg-raised p-5 md:p-6">
              {rows.map(([label, text]) =>
                isPlaceholder(text) && !showPlaceholders ? null : (
                  <div key={label} className="flex flex-col gap-1.5">
                    <dt className="font-mono text-xs tracking-[0.12em] text-accent uppercase">{label}</dt>
                    <dd className="text-text">{isPlaceholder(text) ? <Placeholder text={text} /> : text}</dd>
                  </div>
                ),
              )}
              {isLiveUrl(item.url) && (
                <div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center gap-2 self-start rounded-full bg-accent py-1 pr-1 pl-5 font-semibold text-bg transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Visit live page
                  <span className="inline-flex size-8 items-center justify-center rounded-full bg-bg text-accent transition-transform duration-300 group-hover/link:rotate-45">
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 12 12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
                </div>
              )}
            </dl>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
