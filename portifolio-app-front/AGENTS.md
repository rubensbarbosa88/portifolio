<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Contexto Geral do Projeto — Rubens Barbosa Portfolio

Este repositório contém a aplicação web do portfólio profissional de **Rubens Barbosa**, Senior Front-end Developer.

---

## 1. Visão Geral e Identidade Visual

- **Tema / Estilo:** Cyberpunk / Dark Navy / Code Terminal.
- **Referência Visual e Estrutural:** [rubenmarcus.dev](https://www.rubenmarcus.dev/) (layout split-screen no Hero, linhas de terminal, efeitos de brilho em ciano e acentos em vermelho).
- **Wireframe & UX Source:** Arquivo nativo Pencil em [`portifolio-ux/ux-portifolio.pen`](file:///portifolio-ux/ux-portifolio.pen), print renderizado em [`portifolio-ux/ux-portifolio-preview.png`](file:///portifolio-ux/ux-portifolio-preview.png) e guia completo em [`portifolio-ux/README.md`](file:///portifolio-ux/README.md).
- **Seções Principais:**
  1. **Navbar:** Logo terminal (`> RUBENS.DEV`), links de navegação e botão CTA (*Download CV*).
  2. **Hero:** Layout split — Coluna esquerda com saudações em mono (`// Hello World`), nome, cargo, bio, redes sociais e métricas (*Anos, MAU, MFEs, LCP*); Coluna direita com Avatar envolto em anéis concêntricos com brilho ciano, scratches decorativos e grid hexagonal.
  3. **Experience:** Linha do tempo vertical com marcadores circulares e cards de empresas/cargos.
  4. **Skills:** Grid de cartões por categoria (Front-end, Back-end, Arquitetura, DevOps/Cloud) com ícones da biblioteca Lucide.
  5. **Projects:** Vitrine em grid com visualização de projetos desenvolvidos.

---

## 2. Stack Tecnológico

| Tecnologia | Versão | Papel no Projeto |
| :--- | :--- | :--- |
| **Next.js** | `16.x` (App Router) | Framework full-stack, roteamento e renderização (Server & Client Components) |
| **React** | `19.x` | Biblioteca de UI com suporte nativo ao React Compiler |
| **Tailwind CSS** | `v4` | Estilização moderna CSS-first configurada via `@theme` no `globals.css` |
| **TypeScript** | `5.x` | Tipagem estática em toda a aplicação |
| **Biome** | `2.x` | Linter e formatador ultrarrápido (substitui ESLint e Prettier) |

---

## 3. Diretrizes de Arquitetura e Skills Internas

Os agentes e desenvolvedores devem seguir estritamente as diretrizes catalogadas nas skills locais:

1. **Design System:** [design-system/SKILL.md](file:///.agents/skills/design-system/SKILL.md)  
   Tokens semânticos de cor (`--color-bg-dark`, `--color-cyan-glow`, `--color-red-accent`, etc.), tipografia (`Inter` e `JetBrains Mono`), espaçamentos, bordas e efeitos CSS.

2. **Estrutura de Pastas e Colocation:** [project-structure/SKILL.md](file:///.agents/skills/project-structure/SKILL.md)  
   - Recursos compartilhados globais (`/api`, `/components`, `/contexts`, `/hooks`, `/helpers`) ficam fora de `app/`.
   - Recursos exclusivos de página ficam co-localizados dentro da rota em `app/{rota}/` utilizando pastas privadas com prefixo `_` (ex: `_components/`, `_hooks/`, `_contexts/`, `utils.ts`).

3. **Layout UX & Inspiração Rocket League:** [portfolio-ux/SKILL.md](file:///.agents/skills/portfolio-ux/SKILL.md)  
   Diretrizes de layout UX, atmosfera visual inspirada no carro do Rocket League (`portifolio-ux/ux-portifolio-assets/rocket league.png`), wireframe no Pencil (`portifolio-ux/ux-portifolio.pen`) e guia de execução dos scripts de automação em `/portifolio-ux`.

---

## 4. Documentação para LLMs & IAs (`llms.txt` e Referências Oficiais)

Para garantir que modelos de linguagem e agentes operem com o contexto técnico mais atualizado e evitem padrões obsoletos, consulte os seguintes endpoints de documentação estruturada:

### 4.1 Next.js 16+
- **Índice para LLMs:** [https://nextjs.org/docs/llms.txt](https://nextjs.org/docs/llms.txt)
- **Documentação Completa para LLMs:** [https://nextjs.org/docs/llms-full.txt](https://nextjs.org/docs/llms-full.txt)
- **Documentação Local de Migração:** Consulte diretamente a pasta local `node_modules/next/dist/docs/`.

### 4.2 React 19 & React Compiler
- **Documentação Oficial:** [https://react.dev/](https://react.dev/)
- **Guia do React Compiler:** [https://react.dev/learn/react-compiler](https://react.dev/learn/react-compiler)

### 4.3 Tailwind CSS v4
- **Documentação Oficial:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- *Aviso para LLMs:* O Tailwind v4 não utiliza `tailwind.config.js`. Todas as extensões e tokens customizados residem diretamente no `app/globals.css` sob a diretiva `@theme`.

### 4.4 Biome
- **Documentação Oficial:** [https://biomejs.dev/](https://biomejs.dev/)
- **Configuração Local:** Consulte [biome.json](file:///biome.json).

---

## 5. Comandos de Desenvolvimento

- `npm run dev`: Inicia o servidor local Next.js com hot reload.
- `npm run build`: Valida tipagem e compila a aplicação para produção.
- `npm run lint`: Analisa o código com o Biome (`biome check`).
- `npm run format`: Formata os arquivos com o Biome (`biome format --write`).
