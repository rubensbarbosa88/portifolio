import { Box, Code, Layers, type LucideIcon, Server } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "FRONT-END",
    icon: Code,
    skills: [
      "React",
      "Vue.js",
      "Angular",
      "TypeScript",
      "Next.js",
      "HTML/CSS",
      "JavaScript",
    ],
  },
  {
    title: "BACK-END",
    icon: Server,
    skills: [
      "Node.js",
      "NestJS",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "REST API",
      "Python",
    ],
  },
  {
    title: "DEVOPS",
    icon: Box,
    skills: [
      "Docker",
      "Azure DevOps",
      "CI/CD",
      "Git",
      "Linux",
      "YAML",
      "Shell Script",
    ],
  },
  {
    title: "ARQUITETURA",
    icon: Layers,
    skills: [
      "Microfrontends",
      "Module Federation",
      "Design System",
      "Webpack",
      "Rspack",
      "Performance Optimization",
      "Componentização",
    ],
  },
];
