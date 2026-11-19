import { MetadataRoute } from "next";
import { productsData } from "@/data/products";
import { absoluteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  // 1. Static main pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/products"),
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/why-choose-us"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/quality-export-process"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/registrations"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Product Category pages (/products/[slug])
  const productCategoryRoutes: MetadataRoute.Sitemap = productsData.categories.map((cat) => ({
    url: absoluteUrl(`/products/${cat.slug}`),
    lastModified: buildDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 3. Steel item subpages (/products/steel/[item])
  const steelCategory = productsData.categories.find((c) => c.slug === "steel");
  const steelItemRoutes: MetadataRoute.Sitemap = (steelCategory?.items || []).map((item) => ({
    url: absoluteUrl(`/products/steel/${item.slug}`),
    lastModified: buildDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productCategoryRoutes, ...steelItemRoutes];
}

