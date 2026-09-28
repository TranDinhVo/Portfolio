"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view so the nav can highlight it.
 * Callers usually pass a freshly mapped array, so the effect keys off a
 * joined string instead of the array identity — otherwise the observer
 * would be torn down and rebuilt on every render.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      // Bias the viewport towards its upper third: the section a reader is
      // looking at, not the one merely peeking in at the bottom.
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
