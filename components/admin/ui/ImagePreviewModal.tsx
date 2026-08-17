"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
      <DialogContent className="max-w-4xl bg-slate-950 border-slate-800 p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-4 bg-slate-900 border-b border-slate-800 flex flex-row items-center justify-between">
          <DialogTitle className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Eye className="w-4 h-4 text-sky-400" />
            Image Preview ({imageIndex + 1} of {totalImages})
            {isCover && (
              <span className="ml-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" /> Primary Cover
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Lightbox Image Preview Area */}
        <div className="relative w-full min-h-[350px] max-h-[550px] bg-black/90 flex items-center justify-center p-4 overflow-hidden">
          <img
            src={imageSrc}
            alt={`Image preview ${imageIndex + 1}`}
            className="max-w-full max-h-[500px] object-contain rounded-lg shadow-lg"
          />
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

          <div className="flex items-center gap-2">
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
