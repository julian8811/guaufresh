import { baseHref } from "@/lib/base-href"

const footerLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#producto", label: "Producto" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#reseñas", label: "Reseñas" },
  { href: "#como-usar", label: "Cómo usar" },
  { href: "#contacto", label: "Contacto" },
]

const legalLinks = [
  { href: baseHref("/terminos"), label: "Términos y condiciones" },
  { href: baseHref("/privacidad"), label: "Privacidad" },
  { href: baseHref("/tratamiento-de-datos"), label: "Tratamiento de datos (Ley 1581)" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <a href={baseHref('/')} className="flex items-center">
              <img
                src={baseHref('/logo-guaufresh.png')}
                alt="Guau Fresh Logo"
                width={400}
                height={160}
                className="h-[5.5rem] w-auto max-w-[min(100%,400px)] object-contain sm:h-24 md:h-28 lg:h-32"
                decoding="async"
              />
            </a>
            <p className="max-w-xs text-center text-sm text-background/70 lg:text-left">
              Espuma limpiadora para perros con ingredientes naturales. Cuida a tu peludo con amor.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6" aria-label="Navegación de pie de página">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-background/70 transition-colors hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <nav
          className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-background/10 pt-6"
          aria-label="Información legal"
        >
          {legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs text-background/55 transition-colors hover:text-background/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary sm:text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="mt-6 border-t border-background/10 pt-8">
          <p className="text-center text-sm text-background/50">
            © {currentYear} Guau Fresh. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
