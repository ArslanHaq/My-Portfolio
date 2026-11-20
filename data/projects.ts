import { workReferences } from "./work-references";

export type ProjectId = "screening" | "xceltube" | "cvvid" | "biometrics" | "fitcoin" | "pherrix" | "cell" | "visa" | "ddid";
export type ProjectCategory = "web" | "mobile" | "web3" | "fintech";
export interface Project {
  id: ProjectId;
  title: string;
  category: string;
  role: string | null;
  summary: string;
  contributions: string[];
  detailHeading?: string;
  tech: string[];
  url: string | null;
  linkLabel?: string;
  linkNote?: string;
  categories: ProjectCategory[];
  meta: string;
  short: string;
  tags: string[];
  scope: string;
}

/** Owner-supplied work descriptions. Unconfirmed roles and stacks stay absent. */
export const projects: Project[] = [
  {
    "id": "screening",
    "title": "Sanctions Screening Platform",
    "category": "Bank compliance · Dashboards & data",
    "role": "Full-stack development · Idanimo LLC",
    "summary": "An on-premises sanctions, PEP and payment-screening platform that bank compliance teams use to check people, organisations and payments against official watchlists. I rebuilt its staff and admin web apps, built its dashboards and reports, and made screening fast and reliable at volume.",
    "contributions": [
      "Rebuilt the staff and admin web apps with Next.js 16, React 19, TypeScript and Tailwind CSS, using TanStack Query and Table and an API client generated from OpenAPI.",
      "Built the overview dashboard: 30-day KPIs, a 14-day Recharts trend of matched and not-matched searches, monthly usage against each organisation’s quota, and matches by list, all computed with SQL aggregates.",
      "Batch screening of up to 1,000 records per file, each screened as its own search, with results cached for an hour so analysts can filter, review and export without re-running the batch.",
      "Kept screening fast under load with worker processes that recycle every 2,000 checks and a prebuilt local sanctions database, while heavy exports (ZIP, CSV, XLSX) run as background jobs.",
      "Made watchlist updates safe: new versions install only after signature, checksum and structure checks, and lists that shrink sharply or roll back are refused.",
      "Built multi-tenant administration (products and quotas per organisation, roles, rate-limited API keys with usage tracking, case-review workflows) and a Python/FastAPI update service with scheduled builds and change reports.",
      "Every release is gated by Playwright tests, 376 API checks and an 846-search regression suite that guards match accuracy."
    ],
    "detailHeading": "What I built",
    "tech": [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "Recharts",
      "Python",
      "FastAPI",
      "SQLite",
      "Docker",
      "Nginx",
      "Playwright"
    ],
    "url": null,
    "categories": [
      "web",
      "fintech"
    ],
    "meta": "FINTECH COMPLIANCE / FULL STACK",
    "short": "Sanctions, PEP and payment screening for banks, with live dashboards, batch screening, case review and signed watchlist updates.",
    "tags": [
      "Next.js",
      "Recharts",
      "FastAPI"
    ],
    "scope": "Dashboards · Batch · Cases",
    "linkNote": "This platform runs on banks’ own servers, so there is no public link. Get in touch to hear more about how it works."
  },
  {
    "id": "xceltube",
    "title": "XcelTube",
    "category": "AI tutor · Exam preparation platform",
    "role": "Lead developer · Full stack",
    "summary": "An exam-preparation platform for students in Pakistan, with video lectures, past papers, practice tests and an AI tutor. As lead developer I built most of the web app, the NestJS API and the admin panel.",
    "contributions": [
      "Built an AI tutor on Amazon Bedrock with streamed answers, maths rendering, and image and PDF understanding.",
      "Added a voice tutor using Amazon Nova 2 Sonic speech-to-speech streaming, with live captions shown in Urdu script.",
      "Made the tutor aware of the subject, chapter, lecture or past paper it is opened from, with study shortcuts, tutor personas and usage limits by plan.",
      "Built courses, past papers, full-length mock tests, a practice-paper builder, quizzes and a leaderboard.",
      "Added Easypaisa subscriptions, promo codes, referrals, Google sign-in and two-factor authentication.",
      "Built the admin dashboards: user and subscription management filtered by package, payment and account status, with payment approval and CSV export.",
      "Built content analytics (daily views and engagement across lectures, notes and papers, from 7 days to 12 months) and sign-up source analytics (channel, target exam, subject and region)."
    ],
    "detailHeading": "What I built",
    "tech": [
      "Next.js",
      "NestJS",
      "TypeScript",
      "MongoDB",
      "Amazon Bedrock",
      "AWS S3",
      "CloudFront",
      "Firebase"
    ],
    "url": workReferences.xceltube.url,
    "categories": [
      "web"
    ],
    "meta": "AI TUTOR & EXAM PREP / FULL STACK",
    "short": "Exam preparation with video lectures, past papers, practice tests and an AI tutor for chat, voice and uploads.",
    "tags": [
      "Next.js",
      "NestJS",
      "Amazon Bedrock",
      "AI tutor"
    ],
    "scope": "Chat · Voice · Files"
  },
  {
    "id": "cvvid",
    "title": "CVVID",
    "category": "Video platform · Web development",
    "role": "Lead development · Idanimo LLC",
    "summary": "A video CV platform that lets people record or upload a video, edit their story, and share it through a QR code. I led its development, bringing the creation and sharing experience together.",
    "contributions": [
      "Led development of the video CV platform, including video recording, uploads, editing, and QR-based sharing.",
      "Worked with Next.js, Server Actions, FFmpeg, and Docker for the application and video-processing stack.",
      "Integrated authentication and social login with NextAuth, alongside SEO and Google Analytics."
    ],
    "tech": [
      "Next.js",
      "NextAuth",
      "FFmpeg",
      "Docker",
      "Server Actions",
      "Tailwind CSS",
      "Google Analytics"
    ],
    "url": workReferences.cvvid.url,
    "categories": [
      "web"
    ],
    "meta": "VIDEO EXPERIENCE / WEB",
    "short": "A video CV platform with recording, editing, authentication, and QR-code sharing.",
    "tags": [
      "Next.js",
      "FFmpeg",
      "Docker"
    ],
    "scope": "Video CV platform"
  },
  {
    "id": "biometrics",
    "title": "Biometric Identity Verification",
    "category": "Digital identity · Banking apps",
    "role": "Development · Idanimo LLC",
    "summary": "Biometric identity verification used in banks’ mobile apps, checking customers against national identity records during remote onboarding. I worked on fingerprint capture, liveness and face matching, and on protecting the data in transit.",
    "contributions": [
      "Captured fingerprints and generated WSQ fingerprint templates for verification against national identity records.",
      "Worked on liveness detection and face matching engines for remote identity verification, to prevent spoofing and impersonation.",
      "Encrypted API request and response payloads between the mobile apps and verification services to protect biometric and identity data."
    ],
    "tech": [
      "WSQ fingerprint templates",
      "Liveness detection",
      "Face matching",
      "Payload encryption"
    ],
    "url": null,
    "categories": [
      "mobile",
      "fintech"
    ],
    "meta": "DIGITAL IDENTITY / BANKING",
    "short": "Fingerprint, liveness and face-matching verification for banks’ mobile apps, with encrypted payloads end to end.",
    "tags": [
      "Biometrics",
      "Liveness",
      "Encryption"
    ],
    "scope": "Fingerprint · Face · Liveness",
    "linkNote": "This work runs inside banks’ own apps, so there is no public link. Get in touch to discuss identity verification."
  },
  {
    "id": "fitcoin",
    "title": "Fitcoin",
    "category": "Web3 fitness · Web & mobile",
    "role": "React and React Native contributor · Aurora Solutions",
    "summary": "I contributed to Fitcoin’s React web application and React Native mobile app, connecting fitness interfaces with blockchain services, application state, and wallet interactions.",
    "contributions": [
      "Integrated blockchain functionality into the React web application’s front end.",
      "Used Ethers, Web3Modal, Viem, and MetaMask to connect the user interface with blockchain functionality.",
      "Extended the Fitcoin ecosystem through a React Native mobile app with corresponding blockchain integrations."
    ],
    "tech": [
      "React",
      "React Native",
      "Redux Toolkit",
      "Ethers",
      "Web3Modal",
      "Viem",
      "MetaMask"
    ],
    "url": workReferences.fitcoin.url,
    "categories": [
      "web",
      "mobile",
      "web3"
    ],
    "meta": "WEB3 / WEB + MOBILE",
    "short": "Web and mobile fitness interfaces connected with Web3 services and wallet functionality.",
    "tags": [
      "React",
      "React Native",
      "Ethers",
      "Viem"
    ],
    "scope": "Blockchain integration",
    "linkLabel": "View Fitcoin showcase",
    "linkNote": "The linked Webflow website is a product showcase. My React and React Native contributions cover the application and blockchain integrations."
  },
  {
    "id": "pherrix",
    "title": "Pherrix",
    "category": "Corporate website · Biotechnology",
    "role": null,
    "summary": "A biotech corporate website organized around bento-style navigation and connected content pages. Its visual system brings science, pipeline, clinical, team, news, and publication information into a clear structure.",
    "contributions": [
      "Bento-style homepage navigation across the company’s content areas.",
      "Connected pages with transitions and a consistent visual hierarchy.",
      "Pipeline and stage information presented through a structured interface."
    ],
    "detailHeading": "Interface highlights",
    "tech": [],
    "url": workReferences.pherrix.url,
    "categories": [
      "web"
    ],
    "meta": "CORPORATE WEBSITE / DESIGN",
    "short": "A biotech website with bento-style navigation, page transitions, and organized pipeline content.",
    "tags": [
      "Website design",
      "Bento navigation"
    ],
    "scope": "Corporate website"
  },
  {
    "id": "cell",
    "title": "Cell Operative",
    "category": "Inventory management · Web & mobile",
    "role": "Web and React Native development",
    "summary": "Web and mobile interfaces for store and inventory management. I implemented detailed web designs with Next.js and TypeScript and developed a connected React Native application.",
    "contributions": [
      "Developed web interfaces with Next.js, TypeScript, Tailwind CSS, and Server Actions.",
      "Built the React Native application with Redux Toolkit, secure storage, and REST API integrations."
    ],
    "tech": [
      "Next.js",
      "React Native",
      "TypeScript",
      "Server Actions",
      "Redux Toolkit",
      "Tailwind CSS",
      "REST APIs",
      "Secure Storage"
    ],
    "url": workReferences.cell.url,
    "categories": [
      "web",
      "mobile"
    ],
    "meta": "BUSINESS SOFTWARE / WEB + MOBILE",
    "short": "Store and inventory management, brought together through considered web and mobile experiences.",
    "tags": [
      "React Native",
      "TypeScript",
      "Next.js"
    ],
    "scope": "Web + Mobile",
    "linkLabel": "View public reference",
    "linkNote": "The supplied public website is a reference for Cell Operative; it is not an authenticated inventory dashboard."
  },
  {
    "id": "visa",
    "title": "Online Visa System",
    "category": "Application workflows · Web development",
    "role": "Application development · Idanimo LLC",
    "summary": "A configurable online visa application system that adapts to different countries’ requirements. My work combined application workflows with PDF viewing and document handling.",
    "contributions": [
      "Developed the online visa application experience using Next.js, Server Actions, server-side rendering, and TypeScript.",
      "Built a flexible structure to accommodate differing visa requirements across countries using React Flow.",
      "Integrated a PDF reader to support document uploads and reviews."
    ],
    "tech": [
      "Next.js",
      "TypeScript",
      "React Flow",
      "Server Actions",
      "Server-side Rendering",
      "Tailwind CSS",
      "PDF Integration"
    ],
    "url": workReferences.visa.url,
    "categories": [
      "web"
    ],
    "meta": "DYNAMIC WORKFLOWS / FULL STACK",
    "short": "Country-specific visa requirements, flexible application flows, and document review in one digital experience.",
    "tags": [
      "Next.js",
      "React Flow",
      "TypeScript"
    ],
    "scope": "Application workflows"
  },
  {
    "id": "ddid",
    "title": "DDID Wallet",
    "category": "Digital documents · Mobile development",
    "role": "React Native development · Idanimo LLC",
    "summary": "A React Native wallet for securely storing digitally signed documents. I built the wallet experience and worked on modernizing the application’s underlying dependencies.",
    "contributions": [
      "Built a React Native wallet for storing digitally signed documents.",
      "Used Hooks, Redux Toolkit, Ethers, and secure storage in the mobile application.",
      "Migrated the project from React 16 to React 18, updated dependencies, and improved overall performance."
    ],
    "tech": [
      "React Native",
      "React Hooks",
      "Redux Toolkit",
      "Ethers",
      "Secure Storage"
    ],
    "url": null,
    "categories": [
      "mobile",
      "fintech"
    ],
    "meta": "DIGITAL IDENTITY / MOBILE",
    "short": "A React Native wallet for digitally signed documents, with secure storage and modernized dependencies.",
    "tags": [
      "React Native",
      "Ethers",
      "Secure Storage"
    ],
    "scope": "Digital document wallet"
  }
];
