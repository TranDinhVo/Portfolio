import { Frame } from "@/components/ui/Frame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { profile } from "@/data";

export function About() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <SectionTitle index="01" label="About" title="Who I am" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4">
            {profile.bio.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>

          <Frame className="h-fit p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              Education
            </p>
            <p className="mt-4 text-sm font-medium leading-snug">
              {profile.education.school}
            </p>
            <dl className="mt-4 space-y-2 font-mono text-xs text-muted">
              <div className="flex justify-between gap-4">
                <dt>Major</dt>
                <dd className="text-right text-foreground">{profile.education.major}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>GPA</dt>
                <dd className="text-right text-accent">{profile.education.gpa}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Period</dt>
                <dd className="text-right text-foreground">{profile.education.period}</dd>
              </div>
            </dl>
          </Frame>
        </div>
      </div>
    </section>
  );
}
