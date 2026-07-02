# Hive·Words

> A honeycomb word game — spell words from 7 letters, one shared center, chase the highest score.

Built as a front-end showcase with **React 19**, **TypeScript**, **Vite** and **Tailwind CSS v4**. Runs entirely in the browser — no backend of its own; the only network call is a live lookup against the free [Dictionary API](https://dictionaryapi.dev/) to validate words. No image assets — every hexagon is CSS (`clip-path`), computed from exact regular-hexagon geometry.

**[▶ Play the live demo](https://hive-words.vercel.app/)** · [Source on GitHub](http://github.com/Avery-techdev/hive-words)

---

## Highlights

- **Single source of truth** — score, valid-word count and completion state are all derived from one list of attempts, never stored redundantly. No `useEffect` synchronizes state that could be computed directly.
- **Real dictionary validation** — every confirmed word is checked against a live dictionary API, with distinct feedback for invalid, duplicate, too-short and network-error cases (not just a flat "wrong").
- **Exact hexagon geometry** — tiles are regular flat-top hexagons sized by the precise `width : height = 2 : √3` ratio and placed at the matching center-to-neighbor radius, computed in code (not eyeballed), so they tessellate edge-to-edge with zero gaps at every breakpoint.
- **Accessible by default** — focus-trapped dialogs with focus return on close, `aria-live` feedback regions, full keyboard operability, and `prefers-reduced-motion` support throughout.
- **Responsive & mobile-first** — the board is edge-to-edge full-bleed on mobile and becomes a centered, elevated card from `sm` upward; the hexagon grid itself scales across three viewport tiers.
- **Strict TypeScript** — no `any`, explicit return types, discriminated result types for word validation (`valid` / `invalid` / `error`) instead of a single boolean.

## How to play

- Click or tap the letters to spell an English word (minimum 3 letters).
- Confirm to check it against the dictionary.
- Delete removes the last letter, Shuffle reorders all 7 letters.
- Find at least 2 valid words, then submit your solution.
- Find every possible word in a set to trigger the "all words found" screen.

## Tech stack

| Area        | Choice                                        |
| ----------- | --------------------------------------------- |
| UI          | React 19                                      |
| Language    | TypeScript (strict, `verbatimModuleSyntax`)   |
| Build       | Vite                                          |
| Styling     | Tailwind CSS v4 (design tokens, no `any` CSS) |
| Font        | Inter (Google Fonts)                          |
| Data        | Hardcoded letter sets + live dictionary API   |
| Persistence | `localStorage` (help-overlay dismissal)       |
| Quality     | ESLint (flat, type-checked) + Prettier        |

## Architecture

Feature-based structure with a strict **UI → Hooks → Services** layering. The feature exposes a single public API (`index.ts`); internal files stay private.

```
src/
├── App.tsx                 # app shell, background, layout chrome
├── index.css                # Tailwind entry + design tokens
└── features/game/
    ├── components/          # presentational only (props in, callbacks out)
    ├── hooks/                # useWordGame (state + derived values), useDialogFocus
    ├── services/             # dictionaryService (API), helpOverlayPreference (localStorage)
    ├── data/                 # curated letter sets
    ├── types/                # domain types
    ├── constants.ts
    └── index.ts              # public API
```

- **Container / presentational split:** `GameBoard` owns state via `useWordGame`; every other component (`HexagonGrid`, `WordInput`, `WordList`, `GameStats`, `GameControls`, overlays) is presentational and receives data through props.
- **Pure derivation:** `validWords`, `totalScore`, `isAllWordsFound` and `phase` are all computed from the raw attempt history on every render — never their own `useState`.
- **Services stay dumb:** `dictionaryService` only fetches and classifies a result; it has no knowledge of game state. `useWordGame` decides what a result means for the round.

## Getting started

Requires Node 20+.

```bash
npm install      # install dependencies
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
npm run lint     # ESLint
npm run format   # Prettier write
```

---

Built by **Avery Hauschild**
