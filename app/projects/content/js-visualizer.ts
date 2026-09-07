import { Project } from "@/lib/project/types";

export const jsVisualizer: Project = {
  slug: "js-visualizer",

  title: "JS Visualizer",

  tagline:
    "Visualize how JavaScript actually executes through a custom-built runtime simulator.",

  description:
    "An educational platform that reconstructs JavaScript execution step-by-step using a custom runtime engine and interactive visualization system.",

  coverImage: "components/project-logos/JsVisualizerIcon.tsx",

  liveDemo: "https://javascript-runtime-visualizer.vercel.app/",

  github: "https://github.com/Akki37",

  documentation: "#",

  links: [
    {
      label: "Live Demo",
      href: "https://javascript-runtime-visualizer.vercel.app/",
    },
  ],

  overview: {
    title: "Overview",
    paragraphs:[
      "JS Runtime Visualizer is an educational software platform built to help developers understand how JavaScript executes internally.",

      "Instead of relying on browser debugging APIs, the project implements its own JavaScript runtime simulator capable of evaluating programs step-by-step while recording immutable execution frames.",

      "These runtime frames power an interactive Runtime Canvas where execution contexts, lexical environments, closures, heap memory, references, variables, runtime events and execution flow can be explored visually.",
        ]
  },

  motivation: {
    title: "Motivation",
    paragraphs:
    [
    "Modern browser debuggers are excellent for debugging applications but they don't explain how JavaScript actually works internally.",

    "The goal of this project is to bridge that gap by transforming invisible runtime behaviour into an educational visualization experience.",

    "Every architecture decision is centered around making JavaScript execution easier to understand without sacrificing runtime correctness.",
  ]
   },
   highlights: [
    {
      label: "Custom Runtime Engine",
    },
    {
      label: "205+ Tests",
    },
    {
      label: "Interactive Visualization",
    },
    {
      label: "Educational Platform",
    },
  ],
  comparison: {
    title: "What Makes It Different",
  
    description:
      "Most JavaScript tools focus on debugging applications. JS Runtime Visualizer focuses on teaching how JavaScript actually works internally.",
  
    items: [
      {
        traditional: "Shows current application state",
        project: "Simulates JavaScript execution step-by-step",
      },
      {
        traditional: "Relies on browser runtime",
        project: "Uses a custom-built runtime simulator",
      },
      {
        traditional: "Designed for debugging",
        project: "Designed for learning JavaScript internals",
      },
      {
        traditional: "Limited execution history",
        project: "Immutable runtime frames with full playback",
      },
      {
        traditional: "Minimal runtime visualization",
        project: "Interactive Runtime Canvas with multiple synchronized panels",
      },
      {
        traditional: "Hidden runtime mechanics",
        project: "Visualizes environments, closures, heap memory and references",
      },
    ],
  },
  architecture: [
    {
      title: "JavaScript Source",
      description: "User supplied JavaScript program.",
    },
    {
      title: "AST Parser",
      description:
        "Parses source code into an Abstract Syntax Tree for evaluation.",
    },
    {
      title: "Runtime Evaluator",
      description:
        "Custom evaluator responsible for executing JavaScript semantics.",
    },
    {
      title: "Simulator State",
      description:
        "Maintains execution contexts, environments, bindings, heap objects and runtime state.",
    },
    {
      title: "Immutable Runtime Frames",
      description:
        "Captures every execution step as an immutable snapshot.",
    },
    {
      title: "Runtime Canvas",
      description:
        "Visualizes execution using synchronized runtime panels.",
    },
  ],

  features: {
    header: {
      badge: "Features",
      title: "Core Features",
      description:
      "The platform combines a custom JavaScript runtime simulator with an interactive visualization engine, allowing developers to inspect execution as it happens rather than treating the runtime as a black box.",
    },
    items: [
        {
          title: "Custom JavaScript Runtime",
    
          description:
            "Evaluates JavaScript semantics using a purpose-built runtime instead of relying on the browser execution engine.",
        },
    
        {
          title: "Runtime Canvas",
    
          description:
            "Visualizes execution contexts, lexical environments, heap memory, closures and references through synchronized runtime panels.",
        },
    
        {
          title: "Execution Journal",
    
          description:
            "Records every runtime event into immutable execution frames, enabling deterministic playback and state inspection.",
        },
    
        {
          title: "Closure Visualization",
    
          description:
            "Explore captured variables, retained lexical environments and nested closure relationships interactively.",
        },
    
        {
          title: "Heap & Reference Tracking",
    
          description:
            "Observe object allocation, shared references and property mutations throughout program execution.",
        },
    
        {
          title: "Time-travel Playback",
    
          description:
            "Navigate through execution one step at a time using immutable runtime snapshots without re-running the program.",
        },
      ],
},

  engineeringChallenges: {
    header: {
      badge: "Engineering",

      title: "Interesting Engineering Challenges",

      description:
        "Building JS Runtime Visualizer involved solving several runtime, architecture and visualization problems that don't typically exist in traditional frontend applications.",
    },

  challenges: [
    {
      title: "Recursive Environment Grouping",
      description:
        "Represent recursive execution without overwhelming the visualization while preserving individual invocation state.",
    },
    {
      title: "Closure Environment Retention",
      description:
        "Retain only the lexical environments required by active closures instead of duplicating runtime state.",
    },
    {
      title: "Relationship Rendering",
      description:
        "Synchronize visual connections between runtime environments and heap objects using immutable frame data.",
    },
    {
      title: "Frame Differ Engine",
      description:
        "Generate meaningful runtime events by comparing consecutive execution snapshots.",
    },
   ]},

   techStack: {
    header: {
      badge: "Technology",
  
      title: "Technology Stack",
  
      description:
        "The project combines modern frontend technologies with a custom-built JavaScript runtime simulator to create an educational debugging experience.",
    },
  
    categories: [
      {
        category: "Frontend",
  
        description:
          "Responsible for the application UI, routing and interactive user experience.",
  
        technologies: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
        ],
      },
  
      {
        category: "Runtime Engine",
  
        description:
          "Powers parsing, evaluation and runtime simulation.",
  
        technologies: [
          "Acorn",
          "Custom JavaScript Evaluator",
          "Execution Journal",
          "Frame Recorder",
        ],
      },
  
      {
        category: "Visualization",
  
        description:
          "Transforms runtime state into an interactive educational interface.",
  
        technologies: [
          "Framer Motion",
          "SVG",
          "Runtime Canvas",
        ],
      },
  
      {
        category: "Testing & Tooling",
  
        description:
          "Ensures runtime correctness and maintains development quality.",
  
        technologies: [
          "Jest",
          "GitHub Actions",
          "Vercel",
        ],
      },
    ],
  },

  stats: {
    header: {
      badge: "Stats",
  
      title: "Project at a Glance",
  
      description:
        "A quick overview of the project's current scale, implementation progress and engineering maturity.",
    },
  
    items: [
      {
        label: "Implementation Phases",
        value: "15+",
      },
  
      {
        label: "Simulator Tests",
        value: "205+",
      },
  
      {
        label: "Debug Viewer Tests",
        value: "63+",
      },
  
      {
        label: "Language Features",
        value: "15",
      },
  
      {
        label: "Runtime Engine",
        value: "Custom",
      },
  
      {
        label: "Status",
        value: "Live • Ongoing expansion.",
      },
    ],
  },
  roadmap: {
    header: {
      badge: "Roadmap",
  
      title: "From Runtime Simulator to Learning Platform",
  
      description:
        "JS Runtime Visualizer is being developed incrementally, with each milestone expanding language support, improving runtime accuracy and enhancing the educational experience.",
    },
  
    milestones: [
      {
        title: "Runtime Foundations",
  
        description:
          "Build the core execution engine capable of evaluating JavaScript while generating immutable runtime frames.",
  
        completed: true,
  
        items: [
          {
            title: "Parser Integration",
            completed: true,
          },
          {
            title: "Execution Contexts",
            completed: true,
          },
          {
            title: "Lexical Environments",
            completed: true,
          },
          {
            title: "Scope Chain",
            completed: true,
          },
          {
            title: "Heap Memory",
            completed: true,
          },
          {
            title: "Reference Tracking",
            completed: true,
          },
        ],
      },
  
      {
        title: "Function Runtime",
  
        description:
          "Introduce function execution, closures and runtime visualization.",
  
        completed: true,
  
        items: [
          {
            title: "Function Invocation",
            completed: true,
          },
          {
            title: "Recursion",
            completed: true,
          },
          {
            title: "Closure Capture",
            completed: true,
          },
          {
            title: "Multi-level Closures",
            completed: true,
          },
          {
            title: "Execution Journal",
            completed: true,
          },
        ],
      },
  
      {
        title: "Language Support",
  
        description:
          "Expand support for JavaScript expressions while maintaining runtime correctness.",
  
        completed: false,
  
        items: [
          {
            title: "Assignment Expressions",
            completed: true,
          },
          {
            title: "Update Expressions",
            completed: true,
          },
          {
            title: "Unary Expressions",
            completed: true,
          },
          {
            title: "Logical Expressions",
            completed: false,
          },
          {
            title: "Binary Expressions",
            completed: false,
          },
          {
            title: "Arrays",
            completed: false,
          },
        ],
      },
  
      {
        title: "JavaScript Object Model",
  
        description:
          "Support JavaScript's object-oriented features and prototype system.",
  
        completed: false,
  
        items: [
          {
            title: "Prototype Chain",
            completed: false,
          },
          {
            title: "Constructors",
            completed: false,
          },
          {
            title: "Classes",
            completed: false,
          },
          {
            title: "Inheritance",
            completed: false,
          },
        ],
      },
  
      {
        title: "Modern JavaScript",
  
        description:
          "Extend language coverage to support modern ECMAScript features.",
  
        completed: false,
  
        items: [
          {
            title: "Modules",
            completed: false,
          },
          {
            title: "Import / Export",
            completed: false,
          },
          {
            title: "Destructuring",
            completed: false,
          },
          {
            title: "Spread & Rest",
            completed: false,
          },
        ],
      },
  
      {
        title: "Asynchronous Runtime",
  
        description:
          "Visualize asynchronous execution beyond the call stack.",
  
        completed: false,
  
        items: [
          {
            title: "Promises",
            completed: false,
          },
          {
            title: "Async / Await",
            completed: false,
          },
          {
            title: "Event Loop",
            completed: false,
          },
          {
            title: "Microtask Queue",
            completed: false,
          },
          {
            title: "Callback Queue",
            completed: false,
          },
        ],
      },
  
      {
        title: "Platform Evolution",
  
        description:
          "Transform the simulator into a complete JavaScript learning ecosystem.",
  
        completed: false,
  
        items: [
          {
            title: "Interactive Tutorials",
            completed: false,
          },
          {
            title: "Guided Challenges",
            completed: false,
          },
          {
            title: "Visual Explanations",
            completed: false,
          },
          {
            title: "Session Sharing",
            completed: false,
          },
          {
            title: "Performance Optimizations",
            completed: false,
          },
        ],
      },
    ],
  },
  // roadmap: {
  //   header: {
  //     badge: "Roadmap",
  
  //     title: "What's Next",
  
  //     description:
  //       "JS Runtime Visualizer is continuously evolving to support more JavaScript language features and richer runtime visualizations.",
  //   },
  
  //   items: [
  //     {
  //       title: "Logical & Binary Expressions",
  //       completed: false,
  
  //       description:
  //         "Support logical operators, comparison operators and additional expression evaluation.",
  //     },
  
  //     {
  //       title: "Arrays",
  
  //       completed: false,
  
  //       description:
  //         "Introduce array literals, indexing and mutation semantics.",
  //     },
  
  //     {
  //       title: "Prototype Chain",
  
  //       completed: false,
  
  //       description:
  //         "Visualize prototype inheritance and property resolution.",
  //     },
  
  //     {
  //       title: "Classes",
  
  //       completed: false,
  
  //       description:
  //         "Support ES6 classes, constructors and inheritance.",
  //     },
  
  //     {
  //       title: "Modules",
  
  //       completed: false,
  
  //       description:
  //         "Introduce ES Module imports, exports and module scope.",
  //     },
  
  //     {
  //       title: "Promises",
  
  //       completed: false,
  
  //       description:
  //         "Support Promise execution and asynchronous state transitions.",
  //     },
  
  //     {
  //       title: "Async / Await",
  
  //       completed: false,
  
  //       description:
  //         "Visualize async execution flow and suspension points.",
  //     },
  
  //     {
  //       title: "Event Loop",
  
  //       completed: false,
  
  //       description:
  //         "Simulate the Call Stack, Web APIs, Microtask Queue and Callback Queue.",
  //     },
  //   ],
  // },
};