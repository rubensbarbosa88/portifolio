"use client";

import { type CSSProperties, useEffect, useRef } from "react";

interface GravityWell {
  x: number;
  y: number;
  age: number;
  maxAge: number;
  radius: number;
  strength: number;
}

export interface MatrixAvatarProps {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  /** Zoom aplicado sobre o "cover" da imagem (1 = cover puro). */
  zoom?: number;
  /** Deslocamento horizontal do retrato, em fração da largura do canvas. */
  offsetX?: number;
  /** Deslocamento vertical do retrato, em fração da altura do canvas. */
  offsetY?: number;
}

/**
 * Retrato "digital rain" (estilo Matrix) renderizado em canvas.
 *
 * A foto é amostrada em uma grade de glifos: a luminância de cada célula define
 * o brilho do glifo, colunas de chuva varrem o rosto e o fundo da foto é
 * removido (flood-fill a partir das bordas) para o retrato se fundir com o
 * `GlyphFlowBackground`. O cursor gera os mesmos poços gravitacionais (lente)
 * usados no background.
 */
export function MatrixAvatar({
  src,
  alt,
  className = "",
  style,
  zoom = 0.92,
  offsetX = -0.01,
  offsetY = 0.07,
}: MatrixAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    const context = canvas.getContext("2d");
    if (!context) return;
    const ctx: CanvasRenderingContext2D = context;
    container.appendChild(canvas);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Mesma paleta do GlyphFlowBackground (tokens do design system)
    const NAVY: [number, number, number] = [10, 22, 40]; // --color-bg-dark #0a1628
    const CYAN: [number, number, number] = [0, 212, 255]; // --color-cyan-glow #00d4ff
    const BRIGHT: [number, number, number] = [225, 248, 255]; // #e1f8ff
    const CYAN_RGB = "0, 212, 255";
    const CYAN_LIGHT_RGB = "77, 217, 232"; // #4dd9e8
    const BRIGHT_RGB = "225, 248, 255";

    // Grade mais fina que a do background para preservar os traços do rosto
    const COL_W = 7;
    const CELL_H = 9;
    const FONT = `9px 'JetBrains Mono', ui-monospace, Menlo, Consolas, monospace`;

    const GLYPHS = (
      "0123456789" +
      "ABCDEF" +
      "<>{}[]/*+=~$_" +
      "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ"
    ).split("");

    function hash(a: number, b: number): number {
      let n = (Math.imul(a + 1, 73856093) ^ Math.imul(b + 1, 19349663)) | 0;
      n = Math.imul(n ^ (n >>> 13), 1274126177);
      n ^= n >>> 16;
      return n >>> 0;
    }

    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let rafId = 0;
    let visible = true;
    let frame = 0;
    let img: HTMLImageElement | null = null;

    // Dados amostrados por célula
    let cellLum = new Float32Array(0); // 0..1 (brilho normalizado)
    let cellMask = new Float32Array(0); // 0..1 (cobertura do retrato)
    let cellPhase = new Uint16Array(0);
    let tintLayer: HTMLCanvasElement | null = null;

    // Colunas de chuva
    let headY = new Float32Array(0);
    let speed = new Float32Array(0);
    let tail = new Float32Array(0);
    let loop = new Float32Array(0);
    let boost = new Float32Array(0);

    // ── Interação com o ponteiro (mesma física do background) ──
    const MAX_WELLS = 30;
    const wells: GravityWell[] = [];
    let lastX = -1;
    let lastY = -1;
    let currentX = -1;
    let currentY = -1;
    let pointerActive = false;

    function addGravityWell(x: number, y: number, velSpeed: number) {
      if (wells.length >= MAX_WELLS) wells.shift();
      wells.push({
        x,
        y,
        age: 0,
        maxAge: 36,
        radius: 46 + Math.min(velSpeed * 0.6, 22),
        strength: Math.min(0.8, 0.42 + velSpeed * 0.02),
      });
    }

    function lerpColor(
      a: [number, number, number],
      b: [number, number, number],
      t: number,
    ): [number, number, number] {
      return [
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t,
      ];
    }

    /** Amostra a foto: remove o fundo, gera a camada tingida e os dados por célula. */
    function sample() {
      if (!img || w === 0 || h === 0) return;

      const sw = Math.round(w * dpr);
      const sh = Math.round(h * dpr);
      const off = document.createElement("canvas");
      off.width = sw;
      off.height = sh;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      // "object-fit: cover" + zoom + offset
      const ar = img.naturalHeight / img.naturalWidth;
      let drawW = sw * zoom;
      let drawH = drawW * ar;
      if (drawH < sh * zoom) {
        drawH = sh * zoom;
        drawW = drawH / ar;
      }
      const dx = (sw - drawW) / 2 + offsetX * sw;
      const dy = (sh - drawH) / 2 + offsetY * sh;
      octx.drawImage(img, dx, dy, drawW, drawH);

      const imageData = octx.getImageData(0, 0, sw, sh);
      const data = imageData.data;
      const total = sw * sh;

      // 1. Remoção de fundo (pixels claros/neutros conectados às bordas)
      const bg = new Uint8Array(total);
      const isBgPixel = (i: number) => {
        const p = i * 4;
        if (data[p + 3] < 24) return true;
        const r = data[p];
        const g = data[p + 1];
        const b = data[p + 2];
        const mn = Math.min(r, g, b);
        const mx = Math.max(r, g, b);
        return mn > 212 && mx - mn < 28;
      };
      const stack: number[] = [];
      const seed = (i: number) => {
        if (!bg[i] && isBgPixel(i)) {
          bg[i] = 1;
          stack.push(i);
        }
      };
      for (let x = 0; x < sw; x++) {
        seed(x);
        seed((sh - 1) * sw + x);
      }
      for (let y = 0; y < sh; y++) {
        seed(y * sw);
        seed(y * sw + sw - 1);
      }
      while (stack.length) {
        const i = stack.pop() as number;
        const x = i % sw;
        if (x > 0) seed(i - 1);
        if (x < sw - 1) seed(i + 1);
        if (i >= sw) seed(i - sw);
        if (i < total - sw) seed(i + sw);
      }

      // 2. Luminância + histograma (normalização por percentis)
      const lum = new Float32Array(total);
      const hist = new Uint32Array(256);
      let fgCount = 0;
      for (let i = 0; i < total; i++) {
        if (bg[i]) continue;
        const p = i * 4;
        const l =
          0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2];
        lum[i] = l;
        hist[Math.min(255, Math.round(l))]++;
        fgCount++;
      }
      let lo = 0;
      let hi = 255;
      if (fgCount > 0) {
        let acc = 0;
        for (let v = 0; v < 256; v++) {
          acc += hist[v];
          if (acc >= fgCount * 0.03) {
            lo = v;
            break;
          }
        }
        acc = 0;
        for (let v = 255; v >= 0; v--) {
          acc += hist[v];
          if (acc >= fgCount * 0.02) {
            hi = v;
            break;
          }
        }
      }
      const range = Math.max(1, hi - lo);

      // 3. Camada tingida (navy → cyan → branco) + acumulação por célula
      cols = Math.max(1, Math.ceil(w / COL_W));
      rows = Math.max(1, Math.ceil(h / CELL_H));
      const lumSum = new Float32Array(cols * rows);
      const fgSum = new Float32Array(cols * rows);
      const pxSum = new Float32Array(cols * rows);
      const cellWpx = COL_W * dpr;
      const cellHpx = CELL_H * dpr;

      for (let i = 0; i < total; i++) {
        const x = i % sw;
        const y = (i / sw) | 0;
        const ci =
          Math.min(rows - 1, (y / cellHpx) | 0) * cols +
          Math.min(cols - 1, (x / cellWpx) | 0);
        pxSum[ci]++;
        const p = i * 4;
        if (bg[i]) {
          data[p + 3] = 0;
          continue;
        }
        const n = Math.min(1, Math.max(0, (lum[i] - lo) / range));
        lumSum[ci] += n;
        fgSum[ci]++;
        const c =
          n < 0.72
            ? lerpColor(NAVY, CYAN, n / 0.72)
            : lerpColor(CYAN, BRIGHT, (n - 0.72) / 0.28);
        data[p] = c[0];
        data[p + 1] = c[1];
        data[p + 2] = c[2];
        data[p + 3] = 255;
      }
      octx.putImageData(imageData, 0, 0);
      tintLayer = off;

      cellLum = new Float32Array(cols * rows);
      cellMask = new Float32Array(cols * rows);
      cellPhase = new Uint16Array(cols * rows);
      for (let ci = 0; ci < cols * rows; ci++) {
        cellMask[ci] = pxSum[ci] > 0 ? fgSum[ci] / pxSum[ci] : 0;
        cellLum[ci] = fgSum[ci] > 0 ? (lumSum[ci] / fgSum[ci]) ** 0.7 : 0;
        cellPhase[ci] = hash(ci, 7) % 997;
      }

      // 4. Colunas de chuva
      headY = new Float32Array(cols);
      speed = new Float32Array(cols);
      tail = new Float32Array(cols);
      loop = new Float32Array(cols);
      boost = new Float32Array(cols);
      for (let c = 0; c < cols; c++) {
        tail[c] = 8 + Math.floor(Math.random() * 14);
        loop[c] = h * (0.55 + Math.random() * 0.7) + tail[c] * CELL_H;
        headY[c] = Math.random() * loop[c];
        speed[c] = 0.7 + Math.random() * 1.5;
      }
    }

    function render() {
      frame++;

      // 1. Poços gravitacionais a partir do ponteiro
      if (pointerActive && currentX >= 0) {
        if (lastX >= 0) {
          const dist = Math.hypot(currentX - lastX, currentY - lastY);
          if (dist > 10) {
            addGravityWell(currentX, currentY, dist);
            lastX = currentX;
            lastY = currentY;
          }
        } else {
          addGravityWell(currentX, currentY, 5);
          lastX = currentX;
          lastY = currentY;
        }

        if (
          currentX >= 0 &&
          currentX <= w &&
          currentY >= -40 &&
          currentY <= h + 40
        ) {
          const curCol = Math.floor(currentX / COL_W);
          for (let o = -3; o <= 3; o++) {
            const cc = curCol + o;
            if (cc < 0 || cc >= cols) continue;
            const b = 2.2 * (1 - Math.abs(o) / 4);
            boost[cc] = Math.max(boost[cc], b);
          }
        }
      } else {
        lastX = -1;
        lastY = -1;
      }

      for (let i = wells.length - 1; i >= 0; i--) {
        wells[i].age++;
        if (wells[i].age >= wells[i].maxAge) wells.splice(i, 1);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      if (!tintLayer) return;

      // 2. Camada base: foto tingida, bem sutil, para dar volume ao rosto
      ctx.globalAlpha = 0.38;
      ctx.drawImage(tintLayer, 0, 0, w, h);

      // 3. Glifos
      ctx.font = FONT;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      for (let c = 0; c < cols; c++) {
        const baseX = c * COL_W + COL_W * 0.5;
        const hy = headY[c];
        const K = tail[c];
        const L = loop[c];

        for (let r = 0; r < rows; r++) {
          const ci = r * cols + c;
          const mask = cellMask[ci];
          if (mask < 0.08) continue;

          const baseY = r * CELL_H + CELL_H * 0.5;
          const lum = cellLum[ci];

          // Distância (em células) atrás da cabeça da gota
          const rel = (((hy - baseY) % L) + L) % L;
          const k = rel / CELL_H;
          const t = k < K ? 1 - k / K : 0;
          const isHead = k < 1;

          // Lente gravitacional do cursor
          let warpX = 0;
          let warpY = 0;
          let distortion = 0;
          for (let i = 0; i < wells.length; i++) {
            const well = wells[i];
            const dx = baseX - well.x;
            const dy = baseY - well.y;
            const distSq = dx * dx + dy * dy;
            const rad = well.radius;
            if (distSq < rad * rad && distSq > 1) {
              const d = Math.sqrt(distSq);
              const lifeFade = (1 - well.age / well.maxAge) ** 1.4;
              const nd = d / rad;
              const pull =
                Math.sin(nd * Math.PI) *
                (1 - nd) ** 0.5 *
                10 *
                well.strength *
                lifeFade;
              warpX -= (dx / d) * pull;
              warpY -= (dy / d) * pull;
              const dist = (1 - nd) * lifeFade;
              if (dist > distortion) distortion = dist;
            }
          }

          // Brilho: luminância da foto × varredura da chuva + realce do cursor
          let alpha =
            mask *
            (0.1 + lum * (0.55 + 0.6 * t) + distortion * (0.3 + lum * 0.5));
          if (alpha < 0.04) continue;
          if (alpha > 1) alpha = 1;

          const phase = cellPhase[ci];
          const glyphTick = Math.floor((frame + phase) / (18 + (phase % 40)));
          const char =
            GLYPHS[hash(ci, isHead ? frame >> 2 : glyphTick) % GLYPHS.length];

          if ((isHead && t > 0 && lum > 0.25) || distortion > 0.45) {
            ctx.fillStyle = `rgb(${BRIGHT_RGB})`;
          } else if (t > 0.55 || distortion > 0.2 || lum > 0.8) {
            ctx.fillStyle = `rgb(${CYAN_LIGHT_RGB})`;
          } else {
            ctx.fillStyle = `rgb(${CYAN_RGB})`;
          }
          ctx.globalAlpha = alpha;
          ctx.fillText(char, baseX + warpX, baseY + warpY);
        }

        // Avança a coluna
        headY[c] = (hy + speed[c] + boost[c]) % (L * 64);
        boost[c] *= 0.93;
        if (boost[c] < 0.02) boost[c] = 0;
      }

      ctx.globalAlpha = 1;
    }

    function resize() {
      const rect = container?.getBoundingClientRect();
      if (!rect) return;
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      sample();
      if (reduced) render();
    }

    const tick = () => {
      if (visible) render();
      rafId = requestAnimationFrame(tick);
    };

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      img = image;
      resize();
      if (!reduced) rafId = requestAnimationFrame(tick);
    };
    image.src = src;

    const parentSection = container.closest("section") || container;

    const onPointerMove = (e: Event) => {
      const pe = e as PointerEvent;
      const rect = canvas.getBoundingClientRect();
      currentX = pe.clientX - rect.left;
      currentY = pe.clientY - rect.top;
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

    const ro = new ResizeObserver(() => resize());
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
      image.onload = null;
      ro.disconnect();
      io.disconnect();
      if (!reduced) {
        parentSection.removeEventListener("pointermove", onPointerMove);
        parentSection.removeEventListener("pointerleave", onPointerLeave);
      }
      canvas.remove();
    };
  }, [src, zoom, offsetX, offsetY]);

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label={alt}
      className={`pointer-events-none ${className}`}
      style={style}
    />
  );
}

export default MatrixAvatar;
