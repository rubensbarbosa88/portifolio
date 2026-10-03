import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import { SKILL_CATEGORIES } from "./index.const";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative w-full bg-bg-dark py-16 sm:py-24 px-6 sm:px-12 lg:px-20 border-t border-blue-primary/50 overflow-hidden"
    >
      {/* Background interativo de matriz de pontos com repulsão ao mouse */}
      <InteractiveDotGrid className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-10">
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
