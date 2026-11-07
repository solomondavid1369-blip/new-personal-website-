"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MotionProvider from "./MotionProvider";
import { emailTypes, type Email, type EmailType } from "@/content/emails";

type Item = Email & { size: { width: number; height: number } };
type Filter = "All" | EmailType;

// Roughly how fast the email scrolls inside its frame on hover, in px per second,
// and the frame width it is estimated against. Long emails take longer.
const HOVER_SCROLL_SPEED = 320;
const FRAME_WIDTH = 340;

export default function EmailGrid({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  // Only offer tabs that have at least one email.
  const filters: Filter[] = ["All", ...emailTypes.filter((t) => items.some((i) => i.type === t))];
  const shown = filter === "All" ? items : items.filter((i) => i.type === filter);

  // The grid height changes with the filter; re-measure scroll-driven sections below.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => clearTimeout(t);
  }, [filter]);

  const openIndex = openSlug ? shown.findIndex((i) => i.slug === openSlug) : -1;

  return (
    <MotionProvider>
      <div role="group" aria-label="Filter emails" className="mb-8 flex flex-wrap gap-2 px-4 md:px-12">
        {filters.map((f) => {
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
                  layoutId="active-email-chip"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          );
        })}
      </div>

      <m.ul layout className="grid gap-x-6 gap-y-12 px-4 sm:grid-cols-2 md:px-12 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((e) => (
            <m.li
              key={e.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
            >
              <EmailCard item={e} onOpen={() => setOpenSlug(e.slug)} />
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      {openIndex >= 0 && (
        <Lightbox
          items={shown}
          index={openIndex}
          onChange={(i) => setOpenSlug(shown[i].slug)}
          onClose={() => setOpenSlug(null)}
        />
      )}
    </MotionProvider>
  );
}

function KindBadge({ kind }: { kind: Email["kind"] }) {
  return kind === "Client" ? (
    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-bg">Client</span>
  ) : (
    <span className="rounded-full border border-accent bg-bg/90 px-3 py-1 text-xs font-semibold text-accent backdrop-blur">
      Concept
    </span>
  );
}

function EmailCard({ item, onOpen }: { item: Item; onOpen: () => void }) {
  const ratio = item.size.height / item.size.width;
  const seconds = Math.min(20, Math.max(3, (FRAME_WIDTH * ratio - 500) / HOVER_SCROLL_SPEED));

  return (
    <article className="flex flex-col">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${item.title}, ${item.brand} email`}
        className="relative rounded-[36px] border border-line bg-black p-2 text-left shadow-2xl shadow-black/40 transition-transform duration-300 hover:-translate-y-1"
      >
        <span className="absolute top-4 right-4 z-10">
          <KindBadge kind={item.kind} />
        </span>
        <span
          className="email-frame relative block overflow-hidden rounded-[28px] bg-bg-raised"
          style={{ ["--scroll-duration" as string]: `${seconds.toFixed(1)}s` }}
        >
          <Image
            src={item.image}
            alt={item.imageAlt}
            width={item.size.width}
            height={item.size.height}
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className="block h-auto w-full"
          />
        </span>
      </button>
      <div className="mt-5 flex flex-col gap-1.5">
        <span className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
          {item.brand} · {item.type}
        </span>
        <h3 className="text-lg leading-snug font-bold">{item.title}</h3>
        <p className="text-sm text-text-dim">{item.description}</p>
      </div>
    </article>
  );
}

function Lightbox({
  items,
  index,
  onChange,
  onClose,
}: {
  items: Item[];
  index: number;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const item = items[index];
  const go = useCallback(
    (d: 1 | -1) => onChange((index + d + items.length) % items.length),
    [index, items.length, onChange],
  );

  // A modal <dialog> keeps focus inside itself and makes the page behind inert.
  useEffect(() => {
    const dialog = dialogRef.current!;
    const opener = document.activeElement as HTMLElement | null;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
      opener?.focus();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      aria-labelledby="email-lightbox-title"
      className="m-0 h-dvh max-h-none w-full max-w-none bg-bg/95 p-0 text-text backdrop-blur-md backdrop:bg-black/70"
    >
      <div
        className="mx-auto flex h-full max-w-6xl flex-col md:flex-row md:items-center md:gap-10 md:px-12"
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
      >
        <div className="flex items-start justify-between gap-4 px-4 pt-4 pb-3 md:order-2 md:w-80 md:shrink-0 md:flex-col md:px-0">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <KindBadge kind={item.kind} />
              <span className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
                {item.brand} · {item.type}
              </span>
            </div>
            <h3 id="email-lightbox-title" className="text-lg leading-tight font-bold md:text-2xl">
              {item.title}
            </h3>
            <p className="hidden text-text-dim md:block">{item.description}</p>
            <span className="hidden font-mono text-xs text-text-dim md:block">
              {index + 1} / {items.length}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 md:mt-4">
            {items.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous email" className="glass size-10 rounded-full text-lg">
                  ←
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next email" className="glass size-10 rounded-full text-lg">
                  →
                </button>
              </>
            )}
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              aria-label="Close"
              className="ml-2 size-10 rounded-full bg-text text-lg text-bg"
            >
              ✕
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          data-lenis-prevent
          tabIndex={0}
          role="region"
          aria-label={`${item.title}, full email`}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 md:h-full md:py-8"
        >
          <Image
            key={item.slug}
            src={item.image}
            alt={item.imageAlt}
            width={item.size.width}
            height={item.size.height}
            sizes="(min-width: 768px) 600px, 100vw"
            className="mx-auto block h-auto w-full max-w-[600px] rounded-2xl"
          />
          <p className="mx-auto mt-4 max-w-[600px] text-sm text-text-dim md:hidden">{item.description}</p>
        </div>
      </div>
    </dialog>
  );
}
