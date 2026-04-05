/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        /** Tipografía principal — cuerpo y UI base */
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        primary: ['Nunito', 'system-ui', 'sans-serif'],
        /** Tipografía secundaria — CTAs, navegación de apoyo */
        secondary: ['Quicksand', 'system-ui', 'sans-serif'],
        /** Misma familia secundaria (alias histórico shadcn) */
        display: ['Quicksand', 'system-ui', 'sans-serif'],
        /** Tipografía terciaria — titulares de sección, énfasis editorial */
        tertiary: ['"Playfair Display"', 'Georgia', 'serif'],
        hero: ['"Playfair Display"', 'Georgia', 'serif'],
        /** Carrusel hero — Galano Grotesque Light Italic (+ fallback) */
        carousel: ['"Galano Grotesque"', 'Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}
