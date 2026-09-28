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
        "inline-flex items-center gap-2 border px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors",
        variant === "solid"
          ? "border-accent bg-accent text-white hover:bg-transparent hover:text-accent"
          : "border-line text-foreground hover:border-accent hover:text-accent",
        className,
      )}
    >
      {children}
    </a>
  );
}
