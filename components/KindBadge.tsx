/** "Client" is solid orange; "Concept" is outlined. Used on work and email cards. */
export default function KindBadge({ kind }: { kind: "Client" | "Concept" }) {
  return kind === "Client" ? (
    <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-bg">Client</span>
  ) : (
    <span className="rounded-full border border-accent bg-bg/90 px-3 py-1 text-xs font-semibold text-accent backdrop-blur">
      Concept
    </span>
  );
}
