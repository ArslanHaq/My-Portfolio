import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { showcaseImages, showreel } from "@/data/showcase";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = getSiteUrl();
  return url ? [{
    url,
    changeFrequency: "monthly",
    priority: 1,
    images: [...showcaseImages.map(image => `${url}${image.src}`), `${url}${showreel.poster}`],
  }] : [];
}
