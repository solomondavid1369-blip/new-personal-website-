"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Page-wide scroll motion, driven by data attributes in the markup:
//   data-reveal          lines slide up with a slight fade when they enter
//   data-steps           children appear one by one as the block scrolls past
//   data-parallax="80"   rises that many px into place as its section scrolls in
//   data-swap            crossfades between its children as the section scrolls
// Nothing runs for visitors who prefer reduced motion.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("motion");
      return;
    }

    // Smooth wheel scrolling, kept in step with ScrollTrigger. Touch scrolling stays native.
    const lenis = new Lenis({ autoRaf: false, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const splits: SplitText[] = [];
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          splits.push(
            SplitText.create(el, {
              type: "lines",
              mask: "lines",
              autoSplit: true,
              onSplit(self) {
                gsap.set(el, { visibility: "visible" });
                return gsap.from(self.lines, {
                  yPercent: 100,
                  opacity: 0,
                  duration: 0.8,
                  ease: "power3.out",
                  stagger: 0.08,
                  scrollTrigger: { trigger: el, start: "top 88%", once: true },
                });
              },
            }),
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-steps]").forEach((list) => {
          gsap.from(list.children, {
            opacity: 0,
            x: -24,
            ease: "power3.out",
            stagger: 0.5,
            scrollTrigger: { trigger: list, start: "top 85%", end: "bottom 45%", scrub: 0.5 },
          });
        });

        // Start lower and rise into place, so a card never drifts above its
        // resting spot and over the text above it.
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { y: Number(el.dataset.parallax || 60) },
            {
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("section") ?? el,
                start: "top bottom",
                end: "bottom bottom",
                scrub: 0.5,
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-swap]").forEach((el) => {
          const layers = Array.from(el.children) as HTMLElement[];
          let shown = 0;
          gsap.set(layers.slice(1), { autoAlpha: 0 });
          ScrollTrigger.create({
            trigger: el.closest("section") ?? el,
            start: "top bottom",
            end: "bottom top",
            onUpdate(self) {
              // Swap a few times across the section: site, email, site, email...
              const next = Math.min(layers.length * 2 - 1, Math.floor(self.progress * layers.length * 2)) % layers.length;
              if (next === shown) return;
              gsap.to(layers[shown], { autoAlpha: 0, duration: 0.4, ease: "power2.out" });
              gsap.to(layers[next], { autoAlpha: 1, duration: 0.4, ease: "power2.out" });
              shown = next;
            },
          });
        });
      });
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx?.revert();
      splits.forEach((s) => s.revert());
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return null;
}
