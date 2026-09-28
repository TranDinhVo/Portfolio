import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { awards } from "@/data";
import type { Award } from "@/types";

const rankChip: Record<Award["rank"], string> = {
  first: "1st",
  second: "2nd",
  third: "3rd",
  participant: "Contestant",
};

export function Awards() {
  const tally = [
    { label: "First prize", count: awards.filter((a) => a.rank === "first").length },
    { label: "Second prize", count: awards.filter((a) => a.rank === "second").length },
    { label: "Third prize", count: awards.filter((a) => a.rank === "third").length },
    { label: "ICPC regionals", count: awards.filter((a) => a.rank === "participant").length },
  ];

  const years = [...new Set(awards.map((award) => award.year))].sort().reverse();

  return (
    <section id="awards" className="border-b border-line bg-surface-2/40">
      <Container className="py-20 sm:py-28">
        <SectionTitle
          index="04"
          label="Awards"
          title="Competition record"
          description="National mathematics and informatics olympiads, ICPC Asia regionals and university research prizes."
        />

        <dl className="reveal mt-12 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {tally.map((item) => (
            <div key={item.label} className="bg-surface px-6 py-7">
              <dd className="tnum font-mono text-4xl font-medium text-accent">
                {String(item.count).padStart(2, "0")}
              </dd>
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {item.label}
              </dt>
            </div>
          ))}
        </dl>

        <ol className="mt-14 space-y-12">
          {years.map((year) => (
            <li key={year} className="reveal grid gap-5 lg:grid-cols-[140px_1fr]">
              <div className="flex items-center gap-4 lg:block">
                <p className="tnum font-mono text-3xl font-medium tracking-tight">{year}</p>
                <span aria-hidden className="h-px flex-1 bg-line lg:hidden" />
              </div>

              <ul className="divide-y divide-line border-t border-line">
                {awards
                  .filter((award) => award.year === year)
                  .map((award) => (
                    <li
                      key={`${award.event}-${award.title}`}
                      className="flex flex-col gap-2 py-4 transition-colors hover:text-accent sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                    >
                      <p className="font-medium leading-snug">{award.event}</p>
                      <span className="accent-soft w-fit shrink-0 border border-accent px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                        {rankChip[award.rank]}
                      </span>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
