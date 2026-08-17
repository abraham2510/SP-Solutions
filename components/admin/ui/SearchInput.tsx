"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
}

export function SearchInput({
  placeholder = "Search...",
  defaultValue = "",
}: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value !== defaultValue) {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [value, defaultValue, pathname, router, searchParams]);

  return (
    <div className="relative flex-1 min-w-[200px] max-w-sm">
      <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-8 text-xs h-9"
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setValue("")}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
    </div>
  );
}
