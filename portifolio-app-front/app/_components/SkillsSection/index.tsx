import { Box, Code, Layers, type LucideIcon, Server } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "FRONT-END",
    icon: Code,
    skills: [
      "React",
      "TypeScript",
      "Next.js",
      "Vue.js",
      "Tailwind CSS",
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
      "GraphQL",
    ],
  },
  {
    title: "DEVOPS",
    icon: Box,
    skills: [
      "Docker",
      "AWS",
      "CI/CD",
      "Git",
      "Linux",
      "Vercel",
      "GitHub Actions",
    ],
  },
  {
    title: "ARQUITETURA",
    icon: Layers,
    skills: [
      "Microfrontends",
      "Module Federation",
      "Design System",
      "Clean Code",
      "SOLID",
      "TDD",
      "Agile",
    ],
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="w-full bg-bg-dark py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-t border-blue-primary/50"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-red-accent rounded-sm" />
          <h2 className="font-orbitron text-2xl sm:text-3xl font-bold tracking-wide text-text-primary">
            ECOSSISTEMA TÉCNICO
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="bg-bg-card border border-blue-primary rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 hover:border-cyan-glow/60 hover:shadow-[0_4px_24px_rgba(0,212,255,0.08)] hover:-translate-y-1 group"
              >
                {/* Card Header */}
                <div className="flex items-center gap-2.5">
                  <Icon className="w-5 h-5 text-red-accent group-hover:scale-110 transition-transform" />
                  <h3 className="font-orbitron text-sm font-bold tracking-wider text-cyan-glow">
                    {category.title}
                  </h3>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-blue-primary" />

                {/* Techs List */}
                <ul className="flex flex-col gap-2.5">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-[2px] bg-cyan-light group-hover:bg-cyan-glow transition-colors" />
                      <span className="font-mono text-[13px] text-text-secondary group-hover:text-text-primary transition-colors">
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
