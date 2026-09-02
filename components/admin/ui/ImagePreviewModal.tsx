"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Crop, Star, Trash2, X, ExternalLink } from "lucide-react";

interface ImagePreviewModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  imageIndex: number;
  totalImages: number;
  isCover: boolean;
  onClose: () => void;
  onCropRequest?: () => void;
  onSetCoverRequest?: () => void;
  onDeleteRequest?: () => void;
}

export function ImagePreviewModal({
  isOpen,
  imageSrc,
  imageIndex,
  totalImages,
  isCover,
  onClose,
  onCropRequest,
  onSetCoverRequest,
  onDeleteRequest,
}: ImagePreviewModalProps) {
  if (!isOpen || !imageSrc) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-slate-950 border-slate-800 p-0 overflow-hidden shadow-2xl max-w-3xl sm:max-w-4xl w-full">
        <DialogHeader className="p-4 bg-slate-900 border-b border-slate-800 flex flex-row items-center justify-between">
          <DialogTitle className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Eye className="w-4 h-4 text-sky-400" />
            Image Preview ({imageIndex + 1} of {totalImages})
            <span className="text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-sky-400 border border-slate-700">
              800 × 600 px
            </span>
            {isCover && (
              <span className="ml-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> Primary Cover
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Lightbox Image Preview Area (800x600 Frame) */}
        <div className="relative w-full bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6">
          <div className="relative w-full max-w-[800px] aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-black shadow-2xl flex items-center justify-center">
            <img
              src={imageSrc}
              alt={`Machine photo ${imageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white/90 text-[10.5px] font-mono font-medium px-2.5 py-1 rounded-md border border-white/15 pointer-events-none shadow-sm">
              Standard Resolution: 800 × 600
            </div>
          </div>
        </div>

        {/* Action Controls Footer */}
        <DialogFooter className="p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={imageSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Open Full Image
            </a>
          </div>

          <div className="flex items-center gap-2 p-2">
            {!isCover && onSetCoverRequest && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  onSetCoverRequest();
                  onClose();
                }}
                className="text-xs border-amber-500/40 text-amber-400 hover:bg-amber-500/10 gap-1.5"
              >
                <Star className="w-3.5 h-3.5" /> Make Cover
              </Button>
            )}

            {onCropRequest && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  onCropRequest();
                }}
                className="text-xs border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 gap-1.5"
              >
                <Crop className="w-3.5 h-3.5 text-sky-400" /> Crop Image
              </Button>
            )}

            {onDeleteRequest && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  onDeleteRequest();
                  onClose();
                }}
                className="text-xs gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </Button>
            )}

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="text-xs bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              <X className="w-3.5 h-3.5 mr-1" /> Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
