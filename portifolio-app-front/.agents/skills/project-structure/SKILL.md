---
name: project-structure
description: >-
  Diretrizes e convenções de arquitetura e estrutura de pastas para projetos React e Next.js.
  Define a organização de camadas globais (/api, /components, /contexts, /hooks, /helpers) e
  escopadas por página (/pages e colocation no app router do Next.js), orientando a criação
  e organização de arquivos e diretórios de forma escalável e consistente.
---

# Estrutura de Projeto — Convenções para React & Next.js

Este documento estabelece o padrão arquitetural e a organização de diretórios para aplicações **React SPA (Vite / CRA)** e suas respectivas adaptações para **Next.js (App Router e Pages Router)**.

---

## 1. Princípios Arquiteturais Fundamentais

1. **Separação Global vs. Local (Escopado):**
   - **Global (`/components`, `/hooks`, `/contexts`, `/helpers`, `/api`):** Recursos compartilhados por múltiplas páginas, domínios ou fluxos da aplicação.
   - **Local / Escopado (dentro de cada página/rota):** Recursos que pertencem exclusivamente a uma tela ou funcionalidade não devem poluir as pastas globais; eles vivem isolados dentro da própria página.

2. **Camada de API Modular por Domínio:**
   - Em vez de arquivos monolíticos, cada API ou microsserviço possui sua própria pasta contendo `paths.ts`, `queries.ts`, `types.ts` e arquivos auxiliares específicos.

3. **Progressão Orgânica de Complexidade (*Flat to Folder*):**
   - Um componente, hook ou contexto começa como um arquivo único (ex: `Button.tsx`, `useDebounce.ts`).
   - Quando o recurso necessita de tipos separados, subcomponentes ou arquivos auxiliares, ele é promovido para uma pasta com seu `index.ts(x)`.

4. **Centralização Consciente de Helpers:**
   - Funções utilitárias puras e gerais ficam centralizadas em `helpers/index.ts`.
   - Se um helper crescer em complexidade ou tiver dependências externas pesadas, ele ganha um arquivo dedicado em `/helpers` e é reexportado.

---

## 2. Padrão em React SPA (Vite / CRA / sem Next)

### 2.1 Visão Geral da Árvore de Diretórios

```text
src/
├── api/                                # Camada de integração com serviços/APIs
│   └── {nome-da-api}/                  # Domínio específico (ex: users, billing, auth)
│       ├── paths.ts                    # Endpoints e URLs constantes da API
│       ├── queries.ts                  # Funções de requisição / React Query / fetchers
│       ├── types.ts                    # Tipagens de request/response e DTOs
│       └── helpers.ts                  # (Opcional) Tratamento/parsers específicos dessa API
│
├── components/                         # Componentes reutilizáveis em toda a aplicação
│   ├── Button/
│   │   ├── index.tsx
│   │   └── types.ts
│   ├── Modal.tsx
│   └── Header.tsx
│
├── contexts/                           # Contextos globais (estado compartilhado entre telas)
│   ├── AuthContext/                    # Contexto fragmentado em múltiplos arquivos
│   │   ├── index.tsx
│   │   ├── types.ts
│   │   └── reducer.ts
│   └── ThemeContext.tsx                # Contexto simples em arquivo único
│
├── hooks/                              # Hooks customizados de uso global
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── useClipboard/                   # Hook fragmentado se houver necessidade
│       ├── index.ts
│       └── types.ts
│
├── helpers/                            # Funções auxiliares gerais e utilitários puros
│   ├── index.ts                        # Centralização das funções mais comuns
│   └── formatters.ts                   # Helpers complexos separados do index
│
└── pages/                              # Páginas da aplicação
    ├── Home.tsx                        # Página simples (arquivo único)
    └── {NomeDaPagina}/                 # Página rica / modular
        ├── index.tsx                   # View principal e orquestração da página
        ├── utils.ts                    # Utilitários e cálculos específicos desta página
        ├── contexts/                   # Contextos escopados apenas para esta tela
        │   └── PageContext.tsx
        ├── hooks/                      # Hooks de lógica de negócio exclusivos da tela
        │   ├── useHook1.ts
        │   └── useHook2.ts
        └── components/                 # Componentes visuais exclusivos desta página
            ├── Component1.tsx
            └── Component2/             # Subcomponente fragmentado se necessário
                ├── index.tsx
                └── SomeSubComponent.tsx
```

---

