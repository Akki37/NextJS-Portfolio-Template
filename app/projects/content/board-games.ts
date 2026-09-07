import { Project } from "@/lib/project/types";

export const boardGames: Project = {
  slug: "board-games",

  title: "Board Games",

  tagline:
    "A modern collection of timeless board games, thoughtfully designed for every player.",

  description:
    "A unified platform bringing together classic board games under one consistent experience with modern visuals, smooth interactions and scalable game architecture.",

  coverImage: "components/project-logos/BoardGamesIcon.tsx",

  liveDemo: "#",

  github: "https://github.com/Akki37",

  documentation: "#",

  links: [
    {
      label: "Coming Soon",
      href: "#",
    },
  ],

  overview: {
    title: "Overview",

    paragraphs: [
      "Board Games is a modern gaming platform that brings together multiple classic board games within a single cohesive application.",

      "Rather than building individual applications for each game, the platform provides a shared ecosystem where players can seamlessly switch between games while enjoying a consistent design language, animations and user experience.",

      "Every game is built on a shared foundation that includes reusable UI components, player profiles, settings, achievements and progression systems.",

      "The long-term vision is to create a polished digital board game destination where discovering and playing classic games feels effortless across devices.",
    ],
  },

  motivation: {
    title: "Motivation",

    paragraphs: [
      "Many classic board games exist as standalone applications with inconsistent interfaces, varying quality and duplicated functionality.",

      "Players often install multiple apps just to enjoy different games, even though those apps share many common features such as profiles, settings, multiplayer systems and achievements.",

      "Board Games was created to unify these experiences into a single platform where every game feels familiar while preserving its own gameplay mechanics.",

      "The project focuses on delivering a premium gaming experience through consistency, simplicity and thoughtful interaction design rather than treating each game as an isolated product.",
    ],
  },

  highlights: [
    {
      label: "Multi-Game Platform",
    },
    {
      label: "Shared Design System",
    },
    {
      label: "Cross Platform",
    },
    {
      label: "Scalable Architecture",
    },
    {
      label: "Modern UI",
    },
  ],

  comparison: {
    title: "What Makes It Different",

    description:
      "Instead of building separate applications for every board game, Board Games provides a unified platform where multiple games share one polished ecosystem.",

    items: [
      {
        traditional: "One app per game",
        project: "Multiple games in one platform",
      },
      {
        traditional: "Different UI for every game",
        project: "Consistent design language",
      },
      {
        traditional: "Separate player profiles",
        project: "Shared player progression",
      },
      {
        traditional: "Independent settings",
        project: "Centralized preferences",
      },
      {
        traditional: "Duplicate development effort",
        project: "Reusable game infrastructure",
      },
      {
        traditional: "Static game collection",
        project: "Platform designed for continuous expansion",
      },
    ],
  },
  architecture: [
    {
      title: "Game Hub",
      description:
        "A centralized home experience where players can discover, launch and manage every available board game.",
    },
    {
      title: "Shared Game Engine",
      description:
        "Common infrastructure powering player management, game lifecycle, animations, sounds and reusable gameplay components.",
    },
    {
      title: "Individual Game Logic",
      description:
        "Each board game implements its own rules and mechanics while leveraging the shared platform architecture.",
    },
    {
      title: "Player Progression",
      description:
        "Profiles, achievements, statistics and preferences are shared across every game in the platform.",
    },
    {
      title: "Game Sessions",
      description:
        "Each match maintains independent game state, move history and winner calculation while remaining consistent with the overall platform experience.",
    },
    {
      title: "Platform Expansion",
      description:
        "The modular architecture allows new board games to be added with minimal effort while maintaining a unified user experience.",
    },
  ],

  features: {
    header: {
      badge: "Features",

      title: "Core Features",

      description:
        "Board Games provides a shared gaming ecosystem where every game feels familiar while preserving its own unique gameplay mechanics.",
    },

    items: [
      {
        title: "Multiple Classic Games",

        description:
          "Play popular board games such as Tic Tac Toe, Connect 4, SOS, Hangman and more from a single application.",
      },

      {
        title: "Consistent User Experience",

        description:
          "Every game follows the same navigation, animations, interaction patterns and visual language.",
      },

      {
        title: "Shared Player Profiles",

        description:
          "Track achievements, statistics and overall progression across every game in the platform.",
      },

      {
        title: "Modern Game Interface",

        description:
          "Designed with responsive layouts, polished animations and intuitive interactions for players of all ages.",
      },

      {
        title: "Achievements & Progress",

        description:
          "Unlock achievements, monitor performance and build a persistent player profile across games.",
      },

      {
        title: "Customizable Experience",

        description:
          "Manage themes, sounds, accessibility options and gameplay preferences from one centralized settings system.",
      },

      {
        title: "Scalable Game Platform",

        description:
          "New games can be introduced without redesigning the application thanks to a modular architecture.",
      },

      {
        title: "Cross-Platform Experience",

        description:
          "Built to deliver a consistent experience across mobile devices with future support for additional platforms.",
      },
    ],
  },

  engineeringChallenges: {
    header: {
      badge: "Engineering",

      title: "Interesting Engineering Challenges",

      description:
        "Building a multi-game platform requires creating reusable systems that support diverse gameplay mechanics while maintaining a consistent user experience.",
    },

    challenges: [
      {
        title: "Shared Platform Architecture",

        description:
          "Designing reusable infrastructure that allows multiple games to coexist without duplicating common functionality.",
      },

      {
        title: "Reusable Game Components",

        description:
          "Building flexible UI and gameplay components that can adapt to different board layouts and interaction models.",
      },

      {
        title: "Game State Management",

        description:
          "Managing independent game sessions while keeping player progression and platform-wide data synchronized.",
      },

      {
        title: "Consistent User Experience",

        description:
          "Maintaining a unified navigation, animation system and visual identity across games with very different mechanics.",
      },

      {
        title: "Platform Scalability",

        description:
          "Creating an architecture where introducing new board games requires minimal development effort while preserving existing functionality.",
      },
    ],
  },
  techStack: {
    header: {
      badge: "Technology",

      title: "Technology Stack",

      description:
        "A modern frontend architecture designed to support multiple games while maintaining a consistent, performant and scalable user experience.",
    },

    categories: [
      {
        category: "Frontend",

        description:
          "Responsible for the overall application, navigation and user experience.",

        technologies: [
          "React Native",
          "Expo",
          "TypeScript",
          "NativeWind",
        ],
      },

      {
        category: "Game Engine",

        description:
          "Shared game infrastructure powering reusable gameplay logic and state management.",

        technologies: [
          "Custom Game Engine",
          "Reusable Board Components",
          "Game State Manager",
        ],
      },

      {
        category: "Animations",

        description:
          "Provides smooth transitions, feedback animations and engaging gameplay interactions.",

        technologies: [
          "React Native Reanimated",
          "React Native Gesture Handler",
          "Lottie",
        ],
      },

      {
        category: "Tooling",

        description:
          "Supports development, testing and deployment across the platform.",

        technologies: [
          "Jest",
          "GitHub Actions",
          "Expo EAS",
        ],
      },
    ],
  },

  stats: {
    header: {
      badge: "Stats",

      title: "Project at a Glance",

      description:
        "A quick overview of the platform vision and current development direction.",
    },

    items: [
      {
        label: "Platform",
        value: "Mobile",
      },

      {
        label: "Games Planned",
        value: "10+",
      },

      {
        label: "Architecture",
        value: "Modular",
      },

      {
        label: "Design System",
        value: "Shared",
      },

      {
        label: "Status",
        value: "Planning",
      },

      {
        label: "Expansion",
        value: "Continuous",
      },
    ],
  },

  roadmap: {
    header: {
      badge: "Roadmap",

      title: "Building the Ultimate Board Game Platform",

      description:
        "The platform is being developed incrementally, beginning with a strong shared foundation before expanding into a comprehensive collection of classic board games.",
    },

    milestones: [
      {
        title: "Platform Foundation",

        description:
          "Establish the shared application architecture, navigation and design system.",

        completed: true,

        items: [
          {
            title: "Product Vision",
            completed: true,
          },
          {
            title: "Design Language",
            completed: true,
          },
          {
            title: "Application Architecture",
            completed: true,
          },
          {
            title: "Shared UI Components",
            completed: true,
          },
        ],
      },

      {
        title: "Core Games",

        description:
          "Launch the initial collection of classic board games.",

        completed: false,

        items: [
          {
            title: "Tic Tac Toe",
            completed: false,
          },
          {
            title: "Connect 4",
            completed: false,
          },
          {
            title: "SOS",
            completed: false,
          },
          {
            title: "Hangman",
            completed: false,
          },
        ],
      },

      {
        title: "Player Experience",

        description:
          "Introduce shared progression systems and personalization features.",

        completed: false,

        items: [
          {
            title: "Player Profiles",
            completed: false,
          },
          {
            title: "Achievements",
            completed: false,
          },
          {
            title: "Statistics",
            completed: false,
          },
          {
            title: "Themes",
            completed: false,
          },
        ],
      },

      {
        title: "Social Gameplay",

        description:
          "Expand gameplay beyond local matches through connected experiences.",

        completed: false,

        items: [
          {
            title: "Online Multiplayer",
            completed: false,
          },
          {
            title: "Friends System",
            completed: false,
          },
          {
            title: "Leaderboards",
            completed: false,
          },
          {
            title: "Invitations",
            completed: false,
          },
        ],
      },

      {
        title: "Platform Expansion",

        description:
          "Continue growing the platform by introducing additional games and long-term engagement features.",

        completed: false,

        items: [
          {
            title: "Chess",
            completed: false,
          },
          {
            title: "Checkers",
            completed: false,
          },
          {
            title: "Ludo",
            completed: false,
          },
          {
            title: "Daily Challenges",
            completed: false,
          },
          {
            title: "Seasonal Events",
            completed: false,
          },
        ],
      },
    ],
  },
};