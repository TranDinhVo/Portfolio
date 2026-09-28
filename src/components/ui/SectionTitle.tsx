export function SectionTitle({
  index,
  label,
  title,
  description,
}: {
  /** Two-digit blueprint index, e.g. "02". */
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="reveal">
      <div className="flex items-center gap-4">
        <span className="tnum font-mono text-xs tracking-[0.25em] text-accent">{index}</span>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{label}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
