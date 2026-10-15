"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { EmailItem } from "@/content/work";

gsap.registerPlugin(ScrollTrigger);

type Item = EmailItem & { size: { width: number; height: number } | null };

// How long the section stays pinned while the emails slide, in px of scroll.
const PIN_DISTANCE = 1400;

export default function EmailPhones({ items }: { items: Item[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const stage = stageRef.current!;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.dataset.static = "true";
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "center center",
          end: `+=${PIN_DISTANCE}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
      stage.querySelectorAll<HTMLElement>("[data-email]").forEach((img) => {
        const screen = img.parentElement!;
        tl.fromTo(
          img,
          { y: 0 },
          { y: () => -Math.max(0, img.offsetHeight - screen.clientHeight), ease: "none" },
          0,
        );
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (track && card) track.scrollBy({ left: dir * (card.clientWidth + 24), behavior: "smooth" });
  };

  return (
    <div ref={stageRef} className="group/phones">
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] md:scroll-px-12 md:px-12 [&::-webkit-scrollbar]:hidden"
        aria-label="Emails"
      >
        {items.map((e) => (
          <li key={e.slug} className="w-[72vw] max-w-[300px] shrink-0 snap-start md:w-[calc((100%-48px)/3)] md:max-w-none">
            <div className="mx-auto w-full max-w-[min(300px,calc(60svh*9/19))]">
              <Phone item={e} />
            </div>
            <div className="mx-auto mt-5 flex w-full max-w-[min(300px,calc(60svh*9/19))] flex-col gap-1">
              <span className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
                {e.brand} · {e.period}
              </span>
              <h3 className="text-lg font-bold">{e.title}</h3>
              <p className="text-sm text-text-dim">{e.description}</p>
            </div>
          </li>
        ))}
      </ul>
      {items.length > 3 && (
        <div className="mt-6 hidden justify-end gap-2 px-12 md:flex">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous emails" className="glass size-11 rounded-full text-lg">
            ←
          </button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Next emails" className="glass size-11 rounded-full text-lg">
            →
          </button>
        </div>
      )}
    </div>
  );
}

function Phone({ item }: { item: Item }) {
  return (
    <div className="relative rounded-[44px] border border-line bg-black p-2.5 shadow-2xl shadow-black/50">
      <div className="pointer-events-none absolute top-4 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      <div
        tabIndex={0}
        aria-label={`${item.title} email`}
        className="relative aspect-[9/19] overflow-hidden rounded-[34px] bg-bg-raised group-data-[static=true]/phones:overflow-y-auto"
      >
        {item.size ? (
          <Image
            data-email
            src={item.image}
            alt={item.imageAlt}
            width={item.size.width}
            height={item.size.height}
            sizes="300px"
            className="block h-auto w-full will-change-transform"
          />
        ) : (
          <div className="flex h-full flex-col justify-end gap-1 p-5">
            <span className="font-mono text-[10px] tracking-[0.12em] text-text-dim uppercase">[email image]</span>
            <span className="text-sm font-semibold">{item.title}</span>
          </div>
        )}
      </div>
    </div>
  );
}
