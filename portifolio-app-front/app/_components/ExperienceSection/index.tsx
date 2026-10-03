"use client";

import { useEffect, useRef, useState } from "react";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";
import { EXPERIENCES } from "./index.const";

export function ExperienceSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Respeita as preferências de movimento reduzido do sistema
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiencia"
      className="relative w-full bg-bg-section pt-16 sm:pt-24 pb-0 sm:pb-12 border-t border-blue-primary/50 overflow-hidden flex flex-col justify-between"
    >
      {/* Background interativo de matriz de pontos com repulsão ao mouse */}
      <InteractiveDotGrid className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto px-6 sm:px-12 lg:px-20 flex flex-col gap-10">
        {/* Section Header */}
        <div
          className={`flex items-center gap-3 transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="w-1 h-8 bg-red-accent rounded-sm" />
          <h2 className="font-orbitron text-2xl sm:text-3xl font-bold tracking-wide text-text-primary">
            TRAJETÓRIA PROFISSIONAL
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col pl-4 sm:pl-6">
          {EXPERIENCES.map((item, index) => {
            const isLast = index === EXPERIENCES.length - 1;
            // Delay sequencial para cada card da timeline
            const itemDelay = 100 + index * 260;
            const lineDelay = itemDelay + 140;

            return (
              <div
                key={item.company}
                style={{
                  transitionDelay: isVisible ? `${itemDelay}ms` : "0ms",
                }}
                className={`relative flex gap-6 sm:gap-8 pb-10 group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >
                {/* Timeline Column: Dot & Connecting Line */}
                <div className="relative flex flex-col items-center">
                  {/* Glowing Dot */}
                  <div
                    style={{
                      transitionDelay: isVisible ? `${itemDelay}ms` : "0ms",
                    }}
                    className={`w-3.5 h-3.5 rounded-full bg-cyan-glow border-2 border-bg-section ring-2 ring-cyan-glow/30 z-10 mt-6 transition-all duration-500 ease-out group-hover:scale-125 group-hover:ring-cyan-glow ${
                      isVisible
                        ? "scale-100 opacity-100 ring-cyan-glow/60"
                        : "scale-0 opacity-0"
                    }`}
                  />
                  {/* Line */}
                  {!isLast && (
                    <div
                      style={{
                        transitionDelay: isVisible ? `${lineDelay}ms` : "0ms",
                      }}
                      className={`w-[2px] h-full absolute top-8 bottom-0 bg-gradient-to-b from-cyan-glow via-cyan-muted to-blue-primary origin-top transition-transform duration-500 ease-out ${
                        isVisible
                          ? "scale-y-100 opacity-100"
                          : "scale-y-0 opacity-20"
                      }`}
                    />
                  )}
                </div>

                {/* Experience Card */}
                <div className="flex-1 bg-bg-card border border-blue-primary rounded-md p-6 sm:p-7 flex flex-col gap-3 transition-all duration-300 hover:border-cyan-glow/60 hover:shadow-[0_4px_20px_rgba(0,212,255,0.08)] hover:-translate-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-orbitron text-base sm:text-lg font-bold text-cyan-glow group-hover:text-white transition-colors">
                      {item.company}
                    </h3>
                    <span className="font-mono text-xs text-text-muted">
                      {item.period}
                    </span>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-text-primary">
                    {item.role}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-blue-primary text-cyan-light text-[11px] font-mono px-2.5 py-1 rounded transition-colors duration-200 hover:bg-cyan-glow/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
