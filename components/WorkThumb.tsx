import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  title: string;
  className?: string;
  sizes: string;
  priority?: boolean;
};

// Rounded image card. Until the real screenshot is in /public it shows a
// visible placeholder, so nothing breaks before the assets arrive.
export default function WorkThumb({ src, alt, title, className = "", sizes, priority }: Props) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", src));

  return (
    <div className={`relative overflow-hidden rounded-[20px] border border-line bg-bg-raised ${className}`}>
      {exists ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      ) : (
        <div className="flex h-full flex-col justify-end gap-1 p-3 text-base leading-tight font-normal tracking-normal normal-case">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-dim">[screenshot]</span>
          <span className="text-sm font-semibold leading-tight">{title}</span>
        </div>
      )}
    </div>
  );
}
