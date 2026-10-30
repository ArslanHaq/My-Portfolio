# Muhammad Arsalan: Portfolio

My personal portfolio site, showing my experience, selected projects, tech stack and a working contact form.

**Live:** [arsalan-portfolio-sooty-alpha.vercel.app](https://arsalan-portfolio-sooty-alpha.vercel.app)

## Features

- **Projects** with filters and a detail dialog, plus a gallery of presentation images and a short showreel
- **Experience, about and tech stack** sections rendered on the server
- **Interactive hero:** an animated developer workbench built with CSS transforms, with no WebGL or animation libraries
- **Motion controls:** a toggle in the header and footer, and the operating system's reduced-motion setting is respected
- **Contact form** that sends email through an API route using Nodemailer, with server-side validation
- **SEO:** metadata, structured data, Open Graph image, sitemap and robots rules
- **Performance:** optimised WebP images with responsive sizes, and video that only loads when played
- **Accessibility:** keyboard-accessible controls, and the custom cursor hides during keyboard navigation

## Tech stack

Next.js (App Router) · React · TypeScript (strict) · Tailwind CSS 4 · Nodemailer · Playwright · Vercel

## Getting started

Requires Node.js 22.

```bash
npm ci
cp .env.example .env.local   # optional: needed only for the contact form
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site URL (optional on Vercel) |
| `SMTP_HOST`, `SMTP_PORT` | SMTP server, for example Gmail on port 465 |
| `SMTP_USER`, `SMTP_PASS` | SMTP login. For Gmail, use an app password. |
| `CONTACT_TO_EMAIL` | Where contact messages are delivered |

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check with TypeScript |
| `npm run test:e2e` | Run the Playwright tests (page, contact form and API, motion, workbench) |

## Project structure

```
app/          Page, layout, contact API route, sitemap, robots and OG image
components/   Sections: hero, about, experience, projects, showcase, tech stack, contact
data/         Project, showcase and icon data
lib/          Site profile, contact validation and email template
tests/        Playwright tests
```
