import ContactForm from "@/components/ContactForm";
import { contact } from "@/content/work";

// H. Contact. Sits over scene 05.
export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative flex min-h-svh flex-col justify-center px-4 py-20 md:px-12"
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

        <div className="flex flex-col gap-4">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 self-start rounded-full border border-text/40 bg-bg/70 px-5 py-3 font-semibold backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-text"
          >
            <svg viewBox="0 0 24 24" className="size-5 text-accent" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4.1 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.3Z" />
            </svg>
            Chat on WhatsApp
          </a>
          <ContactForm />
        </div>

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
