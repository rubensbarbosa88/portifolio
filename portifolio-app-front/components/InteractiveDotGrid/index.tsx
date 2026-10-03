"use client";

import { useEffect, useRef } from "react";
import type { InteractiveDotGridProps } from "./types";

interface Dot {
  x: number;
  y: number;
  ox: number;
  oy: number;
  isAccent: boolean;
}

export function InteractiveDotGrid({
  className = "",
  spacing = 28,
  baseRadius = 1.2,
  activeRadius = 2.4,
  influenceRadius = 130,
  maxPush = 26,
  baseColor = "rgba(77, 217, 232, 0.16)",
  activeColor = "rgba(0, 212, 255, 0.9)",
  accentColor = "rgba(230, 57, 70, 0.9)",
  enableDualTone = true,
}: InteractiveDotGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    let isVisible = true;
    let rafId = 0;
    let isLoopRunning = false;

    // Estado do cursor
    let mouseX = -9999;
    let mouseY = -9999;
    let isMouseActive = false;

    function buildGrid() {
      const rect = container?.getBoundingClientRect();
      if (!rect) return;

      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      const cols = Math.floor(width / spacing) + 1;
      const rows = Math.floor(height / spacing) + 1;
      const startX = (width - (cols - 1) * spacing) / 2;
      const startY = (height - (rows - 1) * spacing) / 2;

      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Padrão de acento Rocket League (ciano com toques vermelhos)
          const isAccent = enableDualTone && (r * 17 + c * 31) % 9 === 0;

          dots.push({
            x: startX + c * spacing,
            y: startY + r * spacing,
            ox: 0,
            oy: 0,
            isAccent,
          });
        }
      }

      drawStaticOrStart();
    }

    function drawStatic() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      ctx.beginPath();
      ctx.fillStyle = baseColor;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.moveTo(dot.x + baseRadius, dot.y);
        ctx.arc(dot.x, dot.y, baseRadius, 0, Math.PI * 2);
      }
      ctx.fill();
    }

    function drawStaticOrStart() {
      if (prefersReduced) {
        drawStatic();
      } else {
        renderFrame();
      }
    }

    function wakeLoop() {
      if (prefersReduced || !isVisible || isLoopRunning) return;
      isLoopRunning = true;
      rafId = requestAnimationFrame(animate);
    }

    function animate() {
      if (!isVisible) {
        isLoopRunning = false;
        return;
      }

      const active = renderFrame();

      if (active || isMouseActive) {
        rafId = requestAnimationFrame(animate);
      } else {
        isLoopRunning = false;
      }
    }

    function renderFrame(): boolean {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      const ease = 0.14;
      const infRadiusSq = influenceRadius * influenceRadius;
      let hasMovement = false;

      const restDots: Dot[] = [];
      const movedDots: {
        dot: Dot;
        currentRadius: number;
        color: string;
        glow: boolean;
      }[] = [];

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let targetOx = 0;
        let targetOy = 0;

        if (isMouseActive) {
          const dx = dot.x - mouseX;
          const dy = dot.y - mouseY;
          const distSq = dx * dx + dy * dy;

          if (distSq < infRadiusSq) {
            const dist = Math.sqrt(distSq) || 0.001;
            // Curva de decaimento quadrático suave similar ao chrissgon.dev
            const pushFactor = 1 - dist / influenceRadius;
            const force = pushFactor * pushFactor * maxPush;
            targetOx = (dx / dist) * force;
            targetOy = (dy / dist) * force;
          }
        }

        // Interpolação elástica em direção ao alvo
        const diffX = targetOx - dot.ox;
        const diffY = targetOy - dot.oy;

        if (Math.abs(diffX) > 0.04 || Math.abs(diffY) > 0.04) {
          dot.ox += diffX * ease;
          dot.oy += diffY * ease;
          hasMovement = true;
        } else {
          dot.ox = targetOx;
          dot.oy = targetOy;
        }

        const dispSq = dot.ox * dot.ox + dot.oy * dot.oy;
        if (dispSq > 0.15) {
          hasMovement = true;
          const disp = Math.sqrt(dispSq);
          const ratio = Math.min(disp / maxPush, 1);
          const currentRadius =
            baseRadius + (activeRadius - baseRadius) * ratio;
          const color = dot.isAccent ? accentColor : activeColor;

          movedDots.push({
            dot,
            currentRadius,
            color,
            glow: ratio > 0.45,
          });
        } else {
          restDots.push(dot);
        }
      }

      // Passagem 1: Desenho em lote dos pontos em repouso (máxima performance)
      if (restDots.length > 0) {
        ctx.beginPath();
        ctx.fillStyle = baseColor;
        for (let i = 0; i < restDots.length; i++) {
          const d = restDots[i];
          ctx.moveTo(d.x + baseRadius, d.y);
          ctx.arc(d.x, d.y, baseRadius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Passagem 2: Desenho dos pontos excitados com cor e brilho
      for (let i = 0; i < movedDots.length; i++) {
        const item = movedDots[i];
        const px = item.dot.x + item.dot.ox;
        const py = item.dot.y + item.dot.oy;

        ctx.save();
        if (item.glow) {
          ctx.shadowColor = item.color;
          ctx.shadowBlur = 6;
        }
        ctx.fillStyle = item.color;
        ctx.beginPath();
        ctx.arc(px, py, item.currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      return hasMovement;
    }

    // Gerenciamento de eventos de ponteiro
    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReduced || !isVisible) return;
      if (e.pointerType === "touch") return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Ativa se o cursor estiver na seção (com margem de 40px)
      if (
        x >= -40 &&
        x <= rect.width + 40 &&
        y >= -40 &&
        y <= rect.height + 40
      ) {
        mouseX = x;
        mouseY = y;
        isMouseActive = true;
        wakeLoop();
      } else if (isMouseActive) {
        isMouseActive = false;
        mouseX = -9999;
        mouseY = -9999;
        wakeLoop();
      }
    };

    const handlePointerLeave = () => {
      if (!isMouseActive) return;
      isMouseActive = false;
      mouseX = -9999;
      mouseY = -9999;
      wakeLoop();
    };

    // Pausa animação quando a seção não estiver visível na tela
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          wakeLoop();
        } else {
          isMouseActive = false;
          if (rafId) {
            cancelAnimationFrame(rafId);
            isLoopRunning = false;
          }
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      buildGrid();
    });
    resizeObserver.observe(container);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);

    buildGrid();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "mouseleave",
        handlePointerLeave,
      );
      window.removeEventListener("blur", handlePointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, [
    spacing,
    baseRadius,
    activeRadius,
    influenceRadius,
    maxPush,
    baseColor,
    activeColor,
    accentColor,
    enableDualTone,
  ]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none ${className}`}
    />
  );
}

export default InteractiveDotGrid;
