"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug?: string;
}

interface Props {
  categories: Category[];
  selected?: string; // category id, slug, or "" for all
  onChange?: (categoryId: string) => void;
  productCounts?: Record<string, number>;
  isNavigation?: boolean;
  className?: string;
}

export default function CategoryFilter({
  categories = [],
  selected = "",
  onChange,
  productCounts = {},
  isNavigation = false,
  className = "",
}: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isSelectedActive = Boolean(selected && selected !== "" && selected !== "all");
  const selectedCategory = categories.find((c) => c.id === selected || c.slug === selected);
  const selectedLabel = selectedCategory ? selectedCategory.name : "All Categories";

  const handleSelect = (catId: string, slug?: string) => {
    if (onChange) {
      onChange(slug || catId || "");
    } else if (isNavigation) {
      router.push(slug ? `/machines/${slug}` : "/machines");
    }
    setIsOpen(false);
  };

  const handleClear = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (onChange) {
      onChange("");
    } else if (isNavigation) {
      router.push("/machines");
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Minimalist Dropdown Trigger Button */}
      <button
        type="button"
        id="category-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`h-11 px-3.5 sm:px-4 rounded-xl border flex items-center justify-between gap-3 text-[13.5px] font-semibold transition-all duration-200 cursor-pointer shadow-sm ${
          isOpen
            ? "border-[#00266A] ring-2 ring-[#00266A]/10 bg-white text-[#00266A]"
            : isSelectedActive
            ? "bg-[#00266A] text-white border-[#00266A] hover:bg-[#001D52]"
            : "bg-white text-[#10151C] border-[#D5DEF0] hover:border-[#00266A] hover:text-[#00266A]"
        }`}
      >
        <div className="flex items-center gap-2.5">
          {/* Minimalist Filter Vector Icon */}
          <svg
            className={`w-4 h-4 shrink-0 ${
              isSelectedActive ? "text-white" : "text-[#5B6572]"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293-.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>

          <span className="truncate max-w-[180px] sm:max-w-[240px]">
            {!isSelectedActive ? "All Categories" : selectedLabel}
          </span>
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-current/20">
          {isSelectedActive && (
            <span
              onClick={handleClear}
              className="text-xs p-0.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              title="Clear category filter"
            >
              ✕
            </span>
          )}
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Minimalist Dropdown Menu Panel */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Filter by category"
          className="absolute left-0 top-full mt-2 w-72 sm:w-80 rounded-2xl bg-white border border-[#D5DEF0] shadow-[0_16px_40px_-10px_rgba(0,38,106,0.18)] z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Menu Header */}
          <div className="px-4 py-2.5 border-b border-[#F1F5F9] flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#8892A0] uppercase tracking-wider">
              Filter By Category
            </span>
            <span className="text-[11px] font-medium text-[#5B6572]">
              {categories.length} Families
            </span>
          </div>

          <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5">
            {/* All Option */}
            {isNavigation ? (
              <Link
                href="/machines"
                role="option"
                aria-selected={!isSelectedActive}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors text-left cursor-pointer ${
                  !isSelectedActive
                    ? "bg-[#00266A] text-white font-bold"
                    : "text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      !isSelectedActive ? "bg-[#bfee90]" : "bg-[#D5DEF0]"
                    }`}
                  />
                  <span>All Categories</span>
                </div>
                {!isSelectedActive && (
                  <svg className="w-4 h-4 text-[#D5BD66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </Link>
            ) : (
              <button
                type="button"
                role="option"
                aria-selected={!isSelectedActive}
                onClick={() => handleClear()}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors text-left cursor-pointer ${
                  !isSelectedActive
                    ? "bg-[#00266A] text-white font-bold"
                    : "text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      !isSelectedActive ? "bg-[#bfee90]" : "bg-[#D5DEF0]"
                    }`}
                  />
                  <span>All Categories</span>
                </div>
                {!isSelectedActive && (
                  <svg className="w-4 h-4 text-[#D5BD66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            )}

            {/* Individual Categories */}
            {categories.map((cat) => {
              const isSelected = selected === cat.id || selected === cat.slug;
              const count = productCounts[cat.id];

              if (isNavigation) {
                return (
                  <Link
                    key={cat.id}
                    href={`/machines/${cat.slug || cat.id}`}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => setIsOpen(false)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors text-left cursor-pointer ${
                      isSelected
                        ? "bg-[#00266A] text-white font-bold"
                        : "text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate pr-2">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          isSelected ? "bg-[#bfee90]" : "bg-[#D5DEF0]"
                        }`}
                      />
                      <span className="truncate">{cat.name}</span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {count !== undefined && (
                        <span
                          className={`text-[10.5px] px-2 py-0.5 rounded-full font-bold ${
                            isSelected
                              ? "bg-[#D5BD66] text-[#00266A]"
                              : "bg-[#F4F6FA] text-[#5B6572]"
                          }`}
                        >
                          {count}
                        </span>
                      )}
                      {isSelected && (
                        <svg className="w-4 h-4 text-[#D5BD66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </Link>
                );
              }

              return (
                <button
                  key={cat.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(cat.id, cat.slug)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors text-left cursor-pointer ${
                    isSelected
                      ? "bg-[#00266A] text-white font-bold"
                      : "text-[#10151C] hover:bg-[#F4F6FA] hover:text-[#00266A]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isSelected ? "bg-[#bfee90]" : "bg-[#D5DEF0]"
                      }`}
                    />
                    <span className="truncate">{cat.name}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {count !== undefined && (
                      <span
                        className={`text-[10.5px] px-2 py-0.5 rounded-full font-bold ${
                          isSelected
                            ? "bg-[#D5BD66] text-[#00266A]"
                            : "bg-[#F4F6FA] text-[#5B6572]"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                    {isSelected && (
                      <svg className="w-4 h-4 text-[#D5BD66]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
