"use client"

import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import { baseHref } from "@/lib/base-href"
import { Separator } from "@/components/ui/separator"

export function CartContent() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, clearCart } = useCartStore()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="rounded-full bg-muted p-6">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        </div>
        <div>
          <p className="text-lg font-medium">Tu carrito está vacío</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Agrega productos para comenzar tu compra
          </p>
        </div>
        <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
          <a href={baseHref('/')}>Ver Productos</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <ul className="divide-y divide-border" role="list">
            {items.map((item) => (
              <li key={item.id} className="py-6">
                <div className="flex gap-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-foreground">{item.name}</h3>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        <Trash2 className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-1 font-medium text-primary">
                      {formatPrice(item.price)}
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Reducir cantidad de ${item.name}`}
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        aria-label={`Aumentar cantidad de ${item.name}`}
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="mt-4">
            <Button 
              variant="ghost" 
              className="text-muted-foreground hover:text-destructive"
              onClick={clearCart}
            >
              Vaciar Carrito
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="rounded-lg bg-card p-6 shadow-sm ring-1 ring-border">
            <h2 className="text-lg font-semibold text-card-foreground">Resumen del Pedido</h2>
            
            <div className="mt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({totalItems} productos)</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-medium text-green-600">Gratis</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Button 
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
              asChild
            >
              <a href={baseHref('/checkout')}>
                Continuar Compra
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Los gastos de envío se calcularán al finalizar la compra
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
