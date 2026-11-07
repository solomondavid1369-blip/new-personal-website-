"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { EmailItem } from "@/content/work";

type Item = EmailItem & { size: { width: number; height: number } };

// Columns per breakpoint: phones get 2, tablets 3, desktops 4.
const COLUMN_COUNTS = { base: 2, md: 3, lg: 4 } as const;
// Drift speed in px per second for each column. Slightly different speeds keep
// it from looking mechanical; slow enough to read headlines as they pass.
const SPEEDS = [26, 20, 24, 18];

/** Spread emails across n columns so each column mixes brands. */
function toColumns(items: Item[], n: number) {
  const cols: Item[][] = Array.from({ length: n }, () => []);
  items.forEach((item, i) => cols[i % n].push(item));
  return cols;
}

export default function EmailWall({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="relative">
        {[COLUMN_COUNTS.base, COLUMN_COUNTS.md, COLUMN_COUNTS.lg].map((n) => (
          <div
            key={n}
            className={`email-wall relative h-[78svh] overflow-hidden px-4 md:h-[86svh] md:px-12 ${
              n === COLUMN_COUNTS.base ? "flex md:hidden" : n === COLUMN_COUNTS.md ? "hidden md:flex lg:hidden" : "hidden lg:flex"
            } gap-3 md:gap-5`}
          >
            {toColumns(items, n).map((col, c) => (
              <Column
                key={c}
                items={col}
                reverse={c % 2 === 1}
                speed={SPEEDS[c % SPEEDS.length]}
                onOpen={(slug) => setOpen(items.findIndex((i) => i.slug === slug))}
                sizes={n === 2 ? "45vw" : n === 3 ? "30vw" : "22vw"}
              />
            ))}
          </div>
        ))}
        <p className="mt-6 px-4 font-mono text-xs tracking-[0.12em] text-text-dim uppercase md:px-12">
          {items.length} emails · Tap any email to read it in full
        </p>
      </div>

      {open !== null && <Viewer items={items} index={open} onChange={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}

function Column({
  items,
  reverse,
  speed,
  onOpen,
  sizes,
}: {
  items: Item[];
  reverse: boolean;
  speed: number;
  onOpen: (slug: string) => void;
  sizes: string;
}) {
  // The list is drawn twice so the loop has no seam; the copy is hidden from screen readers.
  const list = (copy: boolean) => (
    <ul className="flex flex-col gap-3 pb-3 md:gap-5 md:pb-5" aria-hidden={copy || undefined}>
      {items.map((e) => (
        <li key={e.slug}>
          <button
            type="button"
            tabIndex={copy ? -1 : 0}
            onClick={() => onOpen(e.slug)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-bg-raised text-left"
          >
            <Image
              src={e.image}
              alt={copy ? "" : e.imageAlt}
              width={e.size.width}
              height={e.size.height}
              sizes={sizes}
              className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
              <span className="font-mono text-[10px] tracking-[0.12em] text-accent uppercase">{e.brand}</span>
              <span className="text-sm leading-tight font-semibold text-text">{e.title}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );

  // Loop length depends on the column's height, so set the duration from it
  // to keep a steady speed on every screen size.
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current!;
    const set = () => {
      track.style.animationDuration = `${Math.max(20, track.scrollHeight / 2 / speed)}s`;
    };
    const ro = new ResizeObserver(set);
    ro.observe(track);
    set();
    return () => ro.disconnect();
  }, [speed]);

  return (
    <div className="email-col min-w-0 flex-1">
      <div
        ref={trackRef}
        className="email-track"
        style={{ animationDuration: "240s", animationDirection: reverse ? "reverse" : "normal" }}
      >
        {list(false)}
        {list(true)}
      </div>
    </div>
  );
}

function Viewer({
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
  const go = useCallback((d: 1 | -1) => onChange((index + d + items.length) % items.length), [index, items.length, onChange]);

  useEffect(() => {
    const dialog = dialogRef.current!;
    if (!dialog.open) dialog.showModal();
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
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
      aria-labelledby="email-viewer-title"
      className="m-0 h-dvh max-h-none w-full max-w-none bg-bg/95 p-0 text-text backdrop-blur-md backdrop:bg-black/70"
    >
      <div className="mx-auto flex h-full max-w-6xl flex-col md:flex-row md:gap-10 md:px-12">
        <div className="flex items-start justify-between gap-4 px-4 pt-4 pb-3 md:order-2 md:w-80 md:shrink-0 md:flex-col md:justify-center md:px-0">
          <div className="flex min-w-0 flex-col gap-1.5">
            <span className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
              {item.brand} · {item.period}
            </span>
            <h3 id="email-viewer-title" className="text-lg leading-tight font-bold md:text-2xl">
              {item.title}
            </h3>
            <p className="hidden text-text-dim md:block">{item.description}</p>
            <span className="hidden font-mono text-xs text-text-dim md:block">
              {index + 1} / {items.length}
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 md:mt-6">
            <button type="button" onClick={() => go(-1)} aria-label="Previous email" className="glass size-10 rounded-full text-lg">
              ←
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next email" className="glass size-10 rounded-full text-lg">
              →
            </button>
            <button
              type="button"
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
          aria-label={`${item.title}, full email`}
          role="region"
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 md:py-8"
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
