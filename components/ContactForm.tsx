"use client";

import { useRef, useState, type FormEvent } from "react";
import { contact } from "@/content/work";

const needs = ["Website", "Shopify", "Emails", "All of it"];
const budgets = ["Under $500", "$500 to $1,500", "$1,500 to $5,000", "$5,000+"];

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-xl border border-line bg-bg/70 px-4 py-3 text-text placeholder:text-text-dim/70 transition-colors focus:border-accent focus:outline-none";
const label = "mb-2 block text-sm font-medium";

// Sends to Formspree. The form ID comes from NEXT_PUBLIC_FORMSPREE_ID.
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const resultRef = useRef<HTMLParagraphElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const id = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    setStatus("sending");

    let ok = false;
    if (id) {
      try {
        const res = await fetch(`https://formspree.io/f/${id}`, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        ok = res.ok;
      } catch {
        ok = false;
      }
    } else {
      console.warn("NEXT_PUBLIC_FORMSPREE_ID is not set, so the contact form cannot send.");
    }

    setStatus(ok ? "success" : "error");
    if (ok) form.reset();
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div className="rounded-[20px] border border-line bg-bg/85 p-6 backdrop-blur-md md:p-8">
        <p ref={resultRef} tabIndex={-1} role="status" className="text-xl font-semibold focus:outline-none">
          Thanks, your message is in.
        </p>
        <p className="mt-2 text-text-dim">I&apos;ll get back to you soon.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold underline underline-offset-4"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-5 rounded-[20px] border border-line bg-bg/85 p-5 backdrop-blur-md md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
      </div>

      <div>
        <label htmlFor="website" className={label}>
          Website <span className="font-normal text-text-dim">(optional)</span>
        </label>
        <input id="website" name="website" inputMode="url" autoComplete="url" className={field} />
      </div>

      <fieldset>
        <legend className={label}>What do you need</legend>
        <div className="flex flex-wrap gap-2">
          {needs.map((n, i) => (
            <label key={n} className="cursor-pointer">
              <input type="radio" name="need" value={n} required={i === 0} className="peer sr-only" />
              <span className="inline-block rounded-full border border-line px-4 py-2 text-sm font-semibold text-text-dim transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:text-text">
                {n}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="budget" className={label}>Budget</label>
        <div className="relative">
          <select id="budget" name="budget" required defaultValue="" className={`${field} appearance-none pr-10 [&>option]:bg-bg`}>
            <option value="" disabled>
              Choose a range (USD)
            </option>
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <svg aria-hidden="true" viewBox="0 0 16 16" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-text-dim" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={label}>Message</label>
        <textarea id="message" name="message" required rows={5} className={`${field} resize-y`} />
      </div>

      {/* Spam trap: people never see or fill this. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2 rounded-full bg-accent py-1 pr-1 pl-5 font-semibold text-bg transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-bg text-accent transition-transform duration-300 group-hover:rotate-45">
            <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 12 12 4M6 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
        {status === "error" && (
          <p ref={resultRef} tabIndex={-1} role="alert" className="text-sm text-text focus:outline-none">
            That didn&apos;t send. Please try again, or email me at{" "}
            <a href={`mailto:${contact.email}`} className="font-semibold underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
