const { callPencil } = require('./pencil-bridge');
const path = require('path');
const fs = require('fs');

async function cleanAndBuild() {
  console.log('Construindo Portfolio Matrix Style no Pencil...');

  const exportDir = path.join(__dirname, 'export-out').replace(/\\/g, '/');

  const input = `
    // 1. Limpar filhos anteriores de bi8Au
    const root = Get("bi8Au", {depth: 1});
    if (root.children && root.children.length > 0) {
      for (const child of root.children) {
        Delete(child.id);
      }
    }

    // 2. Cores Matrix / Cyberpunk / Dark Terminal
    const bgVoid = "#030706";
    const bgCard = "#08120b";
    const bgCardSubtle = "#0d1a11";
    const borderMatrix = "#163821";
    const borderNeon = "#00ff41";
    const neonGreen = "#00ff41";
    const softGreen = "#4ade80";
    const textBright = "#f5f1ea";
    const textMuted = "#94a3b8";
    const textDim = "#64748b";

    // 3. Atualizar Frame Principal
    Update("bi8Au", {
      name: "Portfolio - Rubens Barbosa (Matrix Style)",
      width: 1440,
      height: 4400,
      fill: bgVoid,
      clip: true,
      layout: "vertical",
      alignItems: "center",
      padding: [0, 0, 100, 0],
      gap: 64
    });

    // -------------------------------------------------------------
    // TOP MARQUEE BAND (TICKER MATRIX)
    // -------------------------------------------------------------
    const marquee = Insert("bi8Au", {
      type: "frame",
      name: "Matrix Ticker Band",
      width: 1440,
      height: 38,
      fill: "#041409",
      stroke: "#00ff4133",
      strokeWidth: { bottom: 1 },
      layout: "horizontal",
      justifyContent: "center",
      alignItems: "center",
      gap: 16
    });

    Insert(marquee, {
      type: "text",
      name: "Ticker Text",
      content: "🟢 SYSTEM STATUS: ONLINE ✦ SENIOR FRONTEND ARCHITECT ✦ MICROFRONTENDS & MODULE FEDERATION ✦ REACT · TYPESCRIPT · NEXT.JS · VUE ✦ RSBUILD / RSPACK ✦ FINTECH & REAL-TIME WEB ✦ AGENT-READY (MCP)",
      fontFamily: "JetBrains Mono",
      fontSize: 12,
      fontWeight: "600",
      fill: softGreen
    });

    // -------------------------------------------------------------
    // HEADER / NAVIGATION
    // -------------------------------------------------------------
    const header = Insert("bi8Au", {
      type: "frame",
      name: "Header Navigation",
      width: 1440,
      height: 76,
      fill: "#050c07ee",
      stroke: borderMatrix,
      strokeWidth: { bottom: 1 },
      layout: "horizontal",
      justifyContent: "space_between",
      alignItems: "center",
      padding: [0, 80, 0, 80]
    });

    const logoFrame = Insert(header, {
      type: "frame",
      name: "Logo Container",
      layout: "horizontal",
      alignItems: "center",
      gap: 10
    });

    Insert(logoFrame, {
      type: "text",
      name: "Logo Prompt",
      content: ">_",
      fontFamily: "JetBrains Mono",
      fontSize: 22,
      fontWeight: "700",
      fill: neonGreen
    });

    Insert(logoFrame, {
      type: "text",
      name: "Logo Text",
      content: "rubens.dev",
      fontFamily: "JetBrains Mono",
      fontSize: 20,
      fontWeight: "700",
      fill: textBright
    });

    const badgeFront = Insert(logoFrame, {
      type: "frame",
      name: "Tag Senior",
      fill: "#00ff4115",
      stroke: "#00ff4140",
      strokeWidth: 1,
      cornerRadius: 4,
      padding: [4, 8, 4, 8]
    });

    Insert(badgeFront, {
      type: "text",
      name: "Tag Text",
      content: "SENIOR FRONTEND",
      fontFamily: "JetBrains Mono",
      fontSize: 11,
      fontWeight: "600",
      fill: neonGreen
    });

    const navLinks = Insert(header, {
      type: "frame",
      name: "Nav Links",
      layout: "horizontal",
      gap: 24,
      alignItems: "center"
    });

    const navItems = [
      "< 01 / Sobre >",
      "< 02 / Projetos >",
      "< 03 / Diferenciais >",
      "< 04 / Trajetória >",
      "< 05 / Stack >",
      "< 06 / Contato >"
    ];

    for (const item of navItems) {
      Insert(navLinks, {
        type: "text",
        name: "Nav Item",
        content: item,
        fontFamily: "JetBrains Mono",
        fontSize: 13,
        fontWeight: "500",
        fill: textMuted
      });
    }

    const headerRight = Insert(header, {
      type: "frame",
      name: "Header Actions",
      layout: "horizontal",
      alignItems: "center",
      gap: 16
    });

    const cvBtn = Insert(headerRight, {
      type: "frame",
      name: "CV Button",
      fill: "#00ff411a",
      stroke: "#00ff41",
      strokeWidth: 1,
      cornerRadius: 6,
      padding: [8, 16, 8, 16]
    });

    Insert(cvBtn, {
      type: "text",
      name: "CV Label",
      content: "Download CV [PDF] →",
      fontFamily: "JetBrains Mono",
      fontSize: 13,
      fontWeight: "600",
      fill: neonGreen
    });

    // -------------------------------------------------------------
    // HERO SECTION (MATRIX TERMINAL & CYBER AVATAR)
    // -------------------------------------------------------------
    const hero = Insert("bi8Au", {
      type: "frame",
      name: "Hero Section",
      width: 1240,
      layout: "vertical",
      alignItems: "center",
      padding: [20, 0, 10, 0],
      gap: 28
    });

    // Diagnostic HUD Bar
    const hudBar = Insert(hero, {
      type: "frame",
      name: "System HUD Bar",
      layout: "horizontal",
      alignItems: "center",
      gap: 12,
      padding: [6, 16, 6, 16],
      cornerRadius: 4,
      fill: "#001f0c40",
      stroke: "#00ff4130",
      strokeWidth: 1
    });

    Insert(hudBar, {
      type: "text",
      name: "HUD Text",
      content: "[ SYS.DIAGNOSTICS ]  //  REGION: SA-BR  //  LATENCY: 0.8ms  //  STACK: FRONTEND_ARCH  //  STATUS: READY",
      fontFamily: "JetBrains Mono",
      fontSize: 12,
      fontWeight: "500",
      fill: softGreen
    });

    // Cyber Avatar Frame with Rubens' photo
    const avatarPhoto = Insert(hero, {
      type: "frame",
      name: "Rubens Avatar",
      width: 130,
      height: 130,
      cornerRadius: 65,
      stroke: neonGreen,
      strokeWidth: 3,
      fill: {
        type: "image",
        url: "./rubens-avatar.jpg",
        mode: "fill"
      }
    });

    // Terminal Shell Card (The Typing Terminal Box)
    const termShell = Insert(hero, {
      type: "frame",
      name: "Terminal Shell Box",
      width: 960,
      fill: "#050b07",
      stroke: "#00ff4140",
      strokeWidth: 1,
      cornerRadius: 12,
      padding: [20, 28, 24, 28],
      layout: "vertical",
      gap: 16
    });

    // Terminal Header Window Controls
    const termHead = Insert(termShell, {
      type: "frame",
      name: "Terminal Header",
      width: 904,
      layout: "horizontal",
      justifyContent: "space_between",
      alignItems: "center"
    });

    const termDots = Insert(termHead, {
      type: "frame",
      name: "Window Buttons",
      layout: "horizontal",
      gap: 8,
      alignItems: "center"
    });

    Insert(termDots, {
      type: "frame",
      name: "Red Dot",
      width: 12,
      height: 12,
      cornerRadius: 6,
      fill: "#ef4444"
    });
    Insert(termDots, {
      type: "frame",
      name: "Yellow Dot",
      width: 12,
      height: 12,
      cornerRadius: 6,
      fill: "#eab308"
    });
    Insert(termDots, {
      type: "frame",
      name: "Green Dot",
      width: 12,
      height: 12,
      cornerRadius: 6,
      fill: "#22c55e"
    });

    Insert(termHead, {
      type: "text",
      name: "Window Title",
      content: "rubens@architect-terminal: ~ (zsh)",
      fontFamily: "JetBrains Mono",
      fontSize: 12,
      fontWeight: "500",
      fill: textDim
    });

    // Terminal Command Line: whoami
    const termLine1 = Insert(termShell, {
      type: "frame",
      name: "Prompt Line 1",
      layout: "horizontal",
      gap: 8,
      alignItems: "center"
    });

    Insert(termLine1, {
      type: "text",
      name: "Prompt Label",
      content: "guest@matrix:~$",
      fontFamily: "JetBrains Mono",
      fontSize: 15,
      fontWeight: "600",
      fill: textDim
    });

    Insert(termLine1, {
      type: "text",
      name: "Prompt Command",
      content: "whoami --specialty --level",
      fontFamily: "JetBrains Mono",
      fontSize: 15,
      fontWeight: "500",
      fill: softGreen
    });

    // Terminal Big Output: Rubens Barbosa
    const termNameRow = Insert(termShell, {
      type: "frame",
      name: "Name Row",
      layout: "horizontal",
      gap: 8,
      alignItems: "center"
    });

    Insert(termNameRow, {
      type: "text",
      name: "Name Prompt",
      content: ">",
      fontFamily: "JetBrains Mono",
      fontSize: 48,
      fontWeight: "700",
      fill: neonGreen
    });

    Insert(termNameRow, {
      type: "text",
      name: "Name Text",
      content: "Rubens Barbosa",
      fontFamily: "JetBrains Mono",
      fontSize: 48,
      fontWeight: "800",
      fill: textBright
    });

    Insert(termNameRow, {
      type: "text",
      name: "Blinking Cursor",
      content: "█",
      fontFamily: "JetBrains Mono",
      fontSize: 44,
      fontWeight: "700",
      fill: neonGreen
    });

    // Role Subtitle
    Insert(termShell, {
      type: "text",
      name: "Role Subtitle",
      content: "Senior Frontend Engineer & Systems Architect",
      fontFamily: "JetBrains Mono",
      fontSize: 22,
      fontWeight: "600",
      fill: softGreen
    });

    // Terminal Chips Line
    const chipsRow = Insert(termShell, {
      type: "frame",
      name: "Chips Row",
      layout: "horizontal",
      gap: 10,
      alignItems: "center"
    });

    const chips = [
      "⚡ Microfrontends (Module Federation)",
      "⚡ Fintech & Streaming (Home Broker)",
      "⚡ Rsbuild & Rspack Tooling",
      "⚡ React · Vue · TypeScript"
    ];

    for (const chip of chips) {
      const chipFrame = Insert(chipsRow, {
        type: "frame",
        name: "Chip",
        fill: "#00ff4110",
        stroke: "#00ff4130",
        strokeWidth: 1,
        cornerRadius: 4,
        padding: [6, 12, 6, 12]
      });
      Insert(chipFrame, {
        type: "text",
        name: "Chip Text",
        content: chip,
        fontFamily: "JetBrains Mono",
        fontSize: 12,
        fontWeight: "500",
        fill: neonGreen
      });
    }

    // Hero Description
    Insert(hero, {
      type: "text",
      name: "Hero Description",
      content: "Engenheiro Frontend Sênior com mais de 10 anos de experiência liderando a arquitetura de plataformas web de alta escala, sistemas financeiros de missão crítica (Home Broker, Wealth Management) e infraestruturas complexas com Module Federation e Rsbuild.",
      fontFamily: "Inter",
      fontSize: 17,
      fontWeight: "400",
      fill: textMuted,
      textAlign: "center",
      width: 860
    });

    // Hero Action Buttons & Agent Ready Badge
    const heroActions = Insert(hero, {
      type: "frame",
      name: "Hero Actions",
      layout: "horizontal",
      gap: 16,
      alignItems: "center"
    });

    const btnPrimary = Insert(heroActions, {
      type: "frame",
      name: "Primary CTA",
      fill: neonGreen,
      cornerRadius: 6,
      padding: [14, 28, 14, 28]
    });

    Insert(btnPrimary, {
      type: "text",
      name: "Btn Label",
      content: "[ EXECUTAR: VER PROJETOS → ]",
      fontFamily: "JetBrains Mono",
      fontSize: 14,
      fontWeight: "700",
      fill: "#000000"
    });

    const btnSecondary = Insert(heroActions, {
      type: "frame",
      name: "Secondary CTA",
      fill: "#00ff4110",
      stroke: "#00ff4140",
      strokeWidth: 1,
      cornerRadius: 6,
      padding: [14, 24, 14, 24]
    });

    Insert(btnSecondary, {
      type: "text",
      name: "Btn Label 2",
      content: "< ARQUITETURA & STACK >",
      fontFamily: "JetBrains Mono",
      fontSize: 14,
      fontWeight: "600",
      fill: softGreen
    });

    const agentReadyBadge = Insert(heroActions, {
      type: "frame",
      name: "Agent Badge",
      fill: "#021508",
      stroke: "#00ff4155",
      strokeWidth: 1,
      cornerRadius: 6,
      padding: [12, 18, 12, 18],
      layout: "horizontal",
      gap: 8,
      alignItems: "center"
    });

    Insert(agentReadyBadge, {
      type: "text",
      name: "Agent Dot",
      content: "●",
      fontFamily: "JetBrains Mono",
      fontSize: 14,
      fontWeight: "700",
      fill: neonGreen
    });

    Insert(agentReadyBadge, {
      type: "text",
      name: "Agent Text",
      content: "AGENT-READY (MCP COMPLIANT)",
      fontFamily: "JetBrains Mono",
      fontSize: 12,
      fontWeight: "600",
      fill: textBright
    });

    // -------------------------------------------------------------
    // SECTION 01: PROVAS EM NÚMEROS (STATS BAR)
    // -------------------------------------------------------------
    const statsContainer = Insert("bi8Au", {
      type: "frame",
      name: "Stats Bar",
      width: 1240,
      fill: bgCard,
      stroke: borderMatrix,
      strokeWidth: 1,
      cornerRadius: 12,
      padding: [32, 48, 32, 48],
      layout: "horizontal",
      justifyContent: "space_between",
      alignItems: "center"
    });

    const metrics = [
      { num: "10+ Anos", label: "Engenharia & Arquitetura Frontend" },
      { num: "500k+ MAU", label: "Usuários em Plataformas Financeiras" },
      { num: "15+ MFEs", label: "Module Federation em Produção" },
      { num: "< 1.2s", label: "LCP & Build 4x Mais Rápido" }
    ];

    for (const m of metrics) {
      const statCol = Insert(statsContainer, {
        type: "frame",
        name: "Stat Item",
        layout: "vertical",
        gap: 6,
        alignItems: "center",
        width: 240
      });

      Insert(statCol, {
        type: "text",
        name: "Stat Number",
        content: m.num,
        fontFamily: "JetBrains Mono",
        fontSize: 34,
        fontWeight: "800",
        fill: neonGreen
      });

      Insert(statCol, {
        type: "text",
        name: "Stat Label",
        content: m.label,
        fontFamily: "JetBrains Mono",
        fontSize: 12,
        fontWeight: "500",
        fill: textMuted,
        textAlign: "center"
      });
    }

    // -------------------------------------------------------------
    // SECTION 02: PROJETOS DE ALTO IMPACTO (3-COLUMN GRID)
    // -------------------------------------------------------------
    const projHeader = Insert("bi8Au", {
      type: "frame",
      name: "Projects Header",
      width: 1240,
      layout: "vertical",
      gap: 10
    });

    Insert(projHeader, {
      type: "text",
      name: "Section Tag",
      content: "< 02 / PROJETOS DE ALTO IMPACTO >",
      fontFamily: "JetBrains Mono",
      fontSize: 13,
      fontWeight: "600",
      fill: neonGreen
    });

    Insert(projHeader, {
      type: "text",
      name: "Section Title",
      content: "Arquitetura & Engenharia em Produção",
      fontFamily: "Inter",
      fontSize: 34,
      fontWeight: "800",
      fill: textBright
    });

    Insert(projHeader, {
      type: "text",
      name: "Section Subtitle",
      content: "Sistemas complexos com foco em alta performance, disponibilidade crítica e governança técnica.",
      fontFamily: "Inter",
      fontSize: 16,
      fontWeight: "400",
      fill: textMuted
    });

    // 3-Column Grid
    const projGrid = Insert("bi8Au", {
      type: "frame",
      name: "Projects 3-Col Grid",
      width: 1240,
      layout: "horizontal",
      gap: 24
    });

    const projects = [
      {
        tag: "01 // FINTECH STREAMING",
        title: "Home Broker Real-Time Engine",
        desc: "Arquitetura web para streaming de cotações em tempo real via WebSockets, order book de baixa latência e boletas de compra/venda de alta frequência.",
        metric: "⚡ Latência < 40ms // 60 FPS",
        stack: ["React", "TypeScript", "WebSockets", "Module Fed", "Tailwind"]
      },
      {
        tag: "02 // WEALTH MANAGEMENT",
        title: "Multi-Tenant Wealth Portal",
        desc: "Plataforma integrada de gestão de patrimônio para clientes institucionais e private banking. Migração de monólito para arquitetura federada distribuída.",
        metric: "⚡ 500k+ MAU // Deploys Independentes",
        stack: ["Vue 3", "React", "Rsbuild", "Node.js BFF", "GraphQL"]
      },
      {
        tag: "03 // BUILD & PLATFORM",
        title: "Rsbuild & Federation Core",
        desc: "Modernização da infraestrutura front-end corporativa substituindo Webpack por Rsbuild/Rspack, com esteira automatizada de CI/CD e governança de design system.",
        metric: "⚡ Build 4x Mais Rápido // Zero Downtime",
        stack: ["Rsbuild", "Rspack", "Module Fed v2", "Docker", "Jest/Cypress"]
      }
    ];

    for (const p of projects) {
      const pCard = Insert(projGrid, {
        type: "frame",
        name: "Card " + p.title,
        width: 397,
        fill: bgCard,
        stroke: borderMatrix,
        strokeWidth: 1,
        cornerRadius: 12,
        padding: [28, 28, 28, 28],
        layout: "vertical",
        gap: 16
      });

      // Tag line
      Insert(pCard, {
        type: "text",
        name: "Project Tag",
        content: p.tag,
        fontFamily: "JetBrains Mono",
        fontSize: 12,
        fontWeight: "600",
        fill: neonGreen
      });

      // Title
      Insert(pCard, {
        type: "text",
        name: "Project Title",
        content: p.title,
        fontFamily: "Inter",
        fontSize: 22,
        fontWeight: "700",
        fill: textBright
      });

      // Description with proper wrapping width
      Insert(pCard, {
        type: "text",
        name: "Project Desc",
        content: p.desc,
        fontFamily: "Inter",
        fontSize: 14,
        fontWeight: "400",
        fill: textMuted,
        width: 341
      });

      // Metric Badge
      const metricBadge = Insert(pCard, {
        type: "frame",
        name: "Metric Badge",
        fill: "#00ff4110",
        stroke: "#00ff4130",
        strokeWidth: 1,
        cornerRadius: 4,
        padding: [6, 10, 6, 10]
      });

      Insert(metricBadge, {
        type: "text",
        name: "Metric Text",
        content: p.metric,
        fontFamily: "JetBrains Mono",
        fontSize: 12,
        fontWeight: "600",
        fill: softGreen
      });

      // Tech Chips
      const pTags = Insert(pCard, {
        type: "frame",
        name: "Project Tech Tags",
        layout: "horizontal",
        gap: 6
      });

      for (const t of p.stack) {
        const tFrame = Insert(pTags, {
          type: "frame",
          name: "Tech Tag",
          fill: bgCardSubtle,
          stroke: borderMatrix,
          strokeWidth: 1,
          cornerRadius: 4,
          padding: [4, 8, 4, 8]
        });
        Insert(tFrame, {
          type: "text",
          name: "Tech Text",
          content: t,
          fontFamily: "JetBrains Mono",
          fontSize: 11,
          fontWeight: "500",
          fill: textBright
        });
      }
    }

    // -------------------------------------------------------------
    // SECTION 03: DIFERENCIAIS DE ARQUITETURA (BENTO GRID)
    // -------------------------------------------------------------
    const bentoHeader = Insert("bi8Au", {
      type: "frame",
      name: "Bento Header",
      width: 1240,
      layout: "vertical",
      gap: 10
    });

    Insert(bentoHeader, {
      type: "text",
      name: "Section Tag",
      content: "< 03 / DIFERENCIAIS TÉCNICOS >",
      fontFamily: "JetBrains Mono",
      fontSize: 13,
      fontWeight: "600",
      fill: neonGreen
    });

    Insert(bentoHeader, {
      type: "text",
      name: "Section Title",
      content: "Arquitetura Frontend de Alta Maturidade",
      fontFamily: "Inter",
      fontSize: 34,
      fontWeight: "800",
      fill: textBright
    });

    // Bento Row 1
    const bentoRow1 = Insert("bi8Au", {
      type: "frame",
      name: "Bento Row 1",
      width: 1240,
      layout: "horizontal",
      gap: 24
    });

    const bentoItems = [
      {
        badge: "01 // ESCALABILIDADE",
        title: "Microfrontends & Module Federation",
        desc: "Arquitetura distribuída com isolamento de contexto, compartilhamento eficiente de dependências e esteiras de deploy independentes.",
        width: 740,
        descWidth: 676,
        tags: ["Module Federation", "Webpack", "Rsbuild", "Monorepos"]
      },
      {
        badge: "02 // RESILIÊNCIA",
        title: "Fintech & Baixa Latência",
        desc: "Experiência sólida com streaming financeiro em tempo real (Home Broker, Wealth Management), WebSockets e renderização fluida.",
        width: 476,
        descWidth: 412,
        tags: ["Home Broker", "WebSockets", "Trading UI", "Fintech"]
      }
    ];

    for (const b of bentoItems) {
      const bCard = Insert(bentoRow1, {
        type: "frame",
        name: "Bento Card " + b.title,
        width: b.width,
        fill: bgCard,
        stroke: borderMatrix,
        strokeWidth: 1,
        cornerRadius: 12,
        padding: [32, 32, 32, 32],
        layout: "vertical",
        gap: 16
      });

      Insert(bCard, {
        type: "text",
        name: "Bento Tag",
        content: b.badge,
        fontFamily: "JetBrains Mono",
        fontSize: 12,
        fontWeight: "600",
        fill: neonGreen
      });

      Insert(bCard, {
        type: "text",
        name: "Bento Title",
        content: b.title,
        fontFamily: "Inter",
        fontSize: 24,
        fontWeight: "700",
        fill: textBright
      });

      Insert(bCard, {
        type: "text",
        name: "Bento Desc",
        content: b.desc,
        fontFamily: "Inter",
        fontSize: 15,
        fontWeight: "400",
        fill: textMuted,
        width: b.descWidth
      });

      const bTags = Insert(bCard, {
        type: "frame",
        name: "Bento Tags",
        layout: "horizontal",
        gap: 8
      });

      for (const t of b.tags) {
        const tf = Insert(bTags, {
          type: "frame",
          name: "Tag",
          fill: bgCardSubtle,
          stroke: borderMatrix,
          strokeWidth: 1,
          cornerRadius: 4,
          padding: [6, 10, 6, 10]
        });
        Insert(tf, {
          type: "text",
          name: "Tag Text",
          content: t,
          fontFamily: "JetBrains Mono",
          fontSize: 11,
          fontWeight: "500",
          fill: softGreen
        });
      }
    }

    // Bento Row 2
    const bentoRow2 = Insert("bi8Au", {
      type: "frame",
      name: "Bento Row 2",
      width: 1240,
      layout: "horizontal",
      gap: 24
    });

    const bentoItems2 = [
      {
        badge: "03 // PERFORMANCE",
        title: "Engenharia de Build com Rsbuild / Rspack",
        desc: "Otimização de tempo de compilação, hot-reload instantâneo e redução drástica do ciclo de feedback do desenvolvedor.",
        width: 476,
        descWidth: 412,
        tags: ["Rsbuild", "Rspack", "Rust Tooling", "DX"]
      },
      {
        badge: "04 // AGENT-READY",
        title: "Fullstack BFF & AI Agents Harness",
        desc: "Criação de BFFs resilientes com NestJS/Node e interfaces prontas para consumo de ferramentas de Inteligência Artificial via MCP.",
        width: 740,
        descWidth: 676,
        tags: ["Node.js", "NestJS", "GraphQL / REST", "MCP Protocol", "LLM Tooling"]
      }
    ];

    for (const b of bentoItems2) {
      const bCard = Insert(bentoRow2, {
        type: "frame",
        name: "Bento Card " + b.title,
        width: b.width,
        fill: bgCard,
        stroke: borderMatrix,
        strokeWidth: 1,
        cornerRadius: 12,
        padding: [32, 32, 32, 32],
        layout: "vertical",
        gap: 16
      });

      Insert(bCard, {
        type: "text",
        name: "Bento Tag",
        content: b.badge,
        fontFamily: "JetBrains Mono",
        fontSize: 12,
        fontWeight: "600",
        fill: neonGreen
      });

      Insert(bCard, {
        type: "text",
        name: "Bento Title",
        content: b.title,
        fontFamily: "Inter",
        fontSize: 24,
        fontWeight: "700",
        fill: textBright
      });

      Insert(bCard, {
        type: "text",
        name: "Bento Desc",
        content: b.desc,
        fontFamily: "Inter",
        fontSize: 15,
        fontWeight: "400",
        fill: textMuted,
        width: b.descWidth
      });

      const bTags = Insert(bCard, {
        type: "frame",
        name: "Bento Tags",
        layout: "horizontal",
        gap: 8
      });

      for (const t of b.tags) {
        const tf = Insert(bTags, {
          type: "frame",
          name: "Tag",
          fill: bgCardSubtle,
          stroke: borderMatrix,
          strokeWidth: 1,
          cornerRadius: 4,
          padding: [6, 10, 6, 10]
        });
        Insert(tf, {
          type: "text",
          name: "Tag Text",
          content: t,
          fontFamily: "JetBrains Mono",
          fontSize: 11,
          fontWeight: "500",
          fill: softGreen
        });
      }
    }

    // -------------------------------------------------------------
    // SECTION 04: TRAJETÓRIA CORPORATIVA
    // -------------------------------------------------------------
    const expHeader = Insert("bi8Au", {
      type: "frame",
      name: "Experience Header",
      width: 1240,
      layout: "vertical",
      gap: 10
    });

    Insert(expHeader, {
      type: "text",
      name: "Section Tag",
      content: "< 04 / HISTÓRICO & TRAJETÓRIA >",
      fontFamily: "JetBrains Mono",
      fontSize: 13,
      fontWeight: "600",
      fill: neonGreen
    });

    Insert(expHeader, {
      type: "text",
      name: "Section Title",
      content: "Trajetória em Grandes Players do Mercado",
      fontFamily: "Inter",
      fontSize: 34,
      fontWeight: "800",
      fill: textBright
    });

    const expList = Insert("bi8Au", {
      type: "frame",
      name: "Experience List",
      width: 1240,
      layout: "vertical",
      gap: 16
    });

    const exps = [
      {
        company: "Mirae Asset Wealth Management (Brazil)",
        role: "Senior Frontend Engineer // Architecture",
        period: "[ 2022 - ATUAL ]",
        highlight: "Wealth Management & Microfrontends",
        bullets: [
          "Liderança na arquitetura de Microfrontends com Module Federation para o portal de investimentos.",
          "Migração estratégica de tooling legado (Webpack) para Rsbuild/Rspack com ganhos massivos de DX.",
          "Criação de BFFs em Node.js/Nest.js para agregação segura de dados de mercado."
        ]
      },
      {
        company: "modalmais // Home Broker",
        role: "Frontend Specialist",
        period: "[ 2020 - 2022 ]",
        highlight: "Plataforma de Trading & Streaming",
        bullets: [
          "Desenvolvimento e sustentação do Home Broker institucional com WebSockets em tempo real.",
          "Garantia de 60 FPS no book de ofertas e boletas de negociação de alta frequência."
        ]
      },
      {
        company: "Zup Innovation",
        role: "Senior Software Engineer",
        period: "[ 2019 - 2020 ]",
        highlight: "Consultoria & Plataformas Digitais",
        bullets: [
          "Atuação em clientes enterprise construindo soluções em React, TypeScript e arquitetura de microsserviços."
        ]
      },
      {
        company: "Accenture",
        role: "Software Engineer",
        period: "[ 2017 - 2019 ]",
        highlight: "Transformação Digital Corporativa",
        bullets: [
          "Entrega de projetos de grande porte para bancos e seguradoras com foco em escalabilidade e qualidade."
        ]
      }
    ];

    for (const exp of exps) {
      const eCard = Insert(expList, {
        type: "frame",
        name: "Exp " + exp.company,
        width: 1240,
        fill: bgCard,
        stroke: borderMatrix,
        strokeWidth: 1,
        cornerRadius: 12,
        padding: [24, 32, 24, 32],
        layout: "vertical",
        gap: 12
      });

      const topRow = Insert(eCard, {
        type: "frame",
        name: "Top Row",
        layout: "horizontal",
        justifyContent: "space_between",
        alignItems: "center"
      });

      const compRole = Insert(topRow, {
        type: "frame",
        name: "Company & Role",
        layout: "horizontal",
        gap: 12,
        alignItems: "center"
      });

      Insert(compRole, {
        type: "text",
        name: "Company",
        content: exp.company,
        fontFamily: "Inter",
        fontSize: 20,
        fontWeight: "700",
        fill: textBright
      });

      const hBadge = Insert(compRole, {
        type: "frame",
        name: "Badge",
        fill: "#00ff4112",
        stroke: "#00ff4133",
        strokeWidth: 1,
        cornerRadius: 4,
        padding: [4, 8, 4, 8]
      });

      Insert(hBadge, {
        type: "text",
        name: "Badge Text",
        content: exp.highlight,
        fontFamily: "JetBrains Mono",
        fontSize: 11,
        fontWeight: "600",
        fill: neonGreen
      });

      Insert(topRow, {
        type: "text",
        name: "Period",
        content: exp.period,
        fontFamily: "JetBrains Mono",
        fontSize: 13,
        fontWeight: "500",
        fill: softGreen
      });

      Insert(eCard, {
        type: "text",
        name: "Role",
        content: exp.role,
        fontFamily: "JetBrains Mono",
        fontSize: 14,
        fontWeight: "600",
        fill: textMuted
      });

      const bFrame = Insert(eCard, {
        type: "frame",
        name: "Bullets Frame",
        layout: "vertical",
        gap: 6
      });

      for (const bullet of exp.bullets) {
        const bRow = Insert(bFrame, {
          type: "frame",
          name: "Bullet Row",
          layout: "horizontal",
          gap: 10,
          alignItems: "center"
        });

        Insert(bRow, {
          type: "text",
          name: "Dot",
          content: "❯",
          fontFamily: "JetBrains Mono",
          fontSize: 12,
          fontWeight: "700",
          fill: neonGreen
        });

        Insert(bRow, {
          type: "text",
          name: "Bullet Text",
          content: bullet,
          fontFamily: "Inter",
          fontSize: 14,
          fontWeight: "400",
          fill: textMuted,
          width: 1100
        });
      }
    }

    // -------------------------------------------------------------
    // SECTION 05: TECH STACK MATRIX
    // -------------------------------------------------------------
    const stackHeader = Insert("bi8Au", {
      type: "frame",
      name: "Stack Header",
      width: 1240,
      layout: "vertical",
      gap: 10
    });

    Insert(stackHeader, {
      type: "text",
      name: "Section Tag",
      content: "< 05 / MATRIZ DE COMPETÊNCIAS >",
      fontFamily: "JetBrains Mono",
      fontSize: 13,
      fontWeight: "600",
      fill: neonGreen
    });

    Insert(stackHeader, {
      type: "text",
      name: "Section Title",
      content: "Ecossistema Técnico Dominado",
      fontFamily: "Inter",
      fontSize: 34,
      fontWeight: "800",
      fill: textBright
    });

    const stackGrid = Insert("bi8Au", {
      type: "frame",
      name: "Stack Grid",
      width: 1240,
      layout: "horizontal",
      gap: 24
    });

    const categories = [
      {
        title: "Frontend Core",
        items: ["React.js", "TypeScript", "Vue.js (2 & 3)", "Next.js", "Tailwind CSS", "HTML5 / CSS3"]
      },
      {
        title: "Arquitetura & Build",
        items: ["Module Federation", "Rsbuild / Rspack", "Microfrontends", "Webpack", "Vite", "Design Systems"]
      },
      {
        title: "Backend & BFF",
        items: ["Node.js", "Nest.js", "REST APIs", "GraphQL", "BFF Architecture", "WebSockets"]
      },
      {
        title: "DevOps & AI",
        items: ["Docker", "Git / GitHub Actions", "MCP Protocol", "AI Agent Tooling", "PostgreSQL", "Jest / Cypress"]
      }
    ];

    for (const cat of categories) {
      const catCard = Insert(stackGrid, {
        type: "frame",
        name: "Cat " + cat.title,
        width: 292,
        fill: bgCard,
        stroke: borderMatrix,
        strokeWidth: 1,
        cornerRadius: 12,
        padding: [24, 24, 24, 24],
        layout: "vertical",
        gap: 16
      });

      Insert(catCard, {
        type: "text",
        name: "Cat Title",
        content: cat.title,
        fontFamily: "JetBrains Mono",
        fontSize: 15,
        fontWeight: "700",
        fill: neonGreen
      });

      const itemsFrame = Insert(catCard, {
        type: "frame",
        name: "Items Frame",
        layout: "vertical",
        gap: 8
      });

      for (const tech of cat.items) {
        const itemRow = Insert(itemsFrame, {
          type: "frame",
          name: "Tech Row",
          fill: bgCardSubtle,
          cornerRadius: 6,
          padding: [8, 12, 8, 12]
        });

        Insert(itemRow, {
          type: "text",
          name: "Tech Name",
          content: tech,
          fontFamily: "JetBrains Mono",
          fontSize: 13,
          fontWeight: "500",
          fill: textBright
        });
      }
    }

    // -------------------------------------------------------------
    // SECTION 06: FOOTER & TERMINAL CONTACT
    // -------------------------------------------------------------
    const footerCard = Insert("bi8Au", {
      type: "frame",
      name: "Footer & Contact",
      width: 1240,
      fill: "#040d06",
      stroke: "#00ff4140",
      strokeWidth: 1,
      cornerRadius: 16,
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
      name: "Foot Command",
      content: "rubens@architect:~$ ./connect --collaborate",
      fontFamily: "JetBrains Mono",
      fontSize: 14,
      fontWeight: "600",
      fill: softGreen
    });

    Insert(footLeft, {
      type: "text",
      name: "Foot Title",
      content: "Vamos construir a próxima geração da sua plataforma?",
      fontFamily: "Inter",
      fontSize: 28,
      fontWeight: "800",
      fill: textBright
    });

    Insert(footLeft, {
      type: "text",
      name: "Foot Sub",
      content: "Disponível para posições sênior/lead, consultoria técnica e projetos de alta complexidade.",
      fontFamily: "Inter",
      fontSize: 15,
      fontWeight: "400",
      fill: textMuted
    });

    const footRight = Insert(footerCard, {
      type: "frame",
      name: "Right Foot Contact",
      layout: "vertical",
      gap: 12,
      alignItems: "flex_end"
    });

    const emailBox = Insert(footRight, {
      type: "frame",
      name: "Email Box",
      fill: neonGreen,
      cornerRadius: 6,
      padding: [14, 24, 14, 24]
    });

    Insert(emailBox, {
      type: "text",
      name: "Email Text",
      content: "rubens.barbosa.dev@gmail.com",
      fontFamily: "JetBrains Mono",
      fontSize: 14,
      fontWeight: "700",
      fill: "#000000"
    });

    const linksRow = Insert(footRight, {
      type: "frame",
      name: "Links Row",
      layout: "horizontal",
      gap: 16
    });

    const links = ["GitHub ↗", "LinkedIn ↗", "WhatsApp ↗"];
    for (const lk of links) {
      Insert(linksRow, {
        type: "text",
        name: "Link Item",
        content: lk,
        fontFamily: "JetBrains Mono",
        fontSize: 13,
        fontWeight: "600",
        fill: softGreen
      });
    }

    // Export individual sections for crisp HD previewing
    Export([hero], "png", "${exportDir}", { scale: 2 });
    Export([projGrid], "png", "${exportDir}", { scale: 2 });
    Export([bentoRow1], "png", "${exportDir}", { scale: 2 });
    Export(["bi8Au"], "png", "${exportDir}", { scale: 1 });

    Print("SUCCESS: Matrix Portfolio built & exported with nodes: hero=" + hero + ", proj=" + projGrid);
  `;

  const res = await callPencil('execute', { input });
  console.log('RESULT:', JSON.stringify(res, null, 2));

  // Copy full preview and section previews
  const genFull = path.join(__dirname, 'export-out', 'bi8Au.png');
  const destFull = path.join(__dirname, 'portfolio-preview.png');
  if (fs.existsSync(genFull)) {
    fs.copyFileSync(genFull, destFull);
    console.log('portfolio-preview.png copiado!');
  }
}

cleanAndBuild().catch(console.error);
