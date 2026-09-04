import type { Metadata } from "next";
import {
  getPublishedBlogPosts,
  getBlogCategoriesWithCounts,
  getFeaturedBlogPosts,
} from "@/lib/data/blogs";
import { NewsListingClient } from "./components/NewsListingClient";
import { Newspaper } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title:
    "News & Company Updates | SP Solutions Chennai — Machinery & Innovations",
  description:
    "Stay informed with the latest packaging machinery product launches, innovations, company events, trade exhibitions, and announcements from SP Solutions Chennai.",
  openGraph: {
    title: "News & Company Updates | SP Solutions Chennai",
    description:
      "Explore the latest news, product releases, trade exhibitions, and industrial packaging updates from SP Solutions.",
    type: "website",
    url: "https://spsolutionsc.com/news",
  },
};

export default async function NewsPage() {
  const [{ posts }, categoriesWithCounts, featuredPosts] = await Promise.all([
    getPublishedBlogPosts({ limit: 100 }),
    getBlogCategoriesWithCounts(),
    getFeaturedBlogPosts(1),
  ]);

  const primaryFeatured = featuredPosts[0] || null;

  return (
    <div className="min-h-screen bg-[#FAFBFD] pb-24">
      {/* Hero Header */}
      <section className="relative py-16 sm:py-20 bg-[#00266A] text-white overflow-hidden border-b border-[#001D52]">
        {/* Subtle Background Mesh */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        <div className="wrap relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[11px] font-bold tracking-widest uppercase shadow-xs">
            <Newspaper className="w-3.5 h-3.5 text-[#D5BD66]" />
            <span>COMPANY NEWS &amp; UPDATES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Latest Innovations, Releases &amp; Stories
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Discover new machine launches, live trial demos, upcoming
            exhibitions, technical achievements, and company announcements from
            SP Solutions.
          </p>
        </div>
      </section>

      {/* Main Listing Section */}
      <main className="wrap max-w-6xl mx-auto pt-10 sm:pt-14">
        <NewsListingClient
          initialPosts={posts}
          categoriesWithCounts={categoriesWithCounts}
          featuredPost={primaryFeatured}
        />
      </main>
    </div>
  );
}
