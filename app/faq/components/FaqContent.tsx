"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Search,
  Phone,
  Mail,
  HelpCircle,
  X,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FAQ_CATEGORIES, FAQ_ITEMS, type FaqCategory } from "../data";
import { SITE_CONTACTS } from "@/lib/constants";

export default function FaqContent() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filtered FAQs based on category & search term
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="wrap max-w-7xl mx-auto py-10 sm:py-16">
      {/* Top Filter Pills & Search Bar (Matching Reference Screenshot) */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 sm:mb-12">
        {/* Horizontal Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          {FAQ_CATEGORIES.map((cat: FaqCategory) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#00266A] text-white shadow-xs"
                    : "bg-white text-[#5B6572] border border-[#E7EAEE] hover:border-[#00266A]/30 hover:text-[#00266A]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar on Top Right */}
        <div className="relative w-full lg:w-80 shrink-0">
          <Search className="w-4 h-4 text-[#8A94A6] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full bg-white border border-[#E7EAEE] rounded-full pl-9.5 pr-8 py-2 text-[13.5px] text-[#10151C] placeholder:text-[#8A94A6] focus:outline-none focus:border-[#00266A] focus:ring-2 focus:ring-[#00266A]/10 shadow-2xs transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A94A6] hover:text-[#10151C] p-0.5 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Two-Column Layout (3.5 : 8.5 ratio with sticky top) */}
      <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_8.5fr] gap-8 items-start">
        {/* Left Sidebar (3.5 cols, Sticky) */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-6 self-start">
          {/* Support Card ("How Can We Help?") */}
          <div className="bg-white rounded-2xl border border-[#E7EAEE] overflow-hidden shadow-xs flex flex-col">
            {/* Top Support Team Image */}
            <div className="relative w-full h-40 sm:h-44 bg-[#F1F5F9] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80"
                alt="SP Solutions Technical Support Team"
                fill
                sizes="(max-width: 1024px) 100vw, 360px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Support Info Body */}
            <div className="p-5 sm:p-5.5 flex flex-col gap-4">
              <div>
                <h4 className="text-[16.5px] font-bold text-[#10151C] tracking-tight">
                  How Can We Help?
                </h4>
                <p className="text-[12.5px] text-[#5B6572] leading-relaxed mt-1.5">
                  If you have questions or need assistance with your packaging
                  machinery, contact our support team.
                </p>
              </div>

              {/* Contact Rows */}
              <div className="flex flex-col gap-2.5 pt-2 border-t border-[#E7EAEE]">
                {/* Phone Call */}
                <a
                  href={SITE_CONTACTS.phone.primary.tel}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
                >
                  <div className="w-8.5 h-8.5 rounded-full bg-[#00266A]/8 group-hover:bg-[#00266A] text-[#00266A] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10.5px] font-semibold text-[#8A94A6] uppercase tracking-wider">
                      Call Technical Desk
                    </span>
                    <span className="text-[13px] font-bold text-[#10151C] group-hover:text-[#00266A]">
                      {SITE_CONTACTS.phone.primary.display}
                    </span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={SITE_CONTACTS.whatsapp.getUrl(
                    "Hi SP Solutions, I have an inquiry regarding your packaging machines.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
                >
                  <div className="w-8.5 h-8.5 rounded-full bg-[#25D366]/10 group-hover:bg-[#25D366] text-[#25D366] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <svg
                      className="w-4 h-4 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.997.588 3.86 1.608 5.431L2 22l4.697-1.57A9.957 9.957 0 0 0 12.004 22c5.524 0 10.004-4.48 10.004-9.996C22.008 6.48 17.528 2 12.004 2zm0 18.29c-1.745 0-3.376-.505-4.757-1.381l-.341-.218-2.784.93.948-2.715-.24-.378A8.257 8.257 0 0 1 3.714 12c0-4.57 3.72-8.29 8.29-8.29 4.57 0 8.29 3.72 8.29 8.29 0 4.57-3.72 8.29-8.29 8.29z" />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10.5px] font-semibold text-[#8A94A6] uppercase tracking-wider">
                      WhatsApp Support
                    </span>
                    <span className="text-[13px] font-bold text-[#10151C] group-hover:text-[#075E54]">
                      {SITE_CONTACTS.whatsapp.display}
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={SITE_CONTACTS.email.mailto}
                  className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors group"
                >
                  <div className="w-8.5 h-8.5 rounded-full bg-[#00266A]/8 group-hover:bg-[#00266A] text-[#00266A] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10.5px] font-semibold text-[#8A94A6] uppercase tracking-wider">
                      Email Inquiries
                    </span>
                    <span className="text-[12.5px] font-bold text-[#10151C] group-hover:text-[#00266A] truncate">
                      {SITE_CONTACTS.email.primary}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area (8.5 cols) */}
        <div className="flex flex-col gap-6">
          {/* Accordion Card Container */}
          <div className="bg-white rounded-2xl border border-[#E7EAEE] p-5 sm:p-8 shadow-xs">
            {filteredFaqs.length === 0 ? (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <HelpCircle className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#10151C]">
                  No questions match your search
                </h4>
                <p className="text-xs text-[#5B6572] mt-1 max-w-sm">
                  Try searching for keywords like &quot;shrink tunnel&quot;,
                  &quot;repair&quot;, &quot;warranty&quot;, or browse our
                  categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#00266A] text-white text-xs font-semibold hover:bg-[#001d52] transition-colors cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <Accordion className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-[#00266A] font-bold text-[15px] sm:text-base shrink-0 w-6">
                        {index + 1}.
                      </span>
                      <span className="text-[#10151C] font-semibold text-[14.5px] sm:text-[15.5px] leading-snug">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pl-9 pr-2">
                      <p className="text-[13.5px] sm:text-[14px] text-[#5B6572] leading-relaxed">
                        {faq.answer}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-[11.5px] text-[#8A94A6]">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                          {faq.categoryLabel}
                        </span>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
