"use client";

import Link from "next/link";
import { Calendar, User, ArrowRight, Clock, Newspaper } from "lucide-react";
import type { BlogPostCardData } from "@/lib/types/blog";

interface NewsCardProps {
  post: BlogPostCardData;
  featuredHero?: boolean;
}

export function NewsCard({ post, featuredHero = false }: NewsCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (featuredHero) {
    return (
      <Link
        href={`/news/${post.slug}`}
        className="group relative flex flex-col lg:flex-row bg-white rounded-3xl border border-[#E7EAEE] hover:border-[#D5BD66] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 overflow-hidden"
      >
        {/* Cover Photo */}
        <div className="relative w-full lg:w-3/5 aspect-16/10 lg:aspect-auto overflow-hidden bg-slate-900 shrink-0">
          {post.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#00266A] to-[#00143B] flex items-center justify-center text-white/20">
              <Newspaper className="w-20 h-20" />
            </div>
          )}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-[#00266A]/90 text-white backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between flex-1">
          <div className="space-y-3.5">
            <div className="flex items-center gap-3 text-xs font-semibold text-[#8892A0]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#00266A]" />
                {formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00266A]" />
                {post.readTimeMinutes || 2} min read
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#10151C] group-hover:text-[#00266A] transition-colors leading-tight">
              {post.title}
            </h2>

            {post.excerpt && (
              <p className="text-sm sm:text-base text-[#5B6572] leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="pt-6 border-t border-[#F1F5F9] mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#00266A]/10 text-[#00266A] flex items-center justify-center font-bold text-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {post.author || "SP Solutions Team"}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00266A] group-hover:text-[#D5BD66] transition-colors">
              <span>Read Full Story</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-[#E7EAEE] hover:border-[#D5BD66] transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 overflow-hidden"
    >
      {/* Cover Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-900 shrink-0">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#00266A]/90 to-[#00143B] flex items-center justify-center text-white/20">
            <Newspaper className="w-12 h-12" />
          </div>
        )}

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#00143B]/80 text-white backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
            {post.category}
          </span>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#8892A0]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#00266A]" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#00266A]" />
              {post.readTimeMinutes || 2} min read
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-[#10151C] group-hover:text-[#00266A] transition-colors leading-snug line-clamp-2">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-xs sm:text-sm text-[#5B6572] leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-[#F1F5F9] mt-4 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-600 truncate max-w-[140px]">
            {post.author || "SP Solutions"}
          </span>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00266A] group-hover:text-[#D5BD66] transition-colors">
            <span>Read More</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
