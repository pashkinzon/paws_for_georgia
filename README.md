# Paws from Georgia

A responsive React/Vite website for volunteer dog rescue, with shareable dog profile pages for Vesta, Puri, Odi, and Billie.

The site defaults to English and includes a visible language toggle for English, German, and Russian.

## Run locally

```bash
npm install
npm run dev
```

## Contact flow

The site routes adoption and support questions to Pavel Polishchuk via Telegram, WhatsApp, or email. Pavel does not accept adoption money or donations directly; he connects adopters and supporters with the volunteers in Georgia.

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
