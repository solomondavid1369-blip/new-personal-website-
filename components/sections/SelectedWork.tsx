import WorkGrid from "@/components/WorkGrid";
import { work } from "@/content/work";
import { publicFileExists } from "@/lib/public-file";

// F. Selected work. Everything comes from content/work.ts.
export default function SelectedWork() {
  const items = work.map((w) => ({ ...w, hasImage: publicFileExists(w.image) }));

  return (
    <section id="work" aria-labelledby="work-title" className="px-4 pt-8 pb-12 md:px-12 md:pt-16 md:pb-16">
      <div className="mb-10 flex flex-col gap-4 md:mb-14">
        <span className="dot-label">Selected work</span>
        <h2 id="work-title" data-reveal className="text-section">
          Recent <span className="accent-word">work</span>.
        </h2>
      </div>
      <WorkGrid items={items} />
    </section>
  );
}
