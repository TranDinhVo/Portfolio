import { HeroSchematic } from "./HeroSchematic";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { prizes, profile, projects } from "@/data";

export function Hero() {
  const github = profile.links.find((link) => link.label === "GitHub");

  const readout = [
    { label: "Projects", value: String(projects.length) },
    { label: "Prizes", value: String(prizes.length) },
    { label: "GPA", value: profile.education.gpa.split(" / ")[0] },
    { label: "Based in", value: profile.location.split(", ")[0] },
  ];

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />

      <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2.5 border border-line bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden />
              {profile.availability}
            </p>

            <h1 className="mt-7 text-5xl font-semibold tracking-tighter sm:text-7xl">
              {profile.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.18em]">
              <span className="text-accent">{profile.title}</span>
              <span aria-hidden className="h-3 w-px bg-line-strong" />
              <span className="text-muted">{profile.tagline}</span>
            </div>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              {profile.heroLead}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
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

          <div className="relative">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Fig. 01 — How I build
            </p>
            <HeroSchematic />
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
          {readout.map((item) => (
            <div key={item.label} className="bg-surface px-5 py-5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {item.label}
              </dt>
              <dd className="tnum mt-2 font-mono text-2xl text-accent">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
