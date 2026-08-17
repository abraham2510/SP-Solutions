"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApplicationEditorProps {
  applications: string[];
  onChange: (applications: string[]) => void;
}

export function ApplicationEditor({ applications, onChange }: ApplicationEditorProps) {
  const addApplication = () => {
    onChange([...applications, ""]);
  };

  const updateApplication = (index: number, val: string) => {
    const updated = [...applications];
    updated[index] = val;
    onChange(updated);
  };

  const removeApplication = (index: number) => {
    onChange(applications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
          Machine Applications
        </label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addApplication}
          className="h-8 gap-1.5 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Application
        </Button>
      </div>

      {applications.length === 0 ? (
        <div className="p-4 rounded-lg bg-muted/40 border border-dashed border-border text-center text-xs text-muted-foreground">
          No applications added yet. Click "+ Add Application" above.
        </div>
      ) : (
        <div className="space-y-2">
          {applications.map((app, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <Input
                type="text"
                value={app}
                onChange={(e) => updateApplication(idx, e.target.value)}
                placeholder={`e.g. Food & Beverage packaging (Application ${idx + 1})`}
                className="flex-1 h-9 text-xs"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeApplication(idx)}
                className="h-9 w-9 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove application</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
