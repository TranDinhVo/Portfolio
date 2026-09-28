import type { Award } from "@/types";

/**
 * One row per award, so counts derived from this list are exact —
 * `title` holds the placement, `event` the competition.
 */
export const awards: Award[] = [
  { title: "First Prize", event: "Vietnam Student Mathematical Olympiad", year: "2024", rank: "first" },
  { title: "Second Prize", event: "Vietnam Student Mathematical Olympiad", year: "2026", rank: "second" },
  { title: "Third Prize", event: "Vietnam Student Mathematical Olympiad", year: "2024", rank: "third" },
  { title: "Third Prize", event: "Vietnam Student Mathematical Olympiad", year: "2025", rank: "third" },
  { title: "Third Prize", event: "Vietnam Student Informatics Olympiad", year: "2024", rank: "third" },
  { title: "Contestant", event: "ICPC Asia Regional — Hanoi", year: "2024", rank: "participant" },
  { title: "Contestant", event: "ICPC Asia Regional — Ho Chi Minh City", year: "2025", rank: "participant" },
  {
    title: "Second Prize",
    event: "University-level Student Scientific Research Competition",
    year: "2026",
    rank: "second",
  },
  {
    title: "Third Prize",
    event: "University-level Student Scientific Research Competition",
    year: "2026",
    rank: "third",
  },
];

/** Prizes only — ICPC regionals are participations, not placements. */
export const prizes = awards.filter((award) => award.rank !== "participant");
