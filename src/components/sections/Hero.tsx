import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { prizes, profile, projects } from "@/data";

export function Hero() {
  const github = profile.links.find((link) => link.label === "GitHub");

  const spec = [
    { label: "School", value: profile.education.school },
    { label: "Major", value: profile.education.major },
    { label: "GPA", value: profile.education.gpa },
    { label: "Period", value: profile.education.period },
    { label: "Location", value: profile.location },
  ];

  const stats = [
    { label: "Projects", value: String(projects.length) },
    { label: "Prizes", value: String(prizes.length) },
    { label: "GPA", value: profile.education.gpa.split(" / ")[0] },
  ];

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="grid-paper-hero pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-5xl px-4 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 border border-line bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-muted">
              <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden />
              {profile.availability}
            </p>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
              {profile.name}
            </h1>

            <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-accent">
              {profile.title}
            </p>

            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              {profile.tagline}
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {profile.heroLead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${profile.email}`}>Get in touch</Button>
              {github ? (
                <Button href={github.href} variant="outline" external>
                  GitHub
                </Button>
              ) : null}
              {profile.resumeUrl ? (
                <Button href={profile.resumeUrl} variant="outline" external>
                  Résumé
                </Button>
              ) : null}
            </div>
          </div>

          <Frame className="p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
              Spec sheet
            </p>
            <dl className="mt-5 space-y-3">
              {spec.map((row) => (
                <div key={row.label} className="border-b border-line pb-3 last:border-b-0 last:pb-0">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    {row.label}
                  </dt>
                  <dd className="mt-1 text-sm leading-snug">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid grid-cols-3 gap-px border border-line bg-line">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-surface px-2 py-3 text-center">
                  <p className="font-mono text-xl font-medium text-accent">{stat.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Frame>
        </div>
      </div>
    </section>
  );
}
