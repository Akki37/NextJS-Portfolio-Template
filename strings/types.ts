export type HomeNavStrings = {
  overview: string;
  about: string;
  experience: string;
  projects: string;
  education: string;
  contact: string;
  resume: string;
}
export type HomeStrings = {
  name: string;
  role: string;
  tagline: string;
  scrollHint: string;
  nav: HomeNavStrings;
  scrollToTopLabel: string;
};

export type AboutStrings = {
  sectionLabel: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  skillsLabel: string;
  stats: {
    experience: { label: string; value: string };
    stack: { label: string; value: string };
    focus: { label: string; value: string };
  };
};

export type ExperienceStrings = {
  sectionLabel: string;
  title: string;
  description: string;
};

export type EducationStrings = {
  sectionLabel: string;
  title: string;
  description: string;
  certificatesLabel: string;
};

export type ProjectSectionStrings = {
  sectionLabel: string;
  title: string;
  description: string;
  footer: string;
  prevAriaLabel: string;
  nextAriaLabel: string;
};

export type ProjectsStrings = {
  [key: string]: {
    pageTitle: string;
    metaDescription: string;
    title: string;
    description: string;
    subtitle: string;
    nav: {
      [key: string]: string;
    };
  };
};

export type ProjectCardStrings = {
  featured: string;
  stack: string;
  selfLinkToast: {
    title: string;
    dismissLabel: string;
  };
  confidential: {
    title: string;
    subtitle: string;
  };
};

export type ContactStrings = {
  sectionLabel: string;
  title: string;
  description: string;
  labels: {
    github: string;
    linkedin: string;
    mobile: string;
    email: string;
  };
};

export type MetadataStrings = {
  title: string;
  description: string;
};

export type ResumeStrings = {
  pageTitle: string;
  metaDescription: string;
  download: string;
  backHome: string;
  nav: {
    [key: string]: string;
  };
};

export type GlobalStrings = {
  scrollHint: string;
  scrollToTopLabel: string;
  siteCredit: string;
};

/** All UI copy grouped by section/component. */
export type Strings = {
  metadata: MetadataStrings;
  home: HomeStrings;
  about: AboutStrings;
  experience: ExperienceStrings;
  education: EducationStrings;
  projectsSection: ProjectSectionStrings;
  projects: ProjectsStrings;
  projectCard: ProjectCardStrings;
  contact: ContactStrings;
  resume: ResumeStrings;
  globalStrings: GlobalStrings;
};
