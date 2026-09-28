import { Container } from "@/components/ui/Container";
import { profile } from "@/data";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm">{profile.nameEn}</p>
          <p className="mt-1 font-mono text-[11px] text-muted">
            © {new Date().getFullYear()} · Built with Next.js and Tailwind CSS
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {profile.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#top"
            className="border border-line px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-accent hover:text-accent"
          >
            Top ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}
