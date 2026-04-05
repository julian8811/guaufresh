/**
 * Root-relative path including Astro `base` (e.g. GitHub Pages project site).
 */
export function baseHref(path: string): string {
  const base = import.meta.env.BASE_URL
  const clean = path === '/' || path === '' ? '' : path.replace(/^\//, '')
  if (base === '/') return clean ? `/${clean}` : '/'
  const prefix = base.replace(/\/$/, '')
  return clean ? `${prefix}/${clean}` : `${prefix}/`
}
