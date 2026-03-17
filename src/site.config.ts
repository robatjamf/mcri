import { withBase } from "./utils/helpers";

export type Link = {
  text: string;
  href: string;
};

export type Hero = {
  eyebrowText?: string;
  title: string;
  text: string;
  actions: Link[];
};

export type SiteConfig = {
  website: string;
  title: string;
  description: string;
  headerNavLinks: Link[];
  socialLinks: Link[];
  hero: Hero;
  footerBlurb: string;
  partnerLinks: {
    jamfCei: string;
    matter: string;
  };
};

const siteConfig: SiteConfig = {
  website: "https://robatjamf.github.io/mcri",
  title: "MCRI | Matter Career Readiness Institute",
  description:
    "The Matter Career Readiness Institute is a post-secondary institution in Victoria Falls, Zimbabwe, powered by Jamf Community Education Initiatives.",
  headerNavLinks: [
    { text: "Home", href: withBase("/") },
    { text: "Curriculum", href: withBase("/curriculum") },
    { text: "Student Work", href: withBase("/student-work") },
    { text: "About", href: withBase("/about") },
    { text: "Support", href: withBase("/support") },
  ],
  socialLinks: [
    {
      text: "LinkedIn",
      href: "https://www.linkedin.com/company/matterinnovationcentre/",
    },
  ],
  hero: {
    title: "Matter Career Readiness Institute",
    text:
      "A post-secondary institution in Victoria Falls, Zimbabwe, empowering students through technology, accessibility, and sustainability.",
    actions: [
      { text: "Learn More", href: withBase("/about") },
      { text: "How to Support", href: withBase("/support") },
    ],
  },
  footerBlurb:
    "Empowering students in Victoria Falls, Zimbabwe through technology, education, and career readiness.",
  partnerLinks: {
    jamfCei: "https://www.jamf.com/corporate-responsibility/giving-back/",
    matter:
      "https://www.matter.ngo/the-matter-career-readiness-institute-making-the-impossible-possible/",
  },
};

export default siteConfig;
