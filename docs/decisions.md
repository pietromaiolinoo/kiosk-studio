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
