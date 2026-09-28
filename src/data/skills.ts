import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    accent: "#2563eb",
    items: ["React", "Next.js (App Router)", "TypeScript", "Redux", "Ant Design", "Tailwind CSS"],
  },
  {
    id: "backend",
    label: "Backend",
    accent: "#d97706",
    items: ["Spring Boot", "Spring Data JPA", "NestJS", "ASP.NET Core", "Node.js", "Express"],
  },
  {
    id: "database",
    label: "Database & ORM",
    accent: "#7c3aed",
    items: ["PostgreSQL", "MySQL", "Prisma", "Hibernate / JPA"],
  },
  {
    id: "devops",
    label: "DevOps",
    accent: "#16a34a",
    items: ["Docker", "Nginx", "GitHub Actions", "Vercel", "GCP Cloud Run"],
  },
  {
    id: "engineering",
    label: "Engineering",
    accent: "#e11d48",
    items: ["REST API design", "JWT / RBAC", "Layered architecture", "Unit testing", "Algorithms"],
  },
];
