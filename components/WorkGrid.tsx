"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, m } from "framer-motion";
import MotionProvider from "./MotionProvider";
import Thumb from "./Thumb";
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
  const body = (
    <>
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
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border border-line bg-bg/90 px-3 py-1 text-xs font-medium backdrop-blur">
              {t}
            </span>
          ))}
        </div>
      </div>
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
        {live && <span className="mt-1 text-sm font-semibold underline-offset-4 group-hover:underline">Visit site ↗</span>}
        {!live && item.url && <span className="mt-1 font-mono text-xs text-text-dim">Live: {item.url}</span>}
      </div>
    </>
  );

  return live ? (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <div className="group">{body}</div>
  );
}
