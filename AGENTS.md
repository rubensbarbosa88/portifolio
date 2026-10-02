# Diretrizes Gerais do Repositório — Rubens Barbosa Portfolio

Este repositório abriga o portfólio profissional de **Rubens Barbosa**, Senior Front-end Developer.
Ele é estruturado em dois pilares centrais: **Planejamento de UX/Design** e **Implementação Front-end em Código**.

---

## 🗂️ Estrutura e Responsabilidade das Pastas

```text
/
├── portifolio-ux/           # 🎨 Planejamento de UX, Design e Identidade Visual
└── portifolio-app-front/    # 💻 Aplicação Web Front-end (Next.js 16 + React 19)
```

### 1. `/portifolio-ux` — Planejamento de Layout e Desenho UX
- **Finalidade:** Contém toda a concepção de interface, prototipação visual, wireframes, tokens de design, assets originais e scripts de automação do design.
- **Fonte da Verdade Visual:** O arquivo nativo do Pencil [`ux-portifolio.pen`](file:///portifolio-ux/ux-portifolio.pen) e seu print renderizado em alta definição [`ux-portifolio-preview.png`](file:///portifolio-ux/ux-portifolio-preview.png).
- **Atmosfera / Vibe:** Cyberpunk / Dark Navy / High-Tech HUD / Inspiração visual no carro de alta performance do *Rocket League*.
- **Documentação Detalhada:** Consulte [`portifolio-ux/README.md`](file:///portifolio-ux/README.md) para entender a paleta, tipografia, seções e o funcionamento de cada script da pasta.

### 2. `/portifolio-app-front` — Frontend em Código (Next.js)
- **Finalidade:** Implementação em código web real do design planejado no UX.
- **Stack Tecnológico:**
  - **Next.js 16+** (App Router)
  - **React 19**
  - **Tailwind CSS v4** (configuração CSS-first via `@theme` no `globals.css`)
  - **TypeScript 5+**
  - **Biome 2+** (linter e formatador ultrarrápido)
- **Documentação e Regras de Código:** Consulte [`portifolio-app-front/AGENTS.md`](file:///portifolio-app-front/AGENTS.md) e as skills internas em `portifolio-app-front/.agents/skills/`.

---

## 🧭 Regras Obrigatórias para Agentes e Desenvolvedores

1. **O UX é a Fonte da Verdade:**
   - Antes de criar ou alterar qualquer tela, seção ou componente no front-end (`portifolio-app-front`), os agentes **devem consultar** os arquivos de layout em `portifolio-ux` (em especial o print [`ux-portifolio-preview.png`](file:///portifolio-ux/ux-portifolio-preview.png) e [`portifolio-ux/README.md`](file:///portifolio-ux/README.md)).
2. **Consistência de Tokens:**
   - Nunca invente cores ou tamanhos arbitrários no código. Utilize rigorosamente as variáveis de tema declaradas no Tailwind v4 (`--color-bg-dark`, `--color-cyan-glow`, `--color-red-accent`, `--font-orbitron`, `--font-mono`, etc.), que refletem fielmente o design system do UX.
3. **Harmonia entre UX e Código:**
   - Se houver necessidade de alterar a estrutura ou vibe de uma seção no código, documente e verifique se o alinhamento com a proposta do UX foi mantido.
