"use server";

import { requireAdmin } from "@/lib/auth-helpers";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImageAction(base64Data: string, folder = "sp-solutions") {
  await requireAdmin();

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    const missing = [];
    if (!cloudName) missing.push("CLOUDINARY_CLOUD_NAME");
    if (!apiKey) missing.push("CLOUDINARY_API_KEY");
    if (!apiSecret) missing.push("CLOUDINARY_API_SECRET");

    return {
      success: false as const,
      error: `Cloudinary environment variables missing: ${missing.join(", ")}.`,
    };
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  try {
    const result = await cloudinary.uploader.upload(base64Data, {
      folder,
      resource_type: "auto",
    });

    return {
      success: true as const,
      url: result.secure_url,
    };
  } catch (err: unknown) {
    console.error("Cloudinary upload error:", err);
    return {
      success: false as const,
      error: err instanceof Error ? err.message : "Failed to upload image.",
    };
  }
}

export async function uploadMultipleImagesAction(images: string[], folder = "sp-solutions") {
  await requireAdmin();

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    const missing = [];
    if (!cloudName) missing.push("CLOUDINARY_CLOUD_NAME");
    if (!apiKey) missing.push("CLOUDINARY_API_KEY");
    if (!apiSecret) missing.push("CLOUDINARY_API_SECRET");

    return {
      success: false as const,
      error: `Cloudinary environment variables missing: ${missing.join(", ")}.`,
    };
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  try {
    const uploadedUrls: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (img.startsWith("data:image/")) {
        const result = await cloudinary.uploader.upload(img, {
          folder,
          resource_type: "auto",
        });
        uploadedUrls.push(result.secure_url);
      } else {
        uploadedUrls.push(img);
      }
    }

    return {
      success: true as const,
      urls: uploadedUrls,
    };
  } catch (err: unknown) {
    console.error("Cloudinary batch upload error:", err);
    return {
      success: false as const,
      error: err instanceof Error ? err.message : "Failed to upload images to Cloudinary.",
    };
  }
}

export async function uploadVideoAction(videoData: string, folder = "products/videos") {
  await requireAdmin();

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    const missing = [];
    if (!cloudName) missing.push("CLOUDINARY_CLOUD_NAME");
    if (!apiKey) missing.push("CLOUDINARY_API_KEY");
    if (!apiSecret) missing.push("CLOUDINARY_API_SECRET");

    return {
      success: false as const,
      error: `Cloudinary environment variables missing: ${missing.join(", ")}.`,
    };
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  try {
    const result = await cloudinary.uploader.upload(videoData, {
      folder,
      resource_type: "video",
      chunk_size: 6000000,
    });

    return {
      success: true as const,
      url: result.secure_url,
    };
  } catch (err: unknown) {
    console.error("Cloudinary video upload error:", err);
    return {
      success: false as const,
      error: err instanceof Error ? err.message : "Failed to upload video to Cloudinary.",
    };
  }
}

export async function getCloudinaryVideoUploadSignatureAction(folder = "products/videos") {
  await requireAdmin();

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return {
      success: false as const,
      error: "Cloudinary credentials not configured on server.",
    };
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { folder, timestamp },
    apiSecret
  );

  return {
    success: true as const,
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder,
  };
}
