# Bahdah Shin — Portfolio

A responsive portfolio of [bahdahshin’s public GitHub repositories](https://github.com/bahdahshin). Original projects and forks live in separate tabs, with search, language filters, sorting, and direct repository links.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

Deploy `dist/` to any static host. Vite uses relative asset paths, so subdirectory hosting works too. No backend or visitor API credentials are needed.

## Repository data

`src/data/github.json` is a checked-in snapshot of all 35 public repositories, fetched September 12, 2026. Fork classification comes directly from GitHub’s `fork` field. Refresh metadata with `npm run sync`; it follows pagination and only writes after a successful fetch. Set `GITHUB_TOKEN` optionally if unauthenticated rate limits are exhausted.

`src/catalog.js` contains editorial descriptions based on available repository READMEs. Repositories without adequate documentation have neutral descriptions. Artwork is custom illustrative HTML/CSS/SVG, not screenshots of the applications. Forks are labeled and their linked websites are not presented as original work. Google Fonts is optional; system fonts provide a fallback.

## Verify

```sh
npm test
npx playwright install chromium
node scripts/check-browser.mjs
```

Run the dev server before the browser checks. Optionally set `BROWSER_CHANNEL=msedge` to use an installed Microsoft Edge, or `TEST_URL` to test another running preview. Browser checks target the initial 22-project / 13-fork snapshot; update those counts when refreshing the catalog.
