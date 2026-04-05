"use client"

import { useState, useEffect, useMemo, useCallback, type FormEvent } from "react"
import { Star, Quote, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { baseHref } from "@/lib/base-href"
import { supabase, type Review as DbReview } from "@/lib/supabase"

/** Fotos en `public/reviews/` — emparejadas con mascota y raza del testimonio */
const PET_IMAGES = {
  luna: baseHref("/reviews/luna-golden-retriever.png"),
  max: baseHref("/reviews/max-bulldog-frances.png"),
  coco: baseHref("/reviews/coco-poodle.png"),
  toby: baseHref("/reviews/toby-labrador.png"),
  bella: baseHref("/reviews/bella-shih-tzu.png"),
  rocky: baseHref("/reviews/rocky-pastor-aleman.png"),
} as const

const PET_IMAGE_LIST = Object.values(PET_IMAGES)

function pickPetImage(seed: string): string {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h + seed.charCodeAt(i)) % 10007
  return PET_IMAGE_LIST[h % PET_IMAGE_LIST.length]
}

interface Review {
  id: string
  name: string
  location: string
  petImage: string
  rating: number
  date: string
  petName: string
  petBreed: string
  comment: string
  verified: boolean
}

const seedReviews: Review[] = [
  {
    id: "seed-1",
    name: "María Fernández",
    location: "Bogotá",
    petImage: PET_IMAGES.luna,
    rating: 5,
    date: "Hace 2 semanas",
    petName: "Luna",
    petBreed: "Golden Retriever",
    comment:
      "Increíble producto. Luna queda con el pelaje súper suave y brillante. Lo mejor es que no necesita agua, perfecto para los días fríos cuando no quiero bañarla completamente.",
    verified: true,
  },
  {
    id: "seed-2",
    name: "Carlos Rodríguez",
    location: "Medellín",
    petImage: PET_IMAGES.max,
    rating: 5,
    date: "Hace 1 mes",
    petName: "Max",
    petBreed: "Bulldog francés",
    comment:
      "Mi Max tiene la piel sensible y este producto no le causa ninguna irritación. El aroma es muy agradable y dura bastante. Muy recomendado para perros con piel delicada.",
    verified: true,
  },
  {
    id: "seed-3",
    name: "Ana Martínez",
    location: "Cali",
    petImage: PET_IMAGES.coco,
    rating: 4,
    date: "Hace 3 semanas",
    petName: "Coco",
    petBreed: "Caniche toy",
    comment:
      "Excelente para mantener a Coco limpio entre baños. La espuma es muy fácil de aplicar y el pelaje queda muy manejable. Lo uso cada semana y me encanta el resultado.",
    verified: true,
  },
  {
    id: "seed-4",
    name: "Pedro González",
    location: "Barranquilla",
    petImage: PET_IMAGES.toby,
    rating: 5,
    date: "Hace 1 semana",
    petName: "Toby",
    petBreed: "Labrador retriever",
    comment:
      "Toby odia los baños tradicionales pero con esta espuma es súper fácil limpiarlo. Solo aplico, masajeo y listo. El pelaje queda increíblemente limpio y con un olor delicioso.",
    verified: true,
  },
  {
    id: "seed-5",
    name: "Laura Sánchez",
    location: "Cartagena",
    petImage: PET_IMAGES.bella,
    rating: 5,
    date: "Hace 2 meses",
    petName: "Bella",
    petBreed: "Shih Tzu",
    comment:
      "Lo mejor que he comprado para Bella. Su pelaje largo se enreda mucho pero con este producto queda súper suave y fácil de peinar. ¡Ya llevo 3 envases!",
    verified: true,
  },
  {
    id: "seed-6",
    name: "Diego Herrera",
    location: "Bucaramanga",
    petImage: PET_IMAGES.rocky,
    rating: 4,
    date: "Hace 1 mes",
    petName: "Rocky",
    petBreed: "Pastor alemán",
    comment:
      "Rocky es un perro muy activo y se ensucia mucho. Este producto me ayuda a mantenerlo limpio entre baños. El único detalle es que me gustaría que el envase fuera más grande.",
    verified: true,
  },
]

