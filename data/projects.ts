import { workReferences } from "./work-references";

export type ProjectId = "cvvid" | "tsl" | "xceltube" | "fitcoin" | "pherrix" | "cell" | "visa" | "ddid";
export type ProjectCategory = "web" | "mobile" | "web3";
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
    "id": "tsl",
    "title": "Think Study Learn",
    "category": "AI assistant · Learning platform",
    "role": "Full-stack development",
    "summary": "An educational platform combining video lessons, course materials, and AI-assisted learning. I contributed to the web application, backend integration, and AWS-based content delivery, alongside a multimodal assistant for voice, text, and image interaction.",
    "contributions": [
      "Contributed to student registration, course content, and video-learning experiences.",
      "Connected the application with NestJS services and AWS infrastructure for content delivery and data management.",
      "Developed a multimodal AI assistant supporting voice conversations, text chat, and image understanding."
    ],
    "tech": [
      "Next.js",
      "NestJS",
      "Redux Toolkit",
      "OpenAI",
      "AWS EC2",
      "ECR",
      "IAM",
      "S3",
      "CloudFront"
    ],
    "url": workReferences.tsl.url,
    "categories": [
      "web"
    ],
    "meta": "AI & EDUCATION / FULL STACK",
    "short": "Video lessons, course materials, and an AI assistant for voice, text, and image-based learning.",
    "tags": [
      "Next.js",
      "NestJS",
      "OpenAI",
      "AWS"
    ],
    "scope": "Voice · Text · Vision"
  },
  {
    "id": "xceltube",
    "title": "XcelTube",
    "category": "Learning platform · Web applications",
    "role": null,
    "summary": "A study experience connecting video lessons, PDF notes, practice questions, and AI-assisted learning. Chapter navigation and immediate answer feedback help students move between content and practice.",
    "contributions": [
      "Chapter-based video lessons and PDF notes with page and zoom controls.",
      "Practice questions with correctness feedback and answer explanations.",
      "AI tutor conversations and follow-up prompts."
    ],
    "detailHeading": "Interface highlights",
    "tech": [],
    "url": workReferences.xceltube.url,
    "categories": [
      "web"
    ],
    "meta": "INTERACTIVE LEARNING / WEB",
    "short": "Video lessons, PDF notes, practice questions, and AI-assisted learning in one study interface.",
    "tags": [
      "Learning platform",
      "Interactive tools"
    ],
    "scope": "Education platform"
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
      "mobile"
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
