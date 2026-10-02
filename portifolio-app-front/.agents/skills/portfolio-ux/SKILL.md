---
name: portfolio-ux
description: >-
  Diretrizes de layout UX, identidade visual inspirada no carro do Rocket League,
  especificações do wireframe Pencil (portifolio-ux/ux-portifolio.pen) e guia de
  uso dos scripts de automação da pasta /portifolio-ux. Use esta skill ao criar,
  revisar ou atualizar layouts, componentes visuais e referências estéticas do portfólio.
---

# Diretrizes de Layout UX & Identidade Visual — Rubens Barbosa Portfolio

Este documento é a referência canônica para a experiência de usuário (UX), identidade estética e fluxo de design do portfólio de **Rubens Barbosa**, conectando a inspiração visual do carro do Rocket League, o arquivo Pencil de UX e os scripts utilitários de automação.

---

## 1. Inspiração Master e Identidade Visual: O Carro do Rocket League

A atmosfera e identidade estética do portfólio foram concebidas a partir do design e pintura do carro do **Rocket League**:

- **Arquivo de Referência:** `portifolio-ux/ux-portifolio-assets/rocket league.png`

### 1.1 Significado e Tradução Estética para o Front-end

A imagem do carro não é um elemento figurativo qualquer — ela define a **vibe geral, a paleta de cores e a linguagem gráfica** de toda a interface:

