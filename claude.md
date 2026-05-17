# Black Dot Site — Project Guide for Claude

This file is the single source of truth for any Claude session working on this project.
Read it fully before making any changes.

---

## Project Overview

**Black Dot Consultancy Pvt. Ltd.** is a cybersecurity and digital transformation consulting firm
headquartered in New Delhi. Their website is a static marketing site that communicates four core
service offerings and drives contact/enquiry conversions.

**Business purpose of the site:**
- Present the firm's four cybersecurity service lines
- Surface their technology partner credentials (Snyk, Datadog, Palo Alto Networks, Cisco, Rubrik, etc.)
- Generate contact leads via a form and WhatsApp link
- Establish professional credibility in the cybersecurity consulting market

---

## Tech Stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Markup | HTML5 (semantic) | No templating engine |
| Styling | Tailwind CSS via CDN + custom CSS | No build step — Tailwind loaded from `cdn.tailwindcss.com` |
| JavaScript | Vanilla JS | No framework, no bundler |
| Font | Inter (Google Fonts) | Weights 300–900 |
| Server | Nginx (Alpine) | Static file serving only |
| Container | Docker + Docker Compose | Port 3319 mapped to container port 80 |

**There is no build step.** Edit HTML/CSS/JS files directly. Changes are visible immediately on refresh.

---

## Local Development

**Quickest way — open directly in browser:**
```
open index.html
```
All asset paths are relative so it works without a server for most things.
Videos and some fonts may require a local server due to CORS.

**With a local server (recommended):**
```bash
# Python
python3 -m http.server 8080

# Or use Docker
docker-compose up
# Site runs at http://localhost:3319
```

**CSS/JS cache busting:** Files are referenced with `?v=2` query strings (e.g. `css/styles.css?v=2`).
When deploying changes, increment the version number: `?v=3`.

---

## Git Branch Structure

```
master
├── commit 94e7ec2 — Initial commit: Black Dot site with navbar + partner ticker
└── commit 4d7f4b6 — Restore transparent-over-hero navbar; remove redundant Partners grid

modernise-ui  (branched from master — changes are UNCOMMITTED as of last session)
└── [unstaged working-tree changes] — Full UI modernisation (see "What Was Built" below)
```

### IMPORTANT — Changes on `modernise-ui` Are Not Yet Committed

All UI modernisation work lives as **unstaged working-tree changes** on the `modernise-ui` branch.
Nothing has been committed to this branch yet. Before switching branches or doing anything risky,
commit the work first:

```bash
# Check what's changed
git status
git diff --stat

# Commit the modernisation
git add css/styles.css css/service-page.css index.html services/ CLAUDE.md
git commit -m "Modernise UI: teal accent system, card overhauls, Why section, contact/footer redesign"

# When satisfied with browser testing, merge to master
git checkout master
git merge modernise-ui
```

### Branch Rules
- **`master`** — production-ready code only. Do not commit directly; use feature branches.
- **`modernise-ui`** — current active work. Commit here before any branch switching.
- New features: `git checkout master && git checkout -b feature/your-feature-name`

---

## File Map

```
black-dot-site/
├── index.html                    # Main homepage — all primary sections
├── CLAUDE.md                     # This file
├── README.md                     # Docker quick-start guide
├── Dockerfile                    # nginx:alpine static server
├── docker-compose.yml            # Runs on port 3319
├── nginx.conf                    # Gzip, caching, SPA fallback
│
├── css/
│   ├── styles.css                # Global styles, animations, all custom classes
│   └── service-page.css          # Service card + capability card styles (used by ALL pages)
│
├── js/
│   ├── main.js                   # Nav scroll, mobile menu, reveal animations, contact form
│   └── service-page.js           # Same as main.js but for sub-pages (no form logic)
│
├── services/
│   ├── code-ai-security.html     # Snyk / Code & AI Security
│   ├── observability-security.html # Datadog / Observability
│   ├── zero-trust-security.html  # Palo Alto Networks + Cisco / Zero Trust
│   └── cyber-resiliency.html     # Rubrik / Cyber Resiliency
│
└── assets/
    ├── logo.jpg                  # Brand logo (nav + footer)
    ├── hero-video.mp4            # Full-screen hero background video
    ├── hero-poster.jpg           # Static fallback while video loads
    ├── saas.png                  # Currently unused
    ├── consulting.jpg            # Currently unused
    ├── cyber-security.jpg        # Currently unused
    ├── digital-transformation.jpg # Currently unused
    └── partners/                 # 12 SVG partner logos
        ├── snyk.svg, datadog.svg, paloaltonetworks.svg, cisco.svg
        ├── rubrik.svg, elastic.svg, rsa.svg, gitguardian.svg
        └── immuniweb.svg, gambitcyber.svg, vergecloud.svg, zeroport.svg
```

