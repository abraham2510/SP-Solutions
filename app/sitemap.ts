import type { MetadataRoute } from "next";
import { getAllProducts, getAllCategories, getServices } from "@/lib/data/public";
import { getPublishedBlogPosts } from "@/lib/data/blogs";

const BASE_URL =
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.spsolutionsc.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, services, blogData] = await Promise.all([
    getAllProducts().catch(() => []),
    getAllCategories().catch(() => []),
    getServices().catch(() => []),
    getPublishedBlogPosts({ limit: 500 }).catch(() => ({ posts: [], total: 0 })),
  ]);

  const newsPosts = blogData.posts || [];

  const productEntries: MetadataRoute.Sitemap = products
    .filter((p) => Boolean(p.slug && p.category_id))
    .map((p) => ({
      url: `${BASE_URL}/machines/${p.category_id}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const categoryEntries: MetadataRoute.Sitemap = categories
    .filter((cat) => Boolean(cat.slug))
    .map((cat) => ({
      url: `${BASE_URL}/machines/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }));

  const serviceEntries: MetadataRoute.Sitemap = services
    .filter((s) => Boolean(s.slug))
    .map((s) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    }));

  const newsEntries: MetadataRoute.Sitemap = newsPosts
    .filter((n) => Boolean(n.slug))
    .map((n) => ({
      url: `${BASE_URL}/news/${n.slug}`,
      lastModified: n.publishedAt ? new Date(n.publishedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/machines`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    ...categoryEntries,
    ...productEntries,
    ...serviceEntries,
    ...newsEntries,
  ];
}

