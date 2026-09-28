import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { skillGroups } from "@/data";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <section id="skills" className="border-b border-line bg-surface-2/40">
      <Container className="py-20 sm:py-28">
        <SectionTitle
          index="02"
          label="Skills"
          title="Stack I work in"
          description="Tools I have shipped something real with, grouped by the layer they belong to."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, index) => (
            <Card
              key={group.id}
              className={cn(
                "reveal flex flex-col p-6",
                // Three cards on the first row, two wider ones on the second.
                index < 3 ? "lg:col-span-2" : "lg:col-span-3",
              )}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ backgroundColor: group.accent }}
              />
              <div className="flex items-baseline justify-between">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em]">
                  {group.label}
                </h3>
                <span className="tnum font-mono text-[11px] text-muted">
                  {String(group.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
