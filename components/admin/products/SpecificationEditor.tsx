"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface SpecItem {
  id?: string;
  specification: string;
  value: string;
  unitOrNote?: string;
  sortOrder: number;
}

interface SpecificationEditorProps {
  specifications: SpecItem[];
  onChange: (specifications: SpecItem[]) => void;
}

export function SpecificationEditor({ specifications, onChange }: SpecificationEditorProps) {
  const addSpec = () => {
    onChange([
      ...specifications,
      { specification: "", value: "", unitOrNote: "", sortOrder: specifications.length },
    ]);
  };

  const updateSpec = (index: number, field: keyof SpecItem, val: string) => {
    const updated = [...specifications];
    updated[index] = { ...updated[index], [field]: val };
    onChange(updated);
  };

  const removeSpec = (index: number) => {
    const filtered = specifications.filter((_, i) => i !== index);
    onChange(filtered.map((item, i) => ({ ...item, sortOrder: i })));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Technical Specifications
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSpec}
          className="h-8 gap-1.5 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Specification
        </Button>
      </div>

      {specifications.length === 0 ? (
        <div className="p-4 rounded-lg bg-muted/40 border border-dashed border-border text-center text-xs text-muted-foreground">
          No technical specifications added yet. Click "+ Add Specification" above.
        </div>
      ) : (
        <div className="space-y-3">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-2 text-[11px] font-semibold text-muted-foreground uppercase px-1">
            <span className="col-span-5">Specification</span>
            <span className="col-span-4">Value</span>
            <span className="col-span-2">Unit / Note</span>
            <span className="col-span-1 text-center">Action</span>
          </div>

          {specifications.map((spec, idx) => (
            <div
              key={idx}
              className="flex flex-col md:grid md:grid-cols-12 gap-2 p-3 md:p-0 rounded-md border md:border-none border-border bg-card md:bg-transparent"
            >
              <Input
                type="text"
                value={spec.specification}
                onChange={(e) => updateSpec(idx, "specification", e.target.value)}
                placeholder="e.g. Voltage"
                className="md:col-span-5 h-9 text-xs"
              />
              <Input
                type="text"
                value={spec.value}
                onChange={(e) => updateSpec(idx, "value", e.target.value)}
                placeholder="e.g. 220"
                className="md:col-span-4 h-9 text-xs"
              />
              <Input
                type="text"
                value={spec.unitOrNote || ""}
                onChange={(e) => updateSpec(idx, "unitOrNote", e.target.value)}
                placeholder="e.g. V 50Hz"
                className="md:col-span-2 h-9 text-xs"
              />
              <div className="flex justify-end md:justify-center md:col-span-1 mt-1 md:mt-0">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSpec(idx)}
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove specification</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
