# CLAUDE.md — Kiosk Studio

This file tells Claude (and any other assistant or collaborator) how to work in this repository.
Read it fully before starting any task.

## The business

**Kiosk Studio** is a one-person studio that builds simple, affordable websites for very small
local businesses: florists, restaurants, cafés, barbershops, small shops. The typical client has
no website at all, or one that is broken or outdated.

- **Market:** starting in Europe.
- **Language:** the studio site and all client work are in **English**.
- **Owner:** not a professional developer. Explain what you do in plain language, avoid jargon,
  and say *why* a change matters, not only *what* changed.
- **Chat language:** the owner prefers to discuss questions and clarifications in
  **Portuguese**. Repository content (code, docs, commit messages, PRs) stays in English.

### The plan

1. Build the studio's own website (`site/`).
2. Build sample demo sites, one per business type (`demos/`).
3. Turn those demos into reusable templates (`templates/`).
4. Later, automate more of the day-to-day work with Claude.

### Audience

Non-technical, price-sensitive owners of small local businesses. They are busy, often read on
a phone, and are wary of being oversold. Write for them:

- Short sentences, plain words, no tech jargon ("website", not "web presence solution").
- Be concrete about what they get, what it costs and how long it takes.
- Pages must load fast on a cheap phone with a weak connection.
- Accessibility matters: readable text sizes, good contrast, real alt text, keyboard-friendly.

### Brand direction

- English copy.
- **Predominantly blue and gray.** Modern, calm, trustworthy. No loud colours, no gimmicks.
- Clean layouts with plenty of white space.
- Fonts: Source Serif 4 (headings) and Source Sans 3 (text), stored in `site/fonts/`
  (open licence). Never loaded from an outside service.
- Editorial look: thin rules and white space instead of boxes and cards; no gradients,
  no pill badges, no icon tiles.
- Detailed notes live in [`docs/brand.md`](docs/brand.md).

## Standing rules (always apply — never break these)

1. **Nothing is ever sent to a prospect or client without the owner's explicit approval.**
   Drafts are fine; sending, publishing to a client, or contacting anyone is not, until the
   owner says yes for that specific item.
2. **Never store personal data in this repository — it is public.** No names, emails, phone
   numbers, addresses or other details of prospects or clients. Use clearly fake placeholders
   (e.g. "Example Florist", `hello@example.com`, `+00 000 000 000`). Real client data lives
   outside this repo.
3. **Never invent testimonials, client names, statistics or guarantees.** If something isn't
   real and verified, it doesn't go on a page. Demos use obviously fictional businesses and must
   not contain fake reviews presented as real.
4. **No third-party trackers, analytics, or external font/script CDNs.** Everything a page needs
   (CSS, JS, fonts, images) is stored in this repo next to the page. No Google Fonts, no
   Google Analytics, no tracking pixels, no `<script src="https://...">`.

## Technical conventions

- **Plain HTML + CSS** (and a little vanilla JavaScript only when truly needed). No build step,
  no frameworks, no package managers unless a decision in `docs/decisions.md` says otherwise.
  Simple = cheap to maintain = cheap for clients.
- **All paths must be relative** (`css/style.css`, `../images/logo.png`), never starting with
  `/`. The site is served from a project URL (`<username>.github.io/<repo-name>/`), so a path
  like `/css/style.css` would break.
- **Every demo and template is self-contained**: its own folder with its own `index.html`,
  `css/`, `images/`. No shared files between folders, so any one of them can be copied and
  handed to a client on its own.
- Run `scripts/check-site.sh` before opening a pull request. The same check runs automatically
  on GitHub.

## Folder structure

| Folder        | What lives there                                                      | Published? |
|---------------|-----------------------------------------------------------------------|------------|
| `site/`       | The studio's own website                                              | Yes, at the root URL |
| `demos/`      | One folder per business type (e.g. `demos/florist/`) — showcase sites | Yes, at `/demos/<type>/` |
| `templates/`  | Reusable, cleaned-up starting points for client projects              | No |
| `docs/`       | Decisions, brand notes, pricing research, processes                   | No |
| `scripts/`    | Small helper scripts (e.g. the site checker)                          | No |
| `.github/`    | GitHub Actions workflow and pull request template                     | No |

## Working agreements

- **One branch per task.** Never push directly to `main`.
- **Small commits** with clear messages that say what changed.
- **Pull requests** for every change, with a short, plain-language description of *what*
  changed and *why* (use the PR template).
- When a decision is made (tools, prices, structure, brand), **add it to the decisions log**
  below and to `docs/decisions.md`.
- When unsure about something that affects the business (pricing, wording to clients, legal),
  ask the owner instead of guessing.

## Decisions log

Short summary; full reasoning in [`docs/decisions.md`](docs/decisions.md). Newest last.

| Date       | Decision |
|------------|----------|
| 2026-10-16 | Repository set up: folder structure, standing rules, working agreements. |
| 2026-10-16 | Plain HTML/CSS, no build step, no frameworks. |
| 2026-10-16 | Publish with GitHub Pages via GitHub Actions: `site/` at the root, `demos/` under `/demos/`. `templates/` and `docs/` are not published. |
| 2026-10-16 | All paths relative; every demo/template self-contained; fonts stored in the repo, never from a CDN. |
| 2026-10-16 | Automatic check on every pull request for absolute paths and external scripts/fonts. |
| 2026-10-16 | Repo renamed to `kiosk-studio`, made public; `main` protected by a ruleset. |
| 2026-10-16 | Studio website v1: one page + privacy + terms; owner details in `site/config.js`; Formspree-ready contact form. |
| 2026-10-16 | Website redesign: editorial layout (rules, no cards), Source Serif 4 + Source Sans 3 self-hosted, full-screen hero. |
| 2026-10-16 | One-off websites only: single price, no care plan or subscription. |
| 2026-10-17 | Logo added (light version in header, KS mark as icon); studio email and WhatsApp in config. |
