# Muhammad Arsalan — Portfolio

Next.js App Router, React, TypeScript, and a charcoal, lime, and lavender interface. This application lives in `My-Portfolio/` when opened from the parent workspace. Run commands in the directory containing this README and `package.json`.

## Run locally

Use Node.js 22:

```bash
npm ci
npm run dev
```

For production:

```bash
npm run build
npm run start
```

The local sandbox previously prevented Turbopack's CSS worker from binding a port. Webpack is supported as an alternative: `npm run build -- --webpack` or `npm run dev -- --webpack`. This is an environment workaround, not a change to the default deployment bundler.

## Design and motion

- Server-rendered headings, biography, skills, employment, contact details, and media captions.
- An optional Three.js hero sculpture with pointer response, a moving discipline strip, floating labels, section entrances, card hover treatments, and a contextual cursor.
- Header and footer motion controls share a persisted preference. The operating system's reduced-motion preference takes priority. The native cursor remains available.
- The Three.js module loads dynamically during idle time on fine-pointer screens at least 900px wide. It is skipped for reduced motion, saved motion pause, data-saving mode, and devices reporting at most two logical processors. The CSS illustration remains available when WebGL is unsupported or loading fails.
- The renderer caps pixel ratio at 1.25 and draws at most 30 frames per second. It suspends offscreen and in hidden tabs and releases geometry, materials, observers, event listeners, and its WebGL context on cleanup. No texture downloads, postprocessing, shadows, or React updates occur in its render loop.
- Mobile uses two lightweight CSS transform animations for the orbital illustration and discipline strip. These also stop offscreen, when paused, or with reduced motion. Motion still has a rendering cost; these controls do not establish a zero-overhead claim.
- The cursor stops requesting animation frames when it settles, and hides over native media/form controls and during keyboard navigation.

`app/globals.css` contains shared component and interface-illustration styles; `app/experience.css` contains the current visual direction and responsive motion treatment. `components/hero-scene.tsx` controls enhancement loading; `lib/orbit-scene.ts` owns the isolated Three.js renderer.

## Media and SEO

Five presentation images and a 58-second H.264/AAC showreel are served from `public/media/`. `data/showcase.ts` holds descriptions and dimensions. Presentations are WebP, with pre-generated 640px and 960px variants selected by a native `picture` source. The dimensioned, lazy-loaded `next/image` fallback is marked `unoptimized` because these files are already encoded; this avoids a runtime image-optimization roundtrip. Full images remain available from each presentation link.

The original five WebP presentations total 656,344 bytes compared with 8,160,394 PNG source bytes. The MP4 is 5,372,730 bytes compared with 11,404,659 source bytes. Responsive variants reduce transfers further where the browser selects a smaller source. Video uses `preload="none"`, native controls, and fast-start metadata; it does not autoplay.

The portfolio includes metadata, Person/ImageGallery structured data, social-sharing images, robots configuration, and an image sitemap. Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin for your custom domain. Vercel-provided deployment URLs are supported. No localhost origin is saved in configuration. No unverified video upload date or rich-result eligibility is claimed.

Project text and links live in `data/projects.ts`. Their decorative interface illustrations are identified as illustrations. User-supplied gallery presentations are separately captioned, including prototypes and mobile concepts. Profile details, LinkedIn, GitHub, Fiverr, phone, and resume links are centralized in `lib/site.ts`.

## Contact form

The form collects a name, reply email, enquiry type, and message. It provides validation, pending, success, and failure states, preserves failed submissions, and waits for hydration before enabling submission. Without JavaScript or email configuration, visitors can use direct contact links.