### 2.2 Detalhamento de Cada Camada no React SPA

#### `/api`
Cada serviço ou domínio externo possui sua pasta dedicada:
- **`paths.ts`**: Centraliza os endpoints como constantes ou builders de URL.
  ```typescript
  export const USER_PATHS = {
    LIST: '/users',
    BY_ID: (id: string | number) => `/users/${id}`,
    UPDATE_ROLE: (id: string | number) => `/users/${id}/role`,
  } as const;
  ```
- **`queries.ts`**: Encapsula chamadas HTTP ou hooks de data-fetching (TanStack Query, SWR, Axios, Fetch).
  ```typescript
  import { USER_PATHS } from './paths';
  import type { User, UserFilters } from './types';

  export async function fetchUsers(filters?: UserFilters): Promise<User[]> {
    const response = await httpClient.get(USER_PATHS.LIST, { params: filters });
    return response.data;
  }
  ```
- **`types.ts`**: Define interfaces de payload, filtros e respostas esperadas da API.
- **`helpers.ts`** *(opcional)*: Normalizadores de dados, formatadores de payload ou interceptors específicos daquela API.

#### `/components`
- Componentes agnósticos a regras de negócio de uma página específica.
- Exemplos: `Button`, `Input`, `Card`, `Navbar`, `Table`, `Dropdown`.
- Podem ser arquivos únicos (`Button.tsx`) ou pastas caso possuam variantes, estilos dedicados ou subcomponentes (`Modal/index.tsx`, `Modal/Header.tsx`, `Modal/Footer.tsx`).

#### `/contexts`
- Estados globais que impactam toda a árvore de componentes (ex: autenticação, tema, notificações).
- **Regra de fragmentação:** Se o contexto tiver muitas actions, reducers ou interfaces, crie uma pasta:
  - `index.tsx`: Provider e hook consumidor (`useAuth`).
  - `types.ts`: Tipos do estado e do contexto.
  - `reducer.ts`: Lógica de transição de estado se utilizar `useReducer`.

#### `/hooks`
- Lógicas reutilizáveis desacopladas da UI (ex: `useWindowSize`, `useDebounce`, `useClickOutside`, `useToggle`).
- Se o hook necessitar de funções auxiliares internas ou tipos volumosos, use uma pasta com `index.ts`.

#### `/helpers`
- Funções puras utilitárias (ex: formatação de moeda, datas, validação de documentos, manipulação de arrays).
- O arquivo `index.ts` serve de porta de entrada e agrega as funções mais comuns.
- Caso haja um grupo de regras complexas (ex: regras tributárias, parser matemático), isola-se em um arquivo próprio (ex: `taxCalculation.ts`) e reexporta-se no `index.ts`.

#### `/pages`
- Telas acessadas por rotas.
- **Página Simples (`Home.tsx`):** Telas de conteúdo estático ou pouca interação que não justificam uma pasta própria.
- **Página Modular (`/{NomeDaPagina}/`):**
  - **`index.tsx`**: Ponto de entrada da rota. Orquestra a montagem dos componentes da página.
  - **`utils.ts`**: Cálculos, validadores e transformações que só têm sentido dentro desta página.
  - **`contexts/`**: Estado compartilhado apenas entre os componentes daquela tela (evita *prop drilling* interno sem sujar o `/contexts` global).
  - **`hooks/`**: Lógicas de negócio da página (ex: submissão de formulário, paginação da tabela da tela).
  - **`components/`**: Peças de UI exclusivas daquela tela. Se um subcomponente crescer, transforma-se em pasta (`Component2/index.tsx`, `SomeSubComponent.tsx`).

---

## 3. Adaptação para Next.js (App Router)

O **Next.js App Router (`app/`)** adota roteamento baseado no sistema de arquivos (*file-system routing*) e introduz o conceito de **React Server Components (RSC)**.

A filosofia do usuário de **separação global vs. escopado por página** casa perfeitamente com o conceito de **Colocation** nativo do Next.js!

### 3.1 Principais Diferenças e Adaptações

| Conceito | React SPA | Next.js App Router |
| :--- | :--- | :--- |
| **Ponto de Entrada da Rota** | `/pages/{Pagina}/index.tsx` | `app/{rota}/page.tsx` |
| **Layouts & Wrappers** | Manuais no router ou página | `app/{rota}/layout.tsx` |
| **Contextos Locais** | Em qualquer componente | Exigem a diretiva `'use client'` |
| **API do Projeto vs. API Externa** | Tudo em `/api` | APIs externas continuam em `/api` (ou `src/api`). APIs internas do Next.js usam `app/api/.../route.ts` |
| **Colocation de Recursos da Página** | Subpastas em `/pages/{Nome}/` | Subpastas em `app/{rota}/` usando prefixo `_` (pastas privadas) |

