import { Card } from "@/components/ui/Card";
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

  return (
    <section id="awards" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <SectionTitle
          index="04"
          label="Awards"
          title="Competition record"
          description="National mathematics and informatics olympiads, ICPC Asia regionals and university research prizes."
        />

        <div className="mt-10 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {tally.map((item) => (
            <div key={item.label} className="bg-surface px-4 py-5">
              <p className="font-mono text-3xl font-medium text-accent">
                {String(item.count).padStart(2, "0")}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {awards.map((award) => (
            <li key={`${award.event}-${award.year}-${award.rank}`}>
              <Card className="h-full p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="accent-soft border border-accent px-2 py-0.5 font-mono text-[11px] uppercase tracking-widest text-accent">
                    {rankChip[award.rank]}
                  </span>
                  <span className="font-mono text-xs text-muted">{award.year}</span>
                </div>
                <h3 className="mt-4 text-sm font-medium leading-snug">{award.event}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">
                  {award.title}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
