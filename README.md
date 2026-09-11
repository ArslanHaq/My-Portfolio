# Muhammad Arsalan — Portfolio

Next.js App Router, React, TypeScript, and a dark navy and coral interface inspired by the supplied Fitcoin reference. This application lives in `My-Portfolio/` when opened from the parent workspace. Run commands in the directory containing this README and `package.json`.

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
- An original developer workbench pairs a syntax-colored editor with a responsive interface illustration. A moving code highlight, connection signal, caret, and assembling interface tiles use CSS transforms and opacity. The hero has no screenshot, image/video request, WebGL, or JavaScript animation loop. The Fitcoin reference supplies only the site palette.
- Header and footer motion controls share a persisted preference. The operating system's reduced-motion preference takes priority. The native cursor remains available.
- Keyboard-accessible desktop/mobile controls switch the illustrated preview without changing the surrounding layout. React state is used only for that interaction. Hidden previews, offscreen sections, and hidden tabs pause their loops. Touch screens keep just the signal and small interface-tile animations; reduced motion disables all workbench animation. Motion still has a rendering cost.
- The cursor stops requesting animation frames when it settles, and hides over native media/form controls and during keyboard navigation.

`app/globals.css` contains shared component and project-illustration styles; `app/experience.css` contains the page theme and responsive layout; `app/workbench.css` contains the original hero illustration. `components/hero.tsx` keeps the heading and calls to action server-rendered, and `components/developer-workbench.tsx` provides the interactive preview. Three.js and its type package have been removed.

