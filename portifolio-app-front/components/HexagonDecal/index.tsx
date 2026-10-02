"use client";

import { useMemo } from "react";
import type { HexagonDecalProps } from "./types";

interface DotItem {
  id: string;
  color: "cyan" | "red";
}

interface DotRow {
  id: string;
  dots: DotItem[];
  isStaggered: boolean;
  opacityClass: string;
}

function getDotColor(
  rIdx: number,
  cIdx: number,
  totalCols: number,
  direction: "red-to-cyan" | "cyan-to-red",
): "cyan" | "red" {
  // Padrão base do arquivo Pencil UX (Hex 10-14 e Hex 20-24)
  const pattern0: ("cyan" | "red")[] = [
    "red",
    "red",
    "cyan",
    "red",
    "cyan",
    "cyan",
    "red",
    "cyan",
    "cyan",
    "red",
    "red",
    "cyan",
    "red",
    "red",
    "cyan",
  ];
  const pattern1: ("cyan" | "red")[] = [
    "red",
    "red",
    "red",
    "cyan",
    "cyan",
    "red",
    "red",
    "cyan",
    "cyan",
    "cyan",
    "red",
    "red",
    "red",
    "cyan",
    "cyan",
  ];
  const pattern2: ("cyan" | "red")[] = [
    "cyan",
    "cyan",
    "red",
    "cyan",
    "cyan",
    "cyan",
    "red",
    "red",
    "cyan",
    "cyan",
    "cyan",
    "cyan",
    "red",
    "cyan",
    "cyan",
  ];

  const patterns = [pattern0, pattern1, pattern2];
  const activePattern = patterns[rIdx % patterns.length];
  let baseColor = activePattern[cIdx % activePattern.length];

  // Gradiente suave contínuo estilo Rocket League ao longo da largura total
  const progress = cIdx / (totalCols - 1);
  const seed = (rIdx * 997 + cIdx * 31) % 100;

  if (direction === "red-to-cyan") {
    if (progress < 0.25 && seed < 35) {
      baseColor = "red";
    } else if (progress > 0.75 && seed < 40) {
      baseColor = "cyan";
    }
  } else {
    // Inverte para cyan-to-red
    baseColor = baseColor === "red" ? "cyan" : "red";

    if (progress < 0.25 && seed < 35) {
      baseColor = "cyan";
    } else if (progress > 0.75 && seed < 40) {
      baseColor = "red";
    }
  }

  return baseColor;
}

function getRowOpacity(rIdx: number, totalRows: number): string {
  if (totalRows <= 1) return "opacity-75";
  if (totalRows === 2) {
    return rIdx === 0 ? "opacity-35" : "opacity-80";
  }
  // 3 linhas ou mais: cria um degradê suave emergindo do fundo
  if (rIdx === 0) return "opacity-25";
  if (rIdx === 1) return "opacity-55";
  return "opacity-85";
}

export function HexagonDecal({
  className = "",
  gradientDirection = "red-to-cyan",
  rows = 3,
  size = "md",
}: HexagonDecalProps) {
  const totalCols = 76;

  const rowsData = useMemo(() => {
    const validRows = Math.max(1, Math.min(rows, 4));
    const result: DotRow[] = [];

    for (let r = 0; r < validRows; r++) {
      const rowDots: DotItem[] = [];
      for (let c = 0; c < totalCols; c++) {
        rowDots.push({
          id: `dot-${r}-${c}`,
          color: getDotColor(r, c, totalCols, gradientDirection),
        });
      }
      result.push({
        id: `livery-row-${r}`,
        dots: rowDots,
        isStaggered: r % 2 === 1,
        opacityClass: getRowOpacity(r, validRows),
      });
    }

    return result;
  }, [rows, gradientDirection]);

  const sizeClasses = {
    sm: "w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]",
    md: "w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] lg:w-[26px] lg:h-[26px]",
    lg: "w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] lg:w-[30px] lg:h-[30px]",
  }[size];

  const staggerOffset = {
    sm: "translate-x-[11px] sm:translate-x-[14px]",
    md: "translate-x-[13px] sm:translate-x-[16px] lg:translate-x-[18px]",
    lg: "translate-x-[16px] sm:translate-x-[20px] lg:translate-x-[22px]",
  }[size];

  return (
    <div
      className={`w-full relative flex flex-col gap-2 sm:gap-2.5 pt-4 pb-2 sm:pb-3 select-none overflow-hidden bg-gradient-to-b from-transparent via-bg-section/30 to-bg-dark/70 pointer-events-auto ${className}`}
    >
      {/* Grid de Bolinhas Honeycomb esticado em 100% de largura com máscara suave nas pontas */}
      <div
        className="w-full overflow-hidden flex flex-col gap-2 sm:gap-2.5 py-1"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
        }}
      >
        {rowsData.map((row) => (
          <div
            key={row.id}
            className={`flex gap-2 sm:gap-2.5 items-center justify-center shrink-0 w-max min-w-full ${
              row.isStaggered ? staggerOffset : ""
            }`}
          >
            {row.dots.map((dot) => (
              <span
                key={dot.id}
                role="presentation"
                tabIndex={-1}
                aria-hidden="true"
                className={`${sizeClasses} ${row.opacityClass} rounded-full shrink-0 cursor-pointer hover:!opacity-100 ${
                  dot.color === "cyan" ? "hex-dot-cyan" : "hex-dot-red"
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HexagonDecal;
