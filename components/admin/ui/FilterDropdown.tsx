"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  paramName: string;
  label: string;
  options: Option[];
  defaultValue?: string;
}

export function FilterDropdown({
  paramName,
  label,
  options,
  defaultValue = "",
}: FilterDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "ALL") {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const currentValue = defaultValue || "ALL";

  return (
    <Select value={currentValue} onValueChange={handleSelect}>
      <SelectTrigger className="w-[160px] h-9 text-xs">
        <SelectValue placeholder={label}>
          {(val) => {
            if (!val || val === "ALL") return label;
            return options.find((opt) => opt.value === val)?.label || val;
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL" className="text-xs">
          {label}
        </SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} className="text-xs">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
