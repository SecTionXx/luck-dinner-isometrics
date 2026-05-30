# Rising Dinner Lab

Thai editorial web app that turns an ascendant sign into a practical evening routine:
what to eat, what low-movement isometric exercise to do, and how to turn the result
into a shareable card.

Live site: https://luck-dinner-isometrics.vercel.app

GitHub repo: https://github.com/SecTionXx/luck-dinner-isometrics

## What It Does

Rising Dinner Lab combines three content tracks:

- Ascendant horoscope as entertainment and mood selection
- Dinner decision support using the Thai 2:1:1 healthy plate idea
- Isometric exercise guidance for short, low-movement evening routines

Important: astrology content is used as entertainment and a mood prompt only. Food
and exercise content is general information, not medical or nutrition advice.

## Feature Roadmap Implemented

### Phase 1: Useful Tool Surface

- Daily Evening Generator: random evening routine by ascendant
- Meal filters: budget, no-kitchen, vegetarian, high-protein, light meal
- Isometric timer: 15, 20, and 30 second hold timer with pause/reset
- Mobile navigation and responsive layout

### Phase 2: Growth And SEO

- Share Card Generator: creates a downloadable PNG for the selected ascendant
- Native Web Share fallback where supported
- SEO/article hub for all 12 ascendants
- Static article pages under `public/articles/*.html`

Example article:

```text
/articles/virgo.html
```

### Phase 3: Assistant Prototype

- Fridge Coach: local rule-based meal assistant
- Accepts typed pantry/fridge ingredients
- Accepts image file selection as a prompt input placeholder
- Suggests a 2:1:1-style dinner plan without requiring API keys
- Does not upload user input or images

## Tech Stack

- React 19
- Vite 7
- Lucide React icons
- Plain CSS with custom design tokens
- Static HTML article generation script
- Vercel deployment

## Project Structure

```text
.
├── public/
│   ├── articles/          # 12 generated static SEO pages
│   └── images/            # Generated bitmap website assets
├── scripts/
│   └── generate-articles.mjs
├── src/
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── README.md
```

## Development

Install dependencies:

```bash
npm install
```

Generate static article pages:

```bash
npm run generate:articles
```

Run local development server:

```bash
npm run dev
```

Build production output:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run generate:articles` | Generate 12 static ascendant article pages |
| `npm run build` | Build production assets |
| `npm run preview` | Preview built site locally |

## Research Sources

- NASA Space Place: astrology claims are not scientific evidence.
- Astrodienst Astrowiki: ascendant definition as the eastern horizon/ecliptic intersection.
- Thai Heart Foundation / Bureau of Nutrition reference: 2:1:1 healthy plate.
- Mayo Clinic Health System: isometric exercise and breathing guidance.

## Generated Images

Five generated bitmap assets are stored in `public/images`:

- `hero-evening-ritual.png`
- `ascendant-wheel.png`
- `dinner-grid.png`
- `isometric-home.png`
- `research-board.png`

## Deployment

Production is deployed on Vercel:

```text
https://luck-dinner-isometrics.vercel.app
```

Deploy command:

```bash
vercel --prod --yes
```
