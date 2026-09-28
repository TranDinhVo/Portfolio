import { cn } from "@/lib/utils";

/**
 * Surface panel that lifts and reveals an accent corner on hover.
 * The corner is drawn with a gradient so it costs no extra element.
 */
export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative h-full border border-line bg-surface transition-all duration-300",
        "hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_40px_-28px_var(--glow)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-px -right-px size-4 border-t-2 border-r-2 border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}
