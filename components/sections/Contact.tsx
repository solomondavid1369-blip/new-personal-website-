import ContactForm from "@/components/ContactForm";
import { contact } from "@/content/work";

// H. Contact. Sits over scene 05.
export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative flex min-h-svh flex-col justify-center px-4 py-28 md:px-12"
    >
      <div className="flex w-full max-w-xl flex-col gap-8">
        <div className="flex flex-col gap-4">
          <span className="dot-label">Contact</span>
          <h2 id="contact-title" data-reveal className="text-section font-extrabold uppercase">
            Ready to grow
            <br />
            <span>&amp; get more from your site?</span>
          </h2>
        </div>

        <ContactForm />

        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <li>
            <span className="mr-2 font-mono text-xs tracking-[0.12em] text-text-dim uppercase">Email</span>
            <a href={`mailto:${contact.email}`} className="font-semibold underline-offset-4 hover:underline">
              {contact.email}
            </a>
          </li>
          <li>
            <span className="mr-2 font-mono text-xs tracking-[0.12em] text-text-dim uppercase">LinkedIn</span>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-4 hover:underline">
              solomon-ethics ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