> [!IMPORTANT]
> **Prefixo `_` (Private Folders no Next.js):**
> No App Router, pastas iniciadas com `_` (ex: `_components`, `_hooks`, `_contexts`) são consideradas privadas pelo roteador do Next.js. Elas e suas subpastas são completamente ignoradas pelo sistema de rotas, garantindo que nenhum arquivo acidental vire uma URL pública.

---

### 3.2 Estrutura Recomendada para Next.js App Router

```text
src/ (ou raiz)
├── api/                                # Consumo de APIs Externas / Backend Services
│   └── {nome-da-api}/                  # (Mesma estrutura exata do React SPA!)
│       ├── paths.ts                    # Endpoints e URLs
│       ├── queries.ts                  # Fetchers / Server Actions / TanStack Query
│       ├── types.ts                    # DTOs e Interfaces
│       └── helpers.ts                  # Tratamentos específicos
│
├── components/                         # Componentes reutilizáveis globais (Server ou Client)
│   ├── Button/
│   │   ├── index.tsx
│   │   └── types.ts
│   ├── Navbar.tsx
│   └── Footer.tsx
│
├── contexts/                           # Contextos Globais (exigem 'use client')
│   ├── AuthContext/
│   │   ├── index.tsx                   # 'use client'
│   │   └── types.ts
│   └── ThemeContext.tsx                # 'use client'
│
├── hooks/                              # Hooks Globais (Client-side)
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│
├── helpers/                            # Funções utilitárias globais (isomórficas: rodam em Node e Browser)
│   ├── index.ts
│   └── formatters.ts
│
└── app/                                # Roteamento e Telas do Next.js
    ├── layout.tsx                      # Root layout (Html, Body, Providers globais)
    ├── page.tsx                        # Home da aplicação
    ├── globals.css                     # Estilos globais
    │
    ├── api/                            # (Opcional) Route Handlers / BFF interno do Next.js
    │   └── webhook/
    │       └── route.ts
    │
    └── {rota}/                         # Rota modular (ex: /dashboard, /users)
        ├── page.tsx                    # Equivalente ao index.tsx da página
        ├── layout.tsx                  # (Opcional) Layout específico da rota
        ├── loading.tsx                 # (Opcional) Skeleton / Suspense boundary
        ├── error.tsx                   # (Opcional) Error boundary ('use client')
        ├── utils.ts                    # Utilitários e cálculos específicos da rota
        │
        ├── _contexts/                  # Contextos específicos da rota ('use client')
        │   └── DashboardContext.tsx
        │
        ├── _hooks/                     # Hooks específicos da rota
        │   ├── useDashboardStats.ts
        │   └── useFilters.ts
        │
        └── _components/                # Componentes exclusivos da rota
            ├── StatCard.tsx
            └── ChartSection/           # Subcomponente fragmentado se necessário
                ├── index.tsx
                └── ChartTooltip.tsx
```

---

### 3.3 Regras de Convivência no Next.js (Server vs. Client Components)

1. **`page.tsx` como Server Component quando possível:**
   - O arquivo `page.tsx` pode buscar dados diretamente no servidor (usando chamadas de `queries.ts` com `fetch` nativo com cache).
   - Ele repassa esses dados para os componentes interativos dentro de `_components/`.

2. **Onde colocar `'use client'`:**
   - **`_contexts/`**: Todos os arquivos de contexto necessitam obrigatoriamente de `'use client'` no topo.
   - **`_hooks/`**: Hooks que utilizam `useState`, `useEffect`, `useContext` ou APIs do navegador (ex: `window`, `localStorage`).
   - **`_components/` interativos**: Componentes com `onClick`, inputs controlados, gráficos client-side, etc.

3. **Consumo de API no Next.js:**
   - **APIs Externas:** Mantenha na pasta raiz `/api/{dominio}` ou `src/api/{dominio}`. As funções em `queries.ts` podem ser consumidas tanto por Server Components quanto por Client Components.
   - **BFF / Rotas Internas:** Se o Next.js atuar como backend para webhooks ou proxy autenticado, utilize `app/api/{endpoint}/route.ts`.

