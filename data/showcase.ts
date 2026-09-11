import type { WorkReferenceId } from "./work-references";

export const showreel = {
  title: "Web development showreel",
  description: "A 58-second look at web interfaces, learning tools, responsive layouts, and interactions across Fitcoin, XcelTube, Think Study Learn, SupplyED, and Pherrix.",
  src: "/media/portfolio-showreel.mp4",
  poster: "/media/showreel-poster.webp",
  width: 1280,
  height: 720,
  duration: "PT58S",
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
    references: ["tsl", "xceltube"],
    title: "A smarter way to learn.",
    category: "LEARNING PLATFORMS & AI",
    description: "AI learning tools and course experiences for Think Study Learn and XcelTube.",
    alt: "Think Study Learn question upload and study resource interfaces alongside XcelTube video lessons, lecture notes, and practice questions.",
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
    references: ["supplyed", "pherrix", "tsl"],
    title: "Built around the way you work.",
    category: "BUSINESS APPLICATIONS",
    description: "SupplyED prototype pricing, Pherrix corporate navigation, and sample results from Think Study Learn’s aggregate calculator.",
    alt: "Business application presentation with SupplyED prototype pricing, the Pherrix website, and a Think Study Learn university admission aggregate calculator.",
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
