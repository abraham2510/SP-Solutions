"use client";

import React, { useState, useCallback } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crop, RotateCw, ZoomIn, Check, X, Ratio } from "lucide-react";

interface ImageCropperModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onCropComplete: (croppedImageBase64: string) => void;
}

const ASPECT_RATIOS = [
  { label: "16:9 (Landscape)", value: 16 / 9 },
  { label: "4:3 (Standard)", value: 4 / 3 },
  { label: "1:1 (Square)", value: 1 / 1 },
  { label: "Free", value: undefined },
];

function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = (rotation * Math.PI) / 180;
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0
): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return imageSrc;

  const rotRad = (rotation * Math.PI) / 180;
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const croppedCanvas = document.createElement("canvas");
  const croppedCtx = croppedCanvas.getContext("2d");

  if (!croppedCtx) return imageSrc;

  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;

  croppedCtx.drawImage(
    canvas,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return croppedCanvas.toDataURL("image/webp", 0.92);
}

export function ImageCropperModal({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
}: ImageCropperModalProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = (crop: Point) => setCrop(crop);
  const onZoomChange = (zoom: number) => setZoom(zoom);

  const onCropCompleteCallback = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      onCropComplete(croppedImage);
      onClose();
    } catch (err) {
      console.error("Crop error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl bg-slate-900 text-white border-slate-800 p-0 overflow-hidden shadow-2xl">
        <DialogHeader className="p-5 border-b border-slate-800 flex flex-row items-center justify-between">
          <DialogTitle className="text-base font-bold flex items-center gap-2 text-white">
            <Crop className="w-5 h-5 text-sky-400" />
            Crop & Adjust Image
          </DialogTitle>
        </DialogHeader>

        {/* Main Crop Area */}
        <div className="relative w-full h-[380px] bg-black/90">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={aspect}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropCompleteCallback}
          />
        </div>

        {/* Controls Toolbar */}
        <div className="p-5 bg-slate-950 space-y-4 border-t border-slate-800">
          {/* Aspect Ratios */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
              <Ratio className="w-3.5 h-3.5" /> Aspect Ratio:
            </span>
            {ASPECT_RATIOS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setAspect(item.value)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  aspect === item.value
                    ? "bg-[#00266A] text-white ring-1 ring-sky-400"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Sliders: Zoom & Rotation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-sky-400" /> Zoom
                </span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1">
                  <RotateCw className="w-3.5 h-3.5 text-sky-400" /> Rotate
                </span>
                <span>{rotation}°</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={90}
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="h-7 text-[11px] border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700"
                >
                  +90°
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isProcessing}
            className="text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4 mr-1" />
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSaveCrop}
            disabled={isProcessing}
            className="bg-sky-500 hover:bg-sky-600 text-white font-semibold gap-1.5 px-5"
          >
            <Check className="w-4 h-4" />
            {isProcessing ? "Cropping..." : "Apply Crop"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
