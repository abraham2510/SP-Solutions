import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  User,
  Clock,
  ChevronRight,
  ExternalLink,
  Tag,
  PhoneCall,
  ArrowRight,
} from "lucide-react";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  getPublishedBlogPosts,
} from "@/lib/data/blogs";
import { NewsGalleryLightbox } from "../components/NewsGalleryLightbox";
import { SocialShareButtons } from "../components/SocialShareButtons";
import { NewsCard } from "../components/NewsCard";
import { SITE_CONTACTS } from "@/lib/constants";

// --- Tiptap Node Styles for Identical Rendering to Admin ---
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

export const revalidate = 60;
export const dynamicParams = true;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const { posts } = await getPublishedBlogPosts({ limit: 50 });
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "News Post Not Found | SP Solutions",
      description: "The requested news update could not be found.",
    };
  }

  const title = `${post.title} | SP Solutions News`;
  const description =
    post.excerpt ||
    post.content.replace(/<[^>]*>/g, "").slice(0, 160) ||
    "Read the latest update from SP Solutions Chennai.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author || "SP Solutions Team"],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      url: `https://spsolutionsc.com/news/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedBlogPosts(post.slug, post.category, 3);

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const wordCount = post.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Structured Data (JSON-LD) for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    image: post.coverImage ? [post.coverImage] : undefined,
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: {
      "@type": "Person",
      name: post.author || "SP Solutions Team",
    },
    publisher: {
      "@type": "Organization",
      name: "SP Solutions",
      logo: {
        "@type": "ImageObject",
        url: "https://spsolutionsc.com/logo.png",
      },
    },
    description: post.excerpt || post.title,
  };

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      {/* Inject Article JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-[#E7EAEE] py-3.5 select-none">
        <div className="wrap max-w-4xl mx-auto flex items-center gap-2 text-xs font-medium text-[#5B6572] overflow-hidden truncate">
          <Link
            href="/"
            className="hover:text-[#00266A] transition-colors shrink-0"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link
            href="/news"
            className="hover:text-[#00266A] transition-colors shrink-0"
          >
            News &amp; Updates
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[#00266A] font-semibold truncate">
            {post.title}
          </span>
        </div>
      </div>

      {/* Article Container */}
      <article className="wrap max-w-4xl mx-auto pt-8 sm:pt-12 space-y-8">
        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#00266A]/8 text-[#00266A] border border-[#00266A]/15 shadow-2xs">
              {post.category}
            </span>

            <SocialShareButtons title={post.title} slug={post.slug} />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#10151C] tracking-tight leading-[1.2]">
            {post.title}
          </h1>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#5B6572] pt-2 pb-4 border-b border-[#E7EAEE]">
            <span className="flex items-center gap-1.5 text-slate-800">
              <User className="w-3.5 h-3.5 text-[#00266A]" />
              {post.author || "SP Solutions Team"}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#00266A]" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#00266A]" />
              {readTime} min read
            </span>
          </div>

          {/* Excerpt Lead */}
          {post.excerpt && (
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium bg-white p-5 rounded-2xl border-l-4 border-[#00266A] border-y border-r border-[#E7EAEE] shadow-2xs">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Featured Cover Media */}
        {post.coverImage && (
          <div className="rounded-3xl overflow-hidden aspect-16/9 bg-slate-900 shadow-md border border-[#E7EAEE]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E7EAEE]">
            <Tag className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 mr-1">
              Tags:
            </span>
            {post.tags.map((tag, i) => (
              <Link
                key={i}
                href={`/news?search=${encodeURIComponent(tag)}`}
                className="text-xs font-medium bg-white text-[#00266A] hover:bg-[#00266A] hover:!text-white px-3 py-1 rounded-full border border-[#E7EAEE] transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Rich Article Body Content */}
        <div
          className="bg-white p-6 sm:p-10 lg:p-12 rounded-3xl border border-[#E7EAEE] shadow-2xs tiptap ProseMirror prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-[#10151C] prose-h1:text-3xl prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-base prose-p:leading-relaxed prose-p:text-[#334155] prose-li:text-[#334155] prose-a:text-[#00266A] prose-a:font-semibold prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-[#00266A] prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Photo Gallery with Lightbox */}
        {post.gallery && post.gallery.length > 0 && (
          <NewsGalleryLightbox gallery={post.gallery} postTitle={post.title} />
        )}

        {/* External Reference Link Callout */}
        {post.externalLink && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#00266A] to-[#001D52] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D5BD66]">
                Reference &amp; External Resource
              </span>
              <h4 className="text-base font-bold text-white">
                {post.externalLinkText || "Explore External Reference Link"}
              </h4>
              <p className="text-xs text-white/75 truncate max-w-md">
                {post.externalLink}
              </p>
            </div>
            <a
              href={post.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white !text-[#00266A] hover:bg-[#D5BD66] hover:text-[#00266A] font-bold text-xs transition-all shadow-xs shrink-0"
            >
              <span>Visit Link</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Related News Updates */}
        {relatedPosts.length > 0 && (
          <section className="pt-12 border-t border-[#E7EAEE] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#00266A] block">
                  RELATED UPDATES
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#10151C]">
                  More from {post.category}
                </h3>
              </div>
              <Link
                href="/news"
                className="text-xs font-bold text-[#00266A] hover:underline hidden sm:inline-flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <NewsCard key={related.id} post={related} />
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Consultation Call to Action */}
      <section className="mt-14 p-8 sm:p-12 bg-[#00266A] text-white text-center space-y-5 relative overflow-hidden shadow-lg">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative z-10 max-w-xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D5BD66]">
            SP SOLUTIONS TECHNICAL SUPPORT
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Looking for Custom Packaging Machinery in Chennai?
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Connect directly with our engineering team for machine trials, live
            product demos, or prompt technical service.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE_CONTACTS.phone.primary.tel}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#D5BD66] hover:bg-[#c4ab55] text-[#00143B] text-xs font-bold transition-all shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call {SITE_CONTACTS.phone.primary.display}</span>
            </a>
            <a
              href={SITE_CONTACTS.whatsapp.getUrl(
                `Hi SP Solutions, I was reading your news article "${post.title}" and would like to enquire about your machinery.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold transition-all"
            >
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
