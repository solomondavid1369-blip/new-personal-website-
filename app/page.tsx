// Phase 2: hero sequence test page. A tall empty portrait zone scrubs the
// frames; the section shells below show where the zone ends.

import HeroSequence from "@/components/HeroSequence";
import Year from "@/components/Year";

const darkZone = [
  { id: "work", label: "F. Selected work", heading: "Recent work." },
  { id: "emails", label: "G. Email showcase", heading: "Emails people actually scroll." },
  { id: "contact", label: "H. Contact", heading: "Ready to grow" },
];

export default function Home() {
  return (
    <main>
      <HeroSequence debug>
        <div className="flex h-[500svh] flex-col px-4 pt-16 md:px-12">
          <span className="dot-label">Hero sequence test · scroll</span>
        </div>
      </HeroSequence>

      <div id="dark-zone" className="bg-bg">
        {darkZone.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="flex min-h-[70svh] flex-col justify-center gap-4 border-b border-line px-4 py-16 md:px-12"
          >
            <span className="dot-label">{s.label}</span>
            <h2 className="text-section">{s.heading}</h2>
          </section>
        ))}
      </div>

      <footer className="px-4 py-12 text-sm text-text-dim md:px-12">
        © <Year /> David Solomon. Websites and emails that sell.
      </footer>
    </main>
  );
}
