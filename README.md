# Guau Fresh

Página web para **Guau Fresh** — espuma limpiadora en seco para perros con ingredientes naturales.

## Tecnologías

- **Astro 4** (sitio estático) + **React** (islas) + **Tailwind CSS**
- **TypeScript**
- **Supabase** (catálogo, pedidos, auth en el cliente)

## Instalación

```bash
npm install
npm run dev
```

- **Build:** `npm run build` → salida en `dist/`
- **Preview:** `npm run preview`

## Variables de entorno

Copia [.env.example](.env.example) a `.env`. Para desarrollo local con `base` en raíz, `PUBLIC_BASE_PATH=/` suele bastar.

En **GitHub Actions** el workflow define `PUBLIC_SITE_URL` y `PUBLIC_BASE_PATH` para Project Pages. Opcionalmente añade en el repositorio **Secrets** `PUBLIC_SUPABASE_URL` y `PUBLIC_SUPABASE_ANON_KEY` para no depender de los valores por defecto en código.

## Despliegue

| Plataforma | Configuración típica |
|------------|----------------------|
| **GitHub Pages** | Workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml): `npm ci`, `npm run build`, publicar `dist/`, rama `main` o `master`. Edita `PUBLIC_SITE_URL` / `PUBLIC_BASE_PATH` en el paso *Build* si el usuario u repo cambian. |
| **Vercel / Netlify** | Build: `npm run build`. Directorio de publicación: `dist`. `PUBLIC_BASE_PATH`/`PUBLIC_SITE_URL` según dominio (raíz o no). |

### Supabase (producción)

En el panel de Supabase → **Authentication** → **URL Configuration**:

- **Site URL:** la URL pública del sitio (p. ej. `https://julian8811.github.io/guaufresh/`).
- **Redirect URLs:** incluye esa URL y, si aplica, `https://<dominio>/guaufresh/**` para OAuth.

El cliente usa `redirectTo` con el origen y `import.meta.env.BASE_URL` tras el login social.

## Licencia

Privado - Guau Fresh Colombia
