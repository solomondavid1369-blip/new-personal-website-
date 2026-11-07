import { showPlaceholders } from "@/lib/placeholder";

/** A loud yellow box for copy that still needs writing. Renders nothing on the live site. */
export default function Placeholder({ text, className = "" }: { text: string; className?: string }) {
  if (!showPlaceholders) return null;
  return (
    <span
      className={`inline-block rounded-md border-2 border-dashed border-yellow-300 bg-yellow-300/15 px-2 py-1 font-mono text-sm text-yellow-200 ${className}`}
    >
      {text}
    </span>
  );
}
