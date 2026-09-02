// ─── Catalogue Types ──────────────────────────────────────────────────────────

export interface CatalogueProduct {
  id: string;
  name: string;
  slug: string;
  model?: string;
  type: string;
  category_id: string;
  category_name: string;
  short_description: string;
  description: string;
  /** Full URL (CDN) or empty string. Empty → render placeholder in UI. */
  image: string;
  /** Array of image URLs for gallery display. */
  images: string[];
  /** Primary video URL (YouTube, Instagram, or direct video) */
  video_url?: string;
  /** Array of video URLs (YouTube, Instagram, or direct videos) */
  videos?: string[];
  featured: boolean;
  status: "active" | "inactive";
  applications: string[];
  features: string[];
  specifications: Record<string, string>;
}

export interface CatalogueCategory {
  id: string;
  name: string;
  slug: string;
  type: string;
  description: string;
  /** Full URL (CDN) or empty string. */
  image: string;
  /** Array of image URLs for gallery display. */
  images: string[];
  sort_order: number;
  status: "active" | "inactive";
}

export interface CatalogueService {
  id: string;
  name: string;
  slug: string;
  type: string;
  short_description: string;
  description: string;
  /** Full URL (CDN) or empty string. */
  image: string;
  /** Array of image URLs for gallery display. */
  images: string[];
  featured: boolean;
  status: "active" | "inactive";
  sort_order: number;
}

export interface CatalogueData {
  products: CatalogueProduct[];
  categories: CatalogueCategory[];
  services: CatalogueService[];
}
