import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Rótulos legibles desde slugs del JSON (p. ej. "assets" → "Assets", "html-email" → "Html Email"). */
export function formatLabel(slug: string): string {
  if (!slug) return "";
  return slug
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
