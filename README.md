# Kiosk Studio

Simple, affordable websites for small local businesses — florists, restaurants, cafés,
barbershops and small shops that have no website, or one that no longer works.

This repository is the home of the studio: its own website, sample demo sites, reusable
templates and the notes behind every decision.

## What's in here

```
site/         The studio's own website (published at the main address)
demos/        Sample websites, one folder per business type, e.g. demos/florist/
templates/    Reusable starting points for real client projects (not published)
docs/         Decisions, brand notes, pricing research (not published)
scripts/      Small helper scripts, e.g. the site checker
.github/      The automatic publishing setup and the pull request template
CLAUDE.md     Instructions and rules for Claude, the AI assistant working on this repo
```

## How the website gets published

The website is hosted for free on **GitHub Pages**.

1. Every change is made on its own **branch** and proposed as a **pull request**.
2. When a pull request is opened, GitHub automatically runs a quick **check** (no broken
   absolute links, no external scripts or fonts).
3. When the pull request is **merged into `main`**, GitHub automatically **publishes** the site.
   It is live a minute or two later.

Addresses once published (replace `<username>` and `<repo-name>`):

- Studio site: `https://<username>.github.io/<repo-name>/`
- Demos: `https://<username>.github.io/<repo-name>/demos/<business-type>/`

Because the site lives in a sub-folder of `github.io`, **all links inside pages must be
relative** (e.g. `css/style.css`, not `/css/style.css`).

## Check your changes locally

```sh
./scripts/check-site.sh
```

To preview a page, just open its `index.html` in a browser — there is no build step.

## Ground rules

- Nothing is sent to a prospect or client without the owner's approval.
- No personal data (names, emails, phone numbers of prospects or clients) — this repo is public.
- No invented testimonials, client names, statistics or guarantees.
- No trackers, analytics, or external font/script services.

The full list is in [`CLAUDE.md`](CLAUDE.md). Decisions are recorded in
[`docs/decisions.md`](docs/decisions.md).