### `index.html` Section Order

1. `<header id="site-header">` — Fixed nav with Services dropdown + mobile hamburger
2. `<section id="hero">` — Full-screen video, animated headline, scroll cue
3. `<section class="ticker-section">` — Auto-scrolling partner logo ticker
4. `<section>` (intro strip) — "What We Do" + 3 metric blocks (20+, 12+, 360°)
5. `<section id="services">` — 2×2 grid of 4 service cards
6. `<section id="about">` — 12-column grid: company description + 4 why-cards
7. `<section id="why">` — "Why Black Dot" 3-pillar cards
8. `<section id="contact">` — Contact info card + contact form
9. `<footer>` — 4-column structured footer + copyright strip

### Service Sub-Page Template

All 4 service pages share the same structure:
1. Header/nav (same as main, paths use `../` prefix)
2. Dark navy hero banner — title, description, partner badge
3. Overview paragraph
4. "What We Deliver" checklist
5. Capability cards grid
6. Stats + approach section
7. CTA section (teal button → `../index.html#contact`)
8. Footer (4-column, same as main, `../` paths)

---

## Design System

### Color Palette

| Name | Hex | Tailwind token | Usage |
|------|-----|---------------|-------|
| Navy | `#1a2744` | `navy` | Primary text, dark backgrounds |
| Navy-mid | `#243459` | `navy-mid` | Form card background |
| Cream | `#FAFAF7` | `cream` | Page background, card backgrounds |
| **Teal / Accent** | `#2dd4bf` | `accent` | Highlights, borders, hovers, CTAs |
| Teal hover | `#26bfac` | — | Hover state of teal buttons |
| Teal subtle | `rgba(45,212,191,0.1)` | — | Icon backgrounds |
| Gray | `#6b7280` | — | Body text, descriptions |
| Gray dark | `#4b5563` | — | Slightly heavier body text |

**Teal is the brand accent.** Use it for: eyebrow label lines, hover states, icon backgrounds,
left-border accents on cards, CTA buttons, form focus rings. Never use teal as a large-area fill.

### Typography

- **Font:** Inter (Google Fonts, weights 300–900)
- **Section headings:** `.section-heading` — `clamp(1.9rem, 3.5vw, 3rem)`, weight 700
- **Hero lines:** `.hero-line` — `clamp(3rem, 8vw, 6.5rem)`, weight 900, white
- **Body:** `.section-body` — `1.0625rem`, line-height 1.75
- **Body light:** `.section-body-light` — `0.9375rem`, line-height 1.8
- **Eyebrow kicker:** `.eyebrow-label` — `0.7rem`, weight 700, uppercase, tracking `0.28em`, teal line before

### Responsive Breakpoints

| Prefix | Min-width | Typical use |
|--------|-----------|-------------|
| `sm:` | 640px | 2-column grids, footer grid |
| `md:` | 768px | Desktop nav (replaces hamburger) |
| `lg:` | 1024px | Full layout, 12-col about grid, larger padding |

### Custom CSS Class Inventory

All classes live in `css/styles.css` unless marked `[sp]` = `css/service-page.css`.

#### Navigation
- `.nav-transparent` — nav state over hero (transparent bg, white text)
- `.nav-solid` — nav state when scrolled (white bg, shadow)
- `.nav-link`, `.nav-cta` — desktop nav link styles
- `.nav-dropdown`, `.nav-dropdown-menu`, `.nav-dropdown-item` — services dropdown
- `.ham-bar` — hamburger icon bars (animates to × when menu open)
- `.mobile-section-label` — mobile menu section header

#### Hero
- `.hero-gradient` — left-side dark overlay on hero video
- `.hero-line` — animated headline text (fade-up, uses `--delay` CSS var for stagger)
- `.hero-sub` — smaller subtitle line
- `.hero-eyebrow` — eyebrow + supporting copy (same fade-up animation)
- `.scroll-cue` — bouncing scroll indicator at hero bottom

#### Scroll Reveal
- `.reveal` — add to any element to get scroll-triggered fade+slide-up entrance
- `.reveal.visible` — JS adds this when element enters the viewport

#### Typography Utilities
- `.eyebrow-label` — section kicker on light background (teal line before)
- `.eyebrow-label-light` — section kicker on dark background
- `.section-heading` — main section title
- `.section-body` — standard body paragraph
- `.section-body-light` — lighter/smaller body paragraph
- `.teal-rule` — 36px × 2px teal decorative bar (`mx-auto` to center it)

#### Metrics (Intro Strip)
- `.metric-block` — centered metric container
- `.metric-number` — large stat number (2.75rem, weight 800)
- `.metric-label` — stat description text

