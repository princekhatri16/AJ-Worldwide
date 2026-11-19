/**
 * Canonical Site URL configuration for AJ Worldwide
 * Fallback to http://localhost:3000 if NEXT_PUBLIC_SITE_URL is unset.
 * Trims whitespace and strips any trailing slash.
 */
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";
export const SITE_URL = rawUrl.replace(/\/+$/, "");

/**
 * Builds an absolute URL from a given pathname.
 * Ensures single forward slash between base and path.
 */
export function absoluteUrl(path: string = ""): string {
  if (!path || path === "/") return SITE_URL;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}
