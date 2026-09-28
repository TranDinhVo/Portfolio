import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  /** Opens in a new tab with rel="noreferrer". */
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "solid",
  external = false,
  className,
}: ButtonProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center gap-2.5 border px-5 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-200",
        variant === "solid"
          ? "border-accent bg-accent text-accent-ink hover:shadow-[0_12px_30px_-12px_var(--glow)] hover:brightness-110"
          : "border-line bg-surface text-foreground hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