#### Services Grid
- `.service-number` — "01"/"02" badge text (teal, uppercase)
- `[sp] .service-card` — card with teal left-edge hover bar animation
- `[sp] .service-card-heading` — card title
- `[sp] .service-card-body` — card description text
- `[sp] .service-card-partner` — partner badge at card bottom (teal)
- `[sp] .service-card-link` — "Learn more →" link (turns teal on card hover)

#### About Section
- `.why-card` — teal-left-bordered capability card
- `.why-card-icon` — teal-tinted icon box
- `.why-card-title` — bold card title
- `.why-card-desc` — card description

#### Why Black Dot Section
- `.pillar-block` — white card with large teal number
- `.pillar-number` — large teal number (2.5rem, weight 900)
- `.pillar-title` — pillar heading
- `.pillar-desc` — pillar description text

#### Contact Section
- `.contact-info-card` — left panel (semi-transparent bg, teal top border)
- `.contact-form-card` — right panel (navy-mid bg, teal top border)
- `.contact-detail-row` — flex row: icon + text
- `.contact-detail-icon` — 32px teal-tinted icon box
- `.contact-label` — field label (white/35, uppercase, tiny)
- `.contact-value` — field value text
- `.contact-link` — clickable contact item (email, phone)
- `.form-label` — form field label
- `.form-input` — text input / textarea styling
- `.form-submit` — submit button (teal bg, navy text)

#### Footer
- `.footer-col-heading` — column header (uppercase, tiny, white/35)
- `.footer-link-list` — `<ul>` column list (flex column)
- `.footer-link` — footer nav link (white/45, turns teal on hover)

#### Partner Logos
- `.ticker-section` — scrolling ticker wrapper with fade-edge masks
- `.ticker-track` — infinite-scroll animation container
- `.ticker-inner` — one set of logos (duplicated for seamless loop)
- `.ticker-logo` — color logo (grayscale default, full color on hover)
- `.ticker-logo-mono` — mono SVG logo (CSS-recolored to navy, full opacity on hover)

#### Service Sub-Pages
- `[sp] .partner-badge` — white pill in hero (e.g. "Snyk")
- `[sp] .capability-card` — feature card on service pages
- `[sp] .capability-icon` — teal-tinted icon box (48px)
- `[sp] .capability-title`, `.capability-desc`
- `[sp] .check-icon` — teal-tinted checkmark circle in "What We Deliver" lists
- `[sp] .stat-row`, `.stat-number`, `.stat-label` — stats display

### Animation Conventions

- **Scroll reveal:** Add `class="reveal"` to any element. JS auto-handles the rest.
- **Stagger:** The 2nd `.reveal` sibling in a grid auto-gets `transition-delay: 0.12s`
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for snappy entrances (already in CSS)
- **Hover:** `0.2–0.4s ease` for color/shadow/transform changes
- **Hero entrance:** `.hero-line` + `style="--delay:Xms"` for staggered text reveal

---

## What Was Built — `modernise-ui` Branch

All changes below are **uncommitted** on `modernise-ui`. Commit before any branch switch.

### `css/styles.css`
- Eyebrow `::before` lines: grey → teal `#2dd4bf`
- `.service-number`: muted navy (opacity 0.35) → full-opacity teal
- `.form-input:focus`: now shows teal border + glow shadow
- `.form-submit`: white bg → teal bg
- `.about-pill` border + `.about-pill-icon` bg: both changed to teal tints
- `.section-heading` margin-bottom: `1.5rem` → `1.75rem`
- `.metric-number` font-size: `2.25rem` → `2.75rem`, tighter letter-spacing
- `.metric-label` font-size: `0.8125rem` → `0.875rem`
- **New classes added:** `.teal-rule`, `.why-card` (+icon/title/desc), `.pillar-block` (+number/title/desc), `.contact-info-card`, `.contact-form-card`, `.contact-detail-row`, `.contact-detail-icon`, `.footer-col-heading`, `.footer-link-list`, `.footer-link`

### `css/service-page.css`
- `.service-card` border-radius: `1.25rem` → `1.5rem`, `overflow: hidden` added
- `.service-card::before` teal left-edge bar added (animates `scaleY` on hover)
- `.service-card:hover` lift: `translateY(-4px)` → `translateY(-6px)`, stronger shadow
- `.service-card-partner` text: grey → teal
- `.service-card-link` default: navy → grey (turns teal on card hover)
- `.capability-icon` + `.check-icon`: both changed from navy tint to teal tint

