import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Trần Đình Võ",
  nameEn: "Tran Dinh Vo",
  title: "Full-stack Developer",
  tagline: "Backend · Frontend · Database design",
  heroLead:
    "I build production web applications — Spring Boot and NestJS on the backend, Next.js on the frontend, PostgreSQL underneath — mostly for financial systems, where a rounding error is a real bug.",
  metaDescription:
    "Final-year IT student in Ho Chi Minh City building production web apps with Spring Boot, NestJS, Next.js and PostgreSQL. Open to backend internships.",
  bio: [
    "Final-year Information Technology student at the University of Transport and Communications (Campus 2), Ho Chi Minh City.",
    "I build production-grade web applications — Spring Boot and NestJS on the backend, React and Next.js on the frontend, PostgreSQL underneath.",
    "Most of my recent work is financial software: multi-currency accounting, cash-flow state machines, role-based access control and audit logging — domains where a rounding error is a real bug.",
  ],
  email: "trandinhvo1809@gmail.com",
  phone: "+84 339026577",
  location: "Ho Chi Minh City, Vietnam",
  links: [
    { label: "GitHub", href: "https://github.com/TranDinhVo" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/v%C3%B5-tr%E1%BA%A7n-635383373/" },
    { label: "Email", href: "mailto:trandinhvo1809@gmail.com" },
  ],
  education: {
    school: "University of Transport and Communications — Campus in Ho Chi Minh City",
    major: "Information Technology",
    gpa: "3.76 / 4.0",
    period: "Aug 2023 — Oct 2027",
  },
  availability: "Open to Full-stack / Backend internship opportunities",
};
