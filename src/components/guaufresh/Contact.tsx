"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin } from "lucide-react"

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contacto" className="bg-primary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              ¿Listo para probar Guau Fresh?
            </h2>
            <p className="mt-4 text-pretty text-lg text-primary-foreground/80">
              Contáctanos para realizar tu pedido o resolver cualquier duda sobre nuestro producto. 
              Estamos aquí para ayudarte a cuidar de tu peludo.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/20">
                  <Mail className="h-5 w-5 text-secondary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-foreground">Correo Electrónico</h3>
                  <a 
                    href="mailto:contacto@guaufresh.com" 
                    className="mt-1 text-primary-foreground/80 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    contacto@guaufresh.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/20">
                  <Phone className="h-5 w-5 text-secondary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-foreground">Teléfono</h3>
                  <a 
                    href="tel:+573001234567" 
                    className="mt-1 text-primary-foreground/80 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    +57 300 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary/20">
                  <MapPin className="h-5 w-5 text-secondary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-foreground">Ubicación</h3>
                  <p className="mt-1 text-primary-foreground/80">
                    Bogotá, Colombia
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6 shadow-xl sm:p-8">
            {isSubmitted ? (
              <div className="flex h-full flex-col items-center justify-center text-center" role="status" aria-live="polite">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-card-foreground">¡Mensaje Enviado!</h3>
                <p className="mt-2 text-muted-foreground">
                  Gracias por contactarnos. Te responderemos pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-card-foreground">
                    Nombre Completo
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Tu nombre…"
                    className="mt-2"
                    spellCheck={false}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-card-foreground">
                    Correo Electrónico
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="tu@email.com"
                    className="mt-2"
                    spellCheck={false}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-card-foreground">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+57 300 000 0000"
                    className="mt-2"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-card-foreground">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="¿En qué podemos ayudarte?…"
                    className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2 animate-spin">⏳</span>
                      Enviando…
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
