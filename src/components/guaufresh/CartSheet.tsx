"use client"

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import { baseHref } from "@/lib/base-href"
import { Separator } from "@/components/ui/separator"

export function CartSheet() {
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice, isOpen, setIsOpen, clearCart } = useCartStore()

  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-5 w-5 text-primary" aria-hidden="true" />
            Carrito de Compras
            {totalItems > 0 && (
              <span className="ml-2 rounded-full bg-primary px-2.5 py-0.5 text-sm font-medium text-primary-foreground">
                {totalItems}
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            Revisa los productos agregados a tu carrito y procede al pago.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-muted p-6">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            </div>
            <div>
              <p className="text-lg font-medium">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Agrega productos para comenzar tu compra
              </p>
            </div>
            <SheetClose asChild>
              <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                Seguir Comprando
              </Button>
            </SheetClose>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="divide-y divide-border" role="list" aria-label="Productos en el carrito">
                {items.map((item) => (
                  <li key={item.id} className="py-4">
                    <div className="flex gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label={`Eliminar ${item.name} del carrito`}
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                        <p className="mt-1 text-sm font-medium text-primary">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label={`Reducir cantidad de ${item.name}`}
                          >
                            <Minus className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium" aria-label={`Cantidad: ${item.quantity}`}>
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
            </div>

            <Separator />

            <SheetFooter className="flex-col gap-4 pt-4">
              <div className="flex items-center justify-between text-base">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Los gastos de envío se calcularán al finalizar la compra
              </p>
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
                onClick={() => {
                  window.location.href = baseHref('/checkout')
                }}
              >
                Finalizar Compra
              </Button>
              <div className="flex gap-2">
                <SheetClose asChild>
                  <Button variant="outline" className="flex-1">
                    Seguir Comprando
                  </Button>
                </SheetClose>
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-destructive"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
