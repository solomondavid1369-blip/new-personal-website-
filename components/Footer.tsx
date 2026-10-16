import Year from "./Year";
import { contact } from "@/content/work";

const links = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#emails", label: "Emails" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg px-4 pt-14 pb-10 md:px-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold tracking-tight">David Solomon</span>
          <p className="text-text-dim">Websites and emails that sell.</p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-text-dim transition-colors hover:text-text">
              {l.label}
            </a>
          ))}
          <a href={`mailto:${contact.email}`} className="text-text-dim transition-colors hover:text-text">
            Email
          </a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-dim transition-colors hover:text-text">
            LinkedIn ↗
          </a>
        </nav>
      </div>

      <div className="mt-12 flex items-center justify-between border-t border-line pt-6 font-mono text-xs tracking-[0.12em] text-text-dim uppercase">
        <span>
          © <Year /> David Solomon
        </span>
        <a href="#top" className="transition-colors hover:text-text">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
