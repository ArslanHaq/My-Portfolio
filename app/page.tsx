import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { TechStack } from "@/components/tech-stack";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ScrollEffects } from "@/components/scroll-effects";
import { getSiteUrl, profile } from "@/lib/site";

export default function Page() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Senior Software Engineer",
    description: "Full-stack developer working across web, mobile, AI, and cloud.",
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin, profile.github],
    ...(getSiteUrl() ? { url: getSiteUrl() } : {}),
    alumniOf: { "@type": "CollegeOrUniversity", name: "FAST - National University of Computer and Emerging Sciences" },
    knowsAbout: ["Next.js", "React", "React Native", "TypeScript", "NestJS", "AWS", "Blockchain integration", "Multimodal AI assistants"],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollEffects />
      <Header />
      <main id="main">
        <Hero />
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
