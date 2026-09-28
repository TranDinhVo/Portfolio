"use client";

import { useState } from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

export function Nav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(items.map((item) => item.id));

  return (
    <>
      <nav aria-label="Sections" className="hidden items-center md:flex">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "true" : undefined}
            className={cn(
              "group relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
              active === item.id ? "text-accent" : "text-muted hover:text-foreground",
            )}
          >
            {item.label}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300",
                active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
              )}
            />
          </a>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        className="border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-accent hover:text-accent md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="absolute inset-x-0 top-full border-b border-line bg-surface md:hidden"
        >
          <ul className="mx-auto max-w-6xl px-6 py-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-line py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] last:border-b-0",
                    active === item.id ? "text-accent" : "text-muted",
                  )}
                >
                  {item.label}
                  <span aria-hidden>→</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </>
  );
}
