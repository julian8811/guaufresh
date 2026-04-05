"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { baseHref } from "@/lib/base-href"

/** Barra clara tipo tienda: texto e iconos verde pizarra (legible sobre blanco) */
const NAV_SLATE = "text-[#3C4E4B]"
const NAV_SLATE_HOVER = "hover:bg-[#3C4E4B]/[0.06]"
const NAV_BORDER = "border-[#3C4E4B]"

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#producto", label: "Producto" },
  { href: "#beneficios", label: "Beneficios" },
  { href: "#reseñas", label: "Reseñas" },
  { href: "#como-usar", label: "Cómo usar" },
  { href: "#contacto", label: "Contacto" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getTotalItems, setIsOpen } = useCartStore()
  const totalItems = getTotalItems()

  return (
    <header
      className={`sticky top-0 z-50 w-full border-t ${NAV_BORDER} bg-white font-semibold shadow-[0_1px_0_0_rgba(0,0,0,0.05)]`}
    >
      <div className="relative mx-auto flex min-h-0 w-full max-w-7xl items-center gap-3 px-3 py-1.5 sm:gap-4 sm:px-5 sm:py-2 lg:gap-6 lg:px-6 lg:py-2">
        {/* Logo */}
        <a href={baseHref("/")} className="group relative z-10 flex min-w-0 shrink-0 items-center">
          <img
            src={baseHref("/logo-guaufresh.png")}
            alt="Guau Fresh Logo"
            width={800}
            height={400}
            className="h-[5rem] w-auto max-w-[min(52vw,280px)] object-contain object-left transition-transform duration-300 group-hover:scale-[1.02] sm:h-[6.25rem] sm:max-w-none md:h-28 lg:h-[7.25rem] xl:h-[8.25rem] 2xl:h-36"
            decoding="async"
          />
        </a>

        {/* Enlaces: ocupan el espacio central (flex-1) para no solaparse con iconos; antes absolute centraba en toda la pantalla */}
        <nav
          className={`font-secondary hidden min-w-0 flex-1 items-center justify-center gap-x-1.5 px-2 sm:gap-x-2 md:gap-x-2.5 lg:flex lg:px-4 xl:gap-x-3 xl:px-6 ${NAV_SLATE}`}
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap px-1.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.1em] transition-colors sm:px-2 sm:text-xs md:text-[0.8125rem] lg:text-sm xl:text-[0.9375rem] ${NAV_SLATE} ${NAV_SLATE_HOVER} rounded-md hover:text-[#2d3d3a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3C4E4B]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Acciones: separación clara respecto al último enlace + agrupación interna */}
        <div className="relative z-10 ml-auto flex shrink-0 items-center gap-2 sm:gap-2.5 md:gap-3 lg:ml-0 lg:border-l lg:border-[#3C4E4B]/12 lg:pl-6 xl:gap-3.5 xl:pl-8">
          <a
            href={baseHref("/login")}
            className={`hidden sm:flex ${NAV_SLATE} items-center justify-center rounded-lg p-1.5 transition-colors ${NAV_SLATE_HOVER}`}
            aria-label="Iniciar sesión"
          >
            <User className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} />
          </a>

          <a
            href={baseHref("/admin")}
            className={`hidden sm:flex ${NAV_SLATE} items-center justify-center rounded-lg p-1.5 transition-colors ${NAV_SLATE_HOVER}`}
            aria-label="Admin"
          >
            <Package className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} />
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={`relative inline-flex items-center justify-center rounded-lg p-1.5 ${NAV_SLATE} transition-colors ${NAV_SLATE_HOVER} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3C4E4B]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white`}
            aria-label={`Carrito de compras${totalItems > 0 ? `, ${totalItems} productos` : ""}`}
          >
            <ShoppingCart className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2} aria-hidden />
            <span
              className={`absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-0.5 font-sans text-[0.7rem] font-bold leading-none text-white ${totalItems > 0 ? "bg-[#3C4E4B]" : "bg-[#3C4E4B]/85"}`}
              aria-hidden
            >
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          </button>

          <div className="hidden md:block">
            <Button
              size="default"
              className="h-9 px-4 text-sm font-semibold shadow-sm transition-all hover:bg-primary/90 hover:shadow-md lg:h-10 lg:px-5 lg:text-base"
              onClick={() => setIsOpen(true)}
            >
              Comprar ahora
            </Button>
          </div>

          <button
            type="button"
            className={`inline-flex items-center justify-center rounded-lg p-1.5 ${NAV_SLATE} transition-colors lg:hidden ${NAV_SLATE_HOVER}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X className="h-7 w-7" aria-hidden /> : <Menu className="h-7 w-7" aria-hidden />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          className={`border-t border-black/8 bg-white px-4 py-4 font-sans lg:hidden ${NAV_SLATE} shadow-inner`}
          aria-label="Navegación móvil"
        >
          <div className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors ${NAV_SLATE} ${NAV_SLATE_HOVER} hover:text-[#2d3d3a]`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button
              className="mt-3 w-full bg-primary font-sans font-semibold text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                setIsMenuOpen(false)
                setIsOpen(true)
              }}
            >
              Comprar ahora
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
