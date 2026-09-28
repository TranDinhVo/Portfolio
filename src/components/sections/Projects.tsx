import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { featuredProjects, projects } from "@/data";
import type { Project } from "@/types";

export function Projects() {
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <SectionTitle
          index="03"
          label="Projects"
          title="What I have built"
          description="Client and internal systems have no public repository — the engineering is described instead."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {otherProjects.length > 0 ? (
          <div className="mt-12">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Also worked on
            </h3>
            <ul className="mt-4 divide-y divide-line border border-line bg-surface">
              {otherProjects.map((project) => (
                <li
                  key={project.slug}
                  className="flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {project.name}
                      <span className="ml-2 font-mono text-xs text-muted">{project.year}</span>
                    </p>
                    <p className="mt-1 text-sm text-muted">{project.tagline}</p>
                    <p className="mt-2 font-mono text-[11px] text-muted">
                      {project.stack.join(" · ")}
                    </p>
                  </div>
                  <RepoLink project={project} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
        <span className="font-mono text-xs text-muted">{project.year}</span>
      </div>

      <p className="mt-2 text-sm text-muted">{project.tagline}</p>

      <ul className="mt-5 space-y-2.5">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5 text-sm leading-relaxed">
            <span aria-hidden className="mt-2 size-1 shrink-0 bg-accent" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-4">
        <RepoLink project={project} />
        {project.demo ? (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
          >
            Live demo ↗
          </a>
        ) : null}
      </div>
    </Card>
  );
}

function RepoLink({ project }: { project: Project }) {
  if (project.visibility === "private" || !project.repo) {
    return (
      <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
        Private · no public repo
      </span>
    );
  }

  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noreferrer"
      className="font-mono text-[11px] uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
    >
      Repository ↗
    </a>
  );
}
