# Medivo AI Website

Official website for **Medivo AI**, a clinician-controlled patient education platform that turns confirmed medical instructions into clear, personalised videos patients can watch and revisit from their phones.

## Website

- Landing page with the Medivo AI product story
- Problem, solution and product workflow sections
- Endoscopy use case and hospital value proposition
- Editorial About and Team pages
- Responsive layouts for desktop, tablet and mobile
- Official Medivo AI branding and media assets

Live site: [medivo-ai.stevenchen38.chatgpt.site](https://medivo-ai.stevenchen38.chatgpt.site)

## Technology

- React
- TypeScript
- Vinext / Vite
- Cloudflare-compatible server output

## Local development

Requires Node.js 22.13 or newer and npm.

```bash
npm ci
npm run dev
```

## Production build

```bash
npm run build
```

The build creates the deployable output in `dist/`.

## Main project structure

```text
app/
  page.tsx                 Landing page
  about/page.tsx           About page
  team/page.tsx            Team page
  components/              Shared editorial components
  globals.css              Global styles and responsive layouts
public/
  medivo-logo-white-v2.png Official logo
  medivo-hero.mp4          Hero video
  medivo-hero-poster.webp  Hero fallback image
  chang-syu-chen.webp      Founder image
  jiale-li.webp            Founder image
```

## Product status

Medivo AI is currently an early product prototype. The website describes the intended patient education experience and proposed healthcare workflow; it does not provide medical advice, diagnosis or treatment recommendations.

## Contact

For hospital collaboration or product enquiries, contact **hello@medivo.ai**.
