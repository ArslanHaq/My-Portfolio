export const profile = {
  name: "Muhammad Arsalan",
  title: "Full-Stack Developer",
  email: "arslankhanhaq332@gmail.com",
  location: "Islamabad, Pakistan",
  github: "https://github.com/ArslanHaq",
  linkedin: "https://www.linkedin.com/in/muhammad-arsalan-ul-haq-47289a185/",
  resume: "/resume/Muhammad-Arsalan-Resume.pdf",
};

export const siteTitle = "Muhammad Arsalan — Full-Stack Developer · Web, Mobile & AI";
export const siteDescription = "Muhammad Arsalan is a full-stack developer and Senior Software Engineer building web platforms, React Native apps, AI learning experiences, and blockchain integrations.";

/** Use the deployed domain without requiring a secret or inventing a public URL. */
export function getSiteUrl(): string | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL
    || process.env.VERCEL_PROJECT_PRODUCTION_URL
    || process.env.VERCEL_URL;
  if (!configured) return undefined;
  try {
    const url = new URL(configured.startsWith("http") ? configured : `https://${configured}`);
    return ["https:", "http:"].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}
