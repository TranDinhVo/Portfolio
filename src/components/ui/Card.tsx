import { cn } from "@/lib/utils";

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
        "border border-line bg-surface transition-colors hover:border-accent",
        className,
      )}
    >
      {children}
    </div>
  );
}
