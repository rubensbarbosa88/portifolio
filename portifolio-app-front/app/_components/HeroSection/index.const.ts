interface StatItem {
  value: string;
  label: string;
  valueSizeClass: string;
}

export const STATS: StatItem[] = [
  {
    value: "8+",
    label: "Anos de Exp",
    valueSizeClass: "text-2xl sm:text-[26px]",
  },
  {
    value: "Disponível",
    label: "P/ Contratação",
    valueSizeClass: "text-base sm:text-[18px]",
  },
  {
    value: "Remoto",
    label: "Híbrido ou Presencial",
    valueSizeClass: "text-lg sm:text-[22px]",
  },
  {
    value: "Javascript",
    label: "Front-end Sr",
    valueSizeClass: "text-base sm:text-[18px]",
  },
];
