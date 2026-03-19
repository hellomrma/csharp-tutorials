# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 14 (App Router) tutorial website for learning Unity and C# programming. Content is managed via Markdown files and served as a statically generated bilingual (Korean/English) site.

Live: https://csharp-tutorials.vercel.app

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build (SSG)
npm start        # Run production build locally
npm run lint     # ESLint check
```

There are no tests. If the dev server port conflicts: `lsof -ti:3000 | xargs kill -9`. To clear Next.js cache: delete `.next/` and restart.

## Architecture

### Content Pipeline

Markdown files in `content/docs/` are the source of truth. The pipeline:
1. `lib/markdown.ts` reads `.md` files via `fs`, parses frontmatter with `gray-matter`
2. Converts Markdown → HTML via `remark` → `remark-rehype` → `rehype-highlight` → `rehype-stringify`
3. Post-processes HTML: removes duplicate `<h1>`, converts Korean terms (e.g. "변수" → "변수(variable)") via `lib/terms.ts`
4. Results are cached in a module-level `MemoryCache` (`lib/cache.ts`): 5min TTL in dev, unlimited in production

### Bilingual (i18n) System

- Two locales: `ko` (default) and `en`
- **Locale is read server-side from a cookie** (`lib/cookies.ts`) — not from the URL
- Korean tutorials: `content/docs/XX-제목.md`
- English translations: `content/docs/XX-제목.en.md` (same base name + `.en.md`)
- Frontmatter fields for bilingual support: `title`/`titleEn`, `category`/`categoryEn`, `description`/`descriptionEn`, `slugEn`
- UI strings live in `lib/i18n.ts` (`translations.ko` and `translations.en`)
- `LanguageProvider.tsx` manages locale state client-side via React Context; `LanguageSwitcher.tsx` triggers cookie writes

### Routing

- Home: `/`
- Tutorial detail: `/tutorials/docs/[slug]` (catch-all `[...slug]`)
- Korean URL example: `/tutorials/docs/01-변수와-조건문-기초`
- English URL example: `/tutorials/docs/01-variables-and-conditionals` (uses `slugEn` frontmatter)
- All routes are statically generated via `generateStaticParams()` in `app/tutorials/[...slug]/page.tsx`

### Component Architecture

Server Components by default (App Router). Client components are explicitly marked with `'use client'`:
- `LanguageProvider`, `LanguageSwitcher`, `Header`, `MainPageContent`, `TagSidebar`, `TutorialPageContent` — all client components
- `Footer` — server component

### File Naming Conventions

- Tutorial files: `XX-제목.md` (XX = numeric order prefix like `01`, `02`)
- Components: PascalCase (`Header.tsx`)
- Utilities: camelCase (`markdown.ts`)

## Adding Content

Add a `.md` file to `content/docs/` — it will auto-appear on the home page, sorted by the numeric prefix. Required frontmatter:

```markdown
---
title: "제목"
titleEn: "English Title"
category: "기초"
categoryEn: "Basics"
order: 1
description: "설명"
descriptionEn: "English description"
slugEn: "01-english-slug"
---
```

For an English translation, create a companion file with the same base name + `.en.md`.

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://csharp-tutorials.vercel.app  # Used for SEO/sitemap
```

Google Analytics ID (`G-91EN6ZPDC2`) is hardcoded in `app/layout.tsx`.
