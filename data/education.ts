export type EducationEntry = {
  degree: string;
  institution: string;
  period: string;
  location: string;
};

export type CertificateEntry = {
  title: string;
  href?: string;
};

export const education: EducationEntry[] = [
  {
    degree: "Full Stack Development (MERN Stack)",
    institution: "DCT Academy",
    period: "2020 — 2021",
    location: "Bangalore",
  },
  {
    degree: "B.Sc — Information Technology",
    institution: "SGRR Institute of Technology & Science",
    period: "2016 — 2019",
    location: "Dehradun",
  },
];

export const certificates: CertificateEntry[] = [
  {
    title: "Meta React Native Professional Certificate",
    href: "https://www.coursera.org/account/accomplishments/verify/LUW9IAD99BBX",
  },
];
