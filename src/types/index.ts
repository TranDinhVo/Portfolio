export type Profile = {
  name: string;
  nameEn: string;
  title: string;
  tagline: string;
  /** One-sentence hero lead, below the name. */
  heroLead: string;
  /** <meta name="description"> and OG description — keep under ~160 chars. */
  metaDescription: string;
  bio: string[];
  email: string;
  phone: string;
  location: string;
  links: { label: string; href: string }[];
  /** Path under /public — omitted until the CV PDF is actually added. */
  resumeUrl?: string;
  education: {
    school: string;
    major: string;
    gpa: string;
    period: string;
  };
  availability: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  /** Private / client work has no public repository. */
  visibility: "public" | "private";
  repo?: string;
  demo?: string;
  /** Screenshot under /public/images/projects — optional until captured. */
  cover?: string;
  stack: string[];
  /** Bullet points: what was actually built. */
  highlights: string[];
  /** Case study — the problem the system had to solve. */
  problem?: string;
  /** Case study — how the system is put together. */
  architecture?: string;
  /** Countable facts from the repository. Never estimates. */
  facts?: { label: string; value: string }[];
  /** Engineering decisions worth defending in an interview. */
  decisions?: { title: string; detail: string }[];
  /** Shown on the card; keep to 3-4 items. */
  featured: boolean;
};

export type SkillGroup = {
  id: string;
  label: string;
  accent: string;
  items: string[];
};

export type Award = {
  title: string;
  event: string;
  year: string;
  rank: "first" | "second" | "third" | "participant";
};

export type NavItem = {
  /** Section id on the single-page layout, without the leading "#". */
  id: string;
  label: string;
};
