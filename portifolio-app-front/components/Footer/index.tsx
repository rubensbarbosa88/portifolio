import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

import { HexagonDecal } from "../HexagonDecal";

export function Footer() {
  return (
    <footer
      id="contato"
      className="w-full bg-bg-dark border-t border-blue-primary pt-12 px-6 sm:px-12 lg:px-20 text-center"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
        {/* Terminal Logo */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xl font-bold text-cyan-glow">
            &gt;
          </span>
          <span className="font-orbitron text-base font-bold tracking-wider text-text-primary">
            RUBENS.DEV
          </span>
        </div>

        <p className="font-sans text-sm text-text-secondary max-w-md">
          Pronto para colaborar em projetos inovadores com alto padrão de
          qualidade e performance front-end.
        </p>

        {/* Social / Contact Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-bg-card border border-blue-primary text-text-secondary hover:text-cyan-glow hover:border-cyan-glow transition-all"
            aria-label="GitHub"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-bg-card border border-blue-primary text-text-secondary hover:text-cyan-glow hover:border-cyan-glow transition-all"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href="mailto:contato@rubens.dev"
            className="p-2.5 rounded-full bg-bg-card border border-blue-primary text-text-secondary hover:text-cyan-glow hover:border-cyan-glow transition-all"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        <p className="font-mono text-xs text-text-muted pt-4">
          &copy; {new Date().getFullYear()} Rubens Barbosa. Todos os direitos
          reservados.
        </p>
      </div>

      {/* Decalque em degradê integrado ao fundo da seção (100% width) */}
      <div className="w-full mt-4 sm:mt-6">
        <HexagonDecal gradientDirection="red-to-cyan" />
      </div>
    </footer>
  );
}

export default Footer;
