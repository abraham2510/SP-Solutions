"use client";

import React, { useState, useMemo } from "react";
import { NewsCard } from "./NewsCard";
import { NewsFilter } from "./NewsFilter";
import { Newspaper } from "lucide-react";
import type { BlogPostCardData } from "@/lib/types/blog";

interface NewsListingClientProps {
  initialPosts: BlogPostCardData[];
  categoriesWithCounts: { category: string; count: number }[];
  featuredPost?: BlogPostCardData | null;
}

export function NewsListingClient({
  initialPosts = [],
  categoriesWithCounts = [],
  featuredPost,
}: NewsListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const matchSearch =
        !searchQuery.trim() ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.author && post.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // If showing 'All' with no search, highlight the first featured post separately if available
  const isDefaultView = selectedCategory === "All" && !searchQuery.trim();
  const heroPost = isDefaultView && featuredPost ? featuredPost : null;
  const gridPosts = heroPost
    ? filteredPosts.filter((p) => p.id !== heroPost.id)
    : filteredPosts;

  return (
    <div className="space-y-10">
      {/* Category Filter & Search Bar */}
      <NewsFilter
        categoriesWithCounts={categoriesWithCounts}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalArticles={filteredPosts.length}
      />

      {/* Featured Highlight Post */}
      {heroPost && (
        <div className="pt-2">
          <NewsCard post={heroPost} featuredHero={true} />
        </div>
      )}

      {/* Grid of Articles */}
      {gridPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridPosts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-white rounded-3xl border border-[#E7EAEE] p-8 space-y-3">
          <div className="w-14 h-14 rounded-full bg-[#00266A]/8 text-[#00266A] flex items-center justify-center mx-auto">
            <Newspaper className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-[#10151C]">
            No news articles found
          </h3>
          <p className="text-sm text-[#5B6572] max-w-md mx-auto">
            {searchQuery || selectedCategory !== "All"
              ? "No updates matched your search or category filter. Try selecting 'All Updates' or clearing your search."
              : "Check back soon for new announcements, product releases, and company updates."}
          </p>
          {(searchQuery || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-2 inline-flex px-4 py-2 rounded-full bg-[#00266A] text-white text-xs font-semibold hover:bg-[#001D52] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
