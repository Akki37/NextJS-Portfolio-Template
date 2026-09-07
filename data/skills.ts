export type SkillGroup = {
  label: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "React Native",
      "Vite",
      "Redux",
      "Redux Saga",
      "Redux Toolkit",
      "React Router",
      "Expo Router",
    ],
  },
  {
    label: "UI / Styling",
    items: [
      "Tailwind CSS",
      "Material UI",
      "SCSS Modules",
      "shadcn/ui",
      "Base UI",
      "Emotion",
    ],
  },
  {
    label: "Forms / Testing",
    items: [
      "React Hook Form",
      "Formik",
      "Yup",
      "Jest",
      "React Testing Library",
    ],
  },
  {
    label: "API / Data",
    items: [
      "REST APIs",
      "Axios",
      "JWT",
      "AWS Signature Version 4",
      "Google OAuth 2.0",
      "SQLite",
      "AsyncStorage",
      "Local Storage",
    ],
  },
  {
    label: "Cloud / Backend",
    items: ["API Gateway", "S3", "CloudFront", "AWS Lambda", "Kotlin"],
  },
  {
    label: "Build / Deployment",
    items: ["GitHub Actions", "Turbopack", "Static SSG", "Vercel"],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "GitHub",
      "Bitbucket",
      "Postman",
      "Figma",
      "Jira",
      "VS Code",
    ],
  },
  {
    label: "AI Tools",
    items: ["Cursor", "ChatGPT", "Claude"],
  },
  {
    label: "Core Concepts",
    items: [
      "Frontend Architecture",
      "Performance Optimization",
      "Responsive Design",
      "State Management",
      "API Integration",
      "Component Design",
      "Accessibility",
      "SEO",
    ],
  },
];