Email delivery uses Gmail SMTP through Nodemailer in the Node.js API route. Enable Google 2-Step Verification, then create a dedicated app password at [Google App Passwords](https://myaccount.google.com/apppasswords). Use that app password rather than your normal Google password. Some managed or Advanced Protection accounts do not offer app passwords; see [Google's requirements](https://support.google.com/accounts/answer/185833).

In **Vercel → Project → Settings → Environment Variables**, add these values for Production and redeploy. For local development, use an ignored `.env.local` file based on `.env.example`.

| Variable | Value / purpose |
| --- | --- |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` for implicit TLS; `587` also works with mandatory STARTTLS |
| `SMTP_USER` | `arslankhanhaq332@gmail.com`, the authenticated sending account |
| `SMTP_PASS` | Your private Google app password; displayed grouping spaces are removed for Gmail |
| `CONTACT_TO_EMAIL` | `arslankhanhaq332@gmail.com`, the fixed inbox receiving enquiries |
| `NEXT_PUBLIC_SITE_URL` | Your actual HTTPS portfolio origin; optional when using Vercel's supplied URL |

No `SMTP_SECURE` variable is needed: encryption follows the selected port. The sender is always `SMTP_USER`, with the portfolio owner's display name. The visitor's validated name and email are used as Reply-To, so replying in Gmail addresses the visitor. The previous `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` variables are no longer used and can be removed from Vercel. No custom email domain is required for this Gmail configuration.

Never prefix SMTP credentials with `NEXT_PUBLIC_`. Keep the app password in private deployment settings or the ignored local environment file. Only a configuration-availability boolean reaches the form; credentials are never passed to the browser. The form is prerendered, so rebuild/redeploy after configuring SMTP.

`POST /api/contact` accepts same-origin JSON, enforces a streaming 24 KiB body limit, validates fields, checks a honeypot, and sends plain text to a fixed server-configured recipient. Both the visible sender and SMTP envelope use the configured account. It cannot act as an arbitrary recipient relay. TLS certificate verification stays enabled; port 587 must upgrade to TLS. Connection/DNS/greeting/socket timeouts are bounded, and the route awaits SMTP completion before responding. A fresh non-pooled transporter is used for each enquiry, with no retained queue or warm-instance state.

SMTP errors are sanitized. Temporary SMTP failures receive a retry response; failed authentication, network errors, or a rejected recipient cannot produce a success message. A successful response means the SMTP server accepted the recipient and message, not that inbox delivery is guaranteed. The browser preserves failed messages and prevents simultaneous submissions.

SMTP does **not** provide the old provider's idempotency guarantee. A stable Message-ID identifies retries for troubleshooting, but it does not guarantee deduplication. There are no automatic retries; a visitor's manual retry after an ambiguous network failure can produce a duplicate email. Stronger exactly-once processing would require persistent delivery state.

Before enabling a public form, configure a Vercel firewall rate limit for `POST /api/contact` (for example, five requests per IP per ten minutes, adjusted for your traffic). The honeypot and Gmail quota are not a distributed per-visitor rate limiter. No database or unbounded in-memory rate-limit map has been added.

SMTP contracts: [Nodemailer transport](https://nodemailer.com/smtp), [Google app passwords](https://support.google.com/accounts/answer/185833), and [SMTP on Vercel](https://vercel.com/kb/guide/serverless-functions-and-smtp).

## Deploy

Import `ArslanHaq/My-Portfolio` into Vercel. Use Next.js, Node.js 22, the repository root containing `package.json`, and the default build/output settings. The website can render without email credentials; the form remains unavailable until configured. No analytics account is configured.

The original downloadable resume is `public/resume/Muhammad-Arsalan-Resume.pdf`. Its public URL is `/resume/Muhammad-Arsalan-Resume.pdf`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser tests cover navigation, themes, project filters/dialogs, resume downloads, responsive image rendering, on-demand video playback, cursor behavior, motion preferences, WebGL lifecycle, and no-JavaScript content. Contact API tests inject a mock mail sender and validate TLS/configuration boundaries; enabled-form browser tests intercept the endpoint and never send actual email. Run the enabled-form tests against an isolated preview configured with dummy delivery variables; they skip when the ordinary preview has no email configuration.

SMTP migration verification: lint, TypeScript, and whitespace checks passed after correcting the injected environment type. An isolated Node 22 Webpack production build passed. All 17 targeted SMTP/API and desktop/mobile contact tests passed, with delivery mocked. A separate real Gmail SMTP verification confirmed the TLS connection and app-password authentication without sending mail. The local credential file is ignored and untracked; a dummy SMTP password was absent from the built static browser assets. Actual message delivery and the updated Vercel deployment remain unverified.

Redesign verification before the SMTP migration on September 11, 2026: lint, TypeScript, and whitespace checks passed; an isolated Node 22 / Next.js 16.3.4 Webpack production build passed. Across the browser/API suite and one targeted rerun after correcting test locators and viewport setup, 41 checks passed and four device-specific checks were skipped. The previous desktop gallery-loading failure is resolved by the static responsive sources. Desktop, mobile, light-theme, and 320px layouts were visually checked. Live email delivery and deployed Core Web Vitals remain unverified.

Next.js and its ESLint configuration were patched to 16.3.4 after npm reported [a Next.js security advisory](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4). The installation audit reported no remaining vulnerabilities. Local checks do not establish live Core Web Vitals or deployment/email delivery behavior.
