import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { skillGroups } from "@/data";

export function Skills() {
  return (
    <section id="skills" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <SectionTitle
          index="02"
          label="Skills"
          title="Stack I work in"
          description="Tools I have shipped something real with, grouped by the layer they belong to."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <Card key={group.id} className="p-5">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="size-2"
                  style={{ backgroundColor: group.accent }}
                />
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em]">
                  {group.label}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
