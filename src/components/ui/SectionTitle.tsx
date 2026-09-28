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
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
        {index} / {label}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
