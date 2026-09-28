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
        "inline-flex items-center border border-line bg-surface-2 px-2 py-1 font-mono text-[11px] leading-4 tracking-tight text-muted transition-colors",
        className,
      )}
      style={accent ? { borderColor: accent, color: accent } : undefined}
    >
      {children}
    </span>
  );
}
