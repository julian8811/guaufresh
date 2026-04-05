"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { baseHref } from "@/lib/base-href"

/** Verde bosque para CTA */
const CTA_FOREST = "bg-[#1a3d2e] hover:bg-[#143326] text-white shadow-lg"

type Slide = {
  src: string
  alt: string
  headline: string
}

/** 10 imágenes en `public/carousel/hero-01.png` … `hero-10.png` (landscape, object-fit: cover). */
const carouselSlides: Slide[] = [
  {
    src: baseHref("/carousel/hero-01.png"),
    alt: "Gato siamés con espuma limpiadora Guau Fresh en hogar luminoso",
    headline: "Espuma limpiadora sin aclarado",
  },
  {
    src: baseHref("/carousel/hero-02.png"),
    alt: "Perro salchicha con botella Guau Fresh sobre fondo claro",
    headline: "Limpieza suave entre baños",
  },
  {
    src: baseHref("/carousel/hero-03.png"),
    alt: "Salchicha de pelo largo con producto y toalla Guau Fresh",
    headline: "Cuidado en casa, sin complicaciones",
  },
  {
    src: baseHref("/carousel/hero-04.png"),
    alt: "Golden retriever en jardín con espuma limpiadora Guau Fresh",
    headline: "Brillo y frescura al aire libre",
  },
  {
    src: baseHref("/carousel/hero-05.png"),
    alt: "Mascota y producto Guau Fresh en entorno soleado",
    headline: "Ingredientes naturales para tu peludo",
  },
  {
    src: baseHref("/carousel/hero-06.png"),
    alt: "Espuma limpiadora Guau Fresh con ingredientes naturales sobre mármol",
    headline: "Fórmula pensada para tu mascota",
  },
  {
    src: baseHref("/carousel/hero-07.png"),
    alt: "Bulldog francés con espuma limpiadora Guau Fresh",
    headline: "Patas y rostro, sin enjuague",
  },
  {
    src: baseHref("/carousel/hero-08.png"),
    alt: "Bulldog francés con iluminación de estudio y Guau Fresh",
    headline: "Calidad que se nota",
  },
  {
    src: baseHref("/carousel/hero-09.png"),
    alt: "Aplicación de espuma Guau Fresh en el pelaje al aire libre",
    headline: "Rutina fácil, resultados reales",
  },
  {
    src: baseHref("/carousel/hero-10.png"),
    alt: "Gato e ingredientes naturales junto a Guau Fresh",
    headline: "Guau Fresh · naturalmente",
  },
]

const PRODUCT = {
  id: "guaufresh-espuma-150ml",
  name: "Guau Fresh - Espuma Limpiadora 150mL",
  price: 45000,
  image: baseHref("/product-foam.png"),
}

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const { addItem } = useCartStore()
  const slide = carouselSlides[current]

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % carouselSlides.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselSlides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [])

  const handleCompraAhora = () => {
    addItem(PRODUCT)
  }

  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-neutral-950">
      {/* Contenedor 16:9 aprox.: alto acotado para que el encuadre landscape se vea completo en pantallas altas */}
      <div className="relative min-h-[min(78vh,640px)] w-full md:min-h-[min(82vh,760px)] lg:min-h-[min(85vh,820px)]">
        <img
          key={`slide-${current}`}
          src={slide.src}
          alt={slide.alt}
          className="absolute inset-0 h-full w-full object-cover object-center animate-fade-in"
          decoding="async"
        />

        {/* Overlay suave: legibilidad del texto sin tapar el producto (zona izquierda/centro más clara en desktop) */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10 md:bg-gradient-to-r md:from-black/15 md:via-black/10 md:to-black/55"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 pb-12 sm:p-8 md:justify-center md:pb-8 md:pr-10 lg:pr-16 xl:pr-20">
          <div className="ml-auto w-full max-w-2xl text-center md:max-w-3xl md:text-right">
            <h1 className="font-carousel text-balance text-2xl font-light italic leading-snug tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-3xl md:text-4xl lg:text-[2.35rem] xl:text-[2.65rem]">
              {slide.headline}
            </h1>
            <p className="mt-3 font-secondary text-sm text-white/95 drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)] sm:mt-4 sm:text-base md:text-lg">
              Guau Fresh · 150&nbsp;mL · $45.000&nbsp;COP
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-end md:mt-8">
              <Button
                type="button"
                size="lg"
                className={`rounded-full px-8 py-5 font-secondary text-sm font-semibold tracking-wide sm:px-10 sm:py-6 sm:text-base ${CTA_FOREST}`}
                onClick={handleCompraAhora}
              >
                Compra ahora
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="rounded-full border-white px-6 py-5 font-secondary text-sm text-white bg-transparent hover:bg-white/15 hover:text-white sm:py-6 sm:text-base"
                asChild
              >
                <a href="#producto">Ver detalles</a>
              </Button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/95 text-neutral-800 shadow-lg transition-all hover:bg-white sm:left-4 sm:h-11 sm:w-11"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/95 text-neutral-800 shadow-lg transition-all hover:bg-white sm:right-4 sm:h-11 sm:w-11"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex max-w-[90vw] -translate-x-1/2 flex-wrap justify-center gap-2">
          {carouselSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              className={`h-2.5 w-2.5 rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.2)] transition-all sm:h-3 sm:w-3 ${
                current === idx
                  ? "scale-110 bg-white shadow-md ring-1 ring-black/15"
                  : "bg-white/50 hover:bg-white/85"
              }`}
              aria-label={`Ver imagen ${idx + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-4 left-4 z-20 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
          {current + 1} / {carouselSlides.length}
        </div>
      </div>
    </section>
  )
}
