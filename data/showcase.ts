import type { WorkReferenceId } from "./work-references";

export const showreel = {
  title: "Web development showreel",
  description: "A 53-second look at web interfaces, learning tools, responsive layouts, and interactions across Fitcoin, XcelTube, SupplyED, and Pherrix.",
  src: "/media/portfolio-showreel.mp4",
  poster: "/media/showreel-poster.webp",
  width: 1280,
  height: 720,
  duration: "PT53S",
};

type Presentation = { id: string; title: string; category: string; description: string; alt: string; references: WorkReferenceId[] };

const presentations: Presentation[] = [
  {
    id: "custom-websites",
    references: ["fitcoin", "supplyed", "xceltube"],
    title: "Custom websites. Considered experiences.",
    category: "WEB DEVELOPMENT",
    description: "Fitcoin’s product showcase, SupplyED’s school staffing prototype, and XcelTube’s learning experience.",
    alt: "Multi-project presentation featuring the Fitcoin marketing website, SupplyED school staffing prototype, and XcelTube course content.",
  },
  {
    id: "ai-learning-platforms",
    references: ["xceltube"],
    title: "A smarter way to learn.",
    category: "LEARNING PLATFORMS & AI",
    description: "XcelTube’s content analytics dashboard alongside its video lessons, lecture notes, and practice questions.",
    alt: "XcelTube admin content analytics with daily views per day and lecture engagement, alongside an XcelTube physics lesson with chapter content.",
  },
  {
    id: "responsive-mobile-design",
    references: ["fitcoin"],
    title: "Thoughtful at every size.",
    category: "RESPONSIVE DESIGN · UI CONCEPTS",
    description: "Fitcoin’s website presentation alongside Fitcoin- and Groovy-inspired mobile UI concepts.",
    alt: "Fitcoin desktop website with mobile UI concepts showing fitness activity and a Groovy-inspired home style selector.",
  },
  {
    id: "business-applications",
    references: ["supplyed", "pherrix", "xceltube"],
    title: "Built around the way you work.",
    category: "BUSINESS APPLICATIONS",
    description: "SupplyED prototype pricing, Pherrix corporate navigation, and XcelTube’s sign-up analytics dashboard.",
    alt: "Business application presentation with SupplyED prototype pricing, the Pherrix website, and the XcelTube admin sign-up sources dashboard showing how new students found the platform.",
  },
  {
    id: "distinctive-web-design",
    references: ["pherrix", "fitcoin"],
    title: "An identity of its own.",
    category: "INTERFACE DESIGN",
    description: "Brand and navigation studies across Pherrix, Fitcoin, and an earlier version of this portfolio.",
    alt: "Website design presentation featuring Muhammad Arsalan's charcoal and lime portfolio, the blue Pherrix interface, and the Fitcoin product website.",
  },
];

export const showcaseImages = presentations.map(image => ({ ...image, src: `/media/${image.id}.webp`, width: 1619, height: 971 }));
