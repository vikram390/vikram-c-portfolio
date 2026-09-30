# vikram-c-portfolio

Personal portfolio for Vikram C — final-year B.Tech IT student and AI/LLM intern.

Live: https://vikram-c-portfolio.netlify.app/

## Design

The page is laid out as a **trace**: a question posed at the top, then resolved step by
step (`s.00` … `s.06`) down a spine in the left gutter. Each project carries a system-flow
diagram rather than a screenshot, so the architecture is the thing on display.

Dark, single-theme. Instrument Serif for display, Inter for body, JetBrains Mono for the
technical marginalia.

## Stack

Plain HTML and CSS in a single `index.html`, with ~30 lines of vanilla JS for the scroll
spine, active nav link and the Coimbatore clock. No framework, no runtime dependencies.
Vite is used only to produce `dist/` for Netlify.

```bash
npm install
npm run dev      # local dev server
npm run build    # -> dist/
npm run preview  # serve the built output
```

## Layout

```
index.html                  the whole site
public/vikram.jpg           portrait
public/Vikram_C_Resume.pdf  résumé, linked from the header and footer
public/favicon.svg
netlify.toml                build command + publish dir
```

Anything in `public/` is copied to the root of `dist/`, so it is referenced as `/vikram.jpg`.

## Editing content

All copy lives directly in `index.html`, in the section matching its step — `#query`,
`#context`, `#evidence`, `#artifacts`, `#capabilities`, `#credentials`, `#contact`.

To replace the résumé, drop a new PDF at `public/Vikram_C_Resume.pdf` and keep the filename.

Skill chips in `#capabilities` use three states, set by class: `u` for used in shipped
work, no class for working knowledge, `l` for still learning.
