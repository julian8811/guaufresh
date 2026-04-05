/**
 * URL canónica del sitio (Vercel, dominio propio).
 * En Vercel define PUBLIC_SITE_URL (sin barra final).
 */
export function siteUrl(): string {
  const raw = import.meta.env.PUBLIC_SITE_URL || "https://guaufresh.vercel.app"
  return String(raw).replace(/\/$/, "")
}
