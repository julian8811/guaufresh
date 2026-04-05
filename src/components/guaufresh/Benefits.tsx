import { Droplets, Sparkles, Heart, Leaf, Clock, Shield, type LucideIcon } from "lucide-react"
import { baseHref } from "@/lib/base-href"

type Benefit = {
  icon: LucideIcon
  title: string
  description: string
  image: string
}

const benefits: Benefit[] = [
  {
    icon: Droplets,
    title: "Limpieza Sin Agua",
    description: "Limpia en seco el pelaje de tu mascota sin necesidad de mojarla completamente.",
    image: baseHref("/benefits/benefit-limpieza.png"),
  },
  {
    icon: Sparkles,
    title: "Brillo y Suavidad",
    description: "Deja el pelaje brillante, suave y con un aroma fresco y agradable.",
    image: baseHref("/benefits/benefit-brillo.png"),
  },
  {
    icon: Heart,
    title: "Humecta la Piel",
    description: "Hidrata y cuida la piel de tu peludo gracias a sus proteínas vegetales.",
    image: baseHref("/benefits/benefit-humecta.png"),
  },
  {
    icon: Leaf,
    title: "Ingredientes Naturales",
    description: "Formulado con extractos y proteínas de origen vegetal, seguro para tu mascota.",
    image: baseHref("/benefits/benefit-ingredientes.png"),
  },
  {
    icon: Clock,
    title: "Rápido y Práctico",
    description: "Ideal para limpiezas rápidas entre baños o cuando no hay tiempo.",
    image: baseHref("/benefits/benefit-rapido.png"),
  },
  {
    icon: Shield,
    title: "Seguro y Confiable",
    description: "Producto de uso externo probado y aprobado para el cuidado de perros.",
    image: baseHref("/benefits/benefit-seguro.png"),
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="bg-muted/40 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Beneficios para tu mascota
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Descubre por qué Guau Fresh es la mejor opción para mantener a tu peludo limpio y feliz.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-md ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-primary"
            >
              {/* Imagen de fondo: translúcida / apagada → color real al hover */}
              <div
                className="absolute inset-0 scale-105 bg-cover bg-center transition-all duration-500 ease-out opacity-[0.38] saturate-[0.55] brightness-[0.92] group-hover:scale-100 group-hover:opacity-100 group-hover:saturate-100 group-hover:brightness-100"
                style={{ backgroundImage: `url(${benefit.image})` }}
              />
              {/* Capa oscura suave para legibilidad; se reduce al hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-black/25 transition-opacity duration-500 group-hover:from-black/35 group-hover:via-black/15 group-hover:to-black/10" />

              <div className="relative z-10 flex h-full flex-col p-6 sm:p-7">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/25 text-white shadow-sm backdrop-blur-[2px] transition-all duration-300 group-hover:scale-110 group-hover:bg-white/40 group-hover:text-white">
                  <benefit.icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="text-lg font-bold leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] transition-all duration-300 group-hover:scale-[1.02] group-hover:text-white group-hover:drop-shadow-[0_4px_14px_rgba(0,0,0,0.85)] sm:text-xl">
                  {benefit.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/90 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)] sm:text-[0.95rem]">
                  {benefit.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
