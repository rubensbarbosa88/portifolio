export interface HexagonDecalProps {
  /**
   * Classes adicionais para customização de layout e posicionamento.
   */
  className?: string;

  /**
   * Direção do degradê das bolinhas/hexágonos.
   * - 'red-to-cyan': Começa no vermelho e transiciona para o azul claro (padrão)
   * - 'cyan-to-red': Começa no azul claro e transiciona para o vermelho
   */
  gradientDirection?: "red-to-cyan" | "cyan-to-red";

  /**
   * Rótulo técnico opcional em estilo cyberpunk/telemetria.
   */
  label?: string;

  /**
   * Alinhamento visual do decalque no rodapé da seção.
   * @default 'between'
   */
  align?: "start" | "center" | "end" | "between";

  /**
   * Quantidade de linhas de bolinhas (padrão: 2).
   * @default 2
   */
  rows?: number;

  /**
   * Tamanho visual das bolinhas.
   * @default 'md'
   */
  size?: "sm" | "md" | "lg";
}
