"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FeatureEditorProps {
  features: string[];
  onChange: (features: string[]) => void;
}

export function FeatureEditor({ features, onChange }: FeatureEditorProps) {
  const addFeature = () => {
    onChange([...features, ""]);
  };

  const updateFeature = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    onChange(updated);
  };

  const removeFeature = (index: number) => {
    onChange(features.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Product Features
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addFeature}
          className="h-8 gap-1.5 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Feature
        </Button>
      </div>

      {features.length === 0 ? (
        <div className="p-4 rounded-lg bg-muted/40 border border-dashed border-border text-center text-xs text-muted-foreground">
          No features added yet. Click "+ Add Feature" above.
        </div>
      ) : (
        <div className="space-y-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(idx, e.target.value)}
                placeholder={`Feature ${idx + 1}`}
                className="flex-1 h-9 text-xs"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFeature(idx)}
                className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove feature</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
