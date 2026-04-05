
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-primary py-16 sm:py-24 lg:py-32">
      {/* Decorative paw prints */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <svg className="absolute left-10 top-10 h-24 w-24 text-primary-foreground" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="65" rx="25" ry="20" />
          <ellipse cx="25" cy="30" rx="12" ry="10" />
          <ellipse cx="75" cy="30" rx="12" ry="10" />
          <ellipse cx="15" cy="55" rx="10" ry="8" />
          <ellipse cx="85" cy="55" rx="10" ry="8" />
        </svg>
        <svg className="absolute bottom-20 right-20 h-32 w-32 text-primary-foreground" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="65" rx="25" ry="20" />
          <ellipse cx="25" cy="30" rx="12" ry="10" />
          <ellipse cx="75" cy="30" rx="12" ry="10" />
          <ellipse cx="15" cy="55" rx="10" ry="8" />
          <ellipse cx="85" cy="55" rx="10" ry="8" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm font-medium text-primary-foreground">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>100% Ingredientes Naturales</span>
            </div>
            
            <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              Limpieza en seco para tu peludo favorito
            </h1>
            
            <p className="mt-6 text-pretty text-lg text-primary-foreground/80 sm:text-xl">
              Espuma limpiadora que limpia, humecta y da brillo al pelaje de tu mascota. 
              Ideal para usar entre baños o cuando no hay tiempo para un baño completo.
            </p>

            {/* Pricing Information */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-6">
              <div className="rounded-lg bg-secondary/20 px-4 py-3">
                <p className="text-xs text-primary-foreground/80">Envase 50 mL</p>
                <p className="text-2xl font-bold text-primary-foreground">$38.000 COP</p>
              </div>
              <div className="rounded-lg bg-secondary/20 px-4 py-3">
                <p className="text-xs text-primary-foreground/80">Envase 150 mL</p>
                <p className="text-2xl font-bold text-primary-foreground">$45.000 COP</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Button 
                asChild
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <a href="#producto">Conoce el producto</a>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 focus-visible:ring-2 focus-visible:ring-primary-foreground"
              >
                <a href="#como-usar">Cómo usarlo</a>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative circle behind product */}
              <div className="absolute -inset-4 rounded-full bg-secondary/30" aria-hidden="true" />
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post01_producto_ai_real-bnPpks8M8SlChOZAdQp2j5bVoHwUqD.png"
                alt="Espuma limpiadora Guau Fresh - Botella de 150mL con válvula dispensadora"
                width={400}
                height={500}
                className="relative z-10 h-auto w-full max-w-sm drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
