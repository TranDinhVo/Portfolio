import { Nav } from "./Nav";
import { navItems, profile } from "@/data";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur">
      <div className="relative mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-mono text-sm font-medium tracking-tight">
            {profile.nameEn}
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-widest text-muted sm:inline">
            {profile.title}
          </span>
        </a>
        <Nav items={navItems} />
      </div>
    </header>
  );
}
