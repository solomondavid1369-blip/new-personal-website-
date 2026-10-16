import HeroScenes from "@/components/HeroScenes";
import Motion from "@/components/Motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Contact from "@/components/sections/Contact";
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

        {/* H. Contact */}
        <HeroScenes scenes={["05-pointing"]} alt="David Solomon pointing towards the camera" eager={false}>
          <Contact />
        </HeroScenes>
      </main>
      <Footer />
    </>
  );
}
