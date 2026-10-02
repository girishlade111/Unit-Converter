# Unit Converter

A free, fast, client-side unit converter that runs entirely in your browser — no sign-up, no server, no tracking. Convert between length, weight, temperature, area, volume, speed, time, pressure, energy, and more, with a clean interface and dark/light mode.

**Live:** https://girishlade111.github.io/Unit-Converter/

## Features

- **Multi-category conversions** — Length, mass/weight, temperature, area, volume, speed, time, pressure, energy, data, and more (definitions in `data/units.json`).
- **100% client-side** — All math runs locally in JavaScript; works offline once loaded.
- **Dark / light mode** — Theme toggle with preference persisted in localStorage.
- **Conversion history** — Recent conversions saved locally via the storage utility.
- **Single-file build included** — `Single HTML File.html` is a fully self-contained version (inline CSS/JS) you can open or share anywhere.
- **Zero dependencies** — Plain HTML, CSS, and vanilla JS. No build step, no framework.

## Tech stack

- HTML5, CSS3 (custom, with dark-mode theme)
- Vanilla JavaScript (ES modules)
- JSON data file for unit definitions

## Quick start

```bash
git clone https://github.com/girishlade111/Unit-Converter.git
cd Unit-Converter
# Open index.html in a browser, or serve it:
npx serve .
```

> Note: opening via `file://` may block the `fetch('data/units.json')` call in some browsers — use a local server (above) for full functionality. `Single HTML File.html` works from `file://` directly.

## Project structure

```
index.html              # Entry point (references css/, js/, data/)
css/
  main.css              # Main styles
  dark-mode.css         # Dark theme overrides
js/
  main.js               # App bootstrap + UI wiring
  converters/
    UnitConverter.js    # Conversion engine (incl. special-cased temperature)
  utils/
    storage.js          # localStorage helpers (theme, history)
data/
  units.json            # Unit categories, factors, and labels
Single HTML File.html   # Self-contained single-file build
User Guide              # Usage notes
Key Features Implemented.csv
Project Structure.sh
```

## Deploy notes

Static site — deployed via **GitHub Pages** from the repo root. Any static host (Cloudflare Pages, Netlify, Vercel) works: upload the repo as-is, no build command needed.

## License

MIT — see [LICENSE](./LICENSE).

---

Built by Girish Lade — https://ladestack.in
