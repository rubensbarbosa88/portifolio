"use client";

import { useEffect, useRef } from "react";

interface GravityWell {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  radius: number;
  strength: number;
}

export interface GlyphFlowBackgroundProps {
  className?: string;
}

export function GlyphFlowBackground({
  className = "",
}: GlyphFlowBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;

    container.appendChild(canvas);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    let rafId = 0;
    let visible = true;

    // Palette: Cyber Navy + Cyan Glow + Radiant White/Cyan
    const BG_RGB = "10, 22, 40"; // #0a1628
    const CYAN_RGB = "0, 212, 255"; // #00d4ff
    const CYAN_LIGHT_RGB = "77, 217, 232"; // #4dd9e8
    const BRIGHT_RGB = "225, 248, 255"; // #e1f8ff

    const COL_W = 20;
    const CELL_H = 20;
    const FONT_PX = 13;
    const FONT = `${FONT_PX}px 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace`;

    const GLYPHS = (
      "0123456789" +
      "ABCDEF" +
      "<>{}[]/*+=~$_" +
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ"
    ).split("");

    // ── Columns for Glyph Rain ──
    let cols = 0;
    let headY = new Float32Array(0);
    let speed = new Float32Array(0);
    let tail = new Int32Array(0);
    let boost = new Float32Array(0);

    function seedCol(i: number, scatter: boolean) {
      headY[i] = scatter
        ? Math.random() * h * 1.6 - h * 0.5
        : -Math.random() * h * 0.8;
      speed[i] = 1.3 + Math.random() * 2.1;
      tail[i] = 10 + Math.floor(Math.random() * 15); // 10..24 cells
      boost[i] = 0;
    }

    function glyphFor(col: number, cell: number): string {
      let n =
        (Math.imul(col + 1, 73856093) ^ Math.imul(cell + 1, 19349663)) | 0;
      n = Math.imul(n ^ (n >>> 13), 1274126177);
      n ^= n >>> 16;
      return GLYPHS[(n >>> 0) % GLYPHS.length];
    }

    // ── Spacetime Gravitational Distortion Trail ──
    const MAX_WELLS = 40;
    const wells: GravityWell[] = [];

    let lastX = -1;
    let lastY = -1;
    let currentX = -1;
    let currentY = -1;
    let pointerActive = false;

    function addGravityWell(x: number, y: number, velSpeed: number) {
      if (wells.length >= MAX_WELLS) {
        wells.shift();
      }
      wells.push({
        x,
        y,
        age: 0,
        maxAge: 32, // dissolução equilibrada (~0.5s)
        radius: 60 + Math.min(velSpeed * 0.75, 25), // raio intermediário calibrado (60px - 85px)
        strength: Math.min(0.72, 0.38 + velSpeed * 0.018),
      });
    }

    function alloc() {
      cols = Math.max(1, Math.floor(w / COL_W));
      headY = new Float32Array(cols);
      speed = new Float32Array(cols);
      tail = new Int32Array(cols);
      boost = new Float32Array(cols);
      for (let i = 0; i < cols; i++) seedCol(i, true);
    }

    function render() {
      // 1. Process pointer movement and create gravitational trail nodes
      if (pointerActive && currentX >= 0) {
        if (lastX >= 0) {
          const dx = currentX - lastX;
          const dy = currentY - lastY;
          const dist = Math.hypot(dx, dy);

          if (dist > 13) {
            addGravityWell(currentX, currentY, dist);
            lastX = currentX;
            lastY = currentY;
          }
        } else {
          addGravityWell(currentX, currentY, 5);
          lastX = currentX;
          lastY = currentY;
        }

        // Leve excitação de velocidade na coluna sob o cursor
        const curCol = Math.floor(currentX / COL_W);
        if (curCol >= 0 && curCol < cols) {
          boost[curCol] = Math.max(boost[curCol], 0.75);
          if (curCol > 0) boost[curCol - 1] = Math.max(boost[curCol - 1], 0.35);
          if (curCol < cols - 1)
            boost[curCol + 1] = Math.max(boost[curCol + 1], 0.35);
        }
      } else {
        lastX = -1;
        lastY = -1;
      }

      // 2. Age and decay active gravitational wells
      for (let i = wells.length - 1; i >= 0; i--) {
        wells[i].age++;
        if (wells[i].age >= wells[i].maxAge) {
          wells.splice(i, 1);
        }
      }

      // 3. Phosphor Trail Fade
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgba(${BG_RGB}, 0.12)`;
      ctx.fillRect(0, 0, w, h);

      // 4. Subtle Gravitational Wave Contour (Space-time fabric ripples)
      if (wells.length > 0) {
        ctx.lineWidth = 1;
        for (let i = 0; i < wells.length; i++) {
          const well = wells[i];
          const progress = well.age / well.maxAge;
          const fade = Math.sin((1 - progress) * Math.PI * 0.5) * 0.025;
          const currentRadius = well.radius * (0.35 + 0.65 * progress);

          ctx.beginPath();
          ctx.arc(well.x, well.y, currentRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${CYAN_RGB}, ${fade})`;
          ctx.stroke();
        }
      }

      // 5. Render Matrix Glyphs with Spacetime Gravitational Lensing
      ctx.font = FONT;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      for (let c = 0; c < cols; c++) {
        const baseX = c * COL_W + COL_W * 0.5;
        const hy = headY[c];
        const K = tail[c];
        const sp = speed[c] + boost[c];

        for (let k = 0; k < K; k++) {
          const baseY = hy - k * CELL_H;
          if (baseY < -CELL_H || baseY > h + CELL_H) continue;

          let warpX = 0;
          let warpY = 0;
          let totalDistortion = 0;

          // Compute gravitational pull from all active trail nodes in vicinity
          for (let i = 0; i < wells.length; i++) {
            const well = wells[i];
            const dx = baseX - well.x;
            const dy = baseY - well.y;
            const distSq = dx * dx + dy * dy;
            const r = well.radius;

            if (distSq < r * r && distSq > 1) {
              const d = Math.sqrt(distSq);
              const progress = well.age / well.maxAge;
              // Smooth bell-shaped life decay
              const lifeFade = (1 - progress) ** 1.4;
              const normDist = d / r; // 0 (center) to 1 (outer rim)

              // Subtle Gravitational Lens curve (tight Einstein ring curvature)
              const lensProfile =
                Math.sin(normDist * Math.PI) * (1 - normDist) ** 0.5;
              const pull = lensProfile * 11.5 * well.strength * lifeFade;

              warpX -= (dx / d) * pull;
              warpY -= (dy / d) * pull;

              const distortion = (1 - normDist) * lifeFade;
              if (distortion > totalDistortion) {
                totalDistortion = distortion;
              }
            }
          }

          const drawX = baseX + warpX;
          const drawY = baseY + warpY;

          const cell = Math.round(hy / CELL_H) - k;
          const char = glyphFor(c, cell);

          if (k === 0) {
            // Head glyph: flares near-white when bent by gravity
            ctx.fillStyle =
              totalDistortion > 0.25
                ? `rgba(${BRIGHT_RGB}, 0.98)`
                : `rgba(${CYAN_LIGHT_RGB}, 0.92)`;
          } else {
            // Tail glyph: smoothly fades, with subtle brightness boost under spacetime warping
            const baseAlpha = (1 - k / K) * 0.65;
            const alpha = Math.min(0.9, baseAlpha + totalDistortion * 0.22);
            ctx.fillStyle =
              totalDistortion > 0.25
                ? `rgba(${CYAN_LIGHT_RGB}, ${alpha})`
                : `rgba(${CYAN_RGB}, ${alpha * 0.72})`;
          }

          ctx.fillText(char, drawX, drawY);
        }

        // Advance column position
        headY[c] = hy + sp;
        boost[c] *= 0.94;
        if (boost[c] < 0.02) boost[c] = 0;

        // Recycle column when it completely exits bottom
        if (hy - K * CELL_H > h) {
          seedCol(c, false);
        }
      }
    }

    function resize() {
      const r = container?.getBoundingClientRect();
      if (!r) return;
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgb(${BG_RGB})`;
      ctx.fillRect(0, 0, w, h);
      alloc();
    }

    resize();

    const tick = () => {
      if (visible) render();
      rafId = requestAnimationFrame(tick);
    };

    if (reduced) {
      for (let c = 0; c < cols; c++) headY[c] = Math.random() * h;
      render();
    } else {
      rafId = requestAnimationFrame(tick);
    }

    const parentSection = container.closest("section") || container;

    const onPointerMove = (e: Event) => {
      const pe = e as PointerEvent;
      const r = canvas.getBoundingClientRect();
      currentX = pe.clientX - r.left;
      currentY = pe.clientY - r.top;
      pointerActive = true;
    };

    const onPointerLeave = () => {
      pointerActive = false;
      currentX = -1;
      currentY = -1;
    };

    if (!reduced) {
      parentSection.addEventListener("pointermove", onPointerMove);
      parentSection.addEventListener("pointerleave", onPointerLeave);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) render();
    });
    ro.observe(container);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0 },
    );
    io.observe(container);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      if (!reduced) {
        parentSection.removeEventListener("pointermove", onPointerMove);
        parentSection.removeEventListener("pointerleave", onPointerLeave);
      }
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}

export default GlyphFlowBackground;
