"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DESKTOP_QUERY = "(min-width: 768px)";
// How far each scene slowly zooms while it is on screen.
const SCENE_SCALE = 1.06;

type Props = {
  /** Scene file names in /public/hero/{desktop,mobile}/, e.g. "01-sunglasses". */
  scenes: string[];
  /** Alt text for the first scene; the rest are decorative. */
  alt: string;
  /**
   * true: the first scene loads with the page (the hero).
   * false: nothing loads until the zone is about two screens away (contact).
   */
  eager?: boolean;
  children?: ReactNode;
};

const src = (set: "desktop" | "mobile", scene: string) => `/hero/${set}/${scene}.webp`;

// Still scenes pinned behind a run of sections. A section marked
// data-scene="2" crossfades scene 2 in over half a screen of scroll as it
// arrives, and every scene zooms gently while it is showing.
export default function HeroScenes({ scenes, alt, eager = true, children }: Props) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  // How many scenes may load: the first one up front (when eager), the rest once it is in.
  const [loadCount, setLoadCount] = useState(eager ? 1 : 0);

  useEffect(() => {
    const zone = zoneRef.current!;
    const stage = stageRef.current!;
    const layers = Array.from(stage.querySelectorAll<HTMLElement>("[data-scene-layer]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const loadAll = () => setLoadCount(scenes.length);
    const first = stage.querySelector("img");
    if (eager) {
      if (!first || first.complete) loadAll();
      else first.addEventListener("load", loadAll, { once: true });
    }

    ScrollTrigger.config({ ignoreMobileResize: true });

    const ctx = gsap.context(() => {
      if (!eager) {
        ScrollTrigger.create({ trigger: zone, start: "top bottom+=200%", once: true, onEnter: loadAll });
      }

      gsap.set(layers.slice(1), { autoAlpha: 0 });

      // Where each scene starts showing: the zone itself for the first one,
      // its marked section for the rest.
      const markers = layers.map((_, i) =>
        i === 0 ? zone : zone.querySelector<HTMLElement>(`[data-scene="${i}"]`),
      );

      layers.forEach((layer, i) => {
        const marker = markers[i];
        if (!marker) return;

        if (i > 0) {
          if (reducedMotion) {
            // A simple timed fade instead of one tied to scroll.
            ScrollTrigger.create({
              trigger: marker,
              start: "top 50%",
              onEnter: () => gsap.to(layer, { autoAlpha: 1, duration: 0.5 }),
              onLeaveBack: () => gsap.to(layer, { autoAlpha: 0, duration: 0.5 }),
            });
          } else {
            gsap.to(layer, {
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: { trigger: marker, start: "top bottom", end: "top 50%", scrub: true },
            });
          }
        }

        if (!reducedMotion) {
          // Zoom from when this scene starts arriving until the next one has covered it.
          const next = markers[i + 1];
          // The layer zooms rather than its image, so it works before the image has loaded.
          gsap.fromTo(
            layer,
            { scale: 1 },
            {
              scale: SCENE_SCALE,
              ease: "none",
              scrollTrigger: {
                trigger: i === 0 ? zone : marker,
                start: i === 0 ? "top top" : "top bottom",
                endTrigger: next ?? zone,
                end: next ? "top 50%" : "bottom bottom",
                scrub: true,
              },
            },
          );
        }
      });
    }, zone);

    return () => {
      first?.removeEventListener("load", loadAll);
      ctx.revert();
    };
  }, [eager, scenes.length]);

  return (
    <div ref={zoneRef} className="relative bg-black">
      {/* The first scene is fetched with the page so it shows straight away. */}
      {eager && (
        <>
          <link rel="preload" as="image" href={src("desktop", scenes[0])} media={DESKTOP_QUERY} fetchPriority="high" />
          <link rel="preload" as="image" href={src("mobile", scenes[0])} media="(max-width: 767px)" fetchPriority="high" />
        </>
      )}

      {/* Sticky, so the scenes stay put behind the whole zone. The content is
          pulled up by one screen to sit over it. */}
      <div ref={stageRef} className="sticky top-0 h-lvh w-full overflow-hidden">
        {scenes.map((scene, i) => (
          <div key={scene} data-scene-layer className="absolute inset-0 will-change-transform">
            {i < loadCount && (
              <picture>
                <source media={DESKTOP_QUERY} srcSet={src("desktop", scene)} width={2048} height={1152} />
                {/* Already-optimised WebP, served as-is rather than re-encoded by next/image. */}
                <img
                  src={src("mobile", scene)}
                  width={1152}
                  height={2048}
                  alt={i === 0 ? alt : ""}
                  fetchPriority={eager && i === 0 ? "high" : "auto"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </picture>
            )}
          </div>
        ))}
        <div className="hero-grain pointer-events-none absolute inset-0" />
        <div className="hero-scrim pointer-events-none absolute inset-0" />
      </div>

      <div className="relative z-10 -mt-[100lvh]">{children}</div>
    </div>
  );
}
