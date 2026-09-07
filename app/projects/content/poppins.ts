import { Project } from "@/lib/project/types";

export const poppins: Project = {
  slug: "poppins",

  title: "Poppins",

  tagline:
    "Budget Better. Spend Smarter.",

  description:
    "A modern budgeting companion designed around real-world UPI spending habits, helping users make smarter financial decisions without changing how they already pay.",

  coverImage: "components/project-logos/PoppinsIcon.tsx",

  liveDemo: "#",

  github: "https://github.com/Akki37",

  documentation: "#",

  links: [
    {
      label: "Coming Soon",
      href: "#",
      icon: "apple",
    },
    {
      label: "Beta Version 1",
      href: "https://j5udi2doywavos5l.public.blob.vercel-storage.com/poppins.apk",
      icon: "android",
    },
  ],

  overview: {
    title: "Overview",

    paragraphs: [
      "Poppins is a mobile-first budgeting companion built around how people already spend money rather than forcing them to adopt an entirely new financial workflow.",

      "Instead of replacing Google Pay, PhonePe or other UPI applications, Poppins complements them by helping users understand the impact of every purchase on their monthly budgets.",

      "The platform introduces a flexible bucket-based budgeting system that organizes expenses naturally while providing clear visibility into spending, savings and financial goals.",

      "Long-term, Poppins aims to evolve beyond expense tracking into an intelligent financial companion capable of helping users make better spending decisions before they happen.",
    ],
  },

  motivation: {
    title: "Motivation",

    paragraphs: [
      "Most budgeting applications fail because they require users to completely change habits that already work. People enjoy using their preferred payment apps—the challenge isn't making payments, it's understanding their financial consequences.",

      "Traditional expense trackers usually become historical records of money that's already gone. They rarely help users decide whether spending money right now is actually a good financial decision.",

      "Poppins was designed around a much simpler question: 'Can I still afford this?' Every feature, interaction and budgeting model is built around answering that question as quickly and naturally as possible.",

      "The goal is not to replace payment applications, but to become the financial layer that sits beside them—making budgeting proactive instead of reactive.",
    ],
  },

  highlights: [
    {
      label: "India First",
    },
    {
      label: "UPI Focused",
    },
    {
      label: "Bucket Budgeting",
    },
    {
      label: "Mobile First",
    },
    {
      label: "AI Ready",
    },
  ],

  comparison: {
    title: "What Makes It Different",

    description:
      "Most budgeting applications focus on recording expenses after money has already been spent. Poppins focuses on helping users understand their budget before making financial decisions.",

    items: [
      {
        traditional: "Expense tracking after spending",
        project: "Budget awareness before spending",
      },
      {
        traditional: "Replace existing payment workflow",
        project: "Works alongside preferred UPI apps",
      },
      {
        traditional: "Category-first budgeting",
        project: "Flexible bucket-based budgeting",
      },
      {
        traditional: "Complex financial setup",
        project: "Simple onboarding with minimal friction",
      },
      {
        traditional: "Historical expense reports",
        project: "Real-time budget visibility",
      },
      {
        traditional: "Static financial data",
        project: "Future AI-powered financial guidance",
      },
    ],
  },
  architecture: [
    {
      title: "Budget Buckets",
      description:
        "Users create budgeting buckets representing financial goals such as Essentials, Lifestyle, Savings or Travel.",
    },
    {
      title: "Categories",
      description:
        "Multiple spending categories are organized inside each bucket, allowing flexible expense classification without complicating the budgeting experience.",
    },
    {
      title: "Spending Awareness",
      description:
        "Every purchase contributes to live budget progress, helping users understand how each spending decision affects their financial goals.",
    },
    {
      title: "Budget Engine",
      description:
        "The budgeting engine continuously calculates remaining balances, utilization percentages and spending trends.",
    },
    {
      title: "Insights",
      description:
        "Financial summaries help users understand where money is being spent and identify opportunities to improve budgeting habits.",
    },
    {
      title: "AI Companion",
      description:
        "Future AI capabilities will analyze spending behaviour and proactively recommend better financial decisions.",
    },
  ],

  features: {
    header: {
      badge: "Features",

      title: "Core Features",

      description:
        "Poppins combines intuitive budgeting with thoughtful financial planning, making it easier to understand where money goes and how every purchase affects monthly goals.",
    },

    items: [
      {
        title: "Bucket-Based Budgeting",

        description:
          "Create independent budget buckets for different financial goals instead of managing one large monthly budget.",
      },

      {
        title: "Flexible Categories",

        description:
          "Organize multiple spending categories inside each bucket while keeping budgeting simple and intuitive.",
      },

      {
        title: "Real-Time Budget Engine",
      
        description:
          "Maintaining accurate budget progress, category balances and financial summaries while keeping the experience responsive and intuitive.",
      },

      {
        title: "Budget Timeline",
      
        description:
          "Review how your monthly budget evolves over time with a chronological view of spending decisions and their impact.",
      },

      {
        title: "Monthly Dashboard",

        description:
          "Visualize spending patterns, bucket utilization and overall financial health from a single dashboard.",
      },

      {
        title: "Financial Insights",
      
        description:
          "Understand spending behaviour, identify patterns and discover opportunities to improve budgeting habits.",
      },

      {
        title: "AI Financial Companion",

        description:
          "Future AI features will help users make smarter financial decisions through personalized recommendations and proactive guidance.",
      },

      {
        title: "Mobile-First Experience",

        description:
          "Designed specifically for modern smartphones with fast interactions, minimal friction and an approachable interface.",
      },
    ],
  },

  engineeringChallenges: {
    header: {
      badge: "Engineering",

      title: "Interesting Engineering Challenges",

      description:
        "Building Poppins extends beyond expense tracking. The challenge lies in creating a budgeting experience that feels effortless while remaining flexible enough to support diverse financial habits.",
    },

    challenges: [
      {
        title: "Flexible Budget Architecture",

        description:
          "Designing a budgeting model that supports multiple financial strategies without overwhelming users with unnecessary complexity.",
      },

      {
        title: "Bucket & Category Relationship",

        description:
          "Separating budgeting buckets from spending categories while keeping expense allocation intuitive and scalable.",
      },

      {
        title: "Live Budget Progress",
      
        description:
          "Instantly see how every purchase affects your remaining budget across all active buckets.",
      },

      {
        title: "Adoption Without Behaviour Change",

        description:
          "Building around existing UPI payment habits instead of forcing users to abandon the payment applications they already trust.",
      },

      {
        title: "AI-Ready Financial Data",

        description:
          "Structuring financial information today so future AI features can deliver personalized budgeting advice without redesigning the data model.",
      },
    ],
  },
  techStack: {
    header: {
      badge: "Technology",

      title: "Technology Stack",

      description:
        "Built using a modern cross-platform technology stack focused on delivering a fast, scalable and delightful mobile experience.",
    },

    categories: [
      {
        category: "Mobile",

        description:
          "Cross-platform technologies powering the user experience across Android and iOS.",

        technologies: [
          "React Native",
          "Expo",
          "TypeScript",
        ],
      },

      {
        category: "Frontend",

        description:
          "UI architecture and navigation for building a responsive and intuitive budgeting experience.",

        technologies: [
          "React",
          "NativeWind",
          "React Navigation",
        ],
      },

      {
        category: "State Management",

        description:
          "Centralized application state for budgets, categories and spending insights.",

        technologies: [
          "Zustand",
        ],
      },

      {
        category: "Backend",

        description:
          "Cloud infrastructure planned for authentication, synchronization and persistent storage.",

        technologies: [
          "Supabase (Planned)",
        ],
      },
    ],
  },

  stats: {
    header: {
      badge: "Stats",

      title: "Project at a Glance",

      description:
        "A quick overview of the product vision, current development stage and long-term direction.",
    },

    items: [
      {
        label: "Platform",
        value: "Mobile",
      },

      {
        label: "Target Market",
        value: "India",
      },

      {
        label: "Primary Focus",
        value: "Budgeting",
      },

      {
        label: "Payment Ecosystem",
        value: "UPI",
      },

      {
        label: "Development Status",
        value: "Beta • v1 Rolled Out",
      },

      {
        label: "AI Companion",
        value: "Planned",
      },
    ],
  },

  roadmap: {
    header: {
      badge: "Roadmap",

      title: "From Budgeting App to Financial Companion",

      description:
        "Poppins is being developed incrementally, beginning with intelligent budgeting and gradually evolving into a complete personal finance companion.",
    },

    milestones: [
      {
        title: "Product Foundation",

        description:
          "Define the budgeting philosophy, product direction and user experience.",

        completed: true,

        items: [
          {
            title: "Product Research",
            completed: true,
          },
          {
            title: "UX Exploration",
            completed: true,
          },
          {
            title: "Budget Model Design",
            completed: true,
          },
          {
            title: "Bucket Architecture",
            completed: true,
          },
        ],
      },

      {
        title: "Budgeting Foundation",

        description:
          "Build the core budgeting workflow and financial management experience.",

        completed: false,

        items: [
          {
            title: "Budget Buckets",
            completed: true,
          },
          {
            title: "Categories",
            completed: true,
          },
          {
            title: "Budget Dashboard",
            completed: false,
          },
          {
            title: "Budget Timeline",
            completed: false,
          },
          {
            title: "Budget Analytics",
            completed: false,
          },
        ],
      },

      {
        title: "Smart Financial Insights",

        description:
          "Help users better understand spending behaviour and make informed budgeting decisions.",

        completed: false,

        items: [
          {
            title: "Monthly Reports",
            completed: false,
          },
          {
            title: "Category Insights",
            completed: false,
          },
          {
            title: "Budget Trends",
            completed: false,
          },
          {
            title: "Savings Opportunities",
            completed: false,
          },
        ],
      },

      {
        title: "AI Budgeting Companion",

        description:
          "Introduce proactive financial guidance powered by intelligent recommendations.",

        completed: false,

        items: [
          {
            title: "Smart Recommendations",
            completed: false,
          },
          {
            title: "Budget Forecasting",
            completed: false,
          },
          {
            title: "Goal Planning",
            completed: false,
          },
          {
            title: "Personalized Financial Guidance",
            completed: false,
          },
        ],
      },

      {
        title: "Connected Finance",

        description:
          "Expand Poppins into a broader financial platform while maintaining its budgeting-first philosophy.",

        completed: false,

        items: [
          {
            title: "Bank Integrations",
            completed: false,
          },
          {
            title: "Investment Tracking",
            completed: false,
          },
          {
            title: "Subscription Management",
            completed: false,
          },
          {
            title: "Family Budget Sharing",
            completed: false,
          },
        ],
      },
    ],
  },
};