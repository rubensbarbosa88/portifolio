export interface InteractiveDotGridProps {
  className?: string;
  /** Espaçamento entre os pontos em pixels (padrão: 28) */
  spacing?: number;
  /** Raio do ponto em estado de repouso em pixels (padrão: 1.2) */
  baseRadius?: number;
  /** Raio máximo do ponto quando excitado pelo cursor (padrão: 2.2) */
  activeRadius?: number;
  /** Raio de influência do cursor em pixels (padrão: 130) */
  influenceRadius?: number;
  /** Força máxima de repulsão dos pontos em pixels (padrão: 26) */
  maxPush?: number;
  /** Cor base dos pontos em repouso */
  baseColor?: string;
  /** Cor primária de brilho ao interagir (padrão: ciano #00d4ff) */
  activeColor?: string;
  /** Cor secundária de destaque (padrão: vermelho #e63946) */
  accentColor?: string;
  /** Se deve mesclar pontos com cor de acento Rocket League (padrão: true) */
  enableDualTone?: boolean;
}
