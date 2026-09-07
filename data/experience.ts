export type ExperienceEngagement = {
  role: string;
  company: string;
  context?: string;
  period: string;
  highlights: string[];
};

export type ExperienceEntry = {
  role: string;
  company: string;
  companyHref?: string;
  period: string;
  location: string;
  leadWithCompany?: boolean;
  highlights?: string[];
  engagements?: ExperienceEngagement[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Frontend Engineer",
    company: "Independent & Freelance",
    period: "May 2026 — Present",
    location: "Remote / Bangalore",
    engagements: [
      {
        role: "Founding Frontend Engineer",
        company: "Keyhouse",
        context: "Real Estate / Early-Stage Startup",
        period: "May 2026 — Present",
        highlights: [
          "Manage and enhance an existing React-based real estate CRM, developing new product features while refactoring frontend code to improve maintainability, rendering performance, and overall application responsiveness.",
          "Built the iOS admin application from scratch using React Native, Expo, React 19, TypeScript, Expo Router, Redux Toolkit, Redux Saga, Axios, Google Sign-In, AWS Signature Version 4, and AsyncStorage, mapping existing web application workflows and APIs into a mobile-first experience.",
          "Contribute to the Android RM application by implementing a global theme system with persistent local state and synchronization with the device's preferred light/dark theme.",
          "Currently developing an AI assistant for the CRM product while expanding into AWS Lambda and Kotlin through hands-on backend work and selected bug fixes.",
        ],
      },
      {
        role: "Freelance Frontend Developer",
        company: "Koppa",
        context: "Freelance / Client — Netherlands",
        period: "Aug 2026 — Present",
        highlights: [
          "Developed a production-ready static marketing website using Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS v4, translating product requirements and Figma designs into responsive, component-driven interfaces.",
          "Built reusable UI components with shadcn/ui, Base UI, Lucide, and class-variance-authority, maintaining a consistent design system across product, pricing, blog, and legal pages.",
          "Structured the site around local JSON-driven content and implemented SEO using the Next.js Metadata API, canonical URLs, Open Graph and Twitter metadata, sitemap generation, and robots configuration.",
          'Configured static SSG export with output: "export" and deployed the generated site to Hostinger.',
        ],
      },
    ],
  },
  {
    role: "Frontend Developer (Contract)",
    company: "Bionicly",
    companyHref: "https://bionicly.ai/",
    leadWithCompany: true,
    period: "Oct 2025 — Mar 2026",
    location: "Remote | USA",
    highlights: [
      "Developed and shipped high-impact modules for a core B2B SaaS platform utilizing React, TypeScript, and Tailwind CSS.",
      "Architected a reusable design system and internal component library, reducing code duplication across the repository and cutting UI development sprint time by 20%.",
      "Implemented a complex Role-Based Access Control (RBAC) engine, ensuring secure, tier-based UI rendering and conditional feature gating across multiple user personas.",
      "Optimized data-heavy platform screens through code-splitting, dynamic imports, and lazy loading, yielding measurable improvements in initial page-load speeds.",
    ],
  },
  {
    role: "Independent Product Development (Personal Project)",
    company: "Atlas",
    companyHref: "#project-atlas",
    leadWithCompany: true,
    period: "Jan 2025 — Sept 2025",
    location: "Remote / Bangalore",
    highlights: [
      "Designed a hybrid pnpm/Cargo monorepo with a shared JSON-RPC 2.0 protocol, mirrored Rust/TypeScript types, and hexagonal ports/adapters architecture for a Rust sidecar.",
      "Implemented a Tauri 2 desktop shell with typed local IPC between the React application and Rust sidecar using NDJSON over Windows named pipes and Unix domain sockets, including handshake and session management.",
      "Built a feature-based React 19 frontend with shared UI components, Tailwind CSS, and TanStack Query for asynchronous sidecar state management.",
      "Added GitHub Actions CI with Rust tests, Clippy warnings-as-errors, and strict TypeScript typechecking.",
    ],
  },
  {
    role: "Founding Frontend Developer",
    company: "ElevateHQ",
    companyHref: "https://www.linkedin.com/company/elevatehq/",
    leadWithCompany: true,
    period: "Jun 2021 — Dec 2024",
    location: "Remote / Bangalore",
    highlights: [
      "Acted as a core frontend owner for a large-scale enterprise B2B sales commission SaaS platform, scaling web interfaces to support highly complex calculation dashboards.",
      "Re-architected legacy state management flows using React Context and Redux, resulting in a 40% reduction in production UI bugs and regression issues.",
      "Built complex data-visualization charts and tables, ensuring seamless REST API integration, optimized client-side filtering, and responsive rendering for enterprise-scale datasets.",
      "Partnered closely with product managers and backend engineers to scope new capabilities, rapidly troubleshooting production bottlenecks in an agile, sprint-driven cycle.",
    ],
  },
];
