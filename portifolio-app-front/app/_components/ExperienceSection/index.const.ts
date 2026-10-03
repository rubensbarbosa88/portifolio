interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  tags: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Mirae Asset Wealth Management (Brazil)",
    role: "Senior Front-end Developer",
    period: "2024 — 2026",
    tags: [
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "Docker",
      "CI/CD",
      "Microfrontends",
      "Module Federation",
    ],
  },
  {
    company: "Banco Modal",
    role: "Senior Front-end Developer",
    period: "2019 — 2024",
    tags: ["Vue.js", "Node.js", "CI/CD", "Microfrontends"],
  },
  {
    company: "Zup Innovation",
    role: "Full Stack Developer",
    period: "2019 — 2019",
    tags: ["AngularJs", "Node.js", "NestJS"],
  },
  {
    company: "Accenture",
    role: "Full Stack Developer",
    period: "2018 — 2019",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Cassandra",
      "Apache Cordova",
    ],
  },
  {
    company: "Keep.i Media",
    role: "Full Stack Developer",
    period: "2017 — 2018",
    tags: ["Vue.js", "Node.js", "Express", "MongoDB"],
  },
];
