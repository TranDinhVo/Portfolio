import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { profile } from "@/data";

export function About() {
  return (
    <section id="about" className="border-b border-line">
      <Container className="py-20 sm:py-28">
        <SectionTitle index="01" label="About" title="Who I am" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="reveal space-y-5">
            {profile.bio.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "text-xl leading-relaxed"
                    : "leading-relaxed text-muted"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <Frame className="reveal h-fit p-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
              Education
            </p>
            <p className="mt-5 text-lg font-medium leading-snug">
              {profile.education.school}
            </p>
            <dl className="mt-6 space-y-3 border-t border-line pt-5 font-mono text-xs">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted">Major</dt>
                <dd className="text-right">{profile.education.major}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted">GPA</dt>
                <dd className="tnum text-right text-accent">{profile.education.gpa}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted">Period</dt>
                <dd className="tnum text-right">{profile.education.period}</dd>
              </div>
            </dl>
          </Frame>
        </div>
      </Container>
    </section>
  );
}
