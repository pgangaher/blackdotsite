# Black Dot — Static Site

Modern single-page website for Black Dot Consultancy, served via nginx in Docker.

## Quick start

```bash
# Build image and start container (runs on port 3319)
docker compose up -d --build

# Open in browser
open http://localhost:3319
```

## Access

| URL | Description |
|-----|-------------|
| http://localhost:3319 | Live site |

## Useful commands

```bash
# Stop and remove container
docker compose down

# Rebuild after any file changes
docker compose up -d --build --force-recreate

# Stream logs
docker compose logs -f

# Check container status
docker compose ps
```

## Project structure

```
black-dot-site/
├── index.html              # Single-page site
├── css/
│   └── styles.css          # Custom styles & animations
├── js/
│   └── main.js             # Nav scroll, reveal, form logic
├── assets/
│   ├── hero-video.mp4      # Hero background video
│   ├── hero-poster.jpg     # Video fallback image
│   ├── logo.jpg            # Brand logo (nav + footer)
│   ├── consulting.jpg
│   ├── digital-transformation.jpg
│   ├── saas.png
│   └── cyber-security.jpg
├── nginx.conf              # Gzip, caching, MIME types, SPA fallback
├── Dockerfile              # nginx:alpine — copies static files at build time
├── docker-compose.yml      # Port 3319:80, restart unless-stopped
└── README.md
```

## Tech stack

- **HTML5** — semantic markup (`<header>`, `<section>`, `<footer>`)
- **Tailwind CSS** — via CDN (no build step needed)
- **Vanilla JavaScript** — nav scroll, IntersectionObserver reveal, form
- **nginx:alpine** — lightweight static file server