Technology chips pair their existing labels with decorative, server-rendered SVGs in `components/technology-icon.tsx`. Selected brand paths in `data/technology-icons.ts` come from [Simple Icons 16.0.0](https://github.com/simple-icons/simple-icons/tree/16.0.0/icons), distributed under [CC0-1.0](https://github.com/simple-icons/simple-icons/blob/16.0.0/LICENSE.md); utility symbols reuse the existing sprite or local SVG geometry. Icons inherit the theme accent and require no icon dependency, client-side code, or external image request.

The header uses the owner's enhanced portrait: a dimensioned 192px WebP displayed at 40px (7,654 bytes). The 1,254px square HD master and image-edit prompt are in `output/portraits/`; the large master is not served with the page. Email uses a separate 160px JPEG (6,784 bytes), embedded with a Content-ID. The portrait is decorative beside the visible name and existing accessible home-link label.

## Media and SEO

Five presentation images and a 58-second H.264/AAC showreel are served from `public/media/`. `data/showcase.ts` holds descriptions and dimensions. Presentations are WebP, with pre-generated 640px and 960px variants selected by a native `picture` source. The dimensioned, lazy-loaded `next/image` fallback is marked `unoptimized` because these files are already encoded; this avoids a runtime image-optimization roundtrip. Full images remain available from each presentation link.

The original five WebP presentations total 656,344 bytes compared with 8,160,394 PNG source bytes. The MP4 is 5,372,730 bytes compared with 11,404,659 source bytes. Responsive variants reduce transfers further where the browser selects a smaller source. Video uses `preload="none"`, native controls, and fast-start metadata; it does not autoplay.

The portfolio includes metadata, Person/ImageGallery structured data, social-sharing images, robots configuration, and an image sitemap. Set `NEXT_PUBLIC_SITE_URL` to the public HTTPS origin for your custom domain. Vercel-provided deployment URLs are supported. No localhost origin is saved in configuration. No unverified video upload date or rich-result eligibility is claimed.

Project content lives in `data/projects.ts`; `data/work-references.ts` centralizes public destinations shared by the cards and gallery. Eight selected projects preserve the existing filters and detail dialog. XcelTube and Pherrix use text-led visuals, with unconfirmed roles and technology sections omitted. Other decorative project visuals remain identified as illustrations. Gallery captions identify multi-project compositions, SupplyED prototype pricing, sample calculator results, and mobile UI concepts. Groovy is not published as a completed project; the earlier portfolio appears only within its supplied presentation.

The introduction, three service summaries, skill groups, and employment copy are condensed from the owner's supplied background. Cell Operative does not claim completed multilingual support, and Think Study Learn does not claim offline/on-device AI fallbacks. Fitcoin's Webflow marketing URL is explicitly distinguished from the owner's React/React Native application contributions. No extra client counts, proficiency scores, or measured business results are added.

Profile details and contact destinations remain centralized in `lib/site.ts`. The new brief's `github.com/ArslBaba` returned 404 on September 11, 2026; the previously supplied `github.com/ArslanHaq` returned 200 and is retained. LinkedIn's two supplied URLs blocked automated checks (429/999), so the original directly supplied profile is retained. The seven selected-project public URLs, SupplyED prototype URL, and three certificate URLs returned HTTP 200; the visa reference redirects to its public landing page. These checks do not verify authenticated workflows, backend functionality, or certificate contents. The existing owner-supplied Fiverr URL, phone number, and original downloadable resume remain available.

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

No `SMTP_SECURE` variable is needed: encryption follows the selected port. Both messages use `SMTP_USER` with the portfolio owner's display name as the sender. The enquiry's Reply-To addresses the visitor; the acknowledgement's Reply-To addresses `CONTACT_TO_EMAIL`. The previous `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` variables are no longer used and can be removed from Vercel. No custom email domain or additional environment variable is required.

Never prefix SMTP credentials with `NEXT_PUBLIC_`. Keep the app password in private deployment settings or the ignored local environment file. `GET /api/contact` returns only a configuration-availability boolean with `Cache-Control: no-store`; credentials never reach the browser. The form checks this endpoint as it approaches the viewport, with checking, unavailable, connection-error, and retry states. This keeps the homepage static while reading the current deployment's server configuration at request time. The check does not connect to Gmail or prove inbox delivery.

**After adding or updating environment variables in Vercel, redeploy the Production deployment.** Existing deployments retain their previous environment. Under Deployments, select the latest production deployment, choose Redeploy, and ensure the new deployment becomes Production. The old page's unavailable notice was computed at build time; the new runtime check removes that dependency. Visit `/api/contact` on the new deployment: `{ "available": true }` confirms the required configuration is present and valid, without exposing credentials. See [Vercel's environment variable documentation](https://vercel.com/docs/environment-variables).

`POST /api/contact` accepts same-origin JSON, enforces a streaming 24 KiB body limit, validates fields, and checks a honeypot. The full enquiry goes to the fixed `CONTACT_TO_EMAIL` inbox. Only after SMTP accepts it does the handler send a separate acknowledgement to the validated form email. Client-supplied sender, recipient, subject, or template fields are ignored. The acknowledgement contains fixed copy, the allowed enquiry category, and a reference; it does not echo arbitrary visitor-written names, messages, or URLs. Automatic-response suppression headers reduce mail loops. Each message's visible recipient and SMTP envelope agree, and both use the authenticated account as their envelope sender.

`lib/server/contact-email-template.ts` renders navy/coral HTML templates with inline styles, table layouts, mobile padding, accessible text, and plain-text alternatives. Submitted content is HTML-escaped. The owner notification includes the full enquiry and a reply button; the acknowledgement explains the next step and provides a portfolio link. Nodemailer receives the portrait as a buffer attachment, while arbitrary file/URL access stays disabled. The fixed portrait path is included in the Vercel route's output trace via `next.config.ts`. Preview files use fictional contact details.

TLS certificate verification stays enabled; port 587 must upgrade to TLS. Both sends are awaited, with separate non-pooled transports, bounded connection timeouts, and a 12-second overall SMTP deadline per message within the 30-second route budget. No background queue, automatic retry, or retained warm-instance state is introduced.

SMTP errors are sanitized. An unaccepted enquiry produces an error and never triggers an acknowledgement. If the enquiry succeeds but its acknowledgement fails or is rejected, the API returns `{ "ok": true, "confirmation": "unavailable" }`; the UI confirms the enquiry, explains the missing confirmation, and clears the form to avoid inviting a duplicate submission. Acknowledgement acceptance returns `confirmation: "sent"`. These results indicate SMTP acceptance, not guaranteed inbox delivery. Failed enquiries keep their form contents. Sanitized acknowledgement-failure logs include only the submission ID.

SMTP does **not** provide the old provider's idempotency guarantee. A stable Message-ID identifies retries for troubleshooting, but it does not guarantee deduplication. There are no automatic retries; a visitor's manual retry after an ambiguous network failure can produce a duplicate email. Stronger exactly-once processing would require persistent delivery state.

Configure a Vercel firewall rate limit for `POST /api/contact` (for example, five requests per IP per ten minutes, adjusted for your traffic). Each accepted enquiry can now generate two messages and consume twice the SMTP sending quota. The honeypot and fixed acknowledgement copy do not provide distributed rate limiting or verify ownership of the submitted email. No database or unbounded in-memory rate-limit map has been added.

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

Browser tests cover navigation, themes, project filters/dialogs, resume downloads, responsive image rendering, on-demand video playback, cursor behavior, motion preferences, hero preview motion, and no-JavaScript content. Contact API tests inject a mock mail sender and validate TLS/configuration boundaries; form browser tests mock availability and delivery, and never send actual email. Availability tests also exercise connection failure, unavailable configuration, manual retry, and the uncached runtime endpoint.

Email templates and portrait verification (September 11, 2026): lint, TypeScript, whitespace checks, and an isolated Node 22 / Webpack production build passed. The browser/API suite passed 67 tests with three device-specific skips. Coverage includes both recipient envelopes, acknowledgement ordering and failures, escaped HTML, fixed acknowledgement content, confirmation UI states, and MIME composition with an embedded JPEG and plain-text/HTML alternatives. The production route trace includes the portrait file. Desktop/mobile email previews are saved in `output/email-previews/`; actual inbox rendering, live SMTP delivery, and deployment were not performed.

Content integration verification (September 11, 2026): lint, TypeScript, whitespace checks, and the isolated Node 22 / Webpack production build passed. The full browser/API suite passed 58 tests, with three device-specific cases skipped. The added coverage checks the eight-project layout, omitted unconfirmed role/technology sections, Fitcoin's showcase label, and gallery references. Production previews were visually inspected in both themes and at 320px/390px widths, with no horizontal overflow or browser errors. A missing space between the hero sentences on mobile was corrected after this inspection. The static homepage includes all eight cards, the production canonical URL, and the updated Person employment data. No deployment or real email delivery was performed.

Developer-workbench verification (September 11, 2026): lint, TypeScript, whitespace checks, and the isolated Node 22 / Webpack production build passed. All 33 applicable desktop/mobile browser tests passed; three device-specific cases were skipped. Coverage includes preview switching, keyboard activation, stable stage dimensions, hidden-view and offscreen animation pause, reduced motion, no-JavaScript rendering, cursor behavior, gallery, video, and existing navigation. The built homepage remains static with its production canonical URL. Its hero contains no image, video, canvas, or Fitcoin reference. Desktop, light-theme, tablet, and 320px/390px layouts were inspected; no horizontal overflow or browser errors were observed. The updated code is local; deployed Core Web Vitals were not measured.

Fitcoin-theme and contact-availability verification (September 11, 2026): lint, TypeScript, and whitespace checks passed. The isolated Node 22 / Webpack build kept `/` static and `/api/contact` dynamic. It was built without SMTP variables, then started with dummy runtime variables; the readiness endpoint returned `{ "available": true }` and `Cache-Control: no-store`. The generated page used the production canonical URL, and no dummy SMTP password appeared in browser assets. Across the suite and one rerun after changing the hero test to scroll its stationary container, 50 distinct checks passed and three device-specific checks were skipped. Desktop, light-theme, mobile, and 320px layouts were inspected with no horizontal overflow or browser errors. All delivery tests used mocks; this work has not been deployed or tested for live inbox delivery.

The total emitted browser JavaScript decreased from 1,511,377 to 954,117 bytes versus the prior SMTP build (430,777 to 292,849 bytes using gzip). This includes the removed optional Three.js chunks and is not a first-load transfer or Core Web Vitals measurement.

SMTP migration verification: lint, TypeScript, and whitespace checks passed after correcting the injected environment type. An isolated Node 22 Webpack production build passed. All 17 targeted SMTP/API and desktop/mobile contact tests passed, with delivery mocked. A separate real Gmail SMTP verification confirmed the TLS connection and app-password authentication without sending mail. The local credential file is ignored and untracked; a dummy SMTP password was absent from the built static browser assets. Actual message delivery and the updated Vercel deployment remain unverified.

Redesign verification before the SMTP migration on September 11, 2026: lint, TypeScript, and whitespace checks passed; an isolated Node 22 / Next.js 16.3.4 Webpack production build passed. Across the browser/API suite and one targeted rerun after correcting test locators and viewport setup, 41 checks passed and four device-specific checks were skipped. The previous desktop gallery-loading failure is resolved by the static responsive sources. Desktop, mobile, light-theme, and 320px layouts were visually checked. Live email delivery and deployed Core Web Vitals remain unverified.

Next.js and its ESLint configuration were patched to 16.3.4 after npm reported [a Next.js security advisory](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4). The installation audit reported no remaining vulnerabilities. Local checks do not establish live Core Web Vitals or deployment/email delivery behavior.
