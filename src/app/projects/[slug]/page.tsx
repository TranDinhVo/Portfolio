import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { getProject, profile, projects } from "@/data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const description = project.problem ?? project.tagline;

  return {
    title: `${project.name} — ${project.tagline}`,
    description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const isPrivate = project.visibility === "private" || !project.repo;

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />

        <Container className="relative py-16 sm:py-20">
          <Link
            href="/#projects"
            className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
          >
            ← All projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="tnum text-accent">{project.year}</span>
            <span aria-hidden className="h-3 w-px bg-line-strong" />
            <span className="text-muted">
              {isPrivate ? "Private · no public repo" : "Open source"}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-semibold tracking-tighter sm:text-6xl">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{project.tagline}</p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>

          {project.repo ? (
            <div className="mt-8">
              <Button href={project.repo} variant="outline" external>
                Repository
              </Button>
            </div>
          ) : null}
        </Container>
      </header>

      {project.facts ? (
        <Container className="py-10">
          <dl className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
            {project.facts.map((fact) => (
              <div key={fact.label} className="bg-surface px-5 py-5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {fact.label}
                </dt>
                <dd className="tnum mt-2 font-mono text-xl text-accent">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      ) : null}

      <Container className="pb-20 sm:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-12">
            {project.problem ? (
              <Block index="01" label="The problem">
                <p className="text-lg leading-relaxed">{project.problem}</p>
              </Block>
            ) : null}

            {project.architecture ? (
              <Block index="02" label="Architecture">
                <p className="leading-relaxed text-muted">{project.architecture}</p>
              </Block>
            ) : null}

            {project.decisions ? (
              <Block index="03" label="Engineering decisions">
                <ol className="space-y-4">
                  {project.decisions.map((decision, index) => (
                    <li key={decision.title}>
                      <Frame className="p-5">
                        <div className="flex gap-4">
                          <span className="tnum font-mono text-[11px] text-accent">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h3 className="font-medium leading-snug">{decision.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                              {decision.detail}
                            </p>
                          </div>
                        </div>
                      </Frame>
                    </li>
                  ))}
                </ol>
              </Block>
            ) : null}
          </div>

          <aside className="h-fit lg:sticky lg:top-24">
            <Frame className="p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                What was built
              </p>
              <ul className="mt-5 space-y-3">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden className="mt-2 size-1 shrink-0 bg-accent" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Frame>

            <div className="mt-5 border border-line bg-surface p-6">
              <p className="text-sm leading-relaxed text-muted">
                Want the details behind any of this?
              </p>
              <div className="mt-4">
                <Button href={`mailto:${profile.email}`}>Get in touch</Button>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </article>
  );
}

function Block({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-center gap-4">
        <span className="tnum font-mono text-xs tracking-[0.25em] text-accent">{index}</span>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{label}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
