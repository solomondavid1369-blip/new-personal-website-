import EmailPhones from "@/components/EmailPhones";
import { emailImageSizes } from "@/content/email-images";
import { emails } from "@/content/work";
import { publicFileExists } from "@/lib/public-file";

// G. Email showcase. Each email scrolls inside a phone frame as you scroll the page.
export default function EmailShowcase() {
  const items = emails.map((e) => {
    const size = emailImageSizes[e.slug];
    return { ...e, size: size && publicFileExists(e.image) ? size : null };
  });

  return (
    <section id="emails" aria-labelledby="emails-title" className="overflow-hidden py-24 md:py-32">
      <div className="mb-10 flex flex-col gap-4 px-4 md:mb-14 md:px-12">
        <span className="dot-label">Email design</span>
        <h2 id="emails-title" className="text-section">
          Emails people actually <span className="accent-word">scroll</span>.
        </h2>
      </div>
      <EmailPhones items={items} />
    </section>
  );
}
