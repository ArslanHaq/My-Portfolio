# Muhammad Arsalan — Portfolio

A personal portfolio built with **Next.js App Router, React, TypeScript, and Tailwind CSS**. The charcoal-and-lime design presents full-stack, mobile, cloud, AI, and Web3 experience.

## Included

- Server-rendered hero, biography, technical skills, employment history, education, certifications, and contact sections.
- Six project showcases, category filters, and keyboard-accessible project dialogs.
- Light/dark themes with persisted preferences.
- Responsive navigation, scroll effects, and reduced-motion support.
- Original PDF resume, served directly from the public folder.
- Five optimized presentation images and a 58-second, on-demand video showreel.
- Page metadata, structured data, generated social-sharing artwork, sitemap, and robots configuration.
- Email links and a copy-email button. No pretend contact form or unconfigured email backend.

Project visuals are decorative interface concepts, not actual production screenshots. Project descriptions and supplied project links are based on the owner's resume. The GitHub profile points to the account supplied for this repository. No visitor tracking or analytics account is configured.

## Publish without coding

### 1. Upload to the existing GitHub repository

Repository: `ArslanHaq/My-Portfolio`

Extract the project ZIP on your computer. On the empty repository page, choose **uploading an existing file** (or **Add file → Upload files**). Drag the **contents of the extracted folder**, including the `app`, `components`, `data`, `lib`, `public`, and `tests` folders, onto the upload area. Keep the folder structure intact. Commit the files to `main`.

`package.json` must be at the repository root, beside the `app` directory. Do not upload just the ZIP, and do not put the whole application inside an extra nested directory. Files beginning with a dot may be hidden by the operating system; include them when possible. They contain standard project configuration, not credentials. The app does not require `.env.example` to deploy.

### 2. Import into Vercel

Sign in to Vercel using your own account. Choose **Add New → Project**, grant access to `ArslanHaq/My-Portfolio`, and import that repository.

Use these settings:

| Setting | Value |
| --- | --- |
| Framework preset | Next.js |
| Root directory | Repository root (`./`) |
| Node.js | 22.x, also declared in `package.json` |
| Install command | Default (`npm install`) |
| Build command | Default (`npm run build`) |
| Output directory | Leave the Next.js default |
| Environment variables | None required |

Click **Deploy**. Vercel will install the dependencies and run the first production build. After a successful deployment, use the website address displayed by Vercel. A successful repository upload is not itself a live deployment.

## Resume download

The original PDF is included at:

```text
public/resume/Muhammad-Arsalan-Resume.pdf
```

Every resume button links to:

```text
/resume/Muhammad-Arsalan-Resume.pdf
```

It is a normal public static file, not a base64 string, private endpoint, or generated replacement. On a deployed site, append that path to the actual site origin to access it. Anyone with that public URL can access the PDF and the contact information it contains.

## Local development

Node.js 22 is declared for the project.

```bash
npm install
npm run dev
```

For a production build and server:

```bash
npm run build
npm run start
```

No API key, database, or GitHub token is required by the website.

## Project layout

```text
app/                    Pages, layout, stylesheet, metadata, social image
components/             Reusable server and client components
data/projects.ts        Typed project content and supplied external links
lib/site.ts             Profile details and deployed-origin resolution
lib/preferences.ts      Browser-only theme/motion preference handling
public/resume/          Original downloadable resume PDF
tests/                  Playwright browser tests
next.config.ts          Next.js and response-header configuration
vercel.json             Vercel framework selection
```

## Updating the portfolio

### Showcase media

`data/showcase.ts` contains the image descriptions and video metadata. The corresponding web-ready files live in `public/media/`. The five original 1619 × 971 PNG presentations were encoded as WebP at quality 85 without cropping; keep the source originals outside the deployed app. The 58-second showreel uses H.264/AAC at 1280 × 720 with MP4 fast-start metadata and a separate WebP poster.

The showcase is a Server Component. Images use `next/image` with explicit dimensions, responsive `sizes`, and default lazy loading. The native video uses `preload="none"`, inline playback, and user controls. No autoplay, third-party video embed, or gallery library is needed. Opening an image displays the full presentation. Visible captions identify prototypes and mobile UI concepts.

The image sitemap and gallery structured data use the configured production origin. Set `NEXT_PUBLIC_SITE_URL` to your public HTTPS origin for a custom domain; Vercel production URLs remain supported. Gallery video metadata describes the supplied clip, but no unverified upload date is supplied and video rich-result eligibility is not asserted. Set an accurate first-publication date before pursuing video rich results.

Edit project text and technologies in `data/projects.ts`. Profile links and the resume URL are in `lib/site.ts`. Biography and employment content are in the corresponding section components. Replace the PDF at its existing path to keep the download links unchanged.

A custom domain is optional. On Vercel, production-origin metadata uses the platform-provided URL. Set `NEXT_PUBLIC_SITE_URL` to a full `https://` origin when using a custom domain. This variable is a public website address, not a secret.

## Verification

Media integration checks on September 11, 2026:

- ESLint passed after escaping the existing literal apostrophes in the hero's code illustration.
- TypeScript passed.
- The development preview served the homepage and image sitemap successfully, and the rendered Person and ImageGallery JSON-LD used the configured local test origin.
- The desktop/mobile Playwright run finished with 18 passing checks, one intentionally skipped desktop-only navigation check, and one failing desktop image-loading check. The single failing check was retried once with a 15-second allowance and remained unsuccessful. Its optimized image requests stayed pending; direct requests to those same image URLs returned HTTP 200, and the mobile image test passed. Desktop image rendering remains unresolved.
- Video playback passed on desktop and mobile, with no MP4 requests before play and HTTP 206 byte-range responses for seeking. The MP4 metadata precedes the media data for fast-start playback.
- The five presentation assets total 656,344 bytes versus 8,160,394 original PNG bytes (approximately 92% smaller). The video is 5,372,730 bytes versus 11,404,659 original bytes (approximately 53% smaller).
- The default Turbopack production build failed because its CSS worker could not bind a local port (`Operation not permitted (os error 1)`). A retry with Node 22 and elevated execution encountered the same restriction. No further production-build retries were made. Browser checks used a Webpack development preview and do not establish production readiness or live Core Web Vitals.

A lockfile is included for reproducible installs. Use Node.js 22 and run:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

The local preview used `NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000` only as a process environment variable. Use the real production origin when deploying. No localhost domain was saved to the application configuration.

## Security

Do not add access tokens, passwords, private keys, or personal account credentials to this repository, the frontend, or any `NEXT_PUBLIC_` variable. Publishing credentials belong in the hosting/provider account's secure connection settings, not in the portfolio code.
