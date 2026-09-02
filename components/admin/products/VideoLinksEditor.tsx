"use client";

import React, { useState, useRef } from "react";
import {
  Video,
  Plus,
  Trash2,
  ExternalLink,
  Play,
  Film,
  AlertCircle,
  Upload,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseVideoUrl } from "@/lib/video-helpers";
import { toast } from "sonner";

interface VideoLinksEditorProps {
  videos: string[];
  onChange: (videos: string[]) => void;
  pendingFiles?: Map<string, File>;
  onPendingFilesChange?: (files: Map<string, File>) => void;
}

export function VideoLinksEditor({
  videos,
  onChange,
  pendingFiles = new Map(),
  onPendingFilesChange,
}: VideoLinksEditorProps) {
  const [newUrl, setNewUrl] = useState("");
  const [inputError, setInputError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddUrl = () => {
    const trimmed = newUrl.trim();
    if (!trimmed) return;

    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
      setInputError("Please enter a valid URL starting with https://");
      return;
    }

    if (videos.includes(trimmed)) {
      setInputError("This video link has already been added.");
      return;
    }

    onChange([...videos, trimmed]);
    setNewUrl("");
    setInputError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddUrl();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Limit to 100MB
    if (file.size > 100 * 1024 * 1024) {
      toast.error("Video file is too large (max 100MB).");
      return;
    }

    const localPreviewUrl = URL.createObjectURL(file);

    if (onPendingFilesChange) {
      const nextMap = new Map(pendingFiles);
      nextMap.set(localPreviewUrl, file);
      onPendingFilesChange(nextMap);
    }

    onChange([...videos, localPreviewUrl]);
    toast.success("Video added to queue (will upload to Cloudinary on save)!");

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    const targetUrl = videos[index];
    if (targetUrl && pendingFiles.has(targetUrl)) {
      if (onPendingFilesChange) {
        const nextMap = new Map(pendingFiles);
        nextMap.delete(targetUrl);
        onPendingFilesChange(nextMap);
      }
      try {
        URL.revokeObjectURL(targetUrl);
      } catch {
        // ignore
      }
    }

    const updated = videos.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Upload & Input options */}
      <div className="flex flex-col gap-3">
        {/* Direct Video File Picker */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="video/mp4,video/webm,video/quicktime,video/ogg"
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-10 border-dashed border-[#00266A]/30 bg-[#00266A]/5 hover:bg-[#00266A]/10 text-[#00266A] rounded-xl font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Upload className="w-4 h-4 text-[#00266A]" />
            <span>Choose Video File (.mp4 / .mov)</span>
          </Button>
          <p className="text-[10.5px] text-slate-400 text-center mt-1">
            Uploaded automatically to Cloudinary (products/videos) when you click Save.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-px bg-slate-200 flex-1" />
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            OR PASTE LINK
          </span>
          <div className="h-px bg-slate-200 flex-1" />
        </div>

        {/* URL Input */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Video className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="url"
              value={newUrl}
              onChange={(e) => {
                setNewUrl(e.target.value);
                if (inputError) setInputError(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Paste YouTube, Instagram, or MP4 URL..."
              className="pl-9 text-xs h-9 rounded-xl border-slate-200 focus-visible:ring-[#00266A]"
            />
          </div>
          <Button
            type="button"
            onClick={handleAddUrl}
            disabled={!newUrl.trim()}
            className="h-9 px-3.5 rounded-xl bg-[#00266A] hover:bg-[#001D52] text-white text-xs font-semibold shrink-0"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add
          </Button>
        </div>

        {inputError && (
          <p className="text-xs text-rose-600 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {inputError}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
          <span className="font-semibold text-slate-600">Supported:</span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-medium">
            Cloudinary MP4
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-red-50 text-red-700 border border-red-200 text-[10px] font-medium">
            YouTube
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-medium">
            Instagram Reels
          </span>
        </div>
      </div>

      {/* Videos List */}
      {videos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-center">
          <Film className="w-6 h-6 text-slate-300 mx-auto mb-1.5" />
          <p className="text-xs font-medium text-slate-600">
            No demonstration videos added yet.
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Add YouTube trials or MP4 factory clips.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3.5 pt-1">
          {videos.map((url, idx) => {
            const isPending = pendingFiles.has(url);
            const parsed = parseVideoUrl(url);
            return (
              <div
                key={idx}
                className="group relative rounded-xl border border-slate-200 bg-white p-3 shadow-xs hover:border-[#00266A]/30 transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Header info */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    {isPending ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold text-[10.5px]">
                        <Clock className="w-3 h-3 text-amber-700" />
                        Pending (Saved on Submit)
                      </span>
                    ) : url.includes("cloudinary.com") ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10.5px]">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Cloudinary (products/videos)
                      </span>
                    ) : parsed.type === "youtube" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-100 text-red-700 font-bold text-[10.5px]">
                        YouTube
                      </span>
                    ) : parsed.type === "instagram" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 font-bold text-[10.5px]">
                        Instagram Reel
                      </span>
                    ) : parsed.type === "direct" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 font-bold text-[10.5px]">
                        Direct MP4
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[10.5px]">
                        Web Video
                      </span>
                    )}
                    <span className="text-[11px] font-medium text-slate-400">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-lg text-slate-400 hover:text-[#00266A] hover:bg-slate-100 transition-colors"
                      title="Open video URL in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemove(idx)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove video"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Video Embed Player Preview */}
                <div className="relative w-full rounded-xl overflow-hidden bg-slate-900 aspect-video mb-2 border border-slate-200/80">
                  {parsed.type === "youtube" && parsed.embedUrl ? (
                    <iframe
                      src={parsed.embedUrl}
                      title={`YouTube Video preview ${idx + 1}`}
                      className="w-full h-full border-0 pointer-events-none scale-105"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  ) : parsed.type === "instagram" && parsed.embedUrl ? (
                    <iframe
                      src={parsed.embedUrl}
                      title={`Instagram Reel preview ${idx + 1}`}
                      className="w-full h-full bg-black border-0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : parsed.type === "direct" && parsed.embedUrl ? (
                    <video
                      src={parsed.embedUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover pointer-events-none select-none"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                      <Play className="w-8 h-8 mb-1.5 opacity-60 text-white" />
                      <span className="text-xs text-slate-300 truncate max-w-full font-mono">
                        {url}
                      </span>
                    </div>
                  )}
                </div>

                {/* URL display footer */}
                <div className="text-[11px] font-mono text-slate-500 truncate pt-1 border-t border-slate-100">
                  {url}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
