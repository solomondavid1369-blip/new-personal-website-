"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroFrames } from "@/content/hero-frames";
import { FrameSequence, frameUrl } from "@/lib/frame-sequence";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_QUERY = "(max-width: 767px)";
const MAX_DPR = 2;

// Where David sits in the desktop frames (fraction of frame width), and where
// we want him on screen so the left side stays clear for text.
const DESKTOP_SUBJECT_X = 0.66;
const DESKTOP_TARGET_X = 0.74;
const DESKTOP_MAX_SHIFT = 0.15;
// Keep the head in view when the frame is cropped top/bottom.
const FOCAL_Y = 0.2;
// Frame shown when the visitor prefers reduced motion.
const STILL_FRAME = 0;

type SetName = keyof typeof heroFrames;

type Props = {
  children?: ReactNode;
  /** Show a small frame/loading readout. For testing only. */
  debug?: boolean;
};

export default function HeroSequence({ children, debug = false }: Props) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [readout, setReadout] = useState("");

  useEffect(() => {
    const zone = zoneRef.current!;
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: false })!;

    const setName: SetName = window.matchMedia(MOBILE_QUERY).matches ? "mobile" : "desktop";
    const info = heroFrames[setName];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const lowData =
      !!connection?.saveData || /(^|-)2g$|^3g$/.test(connection?.effectiveType ?? "");

    const seq = new FrameSequence(`/hero/${setName}`, info.count, lowData ? 2 : 1);
    const state = { frame: reducedMotion ? STILL_FRAME : 0 };
    let drawn = -1;

    const draw = (force = false) => {
      const hit = seq.nearest(state.frame);
      if (!hit || (!force && hit.index === drawn)) return;
      drawn = hit.index;

      const W = canvas.width;
      const H = canvas.height;
      const iw = hit.image.naturalWidth;
      const ih = hit.image.naturalHeight;
      const scale = Math.max(W / iw, H / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      let dx = setName === "desktop" ? W - dw : (W - dw) / 2;
      const dy = (H - dh) * FOCAL_Y;

      if (setName === "desktop") {
        const subject = dx + dw * DESKTOP_SUBJECT_X;
        const target = W * DESKTOP_TARGET_X;
        if (subject < target) dx += Math.min(target - subject, W * DESKTOP_MAX_SHIFT);
      }

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);
      ctx.drawImage(hit.image, dx, dy, dw, dh);

      if (debug) {
        setReadout(
          `${setName} · frame ${hit.index + 1}/${info.count} · loaded ${seq.loadedCount}` +
            (lowData ? " · save-data" : "") +
            (reducedMotion ? " · reduced-motion" : ""),
        );
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(stage.clientWidth * dpr);
      canvas.height = Math.round(stage.clientHeight * dpr);
      ctx.imageSmoothingQuality = "high";
      draw(true);
    };

    seq.onLoad = (index) => {
      // Redraw when a frame arrives that is closer to where the scroll is.
      if (Math.abs(index - state.frame) < Math.abs(drawn - state.frame) || drawn === -1) {
        draw(true);
      } else if (debug) {
        draw(true);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    resize();

    ScrollTrigger.config({ ignoreMobileResize: true });

    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: zone,
        start: "top top",
        end: "bottom bottom",
        pin: stage,
        pinSpacing: false,
      });

      if (!reducedMotion) {
        gsap.to(state, {
          frame: info.count - 1,
          ease: "none",
          scrollTrigger: {
            trigger: zone,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
          onUpdate: () => draw(),
        });
      }
    }, zone);

    if (reducedMotion) seq.loadOnly(STILL_FRAME);
    else seq.start(0);

    return () => {
      seq.cancel();
      ro.disconnect();
      gsapCtx.revert();
    };
  }, [debug]);

  return (
    <div ref={zoneRef} className="relative bg-black">
      {/* Frame 1 of each set, fetched with the page so it can be drawn immediately. */}
      <link
        rel="preload"
        as="image"
        href={frameUrl("/hero/desktop", 0)}
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={frameUrl("/hero/mobile", 0)}
        media={MOBILE_QUERY}
        fetchPriority="high"
      />

      <div ref={stageRef} className="absolute inset-x-0 top-0 h-lvh overflow-hidden">
        <canvas ref={canvasRef} className="block h-full w-full" aria-hidden="true" />
        <div className="hero-scrim pointer-events-none absolute inset-0" />
      </div>

      <div className="relative z-10">{children}</div>

      {debug && readout && (
        <p className="fixed bottom-3 left-3 z-50 rounded-full bg-black/70 px-3 py-1.5 font-mono text-[11px] text-text">
          {readout}
        </p>
      )}
    </div>
  );
}
