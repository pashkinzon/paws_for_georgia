# Paws from Georgia

A responsive React/Vite website for volunteer dog rescue, with shareable dog profile pages for Vesta, Puri, Odi, and Billie.

The site defaults to English and includes a visible language toggle for English, German, and Russian.

## Run locally

```bash
npm install
npm run dev
```

## Connect Google Forms

Copy `.env.example` to `.env`, then replace the form URL and `entry.*` values with those from your Google Form. The signup form posts directly to the Google Forms `formResponse` endpoint.

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Render static hosting

Use a Render Static Site with:

```txt
Build Command: npm install && npm run build
Publish Directory: dist
```

Add a rewrite rule so direct dog profile links work:

```txt
Source: /*
Destination: /index.html
Action: Rewrite
```

Dog profiles are available at `/dogs/vesta`, `/dogs/puri`, `/dogs/odi`, and `/dogs/billie`.
