"use client"

import { useEffect, useState } from "react"

import { X, Tag, Truck, Clock } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

const POPUP_DELAY_MS = 3000
const POPUP_STORAGE_KEY = "guaufresh_popup_dismissed"

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const { addItem, setIsOpen: openCart } = useCartStore()

  useEffect(() => {
    const dismissed = sessionStorage.getItem(POPUP_STORAGE_KEY)
    if (!dismissed) {
      const timer = setTimeout(() => setIsOpen(true), POPUP_DELAY_MS)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleClose() {
    sessionStorage.setItem(POPUP_STORAGE_KEY, "true")
    setIsOpen(false)
  }

  function handleAddToCart() {
    addItem({
      id: "guaufresh-150ml",
      name: "Espuma Limpiadora Guau Fresh 150mL",
      price: 40500,
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post01_producto_ai_real-bnPpks8M8SlChOZAdQp2j5bVoHwUqD.png",
    })
    openCart(true)
    handleClose()
  }

  if (!isOpen) return null

  return (
    /* Backdrop */
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
      aria-describedby="popup-description"
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel - Responsive max-width */}
      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-w-md sm:rounded-3xl">

        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Cerrar promoción"
          className="absolute right-3 top-3 sm:right-4 sm:top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground shadow transition hover:bg-white hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Top image band - Smaller height on mobile */}
        <div className="relative h-40 w-full bg-primary sm:h-52">
          <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post13_pelaje_brillante-HQZvpyJanGIP0qGwDonXmNKfPvg667.png"
              alt="Bulldog feliz con Guau Fresh"
              className="h-full w-full object-cover object-top opacity-80"
            />
          {/* Badge */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs sm:text-sm font-bold text-foreground shadow">
            <Tag className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
            OFERTA
          </div>
        </div>

        {/* Body - Responsive padding */}
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <h2
            id="popup-title"
            className="text-balance text-xl sm:text-2xl font-bold text-foreground"
          >
            Tu peludo merece lo mejor
          </h2>
          <p
            id="popup-description"
            className="mt-2 text-pretty text-xs sm:text-sm text-muted-foreground"
          >
            Hoy con tu primera compra obtienes un <span className="font-semibold text-primary">10% de descuento</span> en la Espuma Limpiadora Guau Fresh.
          </p>

          {/* Price - Responsive sizing */}
          <div className="mt-4 flex items-baseline gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-primary">$40.500</span>
            <span className="text-xs sm:text-base text-muted-foreground line-through">$45.000</span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-foreground">
              -10%
            </span>
          </div>

          {/* Perks - Smaller text on mobile */}
          <ul className="mt-4 space-y-1.5 sm:space-y-2">
            <li className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Truck className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-primary" aria-hidden="true" />
              Envío a toda Colombia
            </li>
            <li className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-primary" aria-hidden="true" />
              Oferta válida por tiempo limitado
            </li>
          </ul>

          {/* Actions - Stacked on mobile */}
          <div className="mt-5 sm:mt-6 flex flex-col gap-2 sm:gap-3">
            <button
              onClick={handleAddToCart}
              className="w-full rounded-lg sm:rounded-xl bg-primary px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Agregar al carrito
            </button>
            <button
              onClick={handleClose}
              className="w-full rounded-lg sm:rounded-xl border border-border px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-medium text-muted-foreground transition hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Quizás después
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
