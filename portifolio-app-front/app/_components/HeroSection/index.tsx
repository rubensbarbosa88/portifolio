import { GlyphFlowBackground } from "@/components/GlyphFlowBackground";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { STATS } from "./index.const";
import { MatrixAvatar } from "./MatrixAvatar";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] bg-bg-dark flex items-center justify-center overflow-hidden py-16 px-6 sm:px-12 lg:px-20">
      {/* Dynamic Matrix Glyph Rain + Flow Field Vortex Background */}
      <GlyphFlowBackground className="opacity-45" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Greeting, Name, Role, Bio, Social, Stats */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Greeting */}
          <div className="font-mono text-sm sm:text-base text-cyan-glow flex items-center gap-2 tracking-wide">
            <span>{"// Hello World"}</span>
          </div>

          {/* Name Block */}
          <div className="flex flex-col">
            <h1 className="font-orbitron text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-none">
              RUBENS
            </h1>
            <h1 className="font-orbitron text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-cyan-glow leading-none mt-1 sm:mt-2">
              BARBOSA
            </h1>
          </div>

          {/* Red Title Divider */}
          <div className="w-28 sm:w-32 h-[3px] bg-red-accent my-1" />

          {/* Title Row */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-mono text-sm sm:text-base text-red-accent font-bold">
              &lt;
            </span>
            <span className="font-orbitron text-base sm:text-lg lg:text-xl font-medium tracking-wide text-text-primary">
              Full Stack Developer
            </span>
            <span className="font-mono text-sm sm:text-base text-red-accent font-bold">
              /&gt;
            </span>
          </div>

          {/* Bio Text */}
          <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl">
            Desenvolvedor de Software com experiência na criação e evolução de aplicações web, atuando principalmente no desenvolvimento Front-end, com foco em qualidade, performance e boas práticas
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com/rubensbarbosa88"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-bg-card border border-cyan-glow text-cyan-glow px-5 py-2.5 rounded font-mono text-xs sm:text-sm transition-all duration-200 hover:bg-cyan-glow/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] active:scale-95"
            >
              <GithubIcon className="w-4 h-4 text-cyan-glow group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/rubens-barbosa88"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-bg-card border border-cyan-glow text-cyan-glow px-5 py-2.5 rounded font-mono text-xs sm:text-sm transition-all duration-200 hover:bg-cyan-glow/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] active:scale-95"
            >
              <LinkedinIcon className="w-4 h-4 text-cyan-glow group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-6 sm:gap-10 pt-2">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center gap-0.5 text-center"
              >
                <div className="h-8 flex items-center justify-center">
                  <span
                    className={`font-orbitron font-bold text-cyan-glow whitespace-nowrap ${stat.valueSizeClass}`}
                  >
                    {stat.value}
                  </span>
                </div>
                <span className="font-sans text-[13px] font-semibold text-text-secondary whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Avatar with dual rings and cybernetic brackets */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] flex items-center justify-center">
            {/* Radial Glow */}
            <div className="absolute inset-0 rounded-full radial-glow-cyan animate-pulse-glow pointer-events-none" />

            {/* Matrix-style Avatar (dissolve radial no glyph rain do fundo) */}
            <MatrixAvatar
              src="/avatar.png"
              alt="Rubens Barbosa"
              className="absolute inset-0"
              style={{
                maskImage:
                  "radial-gradient(circle closest-side, #000 74%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(circle closest-side, #000 74%, transparent 100%)",
              }}
            />

            {/* Corner Tech Accents in Red */}
            {/* Top-Left */}
            <div className="absolute top-2 left-2 w-5 h-[2px] bg-red-accent" />
            <div className="absolute top-2 left-2 w-[2px] h-5 bg-red-accent" />

            {/* Bottom-Right */}
            <div className="absolute bottom-2 right-2 w-5 h-[2px] bg-red-accent" />
            <div className="absolute bottom-2 right-2 w-[2px] h-5 bg-red-accent" />

            {/* Outer Cyan Ring */}
            <div className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border-2 border-cyan-glow transition-transform duration-700 hover:rotate-45" />

            {/* Inner Red Ring */}
            <div className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full border border-red-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
