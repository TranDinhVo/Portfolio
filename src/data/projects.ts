import type { Project } from "@/types";

/**
 * Every claim here is read off the actual repository — README, Prisma schema
 * or folder structure. Counts are counted, never estimated.
 */
export const projects: Project[] = [
  {
    slug: "payhub",
    name: "PayHub",
    tagline: "PayPal order & transaction management system",
    year: "2026",
    visibility: "private",
    stack: ["NestJS 11", "Next.js 16", "Prisma 6", "PostgreSQL 17", "Zod", "Ant Design", "Docker"],
    highlights: [
      "Monorepo (npm workspaces) with a NestJS REST API and a Next.js dashboard over a 16-table schema.",
      "CSV import pipeline — parse → dedupe → mapping → order linking — merging two different PayPal exports into one model.",
      "Longest-prefix matching to attribute each transaction to a seller from its invoice number.",
      "Full money lifecycle modelled as an order timeline: payment → hold → release → refund → chargeback.",
      "Decimal-based arithmetic throughout, so no floating-point drift in financial figures.",
      "JWT in httpOnly cookies, RBAC guards (Admin / Support / Seller) and Zod validation pipes.",
    ],
    problem:
      "The finance team reconciled PayPal activity for many sellers by hand, from two unrelated CSV exports — the transaction report and the balance history. A single order's money is spread across several rows (payment, hold, release, refund, chargeback), the same file gets uploaded twice, and each seller may only ever see their own data.",
    architecture:
      "An npm-workspaces monorepo: a NestJS API and a Next.js App Router dashboard over PostgreSQL via Prisma. A request goes browser → Next.js rewrite (same-origin httpOnly cookie) → AuthGuard → PermissionsGuard → controller → service → Prisma. The backend is the only place that verifies the JWT and enforces permissions; the Next.js proxy is a UX layer, not a security boundary. Controllers parse input and declare permissions, services hold all business logic, audit writes and seller scoping, and Zod schemas sit next to the services they validate for.",
    facts: [
      { label: "Prisma models", value: "16" },
      { label: "Roles", value: "3" },
      { label: "CSV sources", value: "2" },
      { label: "Money precision", value: "Decimal(18,6)" },
    ],
    decisions: [
      {
        title: "Transaction ID is the unique key",
        detail:
          "Re-importing a file skips rows that already exist rather than overwriting them, so a double upload cannot corrupt history.",
      },
      {
        title: "Original transactions are immutable",
        detail:
          "Nothing is edited or deleted in place. Corrections are new rows plus an audit entry, which keeps the money trail reconstructable.",
      },
      {
        title: "Longest invoice prefix wins",
        detail:
          "Seller prefixes nest (L16, L165.A, L165.ADE), so attribution resolves to the most specific match instead of the first one found.",
      },
      {
        title: "Fee rate is snapshotted on the order",
        detail:
          "Changing a seller's rate today never rewrites yesterday's profit — the rate applied is stored with the order it was applied to.",
      },
      {
        title: "Transaction types are configuration, not code",
        detail:
          "An admin can add a new PayPal transaction type from the UI; no deployment is needed to handle it.",
      },
      {
        title: "Hold is not revenue",
        detail:
          "Held funds only move available balance. Counting them as revenue would overstate every report the business runs.",
      },
    ],
    featured: true,
  },
  {
    slug: "financeos",
    name: "FinanceOS",
    tagline: "Multi-currency financial & accounting platform",
    year: "2026",
    visibility: "private",
    stack: ["Next.js 16", "TypeScript", "Prisma", "PostgreSQL", "Ant Design", "Recharts", "SWR"],
    highlights: [
      "Multi-currency accounting with immutable daily exchange rates, so historical profit never silently changes.",
      "Cash-flow state machine: Pending → Transferred → Received → Completed, with dispute, refund and chargeback branches.",
      "Four-role RBAC (Director / Accountant / Sales Manager / Sales) with an append-only audit log and monthly period closing.",
      "Reconciliation screen splitting gateway statements against orders into four explicit buckets.",
      "Authentication with JWT, bcrypt and TOTP two-factor.",
      "Excel import/export plus dashboards built with Recharts and SWR.",
    ],
    problem:
      "A print-on-demand business ran its orders, PayPal and Stripe statements, supplier debt and expenses out of spreadsheets, in four currencies. Profit was recomputed by hand, and updating an exchange rate silently rewrote past months.",
    architecture:
      "A single Next.js App Router codebase. Route handlers under app/api parse the request and check RBAC, then delegate to server/services, which own all business logic, audit writes and the period lock. Prisma and PostgreSQL underneath; Ant Design, SWR and Recharts on top. Nothing reaches the database without passing the service layer, which is what makes the period lock and the audit trail trustworthy.",
    facts: [
      { label: "Prisma models", value: "53" },
      { label: "Roles", value: "4" },
      { label: "Gateway tx types", value: "15" },
      { label: "Profit breakdowns", value: "6" },
    ],
    decisions: [
      {
        title: "Every money row carries its own exchange rate",
        detail:
          "Amount, currency and the FX rate fixed on the day it happened are stored together, with USD as the base. Updating today's rate cannot change last month's profit.",
      },
      {
        title: "Decimal everywhere, never float",
        detail:
          "Money is Decimal(18,6) and rates are Decimal(24,12). A float rounding error in an accounting system is a real bug, not a rounding detail.",
      },
      {
        title: "Period lock lives in the service layer",
        detail:
          "A closed month rejects every mutation at the service boundary, so hiding the button in the UI is not what protects the books.",
      },
      {
        title: "Reconciliation has four explicit buckets",
        detail:
          "Matched, amount mismatch, orders with no money yet, and orphan transactions — naming the failure modes is what makes them fixable.",
      },
      {
        title: "Supplier debt is tracked per currency, then converted",
        detail:
          "Converting first would bake today's rate into a debt that was incurred at a different one.",
      },
      {
        title: "The audit log is append-only",
        detail:
          "Actor, before/after JSON, IP and timestamp for every mutation — the record of what changed cannot itself be edited.",
      },
    ],
    featured: true,
  },
  {
    slug: "trendscope",
    name: "TrendScope",
    tagline: "Keyword & product trend tracker for SEO",
    year: "2026",
    visibility: "private",
    stack: ["NestJS 11", "Next.js 16", "Turborepo", "Prisma", "PostgreSQL 17", "Redis", "Swagger"],
    highlights: [
      "Turborepo + pnpm monorepo splitting api / web apps from shared db, contracts and config packages.",
      "Scheduled ingestion running twice daily, writing append-only snapshots so history is never overwritten.",
      "Dashboard showing current interest, delta against the previous run and a 30-day series.",
      "Swappable data providers behind an env flag, with a labelled fixture provider for local work.",
      "JWT httpOnly cookies with refresh rotation, ADMIN / MEMBER roles and full Swagger docs.",
    ],
    problem:
      "The content team needed a daily answer to two questions — which keywords are climbing, and which products are trending on the marketplaces — to time SEO work. Commercial SaaS was overkill for an internal tool, and marketplace APIs only return your own shop's data.",
    architecture:
      "A pnpm + Turborepo monorepo: apps/web (Next.js App Router, Tailwind v4, shadcn/ui) and apps/api (NestJS with @nestjs/schedule for the cron), sharing packages/db (Prisma schema) and packages/contracts (Zod schemas used by both sides). PostgreSQL and Redis run in Docker Compose. Ingestion is written against two ports — TrendDataSource for keywords, ProductTrendSource for marketplaces — so each data source is an adapter selected by an env flag.",
    facts: [
      { label: "Ingestion runs", value: "2 / day" },
      { label: "History window", value: "30 days" },
      { label: "Prisma models", value: "4" },
      { label: "Keyword providers", value: "3" },
    ],
    decisions: [
      {
        title: "Data sources are ports, not branches",
        detail:
          "Adding a marketplace means writing one adapter. No business logic changes, and no if-statement grows a new arm.",
      },
      {
        title: "Snapshots are append-only",
        detail:
          "Each run writes a new row instead of updating the current value. That is precisely what makes deltas and the 30-day series possible at all.",
      },
      {
        title: "The default provider is a labelled fixture",
        detail:
          "The whole pipeline runs end to end with no API key, and demo numbers are marked as demo so they can never be read as real data.",
      },
      {
        title: "trendScore is derived, not imported",
        detail:
          "Rank position plus momentum is computed in the service, so scores stay comparable when the underlying source changes.",
      },
      {
        title: "Ingested payloads are validated at the boundary",
        detail:
          "Upstream schemas change without warning; Zod at the edge turns that into a clear error instead of corrupt history.",
      },
    ],
    featured: true,
  },
  {
    slug: "monkeymail",
    name: "MonkeyMail",
    tagline: "Cross-platform desktop email client",
    year: "2026",
    visibility: "private",
    stack: ["Tauri", "React", "Vite", "Node.js", "Express", "SQLite", "imapflow"],
    highlights: [
      "Two-way IMAP sync with real-time IDLE notifications; sending over SMTP.",
      "Conversation threading built by parsing Message-ID, In-Reply-To and References headers.",
      "Local SQLite cache for fast search and offline access to synced mailboxes.",
      "Multi-account management with a unified inbox, HTML rendering and attachments.",
      "Advanced search across sender, recipients, subject, body and attachment presence.",
    ],
    problem:
      "Working across several mailboxes meant a browser tab per account, search that round-trips to the server every time, and nothing readable offline.",
    architecture:
      "Three workspaces. A React + Vite frontend, a Node/Express mail-engine that speaks IMAP through imapflow and SMTP through nodemailer and owns the SQLite cache, and a Tauri shell that packages the whole thing as a native desktop app. Keeping the mail engine as its own process means the protocol work is testable without the desktop shell.",
    facts: [
      { label: "Shell", value: "Tauri" },
      { label: "Sync", value: "IMAP IDLE" },
      { label: "Cache", value: "SQLite" },
      { label: "Accounts", value: "Multi" },
    ],
    decisions: [
      {
        title: "Threads are rebuilt from headers",
        detail:
          "Message-ID, In-Reply-To and References are parsed locally rather than trusting each provider's own grouping, so threading behaves the same on every account.",
      },
      {
        title: "Replies re-emit the same headers",
        detail:
          "Outgoing mail carries correct In-Reply-To and References, so the conversation stays grouped in whatever client the other person uses.",
      },
      {
        title: "IDLE instead of polling",
        detail:
          "The server pushes; the client does not wake up every minute to ask. Fewer round trips, and mail arrives immediately.",
      },
      {
        title: "SQLite is the read path",
        detail:
          "Search and browsing hit the local cache, which is what makes the app feel instant and keeps synced mail readable offline.",
      },
    ],
    featured: true,
  },
  {
    slug: "spark",
    name: "SPARK",
    tagline: "Personal expense management system",
    year: "2025",
    visibility: "public",
    repo: "https://github.com/TranDinhVo/SPARK",
    stack: ["Spring Boot", "Spring Data JPA", "React", "MySQL", "Ant Design", "JWT"],
    highlights: [
      "RESTful APIs for transactions, budgets, savings goals, loans and financial reporting.",
      "Budgets per category and period, with a configurable alert threshold.",
      "Savings goals tracked through linked transactions, with in-progress / completed / failed / paused states.",
      "JWT-based authentication and authorization.",
      "Layered MVC architecture with Spring Data JPA for ORM.",
    ],
    problem:
      "Personal finance tracking that goes past a list of expenses: what was budgeted per category, how close a savings goal is, what is still owed on a loan, and what the month actually looked like.",
    architecture:
      "A React single-page frontend against a Spring Boot REST API secured with JWT, over MySQL. Layered MVC — controller, service, repository — with Spring Data JPA handling persistence.",
    facts: [
      { label: "Backend", value: "Spring Boot" },
      { label: "Database", value: "MySQL" },
      { label: "Auth", value: "JWT" },
      { label: "Budget alert", value: "80%" },
    ],
    featured: true,
  },
  {
    slug: "academix",
    name: "Academix",
    tagline: "Online classroom platform",
    year: "2025",
    visibility: "public",
    repo: "https://github.com/XuanDiep0310/Academix",
    stack: ["ASP.NET Core", "C#", "SQL Server", "React", "Redux", "Ant Design"],
    highlights: [
      "Backend in C# / ASP.NET Core over SQL Server; frontend in React with Redux for state management.",
      "Access token plus refresh token authentication, with login, registration, password change and reset.",
      "Role-based access control across Admin, Teacher and Student.",
      "Class and material management, a teacher-owned question bank and timed multiple-choice quizzes.",
      "Result tracking per student, with submissions and scores exportable to Excel.",
    ],
    problem:
      "Classes needed one place for materials, quizzes and results, serving three groups who must see very different things: administrators running the system, teachers running their classes, and students taking part.",
    architecture:
      "Client-server: an ASP.NET Core API issuing JWT access tokens and refresh tokens, a React + Redux frontend, SQL Server for storage, and cloud file storage for uploaded materials.",
    facts: [
      { label: "Roles", value: "3" },
      { label: "Backend", value: "ASP.NET Core" },
      { label: "Database", value: "SQL Server" },
      { label: "Auth", value: "JWT + refresh" },
    ],
    featured: false,
  },
  {
    slug: "pezura",
    name: "Pezura",
    tagline: "Print-on-demand e-commerce platform",
    year: "2026",
    visibility: "private",
    stack: ["Django", "DRF", "Next.js", "PostgreSQL", "Cloud Run", "GitHub Actions"],
    highlights: [
      "Django REST Framework backend deployed to Google Cloud Run with Cloud SQL and Cloud Storage.",
      "Next.js storefront on Vercel with a separate API subdomain.",
      "CI/CD via GitHub Actions, deploying automatically on push.",
    ],
    architecture:
      "A Django REST Framework API on Google Cloud Run backed by Cloud SQL and Cloud Storage, with a Next.js storefront deployed to Vercel against a separate API subdomain. GitHub Actions builds and deploys on push.",
    featured: false,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
