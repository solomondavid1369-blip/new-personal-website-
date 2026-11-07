import EmailGrid from "@/components/EmailGrid";
import { emails } from "@/content/emails";
import { publicImageSize } from "@/lib/public-file";

// G. Email showcase: a filterable grid of phone frames. Hover scrolls an email
// inside its frame; clicking opens it full length in a lightbox.
// Image sizes are read from disk once, at build time.
async function getEmailItems() {
  "use cache";
  // An email whose image is not in /public yet is left out until it is.
  return emails.flatMap((e) => {
    const size = publicImageSize(e.image);
    return size ? [{ ...e, size }] : [];
  });
}

export default async function EmailShowcase() {
  const items = await getEmailItems();

  return (
    <section id="emails" aria-labelledby="emails-title" className="py-16 md:py-24">
      <div className="mb-8 flex flex-col gap-4 px-4 md:px-12">
        <span className="dot-label">Email design</span>
        <h2 id="emails-title" data-reveal className="text-section">
          Emails people actually <span className="accent-word">scroll</span>.
        </h2>
      </div>
      <EmailGrid items={items} />
    </section>
  );
}
