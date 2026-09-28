import { skillGroups } from "@/data";

const LAYER_IDS = ["frontend", "backend", "database"];

/**
 * Blueprint of the stack the projects are actually built on — the layers and
 * their labels come from the skills data, so it cannot drift from the copy.
 * Strokes draw themselves in once, and hold still under reduced motion.
 */
export function HeroSchematic() {
  const layers = LAYER_IDS.map((id) => skillGroups.find((group) => group.id === id)).filter(
    (group) => group !== undefined,
  );

  const boxes = layers.map((layer, index) => ({
    layer,
    y: 16 + index * 98,
    index,
  }));

  return (
    <svg
      viewBox="0 0 420 300"
      className="h-auto w-full font-mono"
      role="img"
      aria-label="Diagram of the application layers: client, API and data"
    >
      {/* Index rail */}
      <line
        x1="64"
        y1="16"
        x2="64"
        y2="284"
        stroke="var(--line-strong)"
        strokeWidth="1"
        className="draw-in"
        style={{ "--dash": "280", "--delay": "0s" } as React.CSSProperties}
      />

      {boxes.map(({ layer, y, index }) => {
        const centerY = y + 36;
        return (
          <g key={layer.id}>
            <text x="24" y={centerY + 4} fill="var(--muted)" fontSize="11" letterSpacing="1.5">
              {String(index + 1).padStart(2, "0")}
            </text>
            <line
              x1="64"
              y1={centerY}
              x2="104"
              y2={centerY}
              stroke="var(--accent)"
              strokeWidth="1"
              className="draw-in"
              style={{ "--dash": "40", "--delay": `${0.2 + index * 0.18}s` } as React.CSSProperties}
            />

            <rect
              x="104"
              y={y}
              width="292"
              height="72"
              fill="var(--surface)"
              stroke="var(--line-strong)"
              strokeWidth="1"
              className="draw-in"
              style={{ "--dash": "730", "--delay": `${0.1 + index * 0.18}s` } as React.CSSProperties}
            />
            <rect x="104" y={y} width="4" height="72" fill={layer.accent} />

            <text x="124" y={y + 30} fill="var(--foreground)" fontSize="14" letterSpacing="0.5">
              {layer.label}
            </text>
            <text x="124" y={y + 52} fill="var(--muted)" fontSize="10.5" letterSpacing="0.3">
              {layer.items.slice(0, 2).join("  ·  ")}
            </text>
          </g>
        );
      })}

      {/* Connectors between layers */}
      {[88, 186].map((y, index) => (
        <g key={y}>
          <line
            x1="250"
            y1={y}
            x2="250"
            y2={y + 26}
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <path d={`M246 ${y + 20} L250 ${y + 26} L254 ${y + 20}`} fill="none" stroke="var(--accent)" strokeWidth="1" />
          <text x="262" y={y + 18} fill="var(--muted)" fontSize="9" letterSpacing="1">
            {index === 0 ? "REST / JSON" : "SQL"}
          </text>
        </g>
      ))}
    </svg>
  );
}
