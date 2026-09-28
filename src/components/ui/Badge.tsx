import { cn } from "@/lib/utils";

export function Badge({
  children,
  accent,
  className,
}: {
  children: React.ReactNode;
  /** Optional hex accent from the data layer. */
  accent?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-line px-2 py-0.5 font-mono text-[11px] leading-5 tracking-tight text-muted",
        className,
      )}
      style={accent ? { borderColor: accent, color: accent } : undefined}
    >
      {children}
    </span>
  );
}
