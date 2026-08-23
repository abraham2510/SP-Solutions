import {
  Boxes,
  Layers,
  ShieldCheck,
  Container,
  Printer,
  Wrench,
  Activity,
  Sliders,
  Settings,
  Package,
  Cpu,
  Cog,
  LucideIcon,
} from "lucide-react";
import type { NavApiCategory, NavApiService } from "@/actions/navigation";

export type { NavApiCategory, NavApiService };

/**
 * Returns an appropriate Lucide icon based on category slug / name.
 */
export function getCategoryIcon(slug: string = ""): LucideIcon {
  const s = slug.toLowerCase();
  if (s.includes("shrink")) return Boxes;
  if (s.includes("flow") || s.includes("wrap")) return Layers;
  if (s.includes("inspect") || s.includes("metal") || s.includes("detect")) return ShieldCheck;
  if (s.includes("end-line") || s.includes("endline") || s.includes("carton") || s.includes("strap")) return Container;
  if (s.includes("print") || s.includes("coding") || s.includes("code") || s.includes("mark")) return Printer;
  return Package;
}

/**
 * Returns an appropriate Lucide icon based on service slug / name.
 */
export function getServiceIcon(slug: string = ""): LucideIcon {
  const s = slug.toLowerCase();
  if (s.includes("shrink-tunnel-packaging") || s.includes("tunnel-packaging")) return Wrench;
  if (s.includes("shrink") || s.includes("tunnel") || s.includes("heat")) return Activity;
  if (s.includes("strap") || s.includes("tension")) return Sliders;
  if (s.includes("packaging") || s.includes("repair") || s.includes("maintenance")) return Settings;
  if (s.includes("motor") || s.includes("electric")) return Cpu;
  return Cog;
}
