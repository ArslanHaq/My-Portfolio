export type ProjectId = "cvvid" | "tsl" | "cell" | "visa" | "ddid" | "fitcoin";
export type ProjectCategory = "web" | "mobile" | "web3";
export interface Project {
  id: ProjectId;
  title: string;
  category: string;
  role: string;
  summary: string;
  contributions: string[];
  tech: string[];
  url: string | null;
  categories: ProjectCategory[];
  meta: string;
  short: string;
  tags: string[];
  scope: string;
}

/** Project descriptions and supplied links are based on the owner's resume. */
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
    "url": "https://www.cvvid.com/",
    "categories": [
      "web"
    ],
    "meta": "VIDEO EXPERIENCE / WEB",
    "short": "Record it. Edit it. Share your story. A video CV platform built around a simpler way to introduce yourself.",
    "tags": [
      "Next.js",
      "FFmpeg",
      "Docker"
    ],
    "scope": "Video CV platform"
  },
  {
    "id": "tsl",
    "title": "Think Study And Learn",
    "category": "AI assistant · Learning platform",
    "role": "Full-stack development",
    "summary": "An educational platform where students can register, watch video content, and access course materials. My work also includes a multimodal AI assistant for real-time voice conversations, text chat, and image understanding.",
    "contributions": [
      "Contributed to the full-stack educational platform, including course content and video-learning experiences.",
      "Used AWS services for scalable video hosting, reliability, and data management.",
      "Built a multimodal AI assistant using streaming speech recognition, speech synthesis, and vision models, with safety, analytics, and on-device/offline fallbacks."
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
    "url": "https://thinkstudylearn.com/",
    "categories": [
      "web"
    ],
    "meta": "AI & EDUCATION / FULL STACK",
    "short": "A richer way to learn, with course content and an AI assistant that listens, speaks, and understands images.",
    "tags": [
      "Next.js",
      "NestJS",
      "OpenAI",
      "AWS"
    ],
    "scope": "Voice · Text · Vision"
  },
  {
    "id": "cell",
    "title": "Cell Operative",
    "category": "Inventory management · Web & mobile",
    "role": "Web and React Native development",
    "summary": "A store and inventory management system spanning a web experience and a React Native mobile app. My work focused on pixel-perfect interfaces, application integration, and multilingual support on the web.",
    "contributions": [
      "Created pixel-perfect web interfaces and integrations using Next.js, TypeScript, Tailwind CSS, and Server Actions.",
      "Added multilingual support to the store and inventory management website.",
      "Built the React Native mobile app using Redux Toolkit, TypeScript, secure storage, and REST APIs."
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
    "url": "https://www.celloperative.se/",
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
    "scope": "Web + Mobile"
  },
  {
    "id": "visa",
    "title": "Online Visa System",
    "category": "Application workflows · Web development",
    "role": "Full-stack development · Idanimo LLC",
    "summary": "A dynamic online visa application system designed to let users apply without visiting embassies. Its flexible structure adapts to different countries’ visa requirements and integrates a PDF reader for document uploads and reviews.",
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
    "url": "https://visa.idnmo.com/",
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
    "short": "A mobile home for digitally signed documents, built with secure storage and a modern React Native foundation.",
    "tags": [
      "React Native",
      "Ethers",
      "Secure Storage"
    ],
    "scope": "Digital document wallet"
  },
  {
    "id": "fitcoin",
    "title": "Fitcoin",
    "category": "Blockchain integration · Web & mobile",
    "role": "Web3 front-end and mobile development · Aurora Solutions",
    "summary": "A connected web and mobile ecosystem with blockchain functionality. My work focused on bringing the blockchain backend into the React web interface and extending that experience to a React Native app.",
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
    "url": null,
    "categories": [
      "web",
      "mobile",
      "web3"
    ],
    "meta": "WEB3 / WEB + MOBILE",
    "short": "Connecting React and React Native interfaces to blockchain functionality across the Fitcoin ecosystem.",
    "tags": [
      "React",
      "React Native",
      "Ethers",
      "Viem"
    ],
    "scope": "Blockchain integration"
  }
];
