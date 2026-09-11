export const profile = {
  name: "Muhammad Arsalan",
  title: "Full-Stack Developer",
  email: "arslankhanhaq332@gmail.com",
  location: "Islamabad, Pakistan",
  phone: "+923093244976",
  phoneDisplay: "0309 3244976",
  github: "https://github.com/ArslanHaq",
  linkedin: "https://www.linkedin.com/in/muhammadarsalanulhaq/",
  fiverr: "https://www.fiverr.com/s/50rr0vb",
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
