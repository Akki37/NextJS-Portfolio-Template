export type ContactLinkKey = "github" | "linkedin" | "mobile" | "email";

export type ContactLink = {
  key: ContactLinkKey;
  href: string;
  display: string;
};

/** URLs and display values — labels live in strings/locales. */
export const contactLinks: Record<ContactLinkKey, ContactLink> = {
  github: {
    key: "github",
    href: "https://github.com/Akki37",
    display: "github.com/Akki37",
  },
  linkedin: {
    key: "linkedin",
    href: "https://www.linkedin.com/in/vikas-goswami-41986a205/",
    display: "linkedin.com/in/vikas-goswami",
  },
  mobile: {
    key: "mobile",
    href: "tel:+918660377079",
    display: "+91 8660377079",
  },
  email: {
    key: "email",
    href: "mailto:vikasg224@gmail.com",
    display: "vikasg224@gmail.com",
  },
};

export const contactLinkOrder: ContactLinkKey[] = [
  "github",
  "linkedin",
  "mobile",
  "email",
];
