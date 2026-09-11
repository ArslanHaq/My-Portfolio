import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Showcase } from "@/components/showcase";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { TechStack } from "@/components/tech-stack";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ScrollEffects } from "@/components/scroll-effects";
import { getSiteUrl, profile } from "@/lib/site";
import { showcaseImages, showreel } from "@/data/showcase";

export default function Page() {
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Senior Software Engineer",
    description: "Full-stack developer working across web, mobile, AI, and cloud.",
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin, profile.github],
    ...(siteUrl ? { url: siteUrl, "@id": `${siteUrl}/#person` } : {}),
    alumniOf: { "@type": "CollegeOrUniversity", name: "FAST - National University of Computer and Emerging Sciences" },
    knowsAbout: ["Next.js", "React", "React Native", "TypeScript", "NestJS", "AWS", "Blockchain integration", "Multimodal AI assistants"],
  };
  const galleryData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Muhammad Arsalan — Design and development showcase",
    description: "Web development presentations, learning platforms, responsive interface concepts, and a portfolio showreel.",
    ...(siteUrl ? { url: `${siteUrl}/#showcase` } : {}),
    creator: siteUrl ? { "@id": `${siteUrl}/#person` } : { "@type": "Person", name: profile.name },
    image: showcaseImages.map(item => ({
      "@type": "ImageObject",
      name: item.title,
      description: item.alt,
      contentUrl: `${siteUrl}${item.src}`,
      width: item.width,
      height: item.height,
    })),
    video: {
      "@type": "VideoObject",
      name: showreel.title,
      description: showreel.description,
      thumbnailUrl: `${siteUrl}${showreel.poster}`,
      contentUrl: `${siteUrl}${showreel.src}`,
      duration: showreel.duration,
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      {siteUrl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryData).replace(/</g, "\\u003c") }} />}
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollEffects />
      <Header />
      <main id="main">
        <Hero />
        <Showcase />
        <Projects />
        <About />
        <TechStack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
