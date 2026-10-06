"use client";

import { Download, Menu, X } from "lucide-react";
import { useState } from "react";
import type { NavbarProps, NavItem } from "./types";

const NAV_ITEMS: NavItem[] = [
  { label: "Experiência", href: "#experiencia" },
  { label: "Skills", href: "#skills" },
  // { label: "Projetos", href: "#projetos" },
  { label: "Contato", href: "#contato" },
];

export function Navbar({ cvUrl = "#" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-bg-dark/90 backdrop-blur-md border-b border-blue-primary">
      <div className="max-w-7xl mx-auto h-16 px-6 sm:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
        >
          <span className="font-mono text-xl font-bold text-cyan-glow group-hover:text-white transition-colors">
            &gt;
          </span>
          <span className="font-orbitron text-base font-bold tracking-wider text-text-primary">
            rubensbarbosa.dev
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-sans text-text-secondary hover:text-cyan-glow transition-colors duration-200 relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-glow transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:flex items-center invisible">
          <a
            href={cvUrl}
            className="flex items-center gap-2 bg-red-accent hover:bg-red-hover text-white text-[13px] font-sans font-bold px-5 py-2 rounded transition-all duration-200 hover:shadow-[0_0_15px_rgba(230,57,70,0.5)] active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD CV</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-text-secondary hover:text-cyan-glow focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-section border-b border-blue-primary px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-sans text-text-secondary hover:text-cyan-glow py-2 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={cvUrl}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-red-accent hover:bg-red-hover text-white text-[13px] font-sans font-bold px-5 py-2.5 rounded transition-all mt-2 invisible"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD CV</span>
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
