import HeroSequence from "@/components/HeroSequence";
import Nav from "@/components/Nav";
import Year from "@/components/Year";
import PortraitZone from "@/components/sections/PortraitZone";

// F to H get built in Phases 4 and 6.
const darkZone = [
  { id: "work", label: "Selected work", heading: "Recent work." },
  { id: "emails", label: "Email design", heading: "Emails people actually scroll." },
  { id: "contact", label: "Contact", heading: "Ready to grow" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSequence>
          <PortraitZone />
        </HeroSequence>

        <div className="bg-bg">
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
      </main>
      <footer className="px-4 py-12 text-sm text-text-dim md:px-12">
        © <Year /> David Solomon. Websites and emails that sell.
      </footer>
    </>
  );
}
