# Decisions

A running record of decisions about Kiosk Studio: what we decided, why, and what we gave up.
Newest at the bottom. Never delete an entry — if a decision changes, add a new one that
replaces it and say so.

Format: **Date — Title.** Decision. *Why.* *Alternatives considered.*

---

### 2026-10-16 — Repository set up

**Decision:** One public GitHub repository holds the studio site, demos, templates and docs.
`CLAUDE.md` holds the business context, brand direction, standing rules and working agreements.

**Why:** One place for everything keeps things simple for a one-person studio, and the public
repo gives free hosting through GitHub Pages.

---

### 2026-10-16 — Standing rules

**Decision:** Four rules apply to all work, by people or by Claude:

1. Nothing is sent to a prospect or client without the owner's explicit approval.
2. No personal data of prospects or clients in this repository (it is public).
3. No invented testimonials, client names, statistics or guarantees.
4. No third-party trackers, analytics or external font/script CDNs.

**Why:** Trust is the product. Small business owners need to believe what we say, and their
customers' privacy must be respected (GDPR applies in Europe). Not loading anything from other
servers also makes pages faster and avoids cookie-banner obligations.

---

### 2026-10-16 — Folder structure

**Decision:**

- `site/` — the studio's own website.
- `demos/<business-type>/` — one self-contained demo site per business type.
- `templates/<business-type>/` — reusable versions of the demos with placeholders.
- `docs/` — decisions, brand notes, pricing research.
- `scripts/` — small helper scripts.

**Why:** It mirrors the plan (site → demos → templates). Each demo and template is
**self-contained** (no shared CSS between folders) so any one of them can be copied and handed
to a client without untangling dependencies — a bit of duplication is a fair price for that.

**Alternatives considered:** a shared `assets/` folder for all demos — rejected for the reason
above; a separate repository per demo — too much overhead for now.

---

### 2026-10-16 — Technology: plain HTML and CSS

**Decision:** Plain HTML and CSS, minimal vanilla JavaScript only when needed. No frameworks,
no build tools, no package manager.

**Why:** Cheapest to build and maintain, fastest to load, easy for the owner to read and edit,
and nothing to break or update. Matches what small local businesses actually need.

**Alternatives considered:** static site generators (Jekyll, Eleventy, Astro) — could be
revisited when we have many templates and repeated content, but add complexity today.

---

### 2026-10-16 — Hosting: GitHub Pages via GitHub Actions

**Decision:** Publish with GitHub Pages using a GitHub Actions workflow
(`.github/workflows/deploy-pages.yml`). On every merge to `main` it assembles:

- `site/` → the root address `https://<username>.github.io/<repo-name>/`
- `demos/` → `https://<username>.github.io/<repo-name>/demos/<business-type>/`

`templates/`, `docs/` and `scripts/` are not published.

On every pull request, the workflow only runs the checks (no publishing).

**Why:** Free, no server to manage, and publishing happens automatically after review. Using a
workflow (instead of "publish from a branch") lets us publish exactly the folders we choose.

**Consequence:** the site lives in a sub-folder, so **every path must be relative**.

---

### 2026-10-16 — Automatic checks

**Decision:** `scripts/check-site.sh` runs on every pull request and blocks publishing if a
page uses an absolute path (`href="/..."`) or loads a script, stylesheet or font from another
website.

**Why:** These are the two easiest mistakes to make and they break the standing rules or the
live site. A machine catches them every time.

---

### 2026-10-16 — Working agreements

**Decision:** One branch per task, small commits, a pull request for every change with a short
plain-language description of what changed and why. Nobody pushes directly to `main`
(to be enforced with a branch rule in GitHub settings).

**Why:** Every change is reviewable and reversible, and the history explains itself.

---

### 2026-10-16 — Repository renamed and made public

**Decision:** The repository is `kiosk-studio` and is public. `main` is protected by a ruleset
(pull request and passing check required). Secret scanning and push protection are on.

**Why:** GitHub Pages is free only for public repositories, and the project URL now reads
`pietromaiolinoo.github.io/kiosk-studio/`. Sensitive business data stays outside this repo.

---

### 2026-10-16 — Studio website, first version

**Decision:**

- One page, with separate privacy policy and terms pages.
- Predominantly blue: dark navy for the header, hero, examples and contact; light blue and gray
  for the other sections; white only for cards.
- Brand signature: a kiosk awning (blue and white scallops) used in the text logo, favicon and
  as a stripe under the header.
- System fonts only, with large, heavy, tightly spaced headings.
- Sample sites in the "Examples" section are drawn in HTML/CSS (no images), clearly labelled
  "Sample", for fictional businesses.
- All owner details (email, WhatsApp, prices, form, photo, logo, legal details) live in
  `site/config.js`. Anything empty is hidden; nothing broken or "undefined" is ever shown.
- The contact form posts to Formspree when configured; otherwise falls back to an email draft,
  or is hidden.
- A Content-Security-Policy restricts the pages to their own files plus Formspree.

**Why:** A busy owner on a phone should understand the offer in seconds, trust it, and reach
out. Drawing the samples in code keeps the page fast and avoids stock photos.

**Alternatives considered:** separate pages per section (more clicks, little benefit at this
size); self-hosted web fonts (nicer typography, but slower and more files to manage — can be
revisited).

---

### 2026-10-16 — Website redesign: editorial instead of "template" look

**Decision:** After reviewing the first version, the owner found it looked generic and
AI-made (many boxes, pill badges, icon tiles) and too narrow on wide screens. The site was
redesigned:

- Thin rules and white space instead of cards; square-cornered buttons; no gradients.
- Headings in **Source Serif 4**, text in **Source Sans 3**, both self-hosted in `site/fonts/`
  (replaces the earlier "system fonts only" decision).
- Each section has a numbered label column on the left and content on the right, like
  consultancy and studio websites.
- The hero fills the first screen; the content width grows to 1600px on large monitors.
- The decorative awning stripe was removed; the awning stays only in the logo icon.

**Why:** Professional services sites (consultancies, design studios) rely on strong serif
typography and restraint. Rounded cards, gradients and generic sans fonts are now widely seen
as signs of an AI-generated template, which hurts trust.

---

### 2026-10-16 — One-off websites only, no care plan

**Decision:** Kiosk Studio sells one thing: a website, built once and handed over to the
client for a single price. There is no monthly care plan, hosting plan or subscription. The
care plan was removed from the website and from `site/config.js`.

**Why:** The owner's business model is to build the site, deliver it, and finish the job.

**Open question:** where each client's site is hosted after handover (for example on a free
hosting account in the client's name) and whether later changes are offered as separate paid
jobs. To be decided by the owner before the first client.
