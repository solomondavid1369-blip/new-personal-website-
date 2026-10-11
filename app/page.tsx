// Phase 1: section shells only. Content and motion arrive in later phases.

import Year from "@/components/Year";

const portraitZone = [
  { id: "hero", label: "A. Hero", heading: "Websites and emails that sell." },
  { id: "intro", label: "B. Intro", heading: "Intro" },
  { id: "clients", label: "C. Trusted by", heading: "Work for" },
  { id: "process", label: "D. Process", heading: "How I work" },
  { id: "wordmark", label: "E. Word-mark", heading: "WEB × EMAIL" },
];

const darkZone = [
  { id: "work", label: "F. Selected work", heading: "Recent work." },
  { id: "emails", label: "G. Email showcase", heading: "Emails people actually scroll." },
  { id: "contact", label: "H. Contact", heading: "Ready to grow" },
];

function Shell({ id, label, heading }: { id: string; label: string; heading: string }) {
  return (
    <section
      id={id}
      className="flex min-h-[70svh] flex-col justify-center gap-4 border-b border-line px-4 py-16 md:px-12"
    >
      <span className="dot-label">{label}</span>
      <h2 className="text-section">{heading}</h2>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 md:px-12">
        <span className="font-semibold">David Solomon</span>
        <nav aria-label="Main" className="hidden gap-6 text-sm text-text-dim md:flex">
          <a href="#work">Work</a>
          <a href="#process">Process</a>
          <a href="#emails">Emails</a>
          <a href="#contact">Contact</a>
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-text px-4 py-2 text-sm font-semibold text-bg"
        >
          Get in touch
        </a>
      </header>

      <div id="portrait-zone">
        {portraitZone.map((s, i) =>
          i === 0 ? (
            <section
              key={s.id}
              id={s.id}
              className="flex min-h-svh flex-col justify-center gap-6 border-b border-line px-4 pt-24 md:px-12"
            >
              <span className="dot-label">Hey, I&apos;m David</span>
              <h1 className="max-w-4xl text-hero font-extrabold">
                Websites and emails that <span className="accent-word">sell</span>.
              </h1>
            </section>
          ) : (
            <Shell key={s.id} {...s} />
          ),
        )}
      </div>

      <div id="dark-zone" className="bg-bg">
        {darkZone.map((s) => (
          <Shell key={s.id} {...s} />
        ))}
      </div>

      <footer className="px-4 py-12 text-sm text-text-dim md:px-12">
        © <Year /> David Solomon. Websites and emails that sell.
      </footer>
    </main>
  );
}
