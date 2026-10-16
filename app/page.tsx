import HeroScenes from "@/components/HeroScenes";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import Year from "@/components/Year";
import EmailShowcase from "@/components/sections/EmailShowcase";
import PortraitZone from "@/components/sections/PortraitZone";
import SelectedWork from "@/components/sections/SelectedWork";

export default function Home() {
  return (
    <>
      <Motion />
      <Nav />
      <main>
        <HeroScenes
          scenes={["01-sunglasses", "02-closeup", "03-standing", "04-seated"]}
          alt="David Solomon in sunglasses, lit by a warm gold light on a black background"
        >
          <PortraitZone />
        </HeroScenes>

        <div className="bg-bg">
          <SelectedWork />
          <EmailShowcase />
        </div>

        {/* H. Contact. Content and form arrive in Phase 6. */}
        <HeroScenes scenes={["05-pointing"]} alt="David Solomon pointing towards the camera" eager={false}>
          <section
            id="contact"
            aria-labelledby="contact-title"
            className="flex min-h-svh flex-col justify-end gap-4 px-4 pb-16 md:justify-center md:px-12 md:pb-0"
          >
            <span className="dot-label">Contact</span>
            <h2 id="contact-title" className="text-section max-w-xl">
              Ready to grow
            </h2>
          </section>
        </HeroScenes>
      </main>
      <footer className="px-4 py-12 text-sm text-text-dim md:px-12">
        © <Year /> David Solomon. Websites and emails that sell.
      </footer>
    </>
  );
}
