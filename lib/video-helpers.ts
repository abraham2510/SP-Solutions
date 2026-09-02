/**
 * Helper functions to detect, parse, and format video URLs
 * for YouTube, Instagram Reels/Posts, and direct video files.
 */

export interface ParsedVideo {
  type: "youtube" | "instagram" | "direct" | "unknown";
  rawUrl: string;
  embedUrl: string | null;
  videoId?: string;
  title?: string;
}

export function parseVideoUrl(url: string): ParsedVideo {
  const trimmed = url.trim();
  if (!trimmed) {
    return { type: "unknown", rawUrl: trimmed, embedUrl: null };
  }

  // 1. YouTube detection
  // Formats: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID, youtube.com/embed/ID
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i
  );
  if (ytMatch && ytMatch[1]) {
    const videoId = ytMatch[1];
    return {
      type: "youtube",
      rawUrl: trimmed,
      videoId,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`,
      title: "YouTube Video",
    };
  }

  // 2. Instagram detection
  // Formats: instagram.com/reel/CODE, instagram.com/p/CODE, instagram.com/tv/CODE
  const igMatch = trimmed.match(
    /instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/i
  );
  if (igMatch && igMatch[1]) {
    const postCode = igMatch[1];
    return {
      type: "instagram",
      rawUrl: trimmed,
      videoId: postCode,
      embedUrl: `https://www.instagram.com/reel/${postCode}/embed/`,
      title: "Instagram Reel",
    };
  }

  // 3. Direct video format (.mp4, .webm, or cloudinary video)
  if (
    trimmed.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i) ||
    trimmed.includes("/video/upload/")
  ) {
    return {
      type: "direct",
      rawUrl: trimmed,
      embedUrl: trimmed,
      title: "Direct Video File",
    };
  }

  return {
    type: "unknown",
    rawUrl: trimmed,
    embedUrl: trimmed,
    title: "Web Video Link",
  };
}
