import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { profile } from "@/data";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />

      <Container className="relative py-20 sm:py-28">
        <SectionTitle
          index="05"
          label="Contact"
          title="Let's talk"
          description={profile.availability}
        />

        <Frame className="reveal mt-12 p-8 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <a
                href={`mailto:${profile.email}`}
                className="font-mono text-xl tracking-tight text-accent transition-opacity hover:opacity-70 sm:text-2xl"
              >
                {profile.email}
              </a>

              <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Phone
                  </dt>
                  <dd className="tnum mt-1.5 font-mono text-sm">
                    <a
                      href={`tel:${profile.phone.replace(/\s/g, "")}`}
                      className="transition-colors hover:text-accent"
                    >
                      {profile.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    Location
                  </dt>
                  <dd className="mt-1.5 font-mono text-sm">{profile.location}</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col justify-between gap-8 border-line lg:border-l lg:pl-10">
              <ul className="space-y-3">
                {profile.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="group flex items-center justify-between border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Button href={`mailto:${profile.email}`}>Email me</Button>
                {profile.resumeUrl ? (
                  <Button href={profile.resumeUrl} variant="outline" external>
                    Résumé
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Frame>
      </Container>
    </section>
  );
}