| Elemento do Carro | Características Visuais | Aplicação no Front-end (`portifolio-app-front`) |
| :--- | :--- | :--- |
| **Pintura e Lataria** | Azul petróleo / azul-marinho profundo com riscos retos escovados/arranhados. | Fundos `#0a1628` e `#0d1b2e` com linhas verticais finas rotacionadas (`scratches` em `#1a3a5c22`) no Hero. |
| **Colmeia Hexagonal do Capô** | Grade de hexágonos em degradê contínuo que vai do **vermelho-alaranjado/coral** ao **azul-claro/ciano elétrico**. | Componente [`HexagonDecal`](file:///components/HexagonDecal/index.tsx) no rodapé das seções de Trajetória e Projetos. |
| **Bordas dos Hexágonos & Faróis** | Efeito luminoso brilhante, "meio branco, meio dourado/âmbar" no reflexo das bordas e faróis escamoteáveis. | Bordas com degradê metálico (`#ffffff` a `#ffd875`) e `drop-shadow` de brilho intenso ao passar o mouse (`hover:opacity-100` e iluminação tátil). |
| **Faceta Geométrica e Glifos Ciano** | Detalhes em ciano neon brilhante em recortes, alvos concêntricos e decorações. | Acentos primários em `#00d4ff` (anéis concêntricos do avatar, nomes, ícones, números de métricas, bordas ativas). |
| **Recortes em Vermelho** | Entradas de ar com textura angular e detalhes vermelhos vivos. | Acentos secundários em `#e63946` (botão de CTA *Download CV*, divisores, brackets de títulos e marcadores angulares). |
| **Tipografia Retro-Tech** | Numeração e escrita técnica de carros de alta performance. | Fontes **Orbitron** (títulos futuristas/retro-tech) e **JetBrains Mono** (elementos de código, tags de tecnologia e telemetria). |

---

## 2. Fonte da Verdade do UX: Arquivo Pencil (`ux-portifolio.pen`)

O design do layout, hierarquia de blocos, espaçamentos e componentes de interface estão desenhados no arquivo nativo do Pencil:

- **Caminho do Arquivo:** `portifolio-ux/ux-portifolio.pen`

### 2.1 Estrutura de Telas no Pencil

O arquivo contém o layout completo em canvas de `1440px` de largura, organizado nas seguintes camadas principais:

1. **Header Navigation:** Navbar fixa (`64px`) com logotipo de terminal (`> RUBENS.DEV`), links de âncora e botão de destaque vermelho (`#e63946`).
2. **Hero Section:** Split-screen com saudações (`// Hello World`), nome em destaque com contraste ciano, cargo em brackets (`< SENIOR FRONT-END DEVELOPER />`), bio, botões sociais, métricas e o avatar estilizado à direita envolto por anéis ciano/vermelho com glow radial.
3. **Trajetória Profissional (Experience):** Linha do tempo vertical com marcadores circulares brilhantes, linhas conectoras azuis, cards de experiência em `#112240` e tags mono. No rodapé, o decalque hexagonal do Rocket League.
4. **Ecossistema Técnico (Skills):** Grid de 4 cartões com ícones temáticos Lucide em vermelho, títulos ciano e tags técnicas com marcadores em ciano claro.
5. **Projetos:** Vitrine em grid de 3 colunas com banners gradientes em degradê azul-marinho, ícones temáticos, descrições objetivas, tags e rodapé hexagonal de telemetria.
6. **Footer Global:** Assinatura em terminal, links de contato rápido e copyright.

---

## 3. Scripts Utilitários da Pasta `/portifolio-ux`

A pasta `portifolio-ux` contém ferramentas em Node.js que se comunicam diretamente com a API do Pencil (MCP server do app desktop) para inspecionar, exportar e manipular o canvas.

### 3.1 Lista e Finalidade dos Scripts

```text
portifolio-ux/
├── pencil-bridge.js        # Ponte JSON-RPC de comunicação com o executável do Pencil
├── inspect-doc.js          # Inspeciona nós e propriedades do documento aberto
├── check-tree.js           # Lista a árvore de camadas e contagem de filhos do canvas
├── export-preview.js       # Exporta o frame para PNG e gera portfolio-preview.png
├── clean-build.js          # Script de reconstrução limpa do layout no Pencil
├── create-portfolio.js     # Script de criação programática de seções e tokens
└── refine-portfolio.js     # Script de ajustes finos de layout e decorações
```

---

## 4. Como Executar os Scripts

Todos os scripts são executados a partir do diretório raiz ou da própria pasta `portifolio-ux` utilizando Node.js.

> [!NOTE]
> O aplicativo desktop do **Pencil** deve estar em execução para que a ponte de comunicação MCP responda às chamadas.

### 4.1 Testar Conexão com o Pencil (`pencil-bridge.js`)
Testa o estado da aplicação e verifica se há um documento ativo:
```bash
node portifolio-ux/pencil-bridge.js get_app_state
```

### 4.2 Inspecionar a Árvore de Camadas (`check-tree.js`)
Lê o frame principal do documento e exibe no console o ID, nome, tipo e coordenadas de cada seção filha:
```bash
node portifolio-ux/check-tree.js
```

### 4.3 Inspecionar Propriedades de um Nó (`inspect-doc.js`)
Deseja inspecionar um nó específico ou a raiz com profundidade configurável:
```bash
node portifolio-ux/inspect-doc.js
```

### 4.4 Exportar Preview em Imagem (`export-preview.js`)
Exporta os frames do Pencil em PNG para a pasta `portifolio-ux/export-out/` e gera uma cópia atualizada em `portifolio-ux/portfolio-preview.png`:
```bash
node portifolio-ux/export-preview.js
```

---

## 5. Mapeamento de Assets em `/portifolio-ux/ux-portifolio-assets`

Todos os recursos visuais originais e gerados do processo de design estão centralizados em `portifolio-ux/ux-portifolio-assets/`:

1. **`rocket league.png`:**
   - **Papel:** Imagem de referência estética primária.
   - **Uso:** Sempre consulte esta imagem ao criar novas variações de gradientes, bordas brilhantes, colmeias hexagonais ou novos componentes com clima futurista/arcade.
2. **`generated.webp`:**
   - **Papel:** Recorte do avatar processado com fundo transparente, utilizado no frame do Hero.
3. **`rubens-avatar.jpg`:**
   - **Papel:** Foto original do autor utilizada para o processamento de imagem e avatar.

---

## 6. Diretrizes para Novos Componentes Inspirados no Carro

Sempre que adicionar ou refinar um componente no front-end (`portifolio-app-front`), siga este checklist de alinhamento com a vibe do Rocket League:

1. **Contraste Cromático:** O fundo deve permanecer escuro (`#0a1628` / `#0d1b2e` / `#112240`), permitindo que os elementos em ciano (`#00d4ff`) e vermelho (`#e63946`) funcionem como luzes de néon ou faróis.
2. **Transições de Cor em Degradê:** Quando utilizar gradientes lineares decorativos, utilize a escala do capô: vermelho-alaranjado (`#ff2a1a` / `#ff5722`) $\rightarrow$ âmbar/dourado (`#ffd875`) $\rightarrow$ ciano elétrico (`#00d4ff`).
3. **Bordas com Brilho Dourado/Branco:** Efeitos de hover em botões, cartões ou decais devem simular reflexos de lataria e aro dourado de corrida com `drop-shadow` de tonalidade branco-quente / dourada.
4. **Sem Poluição:** Mantenha os detalhes cyberpunk em baixa opacidade em repouso (`opacity-20` a `opacity-35`) e ilumine-os sob interação (`hover:opacity-100`).