### `index.html`
- Services section: `bg-cream` → `bg-white`, `.teal-rule` added before eyebrow
- About left column: "Our edge" blockquote with teal left border added
- About right column: 4 `about-pill` → 4 `why-card` divs
- New `<section id="why">` inserted between About and Contact
- Desktop + mobile nav: "Why Us" link added
- Contact left column: wrapped in `.contact-info-card`, icon rows added per detail
- Contact form panel: class changed to `.contact-form-card`
- Footer: single row → 4-column structured footer (Services / Company / Get in Touch) + copyright strip

### `services/*.html` (all 4 pages)
- `accent: '#2dd4bf'` added to each page's Tailwind config block
- CTA button: `bg-white text-navy` → `bg-[#2dd4bf] text-navy`
- Footer: minimal single row → 4-column structure matching main page (all paths use `../`)

---

## What Still Needs Building

### High Priority
- [ ] **Commit modernise-ui** — run the git commands in the branch section above
- [ ] **Merge modernise-ui → master** after opening `index.html` in browser and verifying all sections visually
- [ ] **Contact form backend** — currently fakes success after 1200ms, no email is sent. Simplest fix: integrate [Formspree](https://formspree.io) (just change the form `action` attribute and remove the JS fake handler)
- [ ] **LinkedIn URL** — all footer LinkedIn icons link to `#`. Replace with real profile URL

### Medium Priority
- [ ] **Analytics** — no tracking on site. Add Google Analytics 4 or Plausible
- [ ] **Favicon** — none set. Generate a `favicon.ico` and `apple-touch-icon.png` from `assets/logo.jpg`
- [ ] **OG / social meta tags** — `og:image`, `og:title`, `og:description`, `twitter:card` missing from all pages
- [ ] **Image optimisation** — service images (`consulting.jpg` etc.) are 6–7MB each. Convert to WebP, add `loading="lazy"` on `<img>` tags
- [ ] **Testimonials section** — no client quotes or case studies currently

### Future Pages
- [ ] Team page — leadership profiles with photos and bios
- [ ] Blog / Resources — SEO content, thought leadership
- [ ] DPDP product page — mentioned in About text but no dedicated page exists
- [ ] Privacy Policy / Terms of Service

---

## Conventions for Extending the Site

### Adding a new homepage section
1. Copy `<section id="why">` as a template
2. Place in logical order in `index.html`
3. Wrap animated elements in `<div class="reveal">`
4. Add anchor link to desktop nav `<ul>` and mobile drawer `<ul>`
5. Add footer link under "Company" column in `index.html` footer and all 4 service page footers

### Adding a new service page
1. Copy `services/code-ai-security.html` as template
2. Update `<title>`, `<meta name="description">`, hero content, capability cards, stats, CTA copy
3. Add to Services dropdown in `index.html` nav (both desktop `<div class="nav-dropdown-menu">` and mobile `<ul>`)
4. Add to Services dropdown in all 4 existing service pages' navs
5. Add to "Services" column in all 5 footers (index.html + 4 service pages)
6. No new CSS needed — all classes already exist in `service-page.css`

### CSS rules
- Global styles → `css/styles.css`; service-page-only → `css/service-page.css`
- Always use `#2dd4bf` for teal — not Tailwind's built-in `teal-400` (they don't match)
- Teal icon backgrounds: `rgba(45,212,191,0.1)`
- Teal tinted borders: `rgba(45,212,191,0.15–0.2)`
- Color/text hovers: `transition: color 0.2s ease`
- Shadow/transform hovers: `transition: box-shadow 0.3s ease, transform 0.3s ease`

### JavaScript rules
- Extend `main.js` / `service-page.js` with vanilla JS only — no frameworks
- `.reveal` elements are handled automatically by the existing `IntersectionObserver`
- Smooth `#anchor` scrolling is already handled in both JS files

### Tailwind rules
- Custom colors (`navy`, `cream`, `accent`, `navy-mid`) are defined in each page's inline `<script>` Tailwind config
- Service sub-pages must include `accent: '#2dd4bf'` in their config (was missing before modernise-ui)
- CDN Tailwind only — no npm, no PostCSS, no build step

### Deployment
- Increment `?v=X` query string on `<link>` and `<script>` tags when deploying CSS/JS changes
- Rebuild Docker image after file changes: `docker-compose up --build`
- Nginx config already handles gzip, aggressive caching, and SPA fallback

---

## Contact Details Reference

```
Company:  Black Dot Consultancy Pvt. Ltd.
Email:    support@black-dot.io
Phone 1:  +91-9625-876-989
Phone 2:  +91-9599-288-965
WhatsApp: https://wa.me/919625876989
Address:  44, Backary Portion, 2nd Floor, Regal Building, New Delhi — 110001
Hours:    09:00 am – 05:00 pm
```
