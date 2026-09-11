export const showreel = {
  title: "Web development showreel",
  description: "A 58-second look at web interfaces, learning tools, responsive layouts, and interactions across Fitcoin, XcelTube, Think Study Learn, SupplyED, and Pherrix.",
  src: "/media/portfolio-showreel.mp4",
  poster: "/media/showreel-poster.webp",
  width: 1280,
  height: 720,
  duration: "PT58S",
};

export const showcaseImages = [
  {
    id: "custom-websites",
    title: "Custom websites. Considered experiences.",
    category: "WEB DEVELOPMENT",
    description: "Distinctive interfaces across Fitcoin, SupplyED, and XcelTube.",
    alt: "Custom website presentation featuring Fitcoin, the SupplyED school staffing platform, and XcelTube course content, built with React, Next.js, and TypeScript.",
  },
  {
    id: "ai-learning-platforms",
    title: "A smarter way to learn.",
    category: "LEARNING PLATFORMS & AI",
    description: "AI learning tools and course experiences for Think Study Learn and XcelTube.",
    alt: "Think Study Learn question upload and study resource interfaces alongside XcelTube video lessons, lecture notes, and practice questions.",
  },
  {
    id: "responsive-mobile-design",
    title: "Thoughtful at every size.",
    category: "RESPONSIVE DESIGN · UI CONCEPTS",
    description: "Fitcoin web design alongside Fitcoin and Groovy-inspired mobile UI concepts.",
    alt: "Fitcoin desktop website with mobile UI concepts showing fitness activity and a Groovy-inspired home style selector.",
  },
  {
    id: "business-applications",
    title: "Built around the way you work.",
    category: "BUSINESS APPLICATIONS",
    description: "SupplyED prototype pricing, Pherrix navigation, and a Think Study Learn calculator.",
    alt: "Business application presentation with SupplyED prototype pricing, the Pherrix website, and a Think Study Learn university admission aggregate calculator.",
  },
  {
    id: "distinctive-web-design",
    title: "An identity of its own.",
    category: "INTERFACE DESIGN",
    description: "Three different visual directions: my portfolio, Pherrix, and Fitcoin.",
    alt: "Website design presentation featuring Muhammad Arsalan's charcoal and lime portfolio, the blue Pherrix interface, and the Fitcoin product website.",
  },
].map(image => ({ ...image, src: `/media/${image.id}.webp`, width: 1619, height: 971 }));
