import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  title: string;
  hasImage: boolean;
  sizes: string;
  className?: string;
  priority?: boolean;
};

// Rounded image card. Shows a visible [screenshot] placeholder until the
// real image is in /public. Safe to use from client components.
export default function Thumb({ src, alt, title, hasImage, sizes, className = "", priority }: Props) {
  return (
    <div className={`relative overflow-hidden rounded-[20px] border border-line bg-bg-raised ${className}`}>
      {hasImage ? (
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
