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

Addresses once published:

- Studio site: `https://kioskstudio.art/`
- Demos: `https://kioskstudio.art/demos/<business-type>/`

**All links inside pages must be relative** (e.g. `css/style.css`, not `/css/style.css`), so
the site works on any address, including the GitHub one, and demos can be moved to a client's
own domain unchanged.

## Editing the website

The studio website is in `site/`:

```
site/
  index.html      The home page (all sections)
  privacy.html    Privacy policy
  terms.html      Terms
  config.js       YOUR DETAILS: email, WhatsApp, prices, photo, logo, form...
  css/style.css   Colours, fonts and layout
  js/main.js      Menu, contact form, and filling in the details from config.js
  fonts/          The two fonts used on the site (free licence, stored here)
  assets/         Images: favicon, social sharing image, and later your logo and photo
```

### Filling in your details

Open `site/config.js` and fill in the values between the quotes. Anything left empty
(`""`) is hidden on the site, so it always looks finished. For example:

- No prices yet → the pricing section says "Price on request".
- No email, WhatsApp or form yet → the contact section says details are coming soon.
- No logo → a text logo ("Kiosk Studio") is shown.

### Adding your logo or photo

1. Put the image in `site/assets/` (for example `site/assets/logo.png`).
2. In `config.js`, set `logo: "assets/logo.png"` (or `photo: "assets/me.jpg"`).
3. If your logo is light-coloured, set `logoOnDark: true`. Otherwise it is shown on a small
   white badge so it stays readable on the dark blue header.

### Connecting the contact form (Formspree)

The form needs a service to turn messages into emails. Formspree has a free plan.

1. Create an account at formspree.io and click **New form**. Use the email address where you
   want to receive messages.
2. Formspree gives you an address like `https://formspree.io/f/abcdwxyz`.
3. Paste it in `config.js` as `formEndpoint: "https://formspree.io/f/abcdwxyz"`.
4. In the form's settings on Formspree, keep reCAPTCHA **off** (the site sends messages in the
   background, which reCAPTCHA blocks; a hidden spam trap is already built in).
5. Merge the change, then send yourself a test message from the live site.

Until a form service is connected: if you set an `email`, the form opens the visitor's email
app with their message ready to send; if not, the form is hidden.

If you ever switch to another form service, also update the `Content-Security-Policy` line at
the top of `index.html`, `privacy.html` and `terms.html`. It lists the only outside address the
pages are allowed to talk to (currently `https://formspree.io`).

### Web address

The site lives at **https://kioskstudio.art/** (domain registered at Porkbun, connected in
GitHub under Settings → Pages → Custom domain). The old address
`pietromaiolinoo.github.io/kiosk-studio/` redirects there automatically.

The address also appears in a few places search engines and social apps read (`canonical`,
`og:url`, `og:image` at the top of each HTML file, plus `sitemap.xml` and `robots.txt`). If the
domain ever changes, replace it there (search for `kioskstudio.art`).

## Check your changes locally

```sh
./scripts/check-site.sh
```

To preview a page, open its `index.html` in a browser — there is no build step. (The contact
form and some details only work when the page is served by a web server, like the live site.)

## Ground rules

- Nothing is sent to a prospect or client without the owner's approval.
- No personal data (names, emails, phone numbers of prospects or clients) — this repo is public.
- No invented testimonials, client names, statistics or guarantees.
- No trackers, analytics, or external font/script services.

The full list is in [`CLAUDE.md`](CLAUDE.md). Decisions are recorded in
[`docs/decisions.md`](docs/decisions.md).
