import { Nav } from "./Nav";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "@/components/ui/Container";
import { navItems, profile } from "@/data";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/80 backdrop-blur-md">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-baseline gap-3">
          <span className="font-mono text-sm font-medium tracking-tight">
            {profile.nameEn}
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted lg:inline">
            {profile.title}
          </span>
        </a>

        <div className="flex items-center gap-2">
          <Nav items={navItems} />
          <ThemeToggle />
        </div>
      </Container>

      {/* Scroll-linked progress rule; stays hidden where view timelines are unsupported. */}
      <span aria-hidden className="scroll-progress absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
    </header>
  );
}
