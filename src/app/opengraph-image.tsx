import { ImageResponse } from "next/og";
import { prizes, profile, projects } from "@/data";

export const alt = `${profile.nameEn} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const paper = "#f6f6f3";
const ink = "#16181d";
const muted = "#6a6f7a";
const accent = "#2563eb";

/** Blueprint share card: paper background, corner brackets, blue accent. */
export default function Image() {
  const github = profile.links.find((link) => link.label === "GitHub");
  const githubHandle = github?.href.replace(/^https?:\/\//, "") ?? "";

  const stats = [
    { label: "Projects", value: String(projects.length) },
    { label: "Prizes", value: String(prizes.length) },
    { label: "GPA", value: profile.education.gpa.split(" / ")[0] },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: paper,
          color: ink,
          padding: 72,
          position: "relative",
        }}
      >
        <Bracket style={{ top: 36, left: 36, borderTop: `6px solid ${accent}`, borderLeft: `6px solid ${accent}` }} />
        <Bracket style={{ top: 36, right: 36, borderTop: `6px solid ${accent}`, borderRight: `6px solid ${accent}` }} />
        <Bracket style={{ bottom: 36, left: 36, borderBottom: `6px solid ${accent}`, borderLeft: `6px solid ${accent}` }} />
        <Bracket style={{ bottom: 36, right: 36, borderBottom: `6px solid ${accent}`, borderRight: `6px solid ${accent}` }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: accent }}>
            {profile.title.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 700, marginTop: 16 }}>
            {profile.nameEn}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: muted, marginTop: 20, maxWidth: 900 }}>
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 48 }}>
            {stats.map((stat) => (
              <div key={stat.label} style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: accent }}>
                  {stat.value}
                </div>
                <div style={{ display: "flex", fontSize: 20, letterSpacing: 3, color: muted }}>
                  {stat.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: muted }}>
            {githubHandle}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

function Bracket({ style }: { style: React.CSSProperties }) {
  return <div style={{ position: "absolute", width: 44, height: 44, ...style }} />;
}
