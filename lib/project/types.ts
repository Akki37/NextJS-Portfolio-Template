  export interface ProjectFeatureItems {
    title: string;
    description: string;
  }

  export interface ProjectFeature {
    header: SectionHeader,
    items: ProjectFeatureItems[]
  }

  export interface SectionHeader {
    badge: string;
    title: string;
    description: string;
  }

  export interface EngineeringChallenge {
    title: string;
    description: string;
  }

  export interface ProjectEngineeringChallenge {
    header: SectionHeader
    challenges: EngineeringChallenge[];
  }

  export interface RoadmapMilestone {
    title: string;
    description: string;
    completed: boolean;
    items: RoadmapItem[];
  }
  
  export interface RoadmapItem {
    title: string;
    completed: boolean;
  }
  
  export interface Roadmap {
    header: SectionHeader;
    milestones: RoadmapMilestone[];
  }

  export interface ProjectStatItem {
    label: string;
    value: string;
  }

  export interface ProjectStat {
    header: SectionHeader;
    items: ProjectStatItem[];
  }

  export interface TechCategory {
    category: string;
    description?: string;
    technologies: string[];
  }

  export interface TechStack {
    header: SectionHeader;
    categories: TechCategory[];
  }
  
  export interface ProjectArchitectureStep {
    title: string;
    description?: string;
  }
  
  export type ProjectLinkIcon = "apple" | "android";

  export interface ProjectLink {
    label: string;
    href: string;
    /** Optional platform mark shown beside the label (e.g. store / APK CTAs). */
    icon?: ProjectLinkIcon;
  }

  export interface ProjectOverview {
    title: string;
    paragraphs: string[];
  }

  export interface ProjectMotivation {
    title: string;
    paragraphs: string[];
  }

  export interface ComparisonItem {
    traditional: string;
    project: string;
  }

  export interface ProjectComparison {
    title: string;
    description: string;
    items: ComparisonItem[];
  }
  export interface ProjectHighlight {
    label: string;
  }
  export interface Project {
    /**
     * Route slug
     * /projects/{slug}
     */
    slug: string;
  
    /**
     * Hero
     */
    title: string;
  
    tagline: string;
  
    description: string;
  
    /**
     * Assets
     */
    coverImage?: string;
  
    /**
     * Links
     */
    liveDemo?: string;
  
    github?: string;
  
    documentation?: string;
  
    /**
     * Hero Buttons
     */
    links: ProjectLink[];
  
    /**
     * About
     */
    overview: ProjectOverview;
  
    /**
     * Why this project exists
     */
    motivation: ProjectMotivation;

    comparison: ProjectComparison;
  
    highlights: ProjectHighlight[];
    /**
     * Runtime pipeline
     */
    architecture: ProjectArchitectureStep[];
  
    /**
     * Features
     */
    features: ProjectFeature;
  
    /**
     * Interesting engineering problems
     */
    engineeringChallenges: ProjectEngineeringChallenge;
  
    /**
     * Tech Stack
     */
    techStack: TechStack;
  
    /**
     * Portfolio stats
     */
    stats: ProjectStat;
  
    /**
     * Upcoming work
     */
    roadmap: Roadmap;
  }