---

## 4. Adaptação para Next.js (Pages Router — Legado)

Em projetos Next.js legados que ainda utilizam o diretório `pages/`, qualquer arquivo dentro de `pages/` (que não seja prefixado por `_`) é tratado automaticamente como uma rota pública pelo framework.

Para aplicar a estrutura modular sem que subpastas (`components`, `hooks`) gerem rotas indesejadas, adote uma das duas abordagens:

### Opção A: Padrão *Thin Route* + Camada `/views` ou `/modules` (Recomendada)
Deixe a pasta `pages/` apenas para declaração das rotas e delegue todo o conteúdo para uma pasta `views/` ou `modules/`:

```text
src/
├── api/
├── components/
├── contexts/
├── hooks/
├── helpers/
│
├── views/ (ou modules/)                # Aqui reside exatamente a estrutura padrão do usuário!
│   └── Dashboard/
│       ├── index.tsx                   # View da tela
│       ├── utils.ts
│       ├── contexts/
│       ├── hooks/
│       └── components/
│
└── pages/                              # Apenas mapeamento fino das rotas
    ├── _app.tsx
    ├── _document.tsx
    ├── index.tsx                       # Exporta view da Home
    └── dashboard.tsx                   # export { default } from '@/views/Dashboard';
```

### Opção B: Configuração de `pageExtensions` no `next.config.js`
Permite manter a colocalização dentro de `pages/`, exigindo sufixo `.page.tsx` nas rotas reais:

```javascript
// next.config.js
module.exports = {
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
};
```
Com essa configuração, apenas arquivos terminando em `.page.tsx` geram rotas. Assim, `pages/Dashboard/index.page.tsx` será a rota, e `pages/Dashboard/components/` será ignorado pelo roteador.

---

## 5. Guia Rápido de Decisão: Onde Colocar Meu Arquivo?

| Se o arquivo é... | No React SPA vai em... | No Next.js App Router vai em... |
| :--- | :--- | :--- |
| Endpoint ou rota de API externa | `/api/{servico}/paths.ts` | `src/api/{servico}/paths.ts` |
| Função de requisição / data fetching | `/api/{servico}/queries.ts` | `src/api/{servico}/queries.ts` |
| Componente usado em 2+ páginas | `/components/{Nome}` | `src/components/{Nome}` |
| Componente exclusivo de uma tela | `/pages/{Pagina}/components/` | `app/{rota}/_components/` |
| Subcomponente de um componente de página | `/pages/{Pagina}/components/{Comp}/` | `app/{rota}/_components/{Comp}/` |
| Estado global da aplicação | `/contexts/{NomeContext}` | `src/contexts/{NomeContext}` (`'use client'`) |
| Estado compartilhado só naquela tela | `/pages/{Pagina}/contexts/` | `app/{rota}/_contexts/` (`'use client'`) |
| Hook utilitário global | `/hooks/{useHook}.ts` | `src/hooks/{useHook}.ts` |
| Hook com regra de negócio da tela | `/pages/{Pagina}/hooks/` | `app/{rota}/_hooks/` |
| Função utilitária pura geral | `/helpers/index.ts` | `src/helpers/index.ts` |
| Função de cálculo exclusiva de uma tela | `/pages/{Pagina}/utils.ts` | `app/{rota}/_utils.ts` ou `utils.ts` |

---

## 6. Convenções de Nomenclatura e Arquivos

- **Componentes e Contexts:** `PascalCase` (ex: `Button.tsx`, `AuthContext.tsx`, `Header/index.tsx`).
- **Hooks:** `camelCase` com prefixo `use` (ex: `useDebounce.ts`, `useDashboardStats.ts`).
- **Helpers, Utils, Queries, Paths e Types:** `camelCase` ou `kebab-case` (ex: `formatters.ts`, `queries.ts`, `paths.ts`).
- **Diretórios de Página (React SPA):** `PascalCase` ou `kebab-case` padronizado no projeto (ex: `pages/UserProfile/` ou `pages/user-profile/`).
- **Diretórios de Rota (Next.js App Router):** `kebab-case` estrito conforme convenção de URLs da web (ex: `app/user-profile/page.tsx`, `app/billing-history/page.tsx`).
- **Pastas Privadas (Next.js App Router):** Sempre iniciadas com underscore `_` (ex: `_components`, `_hooks`, `_contexts`, `_utils`).
