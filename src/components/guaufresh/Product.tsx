"use client"

import { useState, useEffect } from "react"
import { Check, ShoppingCart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import { supabase } from "@/lib/supabase"
import { baseHref } from "@/lib/base-href"

interface ProductData {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  stock: number
  category: string
}

const features = [
  "Proteína de trigo hidrolizada",
  "Extractos de origen vegetal",
  "Aroma agradable y fresco",
  "Textura espumosa fácil de aplicar",
  "Sin necesidad de enjuague",
  "Válvula dispensadora",
]

const specs = [
  { label: "Presentación", value: "Envase de plástico con válvula dispensadora" },
  { label: "Vida Útil", value: "1 año" },
  { label: "Conservación", value: "Temperatura ambiente, lugar fresco y seco" },
]

// Fallback products for instant load
const FALLBACK_PRODUCTS: ProductData[] = [
  {
    id: "guaufresh-50ml",
    name: "Guau Fresh - Espuma Limpiadora 50mL",
    description: "Espuma limpiadora en seco para perros con ingredientes 100% naturales.",
    price: 38000,
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post01_producto_ai_real-bnPpks8M8SlChOZAdQp2j5bVoHwUqD.png"],
    stock: 100,
    category: "espuma"
  },
  {
    id: "guaufresh-150ml",
    name: "Guau Fresh - Espuma Limpiadora 150mL",
    description: "Espuma limpiadora en seco para perros con ingredientes 100% naturales.",
    price: 45000,
    images: ["https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post01_producto_ai_real-bnPpks8M8SlChOZAdQp2j5bVoHwUqD.png"],
    stock: 100,
    category: "espuma"
  }
]

export function Product() {
  const [products, setProducts] = useState<ProductData[]>(FALLBACK_PRODUCTS)
  const [loading, setLoading] = useState(false) // Start with false for instant render
  const [error, setError] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>(FALLBACK_PRODUCTS[0]?.id || "")
  const { addItem } = useCartStore()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'espuma')
        .order('price', { ascending: true })

      if (fetchError) throw fetchError

      // Only update if we got real data
      if (data && data.length > 0) {
        setProducts(data)
        // Keep current selection if still valid
        if (!data.find(p => p.id === selectedSize)) {
          setSelectedSize(data[0].id)
        }
      }
    } catch (err: any) {
      // Silently keep using fallback products - no error needed
      console.warn('Supabase unavailable, using offline products')
    } finally {
      setLoading(false)
    }
  }

  const currentProduct = products.find(p => p.id === selectedSize)

  const handleAddToCart = () => {
    if (!currentProduct) return
    
    addItem({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.images?.[0] || baseHref("/product-foam.png"),
    })
  }

  if (loading) {
    return (
      <section id="producto" className="bg-muted py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-stretch gap-8 lg:grid-cols-5 lg:gap-8">
            {/* Image skeleton */}
            <div className="relative lg:col-span-2 min-h-96 lg:min-h-full rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gray-200 animate-pulse" />
            </div>
            {/* Content skeleton */}
            <div className="lg:col-span-3 space-y-4">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-64 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="producto" className="bg-muted py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-destructive">{error}</p>
          <Button variant="outline" className="mt-4" onClick={loadProducts}>
            Reintentar
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section id="producto" className="bg-muted py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-5 lg:gap-8">
          {/* Image */}
          <div className="relative lg:col-span-2 min-h-96 lg:min-h-full rounded-2xl overflow-hidden shadow-xl">
            <img
              src={currentProduct?.images?.[0] || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_c5ruyc5ruyc5ruyc.png-DbWusuhdqUuDK8XK4BA6bwtIYMJdZ8.jpeg"}
              alt={currentProduct?.name || "Guau Fresh Espuma Limpiadora"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <span className="inline-block rounded-full bg-secondary/20 px-3 py-1 text-sm font-medium text-primary">
                Ficha Técnica
              </span>
              <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {currentProduct?.name || "Espuma Limpiadora para Perros"}
              </h2>
              <p className="mt-3 text-pretty text-base text-muted-foreground">
                {currentProduct?.description || "Espuma limpiadora a base de extractos y proteínas de origen vegetal que limpian en seco, humecta la piel, da brillo y suavidad al pelaje de tu mascota."}
              </p>
            </div>

            {/* Size Selection - from DB products */}
            <div className="mt-4">
              <p className="text-sm font-semibold text-foreground mb-2">Tamaño</p>
              <div className="flex gap-2 flex-wrap">
                {products.map((product) => {
                  // Extract size from product name (e.g., "50mL" or "150mL")
                  const sizeMatch = product.name.match(/(\d+m[Ll])/);
                  const sizeLabel = sizeMatch ? sizeMatch[1] : product.name;
                  
                  return (
                    <button
                      key={product.id}
                      onClick={() => setSelectedSize(product.id)}
                      className={`px-3 py-2 rounded-lg border-2 transition-colors text-sm font-medium ${
                        selectedSize === product.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-foreground hover:border-primary/50"
                      }`}
                    >
                      {sizeLabel}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Precio</p>
                <p className="text-2xl font-bold text-primary">
                  {formatPrice(currentProduct?.price || 0)}
                </p>
              </div>
              <Button
                size="sm"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAddToCart}
                disabled={!currentProduct || currentProduct.stock === 0}
              >
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                {currentProduct?.stock === 0 ? "Agotado" : "Agregar al Carrito"}
              </Button>
            </div>

            {/* Features */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-foreground">Características Principales</h3>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2 text-sm" role="list">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground mt-0.5">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="mt-4 rounded-lg bg-card p-4 shadow-sm ring-1 ring-border">
              <h3 className="text-sm font-semibold text-card-foreground">Especificaciones</h3>
              <dl className="mt-2 grid gap-2 grid-cols-2 text-xs">
                {specs.map((spec) => (
                  <div key={spec.label}>
                    <dt className="font-medium text-muted-foreground">{spec.label}</dt>
                    <dd className="text-foreground">{spec.value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="font-medium text-muted-foreground">Contenido</dt>
                  <dd className="text-foreground">
                    {currentProduct?.name?.match(/(\d+m[Ll])/)?.[1] || "N/A"}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
