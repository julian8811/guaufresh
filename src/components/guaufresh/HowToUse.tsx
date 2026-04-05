const steps = [
  {
    number: "01",
    title: "Agitar Antes de Usar",
    description: "Agita bien el envase antes de cada aplicación para asegurar una mezcla homogénea.",
  },
  {
    number: "02",
    title: "Aplicar la Espuma",
    description: "Presiona la válvula en posición vertical y aplica la espuma directamente sobre tu peludo.",
  },
  {
    number: "03",
    title: "Masajear en Círculos",
    description: "Masajea suavemente en forma circular para distribuir el producto por todo el pelaje.",
  },
  {
    number: "04",
    title: "Limpiar con Toalla",
    description: "Limpia con una toalla húmeda para remover la suciedad. ¡Listo, peludo limpio y feliz!",
  },
]

const precautions = [
  "Producto de uso externo, solo para perros",
  "Manténgase fuera del alcance de niños y animales domésticos",
  "Evite la ingestión y el contacto con los ojos",
  "En caso de irritación, suspenda su uso",
]

export function HowToUse() {
  return (
    <section id="como-usar" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cómo usar Guau Fresh
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
            Sigue estos sencillos pasos para mantener a tu peludo limpio y fresco en minutos.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.number} className="relative">
              {/* Connector line - hidden on mobile */}
              {index < steps.length - 1 && (
                <div 
                  className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-border lg:block" 
                  aria-hidden="true" 
                />
              )}
              <div className="relative flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground shadow-lg sm:h-24 sm:w-24 sm:text-3xl">
                  {step.number}
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground sm:mt-6 sm:text-xl">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base">{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Precautions */}
        <div className="mt-16 rounded-2xl bg-secondary/10 p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-foreground">Precauciones de Uso</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2" role="list">
            {precautions.map((precaution) => (
              <li key={precaution} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </span>
                <span className="text-muted-foreground">{precaution}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
