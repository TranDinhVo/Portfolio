import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { featuredProjects, projects } from "@/data";
import type { Project } from "@/types";

export function Projects() {
  const [lead, ...rest] = featuredProjects;
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="border-b border-line">
      <Container className="py-20 sm:py-28">
        <SectionTitle
          index="03"
          label="Projects"
          title="What I have built"
          description="Client and internal systems have no public repository — the engineering is described instead."
        />

        {lead ? (
          <Card className="reveal mt-12 p-7 sm:p-9">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="flex flex-col">
                <div className="flex items-baseline justify-between gap-4">
                  <ProjectIndex position={1} total={projects.length} />
                  <span className="tnum font-mono text-xs text-muted">{lead.year}</span>
                </div>
                <h3 className="mt-4 text-3xl font-semibold tracking-tight">{lead.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{lead.tagline}</p>
                <StackList stack={lead.stack} className="mt-6" />
                <div className="mt-auto pt-7">
                  <ProjectLinks project={lead} />
                </div>
              </div>
              <HighlightList highlights={lead.highlights} />
            </div>
          </Card>
        ) : null}

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {rest.map((project, index) => (
            <Card key={project.slug} className="reveal flex flex-col p-7">
              <ProjectIndex position={index + 2} total={projects.length} />
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-semibold tracking-tight">{project.name}</h3>
                <span className="tnum font-mono text-xs text-muted">{project.year}</span>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.tagline}</p>
              <HighlightList highlights={project.highlights} className="mt-6" />
              <StackList stack={project.stack} className="mt-6" />
              <div className="mt-auto border-t border-line pt-5">
                <ProjectLinks project={project} />
              </div>
            </Card>
          ))}
        </div>

        {otherProjects.length > 0 ? (
          <div className="reveal mt-14">
            <div className="flex items-center gap-4">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Also worked on
              </h3>
              <span aria-hidden className="h-px flex-1 bg-line" />
            </div>
            <ul className="mt-5 divide-y divide-line border border-line bg-surface">
              {otherProjects.map((project) => (
                <li
                  key={project.slug}
                  className="flex flex-col gap-3 p-6 transition-colors hover:bg-surface-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {project.name}
                      <span className="tnum ml-3 font-mono text-xs text-muted">
                        {project.year}
                      </span>
                    </p>
                    <p className="mt-1.5 text-sm text-muted">{project.tagline}</p>
                    <p className="mt-2.5 font-mono text-[11px] text-muted">
                      {project.stack.join("  ·  ")}
                    </p>
                  </div>
                  <ProjectLinks project={project} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function ProjectIndex({ position, total }: { position: number; total: number }) {
  return (
    <span className="tnum font-mono text-[11px] tracking-[0.2em] text-accent">
      {String(position).padStart(2, "0")}
      <span className="text-muted"> / {String(total).padStart(2, "0")}</span>
    </span>
  );
}

function HighlightList({
  highlights,
  className,
}: {
  highlights: string[];
  className?: string;
}) {
  return (
    <ul className={className}>
      {highlights.map((highlight) => (
        <li key={highlight} className="flex gap-3 py-2 text-sm leading-relaxed">
          <span aria-hidden className="mt-2 size-1 shrink-0 bg-accent" />
          <span>{highlight}</span>
        </li>
      ))}
    </ul>
  );
}

function StackList({ stack, className }: { stack: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {stack.map((tech) => (
        <li key={tech}>
          <Badge>{tech}</Badge>
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const isPrivate = project.visibility === "private" || !project.repo;

  return (
    <div className="flex flex-wrap items-center gap-5">
      {isPrivate ? (
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <rect x="4" y="10" width="16" height="10" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          Private · no public repo
        </span>
      ) : (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
        >
          Repository ↗
        </a>
      )}
      {project.demo ? (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent transition-opacity hover:opacity-70"
        >
          Live demo ↗
        </a>
      ) : null}
    </div>
  );
}
