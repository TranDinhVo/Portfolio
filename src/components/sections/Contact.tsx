import { Button } from "@/components/ui/Button";
import { Frame } from "@/components/ui/Frame";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { profile } from "@/data";

export function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <SectionTitle
          index="05"
          label="Contact"
          title="Let's talk"
          description={profile.availability}
        />

        <Frame className="mt-10 p-6 sm:p-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <dl className="space-y-4 font-mono text-sm">
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-muted">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-accent transition-opacity hover:opacity-70"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-muted">Phone</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, "")}`}
                    className="transition-colors hover:text-accent"
                  >
                    {profile.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-muted">Location</dt>
                <dd className="mt-1">{profile.location}</dd>
              </div>
            </dl>

            <div className="flex flex-col justify-between gap-6">
              <ul className="space-y-2">
                {profile.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                      className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
                    >
                      {link.label} ↗
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
      </div>
    </section>
  );
}
