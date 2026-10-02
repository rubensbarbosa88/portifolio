const { callPencil } = require('./pencil-bridge');
const path = require('path');

async function buildPortfolioRefined() {
  console.log('Refining Portfolio design in Pencil...');

  const outPng = path.join(__dirname, 'portfolio-preview.png').replace(/\\/g, '/');

  const input = `
    // Clear and configure Main Screen Frame
    Update("bi8Au", {
      name: "Portfolio - Rubens Barbosa",
      width: 1440,
      height: 4200,
      fill: "#09090b",
      clip: true,
      layout: "vertical",
      alignItems: "center",
      padding: [0, 0, 100, 0],
      gap: 64
    });

    // Delete existing children to rebuild cleanly
    const currentChildren = Get("bi8Au", {depth: 1}).children || [];
    for (const child of currentChildren) {
      Delete(child.id);
    }

    // Color Palette
    const bgDark = "#09090b";
    const bgCard = "#121217";
    const bgCardSubtle = "#18181f";
    const borderColor = "#27272a";
    const textPrimary = "#f4f4f5";
    const textSecondary = "#a1a1aa";
    const textMuted = "#71717a";
    const accentBlue = "#38bdf8";
    const accentEmerald = "#10b981";
    const accentPurple = "#a855f7";

    // -------------------------------------------------------------
    // 1. HEADER / NAVIGATION
    // -------------------------------------------------------------
    const headerId = Insert("bi8Au", {
      type: "frame",
      name: "Header Navigation",
      width: 1440,
      height: 80,
      fill: "#09090be6",
      stroke: borderColor,
      strokeWidth: { bottom: 1 },
      layout: "horizontal",
      justifyContent: "space_between",
      alignItems: "center",
      padding: [0, 80, 0, 80]
    });

    // Logo
    const logoFrame = Insert(headerId, {
      type: "frame",
      name: "Logo Container",
      layout: "horizontal",
      alignItems: "center",
      gap: 12
    });
    Insert(logoFrame, {
      type: "text",
      name: "Logo",
      content: "rubens.dev",
      fontFamily: "Inter",
      fontSize: 22,
      fontWeight: "700",
      fill: textPrimary
    });
    const sBadge = Insert(logoFrame, {
      type: "frame",
      name: "Senior Badge",
      fill: "#0284c720",
      stroke: "#38bdf850",
      strokeWidth: 1,
      cornerRadius: 6,
      padding: [4, 8, 4, 8]
    });
    Insert(sBadge, {
      type: "text",
      name: "Badge Text",
      content: "SENIOR LEAD",
      fontFamily: "Inter",
      fontSize: 10,
      fontWeight: "700",
      fill: accentBlue
    });

    // Nav Links
    const navLinks = Insert(headerId, {
      type: "frame",
      name: "Nav Links",
      layout: "horizontal",
      gap: 32,
      alignItems: "center"
    });
    for (const item of ["Sobre", "Diferenciais", "Trajetória", "Projetos & Labs", "Stack", "Contato"]) {
      Insert(navLinks, {
        type: "text",
        name: "Nav Item " + item,
        content: item,
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: "500",
        fill: textSecondary
      });
    }

    // Header CTA Button
    const headerCta = Insert(headerId, {
      type: "frame",
      name: "Header CTA",
      fill: "#27272a",
      stroke: "#3f3f46",
      strokeWidth: 1,
      cornerRadius: 8,
      padding: [10, 20, 10, 20]
    });
    Insert(headerCta, {
      type: "text",
      name: "CTA Label",
      content: "Download CV",
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "600",
      fill: textPrimary
    });

    // -------------------------------------------------------------
    // 2. HERO SECTION
    // -------------------------------------------------------------
    const heroId = Insert("bi8Au", {
      type: "frame",
      name: "Hero Section",
      width: 1280,
      layout: "vertical",
      alignItems: "center",
      padding: [30, 20, 20, 20],
      gap: 22
    });

    // Availability Badge
    const availBadge = Insert(heroId, {
      type: "frame",
      name: "Availability Badge",
      layout: "horizontal",
      alignItems: "center",
      gap: 8,
      fill: "#064e3b40",
      stroke: "#10b98150",
      strokeWidth: 1,
      cornerRadius: 999,
      padding: [8, 18, 8, 18]
    });
    Insert(availBadge, {
      type: "rectangle",
      name: "Green Dot",
      width: 8,
      height: 8,
      cornerRadius: 4,
      fill: accentEmerald
    });
    Insert(availBadge, {
      type: "text",
      name: "Avail Text",
      content: "Disponível para novos projetos & liderança técnica",
      fontFamily: "Inter",
      fontSize: 13,
      fontWeight: "500",
      fill: "#a7f3d0"
    });

    // Headline
    Insert(heroId, {
      type: "text",
      name: "Hero Headline",
      content: "Rubens Barbosa",
      fontFamily: "Inter",
      fontSize: 68,
      fontWeight: "800",
      fill: textPrimary
    });

    Insert(heroId, {
      type: "text",
      name: "Hero Subtitle",
      content: "Senior Frontend Engineer & Fullstack Specialist",
      fontFamily: "Inter",
      fontSize: 26,
      fontWeight: "600",
      fill: accentBlue
    });

    // Description Container
    const heroDescFrame = Insert(heroId, {
      type: "frame",
      name: "Hero Desc Frame",
      width: 900,
      layout: "vertical",
      alignItems: "center"
    });
    Insert(heroDescFrame, {
      type: "text",
      name: "Hero Description Text",
      content: "Especialista na evolução arquitetural de plataformas do setor financeiro (Home Broker, Wealth Management) e mídia programática. Sólida experiência em Microfrontends (Module Federation), migração Webpack para Rsbuild/Rspack, ecossistemas React, Vue, TypeScript e arquitetura BFF com Node/Nest.",
      fontFamily: "Inter",
      fontSize: 17,
      fontWeight: "400",
      fill: textSecondary,
      textAlign: "center"
    });

    // Action Buttons
    const heroButtons = Insert(heroId, {
      type: "frame",
      name: "Hero Buttons",
      layout: "horizontal",
      gap: 16,
      padding: [10, 0, 0, 0]
    });

    const btnPrimary = Insert(heroButtons, {
      type: "frame",
      name: "Primary CTA",
      fill: "#38bdf8",
      cornerRadius: 10,
      padding: [14, 28, 14, 28]
    });
    Insert(btnPrimary, {
      type: "text",
      name: "Btn Text",
      content: "Explorar Trajetória & Projetos",
      fontFamily: "Inter",
      fontSize: 15,
      fontWeight: "600",
      fill: "#09090b"
    });

    const btnSecondary = Insert(heroButtons, {
      type: "frame",
      name: "Secondary CTA",
      fill: "#18181b",
      stroke: "#27272a",
      strokeWidth: 1,
      cornerRadius: 10,
      padding: [14, 28, 14, 28]
    });
    Insert(btnSecondary, {
      type: "text",
      name: "Btn Text 2",
      content: "rubens.barbosa88@gmail.com",
      fontFamily: "Inter",
      fontSize: 15,
      fontWeight: "500",
      fill: textPrimary
    });

    // -------------------------------------------------------------
    // 3. STATS BAR
    // -------------------------------------------------------------
    const statsBar = Insert("bi8Au", {
      type: "frame",
      name: "Stats Bar",
      width: 1280,
      layout: "horizontal",
      justifyContent: "space_between",
      fill: bgCard,
      stroke: borderColor,
      strokeWidth: 1,
      cornerRadius: 16,
      padding: [28, 56, 28, 56]
    });

    const statsData = [
      { num: "+8 Anos", label: "Experiência em Engenharia Web" },
      { num: "Fintech & Broker", label: "Sistemas Críticos de Alta Escala" },
      { num: "Microfrontends", label: "Module Federation & Rsbuild/Rspack" },
      { num: "Fullstack & AI", label: "Node.js, Nest.js & AI Agents" }
    ];

    for (const stat of statsData) {
      const item = Insert(statsBar, {
        type: "frame",
        name: "Stat Item",
        layout: "vertical",
        gap: 6
      });
      Insert(item, {
        type: "text",
        name: "Stat Number",
        content: stat.num,
        fontFamily: "Inter",
        fontSize: 26,
        fontWeight: "700",
        fill: accentBlue
      });
      Insert(item, {
        type: "text",
        name: "Stat Label",
        content: stat.label,
        fontFamily: "Inter",
        fontSize: 13,
        fontWeight: "500",
        fill: textSecondary
      });
    }

    // -------------------------------------------------------------
    // 4. BENTO GRID SECTION (Diferenciais Arquiteturais)
    // -------------------------------------------------------------
    const bentoHeader = Insert("bi8Au", {
      type: "frame",
      name: "Bento Header",
      width: 1280,
      layout: "vertical",
      gap: 8
    });
    Insert(bentoHeader, {
      type: "text",
      name: "Section Tag",
      content: "PILARES & ARQUITETURA",
      fontFamily: "Inter",
      fontSize: 13,
      fontWeight: "700",
      fill: accentPurple
    });
    Insert(bentoHeader, {
      type: "text",
      name: "Section Title",
      content: "Diferenciais Técnicos & Domínio de Escala",
      fontFamily: "Inter",
      fontSize: 34,
      fontWeight: "700",
      fill: textPrimary
    });

    const bentoRow1 = Insert("bi8Au", {
      type: "frame",
      name: "Bento Row 1",
      width: 1280,
      layout: "horizontal",
      gap: 24
    });

    // Bento Card 1 (Wide: Microfrontends & Rsbuild)
    const card1 = Insert(bentoRow1, {
      type: "frame",
      name: "Card Microfrontends",
      width: 780,
      height: 290,
      fill: bgCard,
      stroke: borderColor,
      strokeWidth: 1,
      cornerRadius: 16,
      padding: [28, 36, 28, 36],
      layout: "vertical",
      justifyContent: "space_between"
    });
    const c1Content = Insert(card1, {
      type: "frame",
      name: "Card Content",
      width: 708,
      layout: "vertical",
      gap: 12
    });
    Insert(c1Content, {
      type: "text",
      name: "Badge",
      content: "ARQUITETURA MODERNA",
      fontFamily: "Inter",
      fontSize: 11,
      fontWeight: "700",
      fill: accentBlue
    });
    Insert(c1Content, {
      type: "text",
      name: "Title",
      content: "Microfrontends (Module Federation) & Rsbuild",
      fontFamily: "Inter",
      fontSize: 22,
      fontWeight: "700",
      fill: textPrimary
    });
    Insert(c1Content, {
      type: "text",
      name: "Desc",
      content: "Implementação de arquitetura modular desacoplada para aplicações de grande porte. Migração de infraestrutura de build de Webpack para Rsbuild/Rspack, reduzindo drasticamente o tempo de compilação e acelerando o ciclo de desenvolvimento de times inteiros.",
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "400",
      fill: textSecondary
    });
    const c1Tags = Insert(card1, {
      type: "frame",
      name: "Tags",
      layout: "horizontal",
      gap: 8
    });
    for (const tag of ["Module Federation", "Rsbuild / Rspack", "Design Systems", "Webpack Migration"]) {
      const tb = Insert(c1Tags, {
        type: "frame",
        name: "Tag",
        fill: bgCardSubtle,
        stroke: borderColor,
        strokeWidth: 1,
        cornerRadius: 6,
        padding: [6, 12, 6, 12]
      });
      Insert(tb, {
        type: "text",
        name: "Tag Text",
        content: tag,
        fontFamily: "Inter",
        fontSize: 12,
        fontWeight: "500",
        fill: textSecondary
      });
    }

    // Bento Card 2 (Fintech & Critical Systems)
    const card2 = Insert(bentoRow1, {
      type: "frame",
      name: "Card Fintech",
      width: 476,
      height: 290,
      fill: bgCard,
      stroke: borderColor,
      strokeWidth: 1,
      cornerRadius: 16,
      padding: [28, 32, 28, 32],
      layout: "vertical",
      justifyContent: "space_between"
    });
    const c2Content = Insert(card2, {
      type: "frame",
      name: "Card Content",
      width: 412,
      layout: "vertical",
      gap: 12
    });
    Insert(c2Content, {
      type: "text",
      name: "Badge",
      content: "SETOR CRÍTICO",
      fontFamily: "Inter",
      fontSize: 11,
      fontWeight: "700",
      fill: accentEmerald
    });
    Insert(c2Content, {
      type: "text",
      name: "Title",
      content: "Fintechs, Broker & Wealth",
      fontFamily: "Inter",
      fontSize: 22,
      fontWeight: "700",
      fill: textPrimary
    });
    Insert(c2Content, {
      type: "text",
      name: "Desc",
      content: "Mais de 6 anos no setor financeiro: desenvolvimento de Home Broker na modalmais (Vue 2/3), plataforma de Wealth Management na Mirae Asset e canais bancários na Zup.",
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "400",
      fill: textSecondary
    });
    const c2Tags = Insert(card2, {
      type: "frame",
      name: "Tags",
      layout: "horizontal",
      gap: 8
    });
    for (const tag of ["Home Broker", "Alta Disponibilidade", "Vue 3", "Trading"]) {
      const tb = Insert(c2Tags, {
        type: "frame",
        name: "Tag",
        fill: bgCardSubtle,
        stroke: borderColor,
        strokeWidth: 1,
        cornerRadius: 6,
        padding: [6, 10, 6, 10]
      });
      Insert(tb, {
        type: "text",
        name: "Tag Text",
        content: tag,
        fontFamily: "Inter",
        fontSize: 11,
        fontWeight: "500",
        fill: textSecondary
      });
    }

    // Bento Row 2 (Cards 3 and 4)
    const bentoRow2 = Insert("bi8Au", {
      type: "frame",
      name: "Bento Row 2",
      width: 1280,
      layout: "horizontal",
      gap: 24
    });

    // Bento Card 3 (BFFs)
    const card3 = Insert(bentoRow2, {
      type: "frame",
      name: "Card BFF",
      width: 600,
      height: 270,
      fill: bgCard,
      stroke: borderColor,
      strokeWidth: 1,
      cornerRadius: 16,
      padding: [28, 32, 28, 32],
      layout: "vertical",
      justifyContent: "space_between"
    });
    const c3Content = Insert(card3, {
      type: "frame",
      name: "Card Content",
      width: 536,
      layout: "vertical",
      gap: 10
    });
    Insert(c3Content, {
      type: "text",
      name: "Badge",
      content: "BACKEND FOR FRONTEND",
      fontFamily: "Inter",
      fontSize: 11,
      fontWeight: "700",
      fill: "#f59e0b"
    });
    Insert(c3Content, {
      type: "text",
      name: "Title",
      content: "Arquitetura BFF com Node & NestJS",
      fontFamily: "Inter",
      fontSize: 20,
      fontWeight: "700",
      fill: textPrimary
    });
    Insert(c3Content, {
      type: "text",
      name: "Desc",
      content: "Estratégia de governança de BFFs sob responsabilidade do time de Frontend. Criação de APIs intermediárias sob medida em Node.js/Nest.js para orquestrar múltiplos microsserviços.",
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "400",
      fill: textSecondary
    });
    const c3Tags = Insert(card3, {
      type: "frame",
      name: "Tags",
      layout: "horizontal",
      gap: 8
    });
    for (const tag of ["Node.js", "NestJS", "REST APIs", "BFF"]) {
      const tb = Insert(c3Tags, {
        type: "frame",
        name: "Tag",
        fill: bgCardSubtle,
        stroke: borderColor,
        strokeWidth: 1,
        cornerRadius: 6,
        padding: [6, 10, 6, 10]
      });
      Insert(tb, {
        type: "text",
        name: "Tag Text",
        content: tag,
        fontFamily: "Inter",
        fontSize: 11,
        fontWeight: "500",
        fill: textSecondary
      });
    }

    // Bento Card 4 (AI Agents)
    const card4 = Insert(bentoRow2, {
      type: "frame",
      name: "Card AI",
      width: 656,
      height: 270,
      fill: bgCard,
      stroke: borderColor,
      strokeWidth: 1,
      cornerRadius: 16,
      padding: [28, 32, 28, 32],
      layout: "vertical",
      justifyContent: "space_between"
    });
    const c4Content = Insert(card4, {
      type: "frame",
      name: "Card Content",
      width: 592,
      layout: "vertical",
      gap: 10
    });
    Insert(c4Content, {
      type: "text",
      name: "Badge",
      content: "INOVAÇÃO & ENGENHARIA",
      fontFamily: "Inter",
      fontSize: 11,
      fontWeight: "700",
      fill: accentPurple
    });
    Insert(c4Content, {
      type: "text",
      name: "Title",
      content: "AI Agents, LLMs & Automação",
      fontFamily: "Inter",
      fontSize: 20,
      fontWeight: "700",
      fill: textPrimary
    });
    Insert(c4Content, {
      type: "text",
      name: "Desc",
      content: "Exploração e integração prática de Inteligência Artificial aplicada ao fluxo de software: agentes autônomos, Model Context Protocol (MCP), Design-as-Code e automações no ciclo de engenharia.",
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "400",
      fill: textSecondary
    });
    const c4Tags = Insert(card4, {
      type: "frame",
      name: "Tags",
      layout: "horizontal",
      gap: 8
    });
    for (const tag of ["AI Agents", "LLMs", "Model Context Protocol", "Design-as-Code"]) {
      const tb = Insert(c4Tags, {
        type: "frame",
        name: "Tag",
        fill: bgCardSubtle,
        stroke: borderColor,
        strokeWidth: 1,
        cornerRadius: 6,
        padding: [6, 10, 6, 10]
      });
      Insert(tb, {
        type: "text",
        name: "Tag Text",
        content: tag,
        fontFamily: "Inter",
        fontSize: 11,
        fontWeight: "500",
        fill: textSecondary
      });
    }

    // -------------------------------------------------------------
    // 5. TRAJETÓRIA / EXPERIÊNCIA PROFISSIONAL (Timeline)
    // -------------------------------------------------------------
    const expHeader = Insert("bi8Au", {
      type: "frame",
      name: "Experience Header",
      width: 1280,
      layout: "vertical",
      gap: 8
    });
    Insert(expHeader, {
      type: "text",
      name: "Section Tag",
      content: "CARREIRA & IMPACTO",
      fontFamily: "Inter",
      fontSize: 13,
      fontWeight: "700",
      fill: accentBlue
    });
    Insert(expHeader, {
      type: "text",
      name: "Section Title",
      content: "Trajetória Profissional",
      fontFamily: "Inter",
      fontSize: 34,
      fontWeight: "700",
      fill: textPrimary
    });

    const expList = Insert("bi8Au", {
      type: "frame",
      name: "Experience List",
      width: 1280,
      layout: "vertical",
      gap: 20
    });

    const experiences = [
      {
        company: "Mirae Asset Wealth Management (Brazil)",
        role: "Senior Frontend Developer",
        period: "fev de 2024 - presente",
        bullets: [
          "Idealização e implementação da estratégia de modernização com Microfrontends (Module Federation).",
          "Migração da infraestrutura de build de Webpack para Rsbuild/Rspack, reduzindo o tempo de compilação.",
          "Referência técnica e disseminação de boas práticas arquiteturais e Design Systems.",
          "Estratégia de transferência e governança de BFFs para o time de Front-end com Node.js."
        ],
        badge: "ATUAL"
      },
      {
        company: "modalmais Home Broker",
        role: "Desenvolvedor de Front-end",
        period: "out de 2019 - jan de 2024 (4 anos 4 meses)",
        bullets: [
          "Desenvolvimento e manutenção da plataforma de Home Broker com Vue.js (Vue 2 e Vue 3), JavaScript e TypeScript.",
          "Criação de microsites integrados à aplicação principal via carregamento dinâmico de bundles e roteamento reativo.",
          "Otimização contínua de performance e manutenibilidade para investidores em ambiente financeiro de alta exigência."
        ],
        badge: "FINTECH"
      },
      {
        company: "Zup Innovation",
        role: "Desenvolvedor Full Stack",
        period: "mai de 2019 - out de 2019",
        bullets: [
          "Atuação em projetos para cliente do setor bancário, desenvolvendo soluções de canais digitais e Internet Banking.",
          "Aplicações mobile híbridas com AngularJS em WebView integradas à camada nativa Android e iOS.",
          "Desenvolvimento e manutenção de serviços e APIs em Node.js."
        ],
        badge: "BANCO"
      },
      {
        company: "Accenture",
        role: "Desenvolvedor de Front-end",
        period: "fev de 2018 - mai de 2019 (1 ano 4 meses)",
        bullets: [
          "Desenvolvimento de APIs REST em Node.js com persistência em Apache Cassandra.",
          "Processamento de arquivos Excel com regras de negócio e validações complexas.",
          "Aplicações mobile híbridas com Apache Cordova voltadas ao financiamento de veículos."
        ],
        badge: "CONSULTORIA"
      },
      {
        company: "Keep.i Media",
        role: "Desenvolvedor Full Stack",
        period: "abr de 2017 - fev de 2018 (11 meses)",
        bullets: [
          "Plataforma de consolidação de dados de mídia programática (Google Ads, Facebook Ads, DoubleClick).",
          "Dashboards analíticos dinâmicos com suporte a drag-and-drop e gráficos de alto desempenho.",
          "Serviços Back-end em Node.js para consolidação e ingestão de métricas."
        ],
        badge: "ADTECH"
      }
    ];

    for (const exp of experiences) {
      const expCard = Insert(expList, {
        type: "frame",
        name: "Exp " + exp.company,
        width: 1280,
        fill: bgCard,
        stroke: borderColor,
        strokeWidth: 1,
        cornerRadius: 14,
        padding: [24, 32, 24, 32],
        layout: "vertical",
        gap: 14
      });

      const topRow = Insert(expCard, {
        type: "frame",
        name: "Top Row",
        width: 1216,
        layout: "horizontal",
        justifyContent: "space_between",
        alignItems: "center"
      });

      const leftTop = Insert(topRow, {
        type: "frame",
        name: "Company & Role",
        layout: "horizontal",
        alignItems: "center",
        gap: 14
      });
      Insert(leftTop, {
        type: "text",
        name: "Company",
        content: exp.company,
        fontFamily: "Inter",
        fontSize: 18,
        fontWeight: "700",
        fill: textPrimary
      });
      const bTag = Insert(leftTop, {
        type: "frame",
        name: "Badge",
        fill: bgCardSubtle,
        stroke: borderColor,
        strokeWidth: 1,
        cornerRadius: 4,
        padding: [3, 8, 3, 8]
      });
      Insert(bTag, {
        type: "text",
        name: "Badge Text",
        content: exp.badge,
        fontFamily: "Inter",
        fontSize: 10,
        fontWeight: "700",
        fill: accentBlue
      });

      Insert(topRow, {
        type: "text",
        name: "Period",
        content: exp.period,
        fontFamily: "Inter",
        fontSize: 13,
        fontWeight: "500",
        fill: textMuted
      });

      Insert(expCard, {
        type: "text",
        name: "Role",
        content: exp.role,
        fontFamily: "Inter",
        fontSize: 15,
        fontWeight: "600",
        fill: accentBlue
      });

      const bulletsFrame = Insert(expCard, {
        type: "frame",
        name: "Bullets Frame",
        layout: "vertical",
        gap: 8
      });

      for (const bullet of exp.bullets) {
        const bulletRow = Insert(bulletsFrame, {
          type: "frame",
          name: "Bullet Row",
          layout: "horizontal",
          gap: 10,
          alignItems: "start"
        });
        Insert(bulletRow, {
          type: "text",
          name: "Dot",
          content: "•",
          fontFamily: "Inter",
          fontSize: 14,
          fill: accentBlue
        });
        Insert(bulletRow, {
          type: "text",
          name: "Bullet Text",
          content: bullet,
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: "400",
          fill: textSecondary,
          width: 1160
        });
      }
    }

    // -------------------------------------------------------------
    // 6. TECH STACK
    // -------------------------------------------------------------
    const stackHeader = Insert("bi8Au", {
      type: "frame",
      name: "Stack Header",
      width: 1280,
      layout: "vertical",
      gap: 8
    });
    Insert(stackHeader, {
      type: "text",
      name: "Section Tag",
      content: "TECNOLOGIAS & FERRAMENTAS",
      fontFamily: "Inter",
      fontSize: 13,
      fontWeight: "700",
      fill: accentEmerald
    });
    Insert(stackHeader, {
      type: "text",
      name: "Section Title",
      content: "Habilidades Técnicas",
      fontFamily: "Inter",
      fontSize: 34,
      fontWeight: "700",
      fill: textPrimary
    });

    const stackGrid = Insert("bi8Au", {
      type: "frame",
      name: "Stack Grid",
      width: 1280,
      layout: "horizontal",
      gap: 24
    });

    const categories = [
      {
        title: "Frontend Core",
        items: ["React.js", "TypeScript", "Vue.js (2 & 3)", "Next.js", "Tailwind CSS", "Angular"]
      },
      {
        title: "Backend & APIs",
        items: ["Node.js", "Nest.js", "REST APIs", "GraphQL", "BFF Architecture", "Microservices"]
      },
      {
        title: "Arquitetura & Build",
        items: ["Module Federation", "Rsbuild / Rspack", "Microfrontends", "Webpack", "Design Systems", "Vite"]
      },
      {
        title: "Dados, DevOps & AI",
        items: ["PostgreSQL", "Cassandra", "Docker", "Git / GitHub", "AI Agents & LLMs", "MCP Tools"]
      }
    ];

    for (const cat of categories) {
      const catCard = Insert(stackGrid, {
        type: "frame",
        name: "Cat " + cat.title,
        width: 302,
        fill: bgCard,
        stroke: borderColor,
        strokeWidth: 1,
        cornerRadius: 14,
        padding: [24, 24, 24, 24],
        layout: "vertical",
        gap: 16
      });
      Insert(catCard, {
        type: "text",
        name: "Cat Title",
        content: cat.title,
        fontFamily: "Inter",
        fontSize: 16,
        fontWeight: "700",
        fill: textPrimary
      });
      const itemsFrame = Insert(catCard, {
        type: "frame",
        name: "Items Frame",
        layout: "vertical",
        gap: 10
      });
      for (const tech of cat.items) {
        const itemRow = Insert(itemsFrame, {
          type: "frame",
          name: "Tech Row",
          fill: bgCardSubtle,
          cornerRadius: 6,
          padding: [8, 12, 8, 12],
          width: 254
        });
        Insert(itemRow, {
          type: "text",
          name: "Tech Name",
          content: tech,
          fontFamily: "Inter",
          fontSize: 13,
          fontWeight: "500",
          fill: textSecondary
        });
      }
    }

    // -------------------------------------------------------------
    // 7. FOOTER & CONTATO
    // -------------------------------------------------------------
    const footerCard = Insert("bi8Au", {
      type: "frame",
      name: "Footer & Contact",
      width: 1280,
      fill: "#18181f",
      stroke: borderColor,
      strokeWidth: 1,
      cornerRadius: 20,
      padding: [48, 64, 48, 64],
      layout: "horizontal",
      justifyContent: "space_between",
      alignItems: "center"
    });

    const footLeft = Insert(footerCard, {
      type: "frame",
      name: "Left Foot",
      layout: "vertical",
      gap: 12
    });
    Insert(footLeft, {
      type: "text",
      name: "Foot Title",
      content: "Vamos construir algo extraordinário juntos?",
      fontFamily: "Inter",
      fontSize: 28,
      fontWeight: "700",
      fill: textPrimary
    });
    Insert(footLeft, {
      type: "text",
      name: "Foot Sub",
      content: "Disponível para posições sênior, consultoria técnica e novos desafios de arquitetura.",
      fontFamily: "Inter",
      fontSize: 15,
      fontWeight: "400",
      fill: textSecondary
    });

    const footRight = Insert(footerCard, {
      type: "frame",
      name: "Right Foot Contact",
      layout: "vertical",
      gap: 12,
      alignItems: "end"
    });
    const emailBadge = Insert(footRight, {
      type: "frame",
      name: "Email Box",
      fill: "#38bdf8",
      cornerRadius: 10,
      padding: [12, 24, 12, 24]
    });
    Insert(emailBadge, {
      type: "text",
      name: "Email Text",
      content: "rubens.barbosa88@gmail.com",
      fontFamily: "Inter",
      fontSize: 14,
      fontWeight: "600",
      fill: "#09090b"
    });

    const linkRow = Insert(footRight, {
      type: "frame",
      name: "Links Row",
      layout: "horizontal",
      gap: 16
    });
    for (const lk of ["LinkedIn", "GitHub", "São Paulo, Brasil"]) {
      Insert(linkRow, {
        type: "text",
        name: "Lk",
        content: lk,
        fontFamily: "Inter",
        fontSize: 13,
        fontWeight: "500",
        fill: textMuted
      });
    }

    Export(["bi8Au"], "png", "${outPng}", { scale: 1 });
    Print("EXPORTED_REFINED: ${outPng}");
  `;

  const res = await callPencil('execute', { input });
  console.log('RESULT:', JSON.stringify(res, null, 2));
}

buildPortfolioRefined().catch(console.error);
