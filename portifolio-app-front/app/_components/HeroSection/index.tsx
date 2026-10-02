import Image from "next/image";
import { GlyphFlowBackground } from "@/components/GlyphFlowBackground";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

interface StatItem {
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: "10+", label: "Anos" },
  { value: "500k+", label: "MAU" },
  { value: "15+", label: "MFEs" },
  { value: "< 1.2s", label: "LCP" },
];

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] bg-bg-dark flex items-center justify-center overflow-hidden py-16 px-6 sm:px-12 lg:px-20">
      {/* Dynamic Matrix Glyph Rain + Flow Field Vortex Background */}
      <GlyphFlowBackground className="opacity-45" />

      {/* Decorative Cyberpunk Background Scratch Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-25 overflow-hidden">
        <div className="absolute w-px h-[650px] bg-blue-primary left-[55%] top-[10%] rotate-[4.9deg]" />
        <div className="absolute w-px h-[600px] bg-blue-primary left-[58%] top-[8%] rotate-[2.4deg]" />
        <div className="absolute w-px h-[520px] bg-blue-primary left-[61%] top-[7%] rotate-[3.8deg]" />
        <div className="absolute w-px h-[780px] bg-blue-primary left-[64%] top-[6%] rotate-[2.9deg]" />
        <div className="absolute w-px h-[570px] bg-blue-primary left-[67%] top-[5%] rotate-[3.8deg]" />
        <div className="absolute w-px h-[590px] bg-blue-primary left-[70%] top-[4%] rotate-[4.6deg]" />
        <div className="absolute w-px h-[700px] bg-blue-primary left-[73%] top-[8%] rotate-[4.1deg]" />
        <div className="absolute w-px h-[680px] bg-blue-primary left-[76%] top-[6%] rotate-[4.4deg]" />
        <div className="absolute w-px h-[660px] bg-blue-primary left-[79%] top-[7%] rotate-[2.0deg]" />
        <div className="absolute w-px h-[560px] bg-blue-primary left-[82%] top-[5%] rotate-[4.3deg]" />
        <div className="absolute w-px h-[670px] bg-blue-primary left-[85%] top-[8%] rotate-[3.8deg]" />
        {/* Subtle grid accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-blue-primary)_6%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-blue-primary)_6%,transparent)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

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
              SENIOR FRONT-END DEVELOPER
            </span>
            <span className="font-mono text-sm sm:text-base text-red-accent font-bold">
              /&gt;
            </span>
          </div>

          {/* Bio Text */}
          <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl">
            Desenvolvedor Full Stack com experiência em Front-end e Back-end,
            especializado em React, TypeScript, Next.js e Vue.js. Foco em
            qualidade, performance e boas práticas.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-bg-card border border-cyan-glow text-cyan-glow px-5 py-2.5 rounded font-mono text-xs sm:text-sm transition-all duration-200 hover:bg-cyan-glow/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] active:scale-95"
            >
              <GithubIcon className="w-4 h-4 text-cyan-glow group-hover:scale-110 transition-transform" />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-bg-card border border-cyan-glow text-cyan-glow px-5 py-2.5 rounded font-mono text-xs sm:text-sm transition-all duration-200 hover:bg-cyan-glow/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] active:scale-95"
            >
              <LinkedinIcon className="w-4 h-4 text-cyan-glow group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4 sm:gap-8 pt-6 max-w-lg border-t border-blue-primary/60">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-start sm:items-center"
              >
                <span className="font-orbitron text-xl sm:text-2xl font-bold text-cyan-glow">
                  {stat.value}
                </span>
                <span className="font-sans text-[11px] uppercase tracking-wider text-text-muted mt-1">
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

            {/* Corner Tech Accents in Red */}
            {/* Top-Left */}
            <div className="absolute top-2 left-2 w-5 h-[2px] bg-red-accent" />
            <div className="absolute top-2 left-2 w-[2px] h-5 bg-red-accent" />

            {/* Bottom-Right */}
            <div className="absolute bottom-2 right-2 w-5 h-[2px] bg-red-accent" />
            <div className="absolute bottom-2 right-2 w-[2px] h-5 bg-red-accent" />

            {/* Outer Cyan Ring */}
            <div className="absolute w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] rounded-full border-2 border-cyan-glow transition-transform duration-700 hover:rotate-45" />

            {/* Inner Red Ring */}
            <div className="absolute w-[255px] h-[255px] sm:w-[304px] sm:h-[304px] rounded-full border border-red-accent" />

            {/* Avatar Image Circle */}
            <div className="relative w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] rounded-full overflow-hidden border border-blue-primary shadow-2xl">
              <Image
                src="/avatar.webp"
                alt="Rubens Barbosa"
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 240px, 290px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
