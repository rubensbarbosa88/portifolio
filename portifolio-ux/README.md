# 🎨 Portfólio UX — Planejamento de Layout e Identidade Visual

Este diretório concentra todo o **planejamento de experiência de usuário (UX)**, a **identidade visual**, os **wireframes/layouts navegáveis** e as **ferramentas de automação de design** do portfólio de **Rubens Barbosa**, Senior Front-end Developer.

Aqui reside a **fonte da verdade visual** que orienta a implementação em código localizada em [`/portifolio-app-front`](file:///portifolio-app-front).

---

## 🌟 1. Visão Geral do UX: A Vibe, o Conceito e a Ideia

### 1.1 A Atmosfera (Vibe)
O portfólio foi desenhado para transmitir a solidez e a sofisticação de um **desenvolvedor front-end sênior**, unindo estética de engenharia moderna a uma temática **Cyberpunk / Retro-Tech / High-Performance HUD**:
- **Ambiente Imersivo Dark Navy:** Tons profundos de azul marinho (`#0a1628` e `#0d1b2e`), que proporcionam um contraste visual elegante, confortável para leitura e focado no conteúdo.
- **Acentos Neon e Luz de Farol:** Ciano elétrico com glow (`#00d4ff`) e vermelho vivo (`#e63946`) funcionam como iluminação de cockpit/telemetria.
- **Visual Terminal & Engenharia:** Detalhes de prompt (`>`), comentários de código (`// Hello World`), colchetes técnicos (`< ... />`) e tipografia monoespaçada.

### 1.2 A Inspiração Master: O Carro do *Rocket League*
A linguagem visual e o esquema de pintura foram inspirados na imagem do carro em [`ux-portifolio-assets/rocket league.png`](file:///portifolio-ux/ux-portifolio-assets/rocket%20league.png):

| Elemento do Carro | Característica Estética | Aplicação no UX / Front-end |
| :--- | :--- | :--- |
| **Lataria e Pintura** | Azul marinho metálico com textura escovada e riscos finos. | Fundo principal (`#0a1628`), cards em `#112240` e linhas decorativas (*scratches*). |
| **Colmeia Hexagonal do Capô** | Grade de hexágonos em gradiente contínuo do coral/vermelho ao ciano. | Decalques de telemetria e o componente `HexagonDecal` no rodapé das seções. |
| **Bordas dos Faróis & Reflexos** | Brilho intenso "branco-quente / dourado metálico". | Efeitos de iluminação nos estados de `hover` de botões e cartões interativos. |
| **Recortes em Ciano Elétrico** | Halos e aros luminosos em ciano vivo. | Anéis concêntricos ao redor do avatar, badges de status, métricas e bordas ativas (`#00d4ff`). |
| **Entradas de Ar em Vermelho** | Acentos angulares vermelhos de alta performance. | Botão de destaque principal (*Download CV*), marcadores de títulos e divisores (`#e63946`). |

---

## 📐 2. Estrutura e Seções do Layout

O design do layout (desenhado na largura padrão de desktop `1440px`) é composto por 5 seções principais:

```
┌────────────────────────────────────────────────────────┐
│ 1. NAVBAR: Logo (> RUBENS.DEV) | Menu | [DOWNLOAD CV]  │
├────────────────────────────────────────────────────────┤
│ 2. HERO:                                               │
│    // Hello World                                      │
│    RUBENS BARBOSA            [ Foto com HUD ]          │
│    > SENIOR FRONT-END DEV <  [ Anéis Ciano  ]          │
│    Bio & Botões de Ação      [ Indicadores  ]          │
│    Métricas: 10+ | 500k+ | 15+ | <1.2s                 │
├────────────────────────────────────────────────────────┤
│ 3. TRAJETÓRIA PROFISSIONAL:                            │
│    Timeline vertical com marcadores e cards:           │
│    - Julius Baer (Wealth Management)                   │
│    - Itaú Unibanco                                     │
│    - Zup Innovation                                    │
├────────────────────────────────────────────────────────┤
│ 4. ECOSSISTEMA TÉCNICO:                                │
│    Grid 4 colunas: Front-end | Back-end | DevOps | Arq │
├────────────────────────────────────────────────────────┤
│ 5. PROJETOS EM DESTAQUE:                               │
│    Cards: Design System | E-commerce | Dashboard       │
└────────────────────────────────────────────────────────┘
```

### Detalhamento das Seções:
1. **Header / Navbar:** Barra fixa com logotipo estilizado `> RUBENS.DEV`, links de âncora (*Sobre mim*, *Skills*, *Projetos*, *Contato*) e botão de destaque em pílula vermelho `DOWNLOAD CV`.
2. **Hero Section (Split-Screen):**
   - **Coluna Esquerda:** Badge `< DISPONÍVEL >`, título imponente com `RUBENS` em branco e `BARBOSA` em ciano neon com brilho, subtítulo em colchetes angulares, bio objetiva de posicionamento e botões de ação (*Ver Projetos*, redes sociais). Na base, métricas de autoridade técnica (**10+** Anos, **500k+** Usuários, **15+** Projetos, **< 1.2s** LCP).
   - **Coluna Direita:** Avatar do Rubens em recorte circular envolto por anéis concêntricos de neon ciano e cantoneiras HUD nos quatro cantos em vermelho e ciano.
3. **Trajetória Profissional (Timeline):** Linha vertical luminosa com nós interativos conectando as passagens por **Julius Baer** (Microfrontends e React no setor financeiro global), **Itaú Unibanco** (Design System e Vue.js no maior banco da América Latina) e **Zup Innovation** (Angular, NestJS e soluções em nuvem).
4. **Ecossistema Técnico (Skills):** 4 cards com cabeçalhos destacados por ícones temáticos e badges técnicas: Front-end, Back-end, DevOps e Arquitetura de Software.
5. **Projetos em Destaque:** 3 vitrines de projetos com área de thumbnail gradiente, resumo técnico objetivo e tags das tecnologias utilizadas (Design System corporativo, Plataforma de Microfrontends e Dashboard em tempo real com WebSocket).

---

## 🎨 3. Paleta de Cores e Tokens Visuais

| Token / Variável | Código Hex | Finalidade no Design |
| :--- | :--- | :--- |
| `bg-dark` | `#0a1628` | Fundo principal da página (Dark Navy) |
| `bg-section` | `#0d1b2e` | Fundo alternado de seções |
| `bg-card` | `#112240` | Fundo dos cards e contêineres de conteúdo |
| `cyan-glow` | `#00d4ff` | Acento primário neon (brilho, bordas ativas, avatar) |
| `cyan-light` | `#4dd9e8` | Variação de ciano para textos secundários de destaque |
| `red-accent` | `#e63946` | Acento secundário vibrante (botão Download CV, brackets) |
| `red-bright` | `#ff3344` | Destaque vermelho intenso |
| `text-primary` | `#f0f4f8` | Texto principal com alta legibilidade |
| `text-secondary` | `#8899aa` | Texto secundário e legendas |
| `text-muted` | `#4a5c6e` | Linhas, bordas sutis e divisores |

### Tipografia
- **Títulos e Headings:** **Orbitron** (geométrica, angular, atmosfera retro-tech/futurista).
- **Texto Corrido e Bio:** **Inter** (alta legibilidade e clareza).
- **Código, Tags e Métricas:** **JetBrains Mono** (estilo terminal de desenvolvedor).

---

## 🖥️ 4. Como Acessar e Visualizar o Layout

Existem três maneiras de consultar o design:

### 4.1 Visualização Imediata via Imagem (Mais Rápida e Recomendada)
Não é necessário abrir nenhum aplicativo para conferir o visual. O print atualizado em altíssima resolução está disponível diretamente em:
👉 [`ux-portifolio-preview.png`](file:///portifolio-ux/ux-portifolio-preview.png)

Qualquer agente de IA ou desenvolvedor pode inspecionar este arquivo de imagem a qualquer momento.

### 4.2 Abrindo no Aplicativo Desktop Pencil (pen.dev)
1. Abra o aplicativo **Pencil (Pen)** instalado em seu computador.
2. Abra o arquivo nativo [`ux-portifolio.pen`](file:///portifolio-ux/ux-portifolio.pen).
3. Todas as camadas, nós, componentes e variáveis do canvas estarão disponíveis para edição gráfica.

### 4.3 Consulta Programática via MCP ou Scripts Node.js
Se o aplicativo Pencil estiver aberto em segundo plano, os scripts Node.js desta pasta comunicam-se diretamente com ele via protocolo MCP (Model Context Protocol).

---

## 🛠️ 5. O que Significa Cada Script e Arquivo na Pasta

A pasta `portifolio-ux/` contém tanto os assets do design quanto scripts em Node.js desenvolvidos para interagir com o Pencil:

```text
portifolio-ux/
├── ux-portifolio.pen           # Arquivo canônico do design (editável no Pencil)
├── ux-portifolio-preview.png   # Captura renderizada completa do layout
├── rubens-avatar.jpg           # Foto de perfil original do Rubens
├── scratch_in.txt              # Mensagem de teste de handshake JSON-RPC
├── pencil-bridge.js            # Ponte de comunicação Node.js <-> Pencil MCP Server
├── check-tree.js               # Inspeciona a hierarquia de nós e camadas do canvas
├── inspect-doc.js              # Lê detalhes e propriedades profundas de um nó específico
├── export-preview.js           # Exporta o canvas ativo para imagem PNG
├── create-portfolio.js         # Script de criação programática inicial das seções no Pencil
├── clean-build.js              # Script de reconstrução limpa e renderização em lote dos nós
├── refine-portfolio.js         # Script de refinamento fino de espaçamentos e decorações
└── ux-portifolio-assets/       # Recursos visuais originais
    ├── rocket league.png       # Referência estética de pintura, colmeia e luzes
    └── generated.webp          # Recorte do avatar com fundo transparente
```

### Explicação Detalhada dos Scripts:

#### 1. [`pencil-bridge.js`](file:///portifolio-ux/pencil-bridge.js)
- **O que faz:** É a ponte de transporte JSON-RPC. Ele executa o binário do MCP Server do Pencil (`mcp-server-windows-x64.exe`), inicializa a sessão e envia comandos como `get_app_state` e `execute`.
- **Como rodar:**
  ```bash
  node portifolio-ux/pencil-bridge.js get_app_state
  ```

#### 2. [`check-tree.js`](file:///portifolio-ux/check-tree.js)
- **O que faz:** Faz uma leitura superficial (profundidade 1) do frame principal (`bi8Au`), listando no console o nome, ID, tipo de nó, posição Y e altura de cada seção filha (Header, Hero, Trajetória, etc.).
- **Como rodar:**
  ```bash
  node portifolio-ux/check-tree.js
  ```

#### 3. [`inspect-doc.js`](file:///portifolio-ux/inspect-doc.js)
- **O que faz:** Realiza uma inspeção mais profunda (profundidade 2 ou configurável) sobre o frame raiz ou nós específicos, retornando o objeto JSON com todas as propriedades de layout (padding, gap, cores, fills, borders).
- **Como rodar:**
  ```bash
  node portifolio-ux/inspect-doc.js
  ```

#### 4. [`export-preview.js`](file:///portifolio-ux/export-preview.js)
- **O que faz:** Emite o comando `Export(["bi8Au"], "png", ...)` para o Pencil, gerando a imagem PNG do frame principal na pasta `export-out/` e salvando como preview na pasta de trabalho.
- **Como rodar:**
  ```bash
  node portifolio-ux/export-preview.js
  ```

#### 5. [`create-portfolio.js`](file:///portifolio-ux/create-portfolio.js)
- **O que faz:** Código JavaScript executável dentro do Pencil que constrói a estrutura base do portfólio (criação de frames, textos, seções de cabeçalho, introdução e experiência).

#### 6. [`clean-build.js`](file:///portifolio-ux/clean-build.js)
- **O que faz:** Script utilitário para limpar nós filhos antigos do frame `bi8Au` e reconstruir o layout do portfólio de forma padronizada e limpa.

#### 7. [`refine-portfolio.js`](file:///portifolio-ux/refine-portfolio.js)
- **O que faz:** Script de micro-ajustes estéticos, aplicando alinhamentos finos, ajustes de gap e posicionamento de elementos decorativos no canvas.

---

## 🔄 6. Conexão com o Front-end (`portifolio-app-front`)

Ao desenvolver ou alterar componentes no Next.js (`portifolio-app-front`):
1. **Verifique o layout:** Abra [`ux-portifolio-preview.png`](file:///portifolio-ux/ux-portifolio-preview.png) para conferir proporções, alinhamentos e espaçamentos.
2. **Utilize os tokens globais:** Os tokens deste UX estão mapeados no CSS do front-end (`portifolio-app-front/app/globals.css`):
   - Cores: `var(--color-bg-dark)`, `var(--color-cyan-glow)`, `var(--color-red-accent)`.
   - Tipografia: `var(--font-orbitron)`, `var(--font-jetbrains-mono)`, `var(--font-inter)`.
3. **Componentes Especiais:** Decalques e elementos visuais como o `HexagonDecal` devem manter a fidelidade com a referência de [`ux-portifolio-assets/rocket league.png`](file:///portifolio-ux/ux-portifolio-assets/rocket%20league.png).
