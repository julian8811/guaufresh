"use client"

import { useState, useEffect } from "react"
import { X, Gift, ChevronLeft, ChevronRight, Mail, User, Dog } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LeadSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    petName: "",
  })

  useEffect(() => {
    // Check if user already submitted
    const hasSubmitted = localStorage.getItem("guaufresh_lead_submitted")
    if (hasSubmitted) {
      setIsSubmitted(true)
      return
    }

    // Show minimized tab after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would send the data to your backend/CRM
    console.log("Lead captured:", formData)
    
    // Mark as submitted
    localStorage.setItem("guaufresh_lead_submitted", "true")
    localStorage.setItem("guaufresh_lead_data", JSON.stringify(formData))
    setIsSubmitted(true)
    
    // Close after 3 seconds
    setTimeout(() => {
      setIsMinimized(true)
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  if (!isOpen) return null

  // Hide sidebar on very small screens (mobile)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768

  return (
    <>
      {/* Minimized Tab - Hidden on mobile */}
      {isMinimized && !isMobile && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-lg bg-primary px-2 py-4 text-primary-foreground shadow-lg transition-all hover:px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Abrir formulario de descuento"
        >
          <div className="flex flex-col items-center gap-2">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            <Gift className="h-6 w-6" aria-hidden="true" />
            <span className="text-xs font-bold [writing-mode:vertical-rl] [text-orientation:mixed]">
              15% OFF
            </span>
          </div>
        </button>
      )}

      {/* Expanded Sidebar - Responsive design */}
      {!isMinimized && (
        <>
          {/* Overlay for mobile */}
          {isMobile && (
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsMinimized(true)}
              aria-hidden="true"
            />
          )}
          
          <aside
            className="fixed right-0 top-1/2 z-50 w-full -translate-y-1/2 rounded-l-2xl bg-white shadow-2xl sm:w-96 md:w-80"
            role="complementary"
            aria-label="Formulario de suscripción"
          >
          {/* Header */}
          <div className="relative rounded-tl-2xl bg-primary px-4 py-5 text-center">
            {!isMobile && (
              <button
                onClick={() => setIsMinimized(true)}
                className="absolute left-2 top-2 rounded-full p-1 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
                aria-label="Minimizar"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-2 rounded-full p-1 text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Gift className="h-6 w-6 text-secondary-foreground" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-bold text-primary-foreground">
              Obtén un 15% de descuento
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-primary-foreground/80">
              Suscríbete y recibe ofertas exclusivas
            </p>
          </div>

          {/* Content */}
          <div className="p-5">
            {isSubmitted ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Gracias por suscribirte
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Revisa tu correo para recibir tu código de descuento del 15%.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="lead-name" className="sr-only">
                    Tu nombre
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="lead-name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      autoComplete="name"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lead-email" className="sr-only">
                    Tu email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="lead-email"
                      name="email"
                      type="email"
                      placeholder="Tu email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="email"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lead-petName" className="sr-only">
                    Nombre de tu mascota
                  </label>
                  <div className="relative">
                    <Dog className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input
                      id="lead-petName"
                      name="petName"
                      type="text"
                      placeholder="Nombre de tu mascota"
                      value={formData.petName}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Obtener mi 15% OFF
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Al suscribirte, aceptas recibir emails de Guau Fresh.
                  Puedes darte de baja en cualquier momento.
                </p>
              </form>
            )}

            {/* Product Preview */}
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted/50 p-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post01_producto_ai_real-bnPpks8M8SlChOZAdQp2j5bVoHwUqD.png"
                alt="Guau Fresh"
                width={50}
                height={60}
                className="rounded-md"
              />
              <div>
                <p className="text-sm font-medium text-foreground">Guau Fresh 150mL</p>
                <p className="text-xs text-muted-foreground">
                  <span className="line-through">$45.000</span>{" "}
                  <span className="font-bold text-primary">$38.250</span>
                </p>
              </div>
            </div>
          </div>
          </aside>
        </>
      )}
    </>
  )
}
