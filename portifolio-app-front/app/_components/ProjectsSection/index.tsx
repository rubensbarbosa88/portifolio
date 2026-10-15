import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import { InteractiveDotGrid } from "@/components/InteractiveDotGrid";

interface ProjectItem {
  name: string;
  description: string;
  tags: string[];
  thumb: string;
  githubUrl?: string;
  liveUrl?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    name: "rbs.video-converter",
    description:
      "Aplicação web para conversão de vídeos entre diferentes formatos, com foco na otimização de recursos em um ambiente de servidor limitado. O projeto inclui processamento com FFmpeg, controle de consumo de memória, validação e gerenciamentode arquivos, e controle de acesso à API.",
    tags: ["Vue 2", "Vuetify", "Node.js", "Express", "FFmpeg"],
    thumb: "/thumb-video-converter.png",
    githubUrl: "https://github.com/rubensbarbosa88/video-converter-front",
    liveUrl: "https://video-converter.rubensbarbosa.dev",
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projetos"
      className="relative w-full bg-bg-section pt-16 sm:pt-24 pb-8 sm:pb-12 border-t border-blue-primary/50 overflow-hidden flex flex-col justify-between"
    >
      {/* Background interativo de matriz de pontos com repulsão ao mouse */}
      <InteractiveDotGrid className="absolute inset-0 z-0 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto px-6 sm:px-12 lg:px-20 flex flex-col gap-10">
        {/* Section Header */}
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-red-accent rounded-sm" />
          <h2 className="font-orbitron text-2xl sm:text-3xl font-bold tracking-wide text-text-primary">
            PROJETOS
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className="bg-bg-card border border-blue-primary rounded-lg overflow-hidden flex flex-col transition-all duration-300 hover:border-cyan-glow/60 hover:shadow-[0_8px_30px_rgba(0,212,255,0.12)] hover:-translate-y-1.5 group"
            >
              {/* Card Banner with Gradient & Folder Icon */}
              <div className="w-full h-40 bg-gradient-to-br from-blue-primary to-bg-dark flex items-center justify-center relative overflow-hidden">
                {/* <FolderOpen className="w-12 h-12 text-cyan-muted group-hover:text-cyan-glow group-hover:scale-110 transition-all duration-300" /> */}

                <Image
                  src={project.thumb}
                  alt={`${project.name} thumbnail`}
                  width={400}
                  height={160}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                {/* Subtle cyber grid lines in banner */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,color-mix(in_srgb,var(--color-cyan-glow)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_srgb,var(--color-cyan-glow)_8%,transparent)_1px,transparent_1px)] bg-[size:1rem_1rem]" />

                {/* Corner quick action icons */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-bg-card/80 border border-blue-primary/50 text-text-secondary group-hover:scale-110 group-hover:border-cyan-glow/40 group-hover:text-text-primary hover:scale-125 hover:text-cyan-glow hover:border-cyan-glow hover:bg-bg-card transition-all duration-200 inline-flex items-center justify-center shadow-sm"
                      aria-label="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-bg-card/80 border border-blue-primary/50 text-text-secondary group-hover:scale-110 group-hover:border-cyan-glow/40 group-hover:text-text-primary hover:scale-125 hover:text-cyan-glow hover:border-cyan-glow hover:bg-bg-card transition-all duration-200 inline-flex items-center justify-center shadow-sm"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col gap-3 flex-1 justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="font-orbitron text-base font-bold text-cyan-glow group-hover:text-white transition-colors">
                    {project.name}
                  </h3>
                  <p className="font-sans text-[13px] text-text-secondary leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-blue-primary/50">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-primary text-cyan-light text-[10px] font-mono px-2 py-0.5 rounded transition-colors duration-200 hover:bg-cyan-glow/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
