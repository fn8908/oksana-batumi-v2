import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { PROPERTIES } from "@/lib/properties";
import { BLOG_POSTS } from "@/lib/blog";

const BASE_URL = "https://www.oksana-batumi.com";

const STATIC_PAGES = [
  "",
  "/properties",
  "/about",
  "/contact",
  "/invest",
  "/batumi",
  "/blog",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of STATIC_PAGES) {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
    );
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: { languages },
      });
    }
  }

  for (const property of PROPERTIES) {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${BASE_URL}/${l}/properties/${property.slug}`])
    );
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/properties/${property.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  for (const post of BLOG_POSTS) {
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${BASE_URL}/${l}/blog/${post.slug}`])
    );
    for (const locale of routing.locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages },
      });
    }
  }

  return entries;
}
