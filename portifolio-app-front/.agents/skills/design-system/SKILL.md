---
name: design-system
description: >-
  Design System tokens and component specifications for the Rubens Barbosa
  portfolio (Cyberpunk / Dark Navy theme). Extracted directly from the live
  Pencil UX wireframe (portifolio-ux/ux-portifolio.pen) using MCP introspection.
  Use this skill whenever creating, styling, or modifying any UI component
  in the portfolio application.
---

# Design System — Rubens Barbosa Portfolio

> **Theme identity:** Cyberpunk / Dark Navy / Code Terminal
> **Reference:** [rubenmarcus.dev](https://www.rubenmarcus.dev/) (visual structure & animations)

---

## 1. Color Palette

### 1.1 Core Semantic Tokens

These map to the Pencil `$variable` names used in the UX file:

| Pencil Variable     | CSS Token              | Hex / Value        | Usage                                       |
| -------------------- | ---------------------- | ------------------ | ------------------------------------------- |
| `$bg-dark`           | `--color-bg-dark`      | `#0a1628`          | Page background, hero bg, dark sections      |
| `$bg-section`        | `--color-bg-section`   | `#0d1b2e`          | Alternate section background (experience, projects, mobile menu) |
| `$bg-card`           | `--color-bg-card`      | `#112240`          | Card / panel backgrounds, buttons, dropdowns |
| `$cyan-glow`         | `--color-cyan-glow`    | `#00d4ff`          | **Primary accent** — logo bracket, stat values, company names, timeline dots, accent lines, icon color, link hovers |
| `$cyan-light`        | `--color-cyan-light`   | `#4dd9e8`          | Tag pill text, skill list bullet dots, tech highlights |
| `$cyan-muted`        | `--color-cyan-muted`   | `#1e6a8a`          | Secondary icons (e.g. folder), timeline gradient transition |
| `$red-accent`        | `--color-red-accent`   | `#e63946`          | **Secondary accent** — CTA button fill, section accent bars, corner decorators, divider, bracket markers `< />` |
| `$red-hover`         | `--color-red-hover`    | `#d62839`          | CTA button hover state                      |
| `$blue-primary`      | `--color-blue-primary` | `#1a3a5c`          | Card borders, divider lines, scratch lines, header/footer borders |
| `$blue-accent`       | `--color-blue-accent`  | `#2a5a8c`          | Timeline vertical connector lines             |
| `$text-primary`      | `--color-text-primary` | `#f0f4f8`          | Primary text — headings, names, role text, titles |
| `$text-secondary`    | `--color-text-secondary` | `#8899aa`        | Body text — nav links, descriptions, tech lists |
| `$text-muted`        | `--color-text-muted`   | `#4a5c6e`          | Dim text — periods, stat labels, code comments, copyright |

### 1.2 Derived & Alpha Variants (via modern CSS / Tailwind)

Instead of hardcoding raw hex with alpha, use Tailwind opacity modifiers (`/opacity`) or `color-mix`:

| Expression / Utility                   | Equivalent Hex/Alpha | Usage                                          |
| -------------------------------------- | -------------------- | ---------------------------------------------- |
| `border-blue-primary/50`               | `#1a3a5c80`          | Section border top, divider lines              |
| `border-blue-primary/60`               | `#1a3a5c99`          | Stats divider line                             |
| `bg-cyan-glow/10`                      | `#00d4ff1a`          | Social button hover background                 |
| `ring-cyan-glow/30`, `ring-cyan-glow/60` | `#00d4ff4d`, `#00d4ff99` | Timeline glowing dot rings              |
| `bg-bg-card/80`                        | `#112240cc`          | Quick action buttons over banners              |
| `bg-bg-dark/90`                        | `#0a1628e6`          | Sticky navbar blurred background               |
| `.radial-glow-cyan`                    | `#00d4ff33` -> fade  | Avatar radial glow center                      |

---

## 2. Typography

### 2.1 Font Families

| Pencil Variable   | CSS Token        | Resolved Family          | Role                                          |
| ----------------- | ---------------- | ------------------------ | --------------------------------------------- |
| `$font-heading`   | `--font-heading` | System sans-serif (bold) | Section titles, company names, hero name, logo, stat numbers |
| `$font-body`      | `--font-body`    | System sans-serif        | Body text — nav links, bio, role descriptions  |
| `$font-mono`      | `--font-mono`    | Monospace (e.g. JetBrains Mono) | Code elements — logo bracket, tech tags, periods, tech skill lists, code comments |

> **Implementation note:** For production, use `Inter` for heading/body and `JetBrains Mono` for mono. The Pencil file uses Pencil's built-in `$font-*` aliases.

### 2.2 Type Scale

| Element                    | Font Variable     | Size  | Weight   | Color Variable     |
| -------------------------- | ----------------- | ----- | -------- | ------------------ |
| Hero name (`RUBENS` / `BARBOSA`) | `$font-heading` | 72px | bold     | `$text-primary` / `$cyan-glow` |
| Section title              | `$font-heading`   | 28px  | bold     | `$text-primary`    |
| Hero subtitle / role       | `$font-heading`   | 20px  | normal   | `$text-primary`    |
| Stat number (10+, 500k+)   | `$font-heading`   | 26px  | bold     | `$cyan-glow`       |
| Logo text (`RUBENS.DEV`)   | `$font-heading`   | 16px  | bold     | `$text-primary`    |
| Logo bracket (`>`)         | `$font-mono`      | 20px  | bold     | `$cyan-glow`       |
| Greeting (`// Hello World`)| `$font-mono`      | 16px  | normal   | `$cyan-glow`       |
| Company name (timeline)    | `$font-heading`   | 16px  | bold     | `$cyan-glow`       |
| Bio description            | `$font-body`      | 15px  | normal   | `$text-secondary`  |
| Nav links                  | `$font-body`      | 14px  | normal   | `$text-secondary`  |
| Role text (timeline)       | `$font-body`      | 14px  | normal   | `$text-primary`    |
| Skill category label       | `$font-heading`   | 14px  | bold     | `$cyan-glow`       |
| CTA button text            | `$font-body`      | 13px  | bold     | `#ffffff`          |
| Social button label        | `$font-mono`      | 13px  | normal   | `$cyan-glow`       |
| Tech skill list item       | `$font-mono`      | 13px  | normal   | `$text-secondary`  |
| Period (timeline)          | `$font-mono`      | 12px  | normal   | `$text-muted`      |
| Tag pill text              | `$font-mono`      | 11px  | normal   | `$cyan-light`      |
| Stat label (Anos, MAU)     | `$font-body`      | 11px  | normal   | `$text-muted`      |
| Code comment               | `$font-mono`      | 11px  | normal   | `$text-muted`      |
| Title bracket (`<` `/>`    | `$font-mono`      | 14px  | normal   | `$red-accent`      |
| Hex code text              | `$font-mono`      | 10px  | normal   | `$text-muted`      |

---

## 3. Spacing & Layout

### 3.1 Container & Viewport

| Token               | Value    | Note                             |
| -------------------- | -------- | -------------------------------- |
| Page width           | `1440px` | Full viewport frame              |
| Hero section height  | `900px`  | Full hero including navbar       |
| Navbar height        | `64px`   | Fixed height                     |
| Hero content height  | `836px`  | `900 - 64`                       |

### 3.2 Spacing Scale (from `gap` values in the doc)

| Value  | Usage                                     |
| ------ | ----------------------------------------- |
| `2px`  | Stat number-to-label gap                  |
| `4px`  | Name block line gap                       |
| `6px`  | Misc tight spacing                        |
| `8px`  | Logo wrap gap, tech row gaps, tag gaps    |
| `10px` | Skill header icon-to-label gap            |
| `12px` | Section header gap, timeline card inner   |
| `16px` | Social links gap, skill card inner gap, avatar wrapper gap |
| `24px` | Hero content column gap, section padding, card padding, timeline row inner gap, skills grid gap |
| `32px` | Nav links gap                             |
| `40px` | Stats row gap, section-to-content gap     |
| `64px` | Section vertical padding                  |

### 3.3 Padding Patterns

| Context                  | Padding (Y, X) or (top, right, bottom, left) |
| ------------------------ | --------------------------------------------- |
| Navbar                   | `16px 48px`                                   |
| Hero content             | `40px 80px 80px 80px`                         |
| Sections (Exp, Skills, Proj) | `64px 80px`                               |
| Timeline card (info)     | `24px` (all sides)                            |
| Timeline row             | `24px 0`                                      |
| Skill category card      | `24px` (all sides)                            |
| CTA button               | `8px 20px`                                    |
| Social button            | `10px 20px`                                   |
| Tag pill                 | `4px 10px`                                    |

---

## 4. Border Radius

| Value   | Usage                               |
| ------- | ----------------------------------- |
| `3px`   | Tag pills, bullet dots              |
| `4px`   | CTA button, social buttons          |
| `6px`   | Timeline experience cards           |
| `8px`   | Skill category cards, project cards |

---

## 5. Borders & Strokes

| Pattern                    | Border                                |
| -------------------------- | ------------------------------------- |
| Experience card            | `1px solid var(--blue-primary)`       |
| Skill category card        | `1px solid var(--blue-primary)`       |
| Social button              | `1px solid var(--cyan-glow)`          |
| Avatar outer ring          | `2px solid var(--cyan-glow)` (ellipse)|
| Avatar inner ring          | `1px solid var(--red-accent)` (ellipse)|
| Top accent line (under nav)| `2px solid var(--cyan-glow)` (full-width) |
| Side accent (left edge)    | `4px` gradient `var(--red-accent)` → transparent |
| Title divider              | `3px × 120px` solid `var(--red-accent)` |
| Divider line (in cards)    | `1px` solid `var(--blue-primary)` (full-width) |
| Section accent bar         | `4px × 32px` solid `var(--red-accent)` |

---

## 6. Component Patterns

### 6.1 Section Header Pattern
Every content section uses a red accent bar + bold title:
```
|  ← 4px × 32px red-accent bar
SECTION TITLE TEXT  ← font-heading 28px bold text-primary
```

### 6.2 Hero Section (Split Layout)
```
┌──────────────────────────────────────────────────────────────────┐
│  > RUBENS.DEV                Nav Links           [DOWNLOAD CV]  │  ← Navbar
│──────────────────── 2px cyan-glow line ─────────────────────────│
│                                                                  │
│  // Hello World                        ┌──────────────────┐     │
│  RUBENS                                │   ╭──────────╮   │     │
│  BARBOSA                               │   │  Avatar  │   │     │
│  ──── (red divider)                    │   ╰──────────╯   │     │
│  < SENIOR FRONT-END DEVELOPER />       │  ┌─ ─┐    ┌─ ─┐ │     │
│  Bio text description...               └──────────────────┘     │
│  [GitHub] [LinkedIn]                                             │
│  10+  500k+  15+  <1.2s                                        │
│                                                                  │
│  // building the future, one component at a time                │
└──────────────────────────────────────────────────────────────────┘
```
- Left column: `700px` width, vertical layout, `gap: 24px`
- Right column: centered avatar wrapper `380×380px`
- Decorative scratches: 30 rotated `1px` lines with `#1a3a5c22` fill
- Hex pattern: grid of `30×30` ellipses with `#e6394620` and `#00d4ff15` fills
- Bottom gradient: linear `#0a162800 → #0d1b2e` (100px tall fade)

### 6.3 Avatar Wrapper
```
┌── Corner TL (red) ──────────────────────────────┐
│  ╭─── Glow (radial #00d4ff33 → transparent) ──╮ │
│  │  ○ Outer Ring (2px cyan-glow stroke)        │ │
│  │  ○ Inner Ring (1px red-accent stroke)       │ │
│  │  ○ Photo (292×292, image fill)              │ │
│  ╰─────────────────────────────────────────────╯ │
└────────────────────────────── Corner BR (red) ───┘
```
Wrapper: `380×380` — contains concentric ellipses + red corner decorators (L-shaped, 20×2 + 2×20).

### 6.4 Experience Timeline Card
```
┌─ ● ── Timeline Dot (12px, cyan-glow fill, bg-section stroke)
│  │
│  ┌───────────────────────────────────────────────────┐
│  │  Company Name              2023 — Presente        │  ← cyan-glow / text-muted
│  │  Senior Front-end Developer                       │  ← text-primary
│  │  [React] [TypeScript] [Microfrontends] [...]      │  ← #1a3a5c bg, cyan-light text
│  └───────────────────────────────────────────────────┘  ← bg-card, 6px radius, blue-primary border
│  │  (80px blue-accent connector line)
│  │
```

### 6.5 Skill Category Card
```
┌─────────────────────────────────┐  border: blue-primary
│  🔴 FRONT-END                   │  icon(red-accent) + label(cyan-glow, font-heading 14px bold)
│  ──────── divider ──────────    │  1px blue-primary
│  ▪ React                        │  ← 6×6 cyan-light dot + font-mono 13px text-secondary
│  ▪ TypeScript                   │
│  ▪ Next.js                      │
│  ▪ Vue.js                       │
│  ▪ Tailwind CSS                 │
│  ...                            │
└─────────────────────────────────┘  bg: bg-card, radius: 8px, padding: 24px
```
Grid: `fill_container` width, `gap: 24px` between category cards.
Categories: Front-end, Back-end, Architecture, DevOps/Cloud.
Icons: Lucide library (`code`, `server`, `layers`, `cloud`).

### 6.6 Project Card (from Projects Section)
```
┌─────────────────────────────────┐  border: blue-primary
│  [Preview Image Area]           │
│  Project Title                  │  font-heading, bold, text-primary
│  Description...                 │  font-body, text-secondary
│  [Tag] [Tag] [Tag]              │  #1a3a5c bg, cyan-light text
└─────────────────────────────────┘  bg: bg-card, radius: 8px
```
Grid: `fill_container`, `gap: 24px`.

### 6.7 Stats Row (Hero bottom)
```
  10+        500k+       15+        < 1.2s
  Anos       MAU         MFEs       LCP
```
Horizontal layout, `gap: 40px`, each stat is vertical `gap: 2px`.
Number: `font-heading 26px bold cyan-glow`.
Label: `font-body 11px normal text-muted`.

### 6.8 Button Variants

| Variant        | Fill           | Border                     | Text Color   | Radius | Padding    |
| -------------- | -------------- | -------------------------- | ------------ | ------ | ---------- |
| CTA (Download) | `$red-accent`  | none                       | `#ffffff`    | 4px    | `8px 20px` |
| Social         | `$bg-card`     | `1px solid $cyan-glow`     | `$cyan-glow` | 4px    | `10px 20px`|

### 6.9 Tag Pill
| Fill       | Border | Text Color    | Radius | Padding    | Font              |
| ---------- | ------ | ------------- | ------ | ---------- | ----------------- |
| `#1a3a5c`  | none   | `$cyan-light` | 3px    | `4px 10px` | `$font-mono` 11px |

---

## 7. Effects & Animations

### 7.1 Decorative Scratch Lines (Hero)
30 vertical lines (`width: 1px`) with random rotation (2–5°), random heights (500–780px), fill `#1a3a5c22`. Spaced every 22px from x=800 to x=1438. Creates a subtle "digital rain" / scanline effect on the right side of the hero.

### 7.2 Hex Pattern (Hero bottom-left)
Grid of `30×30` ellipses alternating between `#e6394620` (red) and `#00d4ff15` (cyan) fills. 3 rows × 5 columns, offset per row (honeycomb pattern). Position: `x:50, y:700`.

### 7.3 Avatar Radial Glow
Radial gradient on a `350×350` ellipse: center `#00d4ff33` → edge `#0a162800`. Creates a soft cyan halo behind the avatar.

### 7.4 Side Accent Gradient (Left Edge)
`4px × 900px` rectangle with linear gradient (180°): `$red-accent` → `#e6394600` (transparent). Runs the full height of the hero on the left edge.

### 7.5 Bottom Section Fade
`1440 × 100px` rectangle at `y:800` with linear gradient (180°): `#0a162800` → `#0d1b2e`. Transitions between hero and next section.

### 7.6 Corner Decorators (Avatar)
L-shaped red marks at top-left and bottom-right of the avatar wrapper. Each corner = 2 rectangles: horizontal (20×2) + vertical (2×20) in `$red-accent`.

### 7.7 Suggested Interactive Animations (for implementation)

```css
/* Card hover */
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.08), 0 0 40px rgba(0, 212, 255, 0.04);
  border-color: var(--cyan-glow);
}

/* Nav link hover */
.nav-link {
  transition: color 0.2s ease;
}
.nav-link:hover {
  color: var(--cyan-glow);
}

/* Timeline dot pulse */
@keyframes dot-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(0, 212, 255, 0.4); }
  50% { box-shadow: 0 0 0 6px rgba(0, 212, 255, 0); }
}

/* Fade-in on scroll */
.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-up.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stat counter animation (JS) */
/* Count up from 0 on viewport entry using IntersectionObserver */

/* Scratch lines subtle animation */
@keyframes scratch-flicker {
  0%, 100% { opacity: 0.13; }
  50% { opacity: 0.08; }
}

/* Noise texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,..."); /* feTurbulence SVG */
}
```

---

## 8. Tailwind CSS v4 Configuration

Since this project uses **Tailwind CSS v4** (CSS-first config via `@theme`), add the following to `globals.css`:

```css
@import "tailwindcss";

:root {
  --background: var(--color-bg-dark);
  --foreground: var(--color-text-primary);
}

@theme {
  --font-orbitron: var(--font-orbitron), sans-serif;
  --font-mono: var(--font-jetbrains-mono), monospace;
  --font-sans: var(--font-inter), sans-serif;

  /* ── Colors: Background ── */
  --color-bg-dark: #0a1628;
  --color-bg-section: #0d1b2e;
  --color-bg-card: #112240;

  /* ── Colors: Accent ── */
  --color-cyan-glow: #00d4ff;
  --color-cyan-light: #4dd9e8;
  --color-cyan-muted: #1e6a8a;
  --color-red-accent: #e63946;
  --color-red-hover: #d62839;

  /* ── Colors: Structural / Border ── */
  --color-blue-primary: #1a3a5c;
  --color-blue-accent: #2a5a8c;

  /* ── Colors: Text ── */
  --color-text-primary: #f0f4f8;
  --color-text-secondary: #8899aa;
  --color-text-muted: #4a5c6e;
}
```

> **CRITICAL RULE FOR ALL AGENTS:**  
> **DO NOT** hardcode raw hex values in JSX classes (e.g. `bg-[#0a1628]`, `text-[#00d4ff]`, `border-[#1a3a5c]`). Always use the corresponding theme token class!

### Usage Examples (Tailwind classes):

```html
<!-- Main Page / Section Background -->
<main class="bg-bg-dark">
<section class="bg-bg-section border-t border-blue-primary/50">

<!-- Card -->
<div class="bg-bg-card border border-blue-primary rounded-lg p-6 flex flex-col hover:border-cyan-glow/60">

<!-- Section title with red bar -->
<div class="flex items-center gap-3">
  <div class="w-1 h-8 bg-red-accent rounded-sm" />
  <h2 class="font-orbitron text-2xl font-bold text-text-primary">TITULO</h2>
</div>

<!-- Primary accent text / Brand -->
<span class="font-mono text-cyan-glow">// Hello World</span>
<h1 class="font-orbitron text-cyan-glow">BARBOSA</h1>

<!-- CTA button with hover token -->
<button class="bg-red-accent hover:bg-red-hover text-white font-sans text-[13px] font-bold px-5 py-2 rounded">
  DOWNLOAD CV
</button>

<!-- Tag pill -->
<span class="bg-blue-primary text-cyan-light font-mono text-[11px] px-2.5 py-1 rounded hover:bg-cyan-glow/20">
  React
</span>

<!-- Social button -->
<a class="bg-bg-card border border-cyan-glow text-cyan-glow hover:bg-cyan-glow/10 px-5 py-2.5 rounded font-mono text-xs">
  GitHub
</a>

<!-- Linear Gradient (e.g. Card Banner) -->
<div class="bg-gradient-to-br from-blue-primary to-bg-dark">

<!-- Avatar Radial Glow (Custom utility in globals.css) -->
<div class="radial-glow-cyan animate-pulse-glow" />
```

---

## 9. Page Sections (Top to Bottom)

1. **Navbar** — Logo (`> RUBENS.DEV`), nav links, CTA button — `64px` height
2. **Hero Section** — Split layout: left (greeting, name, title, bio, social, stats) + right (avatar with glow & decorators) — `900px` total
3. **Experience Section** — Timeline with vertical dot connectors, experience cards — `$bg-section` background
4. **Skills Section** — Category cards grid (Front-end, Back-end, Architecture, DevOps/Cloud) — `$bg-dark` background
5. **Projects Section** — Project cards grid — `$bg-section` background

---

## 10. Responsive Strategy

| Breakpoint     | Behavior                                                    |
| -------------- | ----------------------------------------------------------- |
| `≥1440px`      | Full layout as designed                                     |
| `1024–1439px`  | Slightly narrower, hero columns may compress               |
| `768–1023px`   | Hero → single column (avatar above text), cards stack       |
| `<768px`       | Single column everything, hamburger nav, reduced font sizes |

---

## 11. Icon Library

The UX uses **Lucide** icons:

| Icon Name  | Usage                       |
| ---------- | --------------------------- |
| `github`   | GitHub social button        |
| `linkedin` | LinkedIn social button      |
| `code`     | Front-end skill category    |
| `server`   | Back-end skill category     |
| `layers`   | Architecture category       |
| `cloud`    | DevOps/Cloud category       |

---

## 12. Key Design Patterns

| Pattern               | Description                                           |
| --------------------- | ----------------------------------------------------- |
| Red accent bars       | `4px × 32px` vertical bars before section titles      |
| Title divider         | `120px × 3px` red line below hero name                |
| JSX bracket notation  | `< TITLE />` using `$font-mono` for technical feel    |
| Code comments         | `// text` in mono font for conversational dev tone     |
| Concentric circles    | Avatar with glow → outer ring → inner ring → photo    |
| Corner decorators     | L-shaped red marks framing the avatar                 |
| Digital scratches     | Semi-transparent rotated lines for cyberpunk texture   |
| Hex dot pattern       | Honeycomb grid of colored dots as decorative element   |
| Two-tone dark         | Alternating `$bg-dark` / `$bg-section` between sections |
