"use client";

import React from "react";
import { X, Calendar, User, Tag, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BlogGalleryItem } from "@/lib/types/blog";

interface BlogPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    title: string;
    excerpt?: string;
    content: string;
    coverImage?: string | null;
    category: string;
    author?: string;
    tags?: string[];
    gallery?: BlogGalleryItem[];
    externalLink?: string | null;
    externalLinkText?: string | null;
    publishedAt?: Date | string;
    status: "DRAFT" | "PUBLISHED";
  };
}

export function BlogPreviewModal({ isOpen, onClose, data }: BlogPreviewModalProps) {
  if (!isOpen) return null;

  const formattedDate = data.publishedAt
    ? new Date(data.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#00266A] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded-full text-white/90 border border-white/10">
              Live Preview
            </span>
            <span className="text-xs text-white/75">
              Status: <b className="text-white">{data.status}</b>
            </span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/15 h-8 w-8 p-0 rounded-full cursor-pointer"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Post Preview Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider bg-[#00266A]/8 text-[#00266A] px-3 py-1 rounded-full border border-[#00266A]/15">
                {data.category || "Company Update"}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <User className="w-3.5 h-3.5" />
                {data.author || "SP Solutions Team"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-bold text-[#10151C] leading-tight tracking-tight">
              {data.title || "Untitled Post"}
            </h1>

            {data.excerpt && (
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal border-l-4 border-[#00266A] pl-4 py-1">
                {data.excerpt}
              </p>
            )}
          </div>

          {/* Cover Image */}
          {data.coverImage && (
            <div className="rounded-2xl overflow-hidden aspect-video bg-slate-900 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.coverImage}
                alt={data.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Rich Text Content */}
          <div
            className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#10151C] prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-[#00266A] prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-[#00266A] prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: data.content || "<p><i>No content written yet...</i></p>" }}
          />

          {/* Gallery Photos */}
          {data.gallery && data.gallery.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <h3 className="text-lg font-bold text-[#10151C]">Photo Gallery</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.gallery.map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col shadow-2xs">
                    <div className="aspect-4/3 overflow-hidden bg-slate-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={img.caption || `Gallery ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                    {img.caption && (
                      <p className="p-2.5 text-xs text-slate-600 font-medium bg-white border-t border-slate-100">
                        {img.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Link */}
          {data.externalLink && (
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Reference &amp; External Link</span>
                <span className="text-sm font-bold text-[#00266A]">{data.externalLinkText || "View Reference Link"}</span>
              </div>
              <a
                href={data.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00266A] text-white text-xs font-semibold hover:bg-[#001D52] transition-colors shadow-2xs"
              >
                <span>Visit Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-200">
              <Tag className="w-4 h-4 text-slate-400" />
              {data.tags.map((tag, i) => (
                <span key={i} className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Editor
          </Button>
        </div>
      </div>
    </div>
  );
}
