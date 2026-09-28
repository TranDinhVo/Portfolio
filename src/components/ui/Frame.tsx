import { cn } from "@/lib/utils";

/**
 * Bordered panel with blueprint corner brackets.
 * Presentational only — no data, no state.
 */
export function Frame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative border border-line bg-surface", className)}>
      <Corner className="-top-px -left-px border-t-2 border-l-2" />
      <Corner className="-top-px -right-px border-t-2 border-r-2" />
      <Corner className="-bottom-px -left-px border-b-2 border-l-2" />
      <Corner className="-bottom-px -right-px border-b-2 border-r-2" />
      {children}
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none absolute size-3 border-accent", className)}
    />
  );
}
