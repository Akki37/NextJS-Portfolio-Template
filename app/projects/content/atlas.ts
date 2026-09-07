import { Project } from "@/lib/project/types";

export const atlas: Project = {
  slug: "atlas",

  title: "Atlas",

  tagline:
    "An AI companion designed to think, listen and interact alongside creators.",

  description:
    "Atlas is a voice-first AI stream companion that understands conversations, responds naturally, executes actions and becomes an intelligent co-host for livestreams instead of simply acting as another chatbot.",

  coverImage: "components/project-logos/AtlasIcon.tsx",

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
      "Atlas is a voice-first AI companion built to assist content creators during livestreams through natural conversations, intelligent automation and contextual awareness.",

      "Unlike traditional chatbots that simply respond to predefined commands, Atlas continuously understands its environment, listens for wake words, interprets user intent and decides when to participate naturally.",

      "The platform combines conversational AI, real-time event processing and tool execution into a single interactive companion capable of assisting streamers while becoming part of the entertainment experience itself.",

      "Although initially designed for livestreaming, Atlas is being architected with a much broader vision — evolving into an intelligent desktop companion capable of helping users across productivity, gaming and everyday workflows.",
    ],
  },

  motivation: {
    title: "Motivation",

    paragraphs: [
      "Modern streaming assistants primarily automate repetitive tasks but rarely feel like an active participant during livestreams. Most interactions remain command-driven rather than conversational.",

      "Large Language Models have made natural conversations possible, yet creators still lack an AI companion capable of understanding ongoing discussions, reacting intelligently and interacting naturally with both the streamer and the audience.",

      "Atlas was created to bridge that gap by combining conversational intelligence, voice interaction and real-time automation into a companion that feels present rather than scripted.",

      "The long-term goal is to transform Atlas from a streaming assistant into a general-purpose AI companion capable of assisting users wherever natural conversation and intelligent automation are valuable.",
    ],
  },

  highlights: [
    {
      label: "Voice First",
    },
    {
      label: "AI Companion",
    },
    {
      label: "Real-Time",
    },
    {
      label: "Stream Ready",
    },
    {
      label: "LLM Powered",
    },
  ],

  comparison: {
    title: "What Makes It Different",

    description:
      "Most streaming assistants automate commands. Atlas is designed to become an intelligent companion capable of understanding conversations, reasoning about context and participating naturally during livestreams.",

    items: [
      {
        traditional: "Command-driven assistant",
        project: "Conversation-driven AI companion",
      },
      {
        traditional: "Responds only when triggered",
        project: "Continuously understands context",
      },
      {
        traditional: "Static automation",
        project: "Reasoning before taking action",
      },
      {
        traditional: "Chatbot interface",
        project: "Voice-first interactive companion",
      },
      {
        traditional: "Single-purpose streaming tools",
        project: "Scalable AI platform for creators and beyond",
      },
      {
        traditional: "Simple command execution",
        project: "Intelligent orchestration of tools, actions and conversations",
      },
    ],
  },
  architecture: [
    {
      title: "Voice Pipeline",
      description:
        "Continuously listens for wake words before converting speech into structured input for downstream reasoning.",
    },
    {
      title: "Intent & Context Engine",
      description:
        "Interprets user intent, maintains conversational context and determines the most appropriate action before responding.",
    },
    {
      title: "Tool Orchestration",
      description:
        "Coordinates external tools, APIs and local actions to execute user requests while preserving conversational flow.",
    },
    {
      title: "Response Generation",
      description:
        "Produces natural responses through LLM reasoning before delivering them through voice or on-screen interactions.",
    },
    {
      title: "Stream Integrations",
      description:
        "Communicates with streaming software, chat platforms and external services to automate workflows and interact with audiences.",
    },
    {
      title: "AI Companion Runtime",
      description:
        "Coordinates every subsystem into a unified runtime responsible for listening, reasoning, acting and responding in real time.",
    },
  ],

  features: {
    header: {
      badge: "Features",

      title: "Core Features",

      description:
        "Atlas combines conversational AI, real-time event processing and intelligent automation to become an active participant during livestreams rather than simply another assistant.",
    },

    items: [
      {
        title: "Voice-First Interaction",

        description:
          "Communicate naturally using voice instead of relying solely on commands or chat interfaces.",
      },

      {
        title: "Wake Word Detection",

        description:
          "Continuously listens for activation phrases before transitioning into an active conversational state.",
      },

      {
        title: "Context-Aware Conversations",

        description:
          "Maintains conversational context across multiple interactions, producing responses that feel natural and coherent.",
      },

      {
        title: "Intelligent Tool Execution",

        description:
          "Understands user intent before selecting and executing the appropriate tools or actions.",
      },

      {
        title: "Real-Time Stream Assistance",

        description:
          "Reads chat, assists streamers, answers questions and reacts naturally while remaining aware of ongoing conversations.",
      },

      {
        title: "OBS & Streaming Integration",

        description:
          "Designed to integrate with streaming software for scene control, overlays and creator workflows.",
      },

      {
        title: "Extensible AI Platform",

        description:
          "Built around a modular architecture capable of supporting future integrations, plugins and AI capabilities.",
      },

      {
        title: "Desktop Companion Vision",

        description:
          "Long-term roadmap extends beyond streaming into productivity, gaming and everyday desktop assistance.",
      },
    ],
  },

  engineeringChallenges: {
    header: {
      badge: "Engineering",

      title: "Interesting Engineering Challenges",

      description:
        "Atlas combines real-time communication, conversational AI and automation into a low-latency system where multiple intelligent runtimes must cooperate seamlessly.",
    },

    challenges: [
      {
        title: "Real-Time Voice Pipeline",

        description:
          "Building a responsive speech pipeline that continuously listens while minimizing latency between speech recognition, reasoning and response generation.",
      },

      {
        title: "Conversation Context Management",

        description:
          "Maintaining meaningful conversational memory while balancing performance, context length and response quality.",
      },

      {
        title: "Tool Orchestration",

        description:
          "Designing a runtime capable of selecting, prioritizing and coordinating multiple tools based on conversational intent.",
      },

      {
        title: "Streaming Event Coordination",

        description:
          "Synchronizing chat events, voice interactions, AI reasoning and external platform integrations without interrupting the livestream experience.",
      },

      {
        title: "Scalable AI Runtime",

        description:
          "Architecting Atlas as a modular companion capable of evolving beyond livestreams into a general-purpose desktop AI platform.",
      },
    ],
  },
  techStack: {
    header: {
      badge: "Technology",

      title: "Technology Stack",

      description:
        "Atlas combines modern frontend technologies, conversational AI and real-time communication systems to deliver a responsive, extensible and intelligent companion experience.",
    },

    categories: [
      {
        category: "Frontend",

        description:
          "Responsible for the user interface, voice visualization and interactive companion experience.",

        technologies: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
        ],
      },

      {
        category: "AI & Reasoning",

        description:
          "Large language models responsible for conversational reasoning, decision making and response generation.",

        technologies: [
          "LLMs",
          "Prompt Engineering",
          "Tool Calling",
          "Function Calling",
        ],
      },

      {
        category: "Voice & Audio",

        description:
          "Processes speech recognition, speech synthesis and real-time voice interactions.",

        technologies: [
          "Speech-to-Text",
          "Text-to-Speech",
          "Wake Word Detection",
          "Web Speech API",
        ],
      },

      {
        category: "Integrations",

        description:
          "Connects Atlas with streaming platforms, external tools and future automation ecosystems.",

        technologies: [
          "OBS",
          "Streamlabs",
          "WebSockets",
          "REST APIs",
          "MCP (Planned)",
        ],
      },
    ],
  },

  stats: {
    header: {
      badge: "Progress",

      title: "Project at a Glance",

      description:
        "A snapshot of Atlas and the long-term vision driving its development.",
    },

    items: [
      {
        label: "Platform",
        value: "Desktop",
      },

      {
        label: "Interaction",
        value: "Voice First",
      },

      {
        label: "Primary Use",
        value: "Streaming",
      },

      {
        label: "Architecture",
        value: "Modular",
      },

      {
        label: "Development Status",
        value: "Active",
      },

      {
        label: "Long-Term Vision",
        value: "AI Companion",
      },
    ],
  },

  roadmap: {
    header: {
      badge: "Roadmap",

      title: "From Stream Assistant to AI Companion",

      description:
        "Atlas is being developed incrementally, starting as an intelligent stream companion before evolving into a fully capable desktop AI platform.",

    },

    milestones: [
      {
        title: "Foundation",

        description:
          "Establish the core companion experience and runtime architecture.",

        completed: true,

        items: [
          {
            title: "Product Vision",
            completed: true,
          },
          {
            title: "Companion Personality",
            completed: true,
          },
          {
            title: "Interaction Model",
            completed: true,
          },
          {
            title: "Runtime Design",
            completed: true,
          },
        ],
      },

      {
        title: "Voice Runtime",

        description:
          "Build the complete conversational pipeline from listening to speaking.",

        completed: false,

        items: [
          {
            title: "Wake Word Detection",
            completed: false,
          },
          {
            title: "Speech Recognition",
            completed: false,
          },
          {
            title: "Conversation Management",
            completed: false,
          },
          {
            title: "Speech Synthesis",
            completed: false,
          },
        ],
      },

      {
        title: "AI Intelligence",

        description:
          "Introduce reasoning, memory and intelligent decision making.",

        completed: false,

        items: [
          {
            title: "Context Memory",
            completed: false,
          },
          {
            title: "Intent Recognition",
            completed: false,
          },
          {
            title: "Tool Selection",
            completed: false,
          },
          {
            title: "Conversation Reasoning",
            completed: false,
          },
        ],
      },

      {
        title: "Creator Ecosystem",

        description:
          "Integrate Atlas with livestreaming workflows and creator tools.",

        completed: false,

        items: [
          {
            title: "OBS Integration",
            completed: false,
          },
          {
            title: "Streamlabs Integration",
            completed: false,
          },
          {
            title: "Chat Interaction",
            completed: false,
          },
          {
            title: "Scene & Overlay Control",
            completed: false,
          },
        ],
      },

      {
        title: "Desktop Companion",

        description:
          "Expand Atlas beyond livestreaming into a general-purpose AI companion for productivity, gaming and everyday computing.",

        completed: false,

        items: [
          {
            title: "Desktop Automation",
            completed: false,
          },
          {
            title: "MCP Integrations",
            completed: false,
          },
          {
            title: "Third-Party Plugins",
            completed: false,
          },
          {
            title: "Persistent Memory",
            completed: false,
          },
          {
            title: "Cross-Platform Support",
            completed: false,
          },
        ],
      },
    ],
  },
};
