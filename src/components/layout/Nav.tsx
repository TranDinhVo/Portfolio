"use client";

import { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

/** Section ids are stable, so the observer array can live at module scope. */
export function Nav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(items.map((item) => item.id));

  return (
    <>
      <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "true" : undefined}
            className={cn(
              "px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors",
              active === item.id ? "text-accent" : "text-muted hover:text-foreground",
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="border border-line px-3 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="absolute inset-x-0 top-full border-b border-line bg-surface md:hidden"
        >
          <ul className="mx-auto max-w-5xl px-4 py-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block border-b border-line py-3 font-mono text-xs uppercase tracking-widest last:border-b-0",
                    active === item.id ? "text-accent" : "text-muted",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
