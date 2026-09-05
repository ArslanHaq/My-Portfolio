# Muhammad Arsalan — Portfolio

A personal portfolio built with **Next.js App Router, React, TypeScript, and Tailwind CSS**. The charcoal-and-lime design presents full-stack, mobile, cloud, AI, and Web3 experience.

## Included

- Server-rendered hero, biography, technical skills, employment history, education, certifications, and contact sections.
- Six project showcases, category filters, and keyboard-accessible project dialogs.
- Light/dark themes with persisted preferences.
- Responsive navigation, scroll effects, and reduced-motion support.
- Original PDF resume, served directly from the public folder.
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

Edit project text and technologies in `data/projects.ts`. Profile links and the resume URL are in `lib/site.ts`. Biography and employment content are in the corresponding section components. Replace the PDF at its existing path to keep the download links unchanged.

A custom domain is optional. On Vercel, production-origin metadata uses the platform-provided URL. Set `NEXT_PUBLIC_SITE_URL` to a full `https://` origin when using a custom domain. This variable is a public website address, not a secret.

## Verification

Checks performed when preparing this package:

- TypeScript/TSX and configuration syntax parsed successfully.
- Local source imports were checked for missing files.
- JSON and CSS syntax were checked.
- The included PDF was verified byte-for-byte against the uploaded original.
- The project was scanned for GitHub credential patterns; none were present.

**A full Next.js production build, semantic type check, dependency audit, and React browser tests were not executed in the preparation environment because external package installation was unavailable.** The source checks above are not a substitute for a successful production build. No lockfile is supplied; the initial install will create one, which should then be committed for reproducible subsequent installs.

Browser tests are included for the home page, responsive layout, filters, project dialog, theme persistence, PDF download, mobile navigation, and reduced motion. To run them after dependency installation:

```bash
npm run typecheck
npm run lint
npx playwright install chromium
npm run test:e2e
```

## Security

Do not add access tokens, passwords, private keys, or personal account credentials to this repository, the frontend, or any `NEXT_PUBLIC_` variable. Publishing credentials belong in the hosting/provider account's secure connection settings, not in the portfolio code.