function mapDbRow(row: DbReview): Review {
  const created = row.created_at ? new Date(row.created_at) : new Date()
  const dateLabel = formatDistanceToNow(created, { addSuffix: true, locale: es })
  const img = row.pet_image?.trim() || pickPetImage(row.id)
  return {
    id: row.id,
    name: (row.author_name && row.author_name.trim()) || "Cliente",
    location: (row.location && row.location.trim()) || "Colombia",
    petImage: img.startsWith("http") || img.startsWith("/") ? img : baseHref(img),
    rating: row.rating,
    date: dateLabel,
    petName: (row.pet_name && row.pet_name.trim()) || "—",
    petBreed: (row.pet_breed && row.pet_breed.trim()) || "—",
    comment: (row.comment && row.comment.trim()) || "",
    verified: row.verified === true,
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`Calificación: ${rating} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "h-4 w-4",
            star <= rating ? "fill-secondary text-secondary" : "fill-muted text-muted"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function RatingInput({
  value,
  onChange,
  id,
}: {
  value: number
  onChange: (n: number) => void
  id?: string
}) {
  return (
    <div className="flex gap-1" role="group" aria-labelledby={id}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="rounded p-0.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
          onClick={() => onChange(star)}
          aria-label={`${star} de 5 estrellas`}
          aria-pressed={value === star}
        >
          <Star
            className={cn(
              "h-8 w-8 sm:h-7 sm:w-7",
              star <= value ? "fill-secondary text-secondary" : "fill-muted text-muted"
            )}
          />
        </button>
      ))}
    </div>
  )
}

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dbReviews, setDbReviews] = useState<Review[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const [authorName, setAuthorName] = useState("")
  const [location, setLocation] = useState("")
  const [petName, setPetName] = useState("")
  const [petBreed, setPetBreed] = useState("")
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")

  const reviews = useMemo(() => [...seedReviews, ...dbReviews], [dbReviews])

  const loadReviews = useCallback(async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100)

    if (error) {
      console.warn("Reseñas: no se pudieron cargar desde el servidor", error)
      return
    }
    if (data?.length) {
      setDbReviews(data.map(mapDbRow))
    }
  }, [])

  useEffect(() => {
    void loadReviews()
  }, [loadReviews])

  const reviewsPerPage = 3
  const totalPages = Math.max(1, Math.ceil(reviews.length / reviewsPerPage))

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, totalPages - 1))
  }, [totalPages])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages)
    }, 5000)
    return () => clearInterval(interval)
  }, [totalPages])

  const currentReviews = reviews.slice(
    currentIndex * reviewsPerPage,
    (currentIndex + 1) * reviewsPerPage
  )

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / Math.max(reviews.length, 1)
  ).toFixed(1)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const resetForm = () => {
    setAuthorName("")
    setLocation("")
    setPetName("")
    setPetBreed("")
    setRating(5)
    setComment("")
    setFormError(null)
  }

  const handleSubmitReview = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)

    const name = authorName.trim()
    const loc = location.trim() || "Colombia"
    const pName = petName.trim()
    const pBreed = petBreed.trim()
    const text = comment.trim()

    if (name.length < 2) {
      setFormError("Escribe tu nombre (al menos 2 caracteres).")
      return
    }
    if (text.length < 10) {
      setFormError("El comentario debe tener al menos 10 caracteres.")
      return
    }
    if (!pName || !pBreed) {
      setFormError("Indica el nombre y la raza de tu mascota.")
      return
    }

    setSubmitting(true)
    try {
      const pet_image = pickPetImage(`${name}-${Date.now()}`)

      const { data: sessionData } = await supabase.auth.getSession()

      const payload: Record<string, unknown> = {
        author_name: name,
        location: loc,
        pet_name: pName,
        pet_breed: pBreed,
        rating,
        comment: text,
        pet_image,
        verified: false,
      }

      if (sessionData.session?.user?.id) {
        payload.user_id = sessionData.session.user.id
      }

      const { data, error } = await supabase.from("reviews").insert(payload).select("*").single()

      if (error) {
        if (error.code === "42501" || error.message?.toLowerCase().includes("policy")) {
          setFormError(
            "No se pudo publicar: falta permiso en la base de datos. Ejecuta la migración SQL en Supabase (archivo supabase/migrations/20260404_reviews_public_insert.sql)."
          )
        } else if (error.message?.includes("author_name") || error.message?.includes("column")) {
          setFormError(
            "Falta la columna author_name en Supabase. Ejecuta el script de migración del proyecto."
          )
        } else {
          setFormError(error.message || "No se pudo enviar la reseña. Intenta de nuevo.")
        }
        return
      }

      if (data) {
        setDbReviews((prev) => [mapDbRow(data as DbReview), ...prev])
      }
      setDialogOpen(false)
      resetForm()
      setCurrentIndex(0)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="reseñas" className="bg-muted/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Miles de mascotas felices con Guau Fresh
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-foreground">{averageRating}</span>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "h-5 w-5",
                        star <= Math.round(Number(averageRating))
                          ? "fill-secondary text-secondary"
                          : "fill-muted text-muted"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Basado en {reviews.length} reseñas
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid auto-rows-max grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {currentReviews.map((review) => (
            <Card key={review.id} className="relative flex h-full flex-col overflow-hidden bg-card">
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                <img
                  src={review.petImage}
                  alt={`${review.petName} - ${review.petBreed}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              <CardContent className="flex flex-1 flex-col p-4 sm:p-6">
                <Quote className="absolute top-48 right-4 h-8 w-8 text-primary/10" aria-hidden="true" />

                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-foreground">{review.name}</h3>
                      {review.verified && (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>

                <div className="mt-3 rounded-lg border border-primary/10 bg-primary/5 px-3 py-2">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{review.petName}</span>
                    {" · "}
                    <span className="text-primary">{review.petBreed}</span>
                  </p>
                </div>

                <p className="mt-4 flex-1 text-pretty text-sm leading-relaxed text-foreground/80">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              aria-label="Reseñas anteriores"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>

            <div className="flex gap-2" role="tablist" aria-label="Páginas de reseñas">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={currentIndex === index}
                  aria-label={`Página ${index + 1}`}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-colors",
                    currentIndex === index
                      ? "bg-primary"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={goToNext} aria-label="Reseñas siguientes">
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            ¿Ya probaste Guau Fresh? Comparte tu experiencia con nosotros
          </p>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() => {
              resetForm()
              setDialogOpen(true)
            }}
          >
            Escribir una Reseña
          </Button>
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) resetForm()
        }}
      >
        <DialogContent className="max-h-[min(90vh,640px)] overflow-y-auto sm:max-w-lg">
          <form onSubmit={handleSubmitReview}>
            <DialogHeader>
              <DialogTitle>Escribe tu reseña</DialogTitle>
              <DialogDescription>
                Tu opinión se publicará en esta sección para ayudar a otras familias con mascotas.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="review-author">Tu nombre</Label>
                <Input
                  id="review-author"
                  autoComplete="name"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ej. Andrea Gómez"
                  maxLength={80}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-location">Ciudad</Label>
                <Input
                  id="review-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej. Bogotá"
                  maxLength={80}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="review-pet">Nombre de tu mascota</Label>
                  <Input
                    id="review-pet"
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="Ej. Firulais"
                    maxLength={60}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-breed">Raza</Label>
                  <Input
                    id="review-breed"
                    value={petBreed}
                    onChange={(e) => setPetBreed(e.target.value)}
                    placeholder="Ej. Mestizo"
                    maxLength={80}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label id="review-rating-label">Calificación</Label>
                <RatingInput value={rating} onChange={setRating} id="review-rating-label" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-comment">Comentario</Label>
                <Textarea
                  id="review-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos cómo te fue con el producto (mínimo 10 caracteres)."
                  rows={4}
                  maxLength={1200}
                  className="min-h-[100px] resize-y"
                  required
                />
              </div>
              {formError && (
                <p className="text-sm text-destructive" role="alert">
                  {formError}
                </p>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                disabled={submitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                    Publicando…
                  </>
                ) : (
                  "Publicar reseña"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
