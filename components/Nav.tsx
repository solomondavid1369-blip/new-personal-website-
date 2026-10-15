"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ArrowCircle from "./ArrowCircle";

const links = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#emails", label: "Emails" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-0 h-28 bg-gradient-to-b from-bg/80 to-transparent" />
      <div className="relative z-10 flex items-center justify-between gap-3 px-4 py-4 md:px-12">
        <a href="#top" className="relative z-10 font-semibold tracking-tight">
          David Solomon
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 text-sm text-text-dim md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-text">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-text py-1 pr-1 pl-4 text-sm font-semibold text-bg"
          >
            Get in touch
            <ArrowCircle />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="glass inline-flex size-9 items-center justify-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 h-0.5 w-4 rounded bg-text transition-transform duration-300 ${open ? "top-[5px] rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-0.5 w-4 rounded bg-text transition-transform duration-300 ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-0 flex flex-col justify-between bg-bg px-4 pt-24 pb-10 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-2">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-2 text-[40px] leading-none font-bold tracking-tight"
                    >
                      <span className="font-mono text-xs text-accent">0{i + 1}</span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <p className="text-sm text-text-dim">Websites and emails that sell.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
