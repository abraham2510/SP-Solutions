/**
 * data.ts — Cached catalogue data entry point.
 * Call getCatalogue() from any Server Component or generateStaticParams.
 * NEVER import this in a 'use client' component.
 */
import "server-only";
import { parseCatalogue } from "./parser";
import type { CatalogueData } from "./types";

let _cache: CatalogueData | null = null;

export function getCatalogue(): CatalogueData {
  if (!_cache) {
    _cache = parseCatalogue();
  }
  return _cache;
}
