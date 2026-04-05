"use client"

import { useState } from "react"
import { Check, ShoppingCart, Tag, Truck, CreditCard, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/lib/cart-store"
import { formatPrice } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase"
import { baseHref } from "@/lib/base-href"

interface Coupon {
  code: string
  discount_percent: number
}

// Fallback coupons (fast local check)
const FALLBACK_COUPONS: Record<string, number> = {
  'GUAUFRESH10': 10,
  'BIENVENIDO': 15,
  'GUAU20': 20,
  'VIP5': 5,
}

export function CheckoutForm() {
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore()
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [couponError, setCouponError] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState<string>("")
  const [couponLoading, setCouponLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  })

  const totalItems = getTotalItems()
  const subtotal = getTotalPrice()
  const discount = appliedCoupon ? Math.round(subtotal * appliedCoupon.discount_percent / 100) : 0
  const total = subtotal - discount

  const applyCoupon = async () => {
    setCouponError("")
    const code = couponCode.toUpperCase().trim()
    
    // 1. Fast local check first
    const fallbackDiscount = FALLBACK_COUPONS[code]
    if (fallbackDiscount) {
      setAppliedCoupon({ code, discount_percent: fallbackDiscount })
      return
    }
    
    // 2. If not in fallback, try Supabase (slower but allows dynamic coupons)
    setCouponLoading(true)
    try {
      const { data: coupon, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code)
        .eq('active', true)
        .single()

      if (error || !coupon) {
        setCouponError("Código de cupón inválido")
        return
      }

      // Check if coupon is still valid
      if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
        setCouponError("El cupón ha expirado")
        return
      }

      setAppliedCoupon({ code: coupon.code, discount_percent: coupon.discount_percent })
    } catch {
      setCouponError("Código de cupón inválido")
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const sendWhatsAppNotification = async (orderData: any) => {
    const message = `*Nuevo Pedido GuauFresh #${orderData.id.slice(0, 8)}*

*Cliente:* ${orderData.customer_name}
*Teléfono:* ${orderData.phone}
*Dirección:* ${orderData.address}

*Productos:*
${items.map(item => `• ${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}`).join('\n')}

*Total:* ${formatPrice(orderData.total)}
*Descuento:* ${formatPrice(orderData.discount || 0)}

Notas: ${orderData.notes || 'Sin notas'}`

    const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    
    try {
      // Create order in Supabase
      const orderData = {
        customer_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes,
        subtotal: subtotal,
        discount: discount,
        total: total,
        status: 'pending',
        items: JSON.stringify(items),
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select()
        .single()

      if (orderError) {
        console.error('Error creating order:', orderError)
        // Continue with demo mode if Supabase is not configured
      }

      // Create order items
      if (order?.id) {
        const orderItems = items.map(item => ({
          order_id: order.id,
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          price: item.price,
        }))

        await supabase.from('order_items').insert(orderItems)
      }

      // Send WhatsApp notification
      await sendWhatsAppNotification(order || { id: 'DEMO-' + Date.now(), ...orderData, total })
      
      setOrderId(order?.id || 'DEMO-' + Date.now())
      setIsProcessing(false)
      setOrderComplete(true)
      clearCart()
    } catch (error) {
      console.error('Error processing order:', error)
      // Demo mode fallback
      const demoOrderId = 'DEMO-' + Date.now()
      setOrderId(demoOrderId)
      setIsProcessing(false)
      setOrderComplete(true)
      clearCart()
    }
  }

  if (orderComplete) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Check className="h-8 w-8" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xl font-semibold">¡Pedido Confirmado!</p>
          <p className="mt-2 text-muted-foreground">
            Tu pedido #{orderId.slice(0, 8)} ha sido recibido. Te contactaremos pronto por WhatsApp para confirmar el envío.
          </p>
        </div>
        <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
          <a href={baseHref('/')}>Seguir Comprando</a>
        </Button>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="rounded-full bg-muted p-6">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        </div>
        <div>
          <p className="text-lg font-medium">Tu carrito está vacío</p>
        </div>
        <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
          <a href={baseHref('/')}>Ver Productos</a>
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="rounded-lg bg-card p-6 shadow-sm ring-1 ring-border">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-card-foreground">Información de Envío</h2>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
                  Nombre Completo *
                </label>
                <Input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  className="mt-2" 
                  placeholder="Juan Pérez"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-card-foreground">
                  Teléfono (WhatsApp) *
                </label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  required 
                  className="mt-2" 
                  placeholder="+57 300 123 4567"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-card-foreground">
                  Dirección de Envío *
                </label>
                <Input 
                  id="address" 
                  name="address" 
                  type="text" 
                  required 
                  className="mt-2" 
                  placeholder="Carrera 1 # 2-3, Bogotá"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-card-foreground">
                  Notas adicionales
                </label>
                <Input 
                  id="notes" 
                  name="notes" 
                  type="text" 
                  className="mt-2" 
                  placeholder="Horario de preferencia, instrucciones, etc."
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="rounded-lg bg-card p-6 shadow-sm ring-1 ring-border">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-lg font-semibold text-card-foreground">Método de Pago</h2>
            </div>
            
            <div className="rounded-lg border border-border p-4">
              <p className="text-sm text-muted-foreground">
                Actualmente aceptamos transferencias por Nequi y pago contra entrega.
                Después de confirmar tu pedido, te enviaremos los datos para realizar el pago.
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="rounded-lg bg-card p-6 shadow-sm ring-1 ring-border sticky top-24">
            <h2 className="text-lg font-semibold text-card-foreground">Resumen del Pedido</h2>
            
            {/* Coupon Input */}
            <div className="mt-4">
              <label htmlFor="coupon" className="block text-sm font-medium text-card-foreground">
                Código de descuento
              </label>
              <div className="mt-2 flex gap-2">
                <Input
                  id="coupon"
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="GUAUFRESH10"
                  className="uppercase"
                  disabled={!!appliedCoupon}
                />
                {appliedCoupon ? (
                  <Button type="button" variant="outline" onClick={removeCoupon}>
                    <Tag className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="button" onClick={applyCoupon} disabled={couponLoading}>
                    {couponLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Aplicar"}
                  </Button>
                )}
              </div>
              {couponError && (
                <p className="mt-1 text-sm text-destructive">{couponError}</p>
              )}
              {appliedCoupon && (
                <p className="mt-1 text-sm text-green-600">
                  ¡Descuento del {appliedCoupon.discount_percent}% aplicado!
                </p>
              )}
            </div>

            {/* Items Summary */}
            <div className="mt-4 space-y-3 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Descuento</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Envío</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <Button 
              type="submit"
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              size="lg"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="mr-2 animate-spin">⏳</span>
                  Procesando...
                </>
              ) : (
                "Confirmar Pedido"
              )}
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Al confirmar, aceptas nuestros términos y condiciones
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
