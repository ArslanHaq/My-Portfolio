import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  return url ? [{ url, changeFrequency: "monthly", priority: 1 }] : [];
}
