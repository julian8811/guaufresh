-- Ejecutar en Supabase → SQL Editor si el proyecto ya tenía la tabla `reviews`
-- sin `author_name` o solo INSERT para usuarios autenticados.

ALTER TABLE public.reviews ADD COLUMN IF NOT EXISTS author_name TEXT;

DROP POLICY IF EXISTS "Users can insert reviews" ON public.reviews;

-- Permite que visitantes y usuarios registrados publiquen reseñas con datos mínimos.
CREATE POLICY "Public can insert reviews" ON public.reviews
  FOR INSERT
  WITH CHECK (
    rating >= 1
    AND rating <= 5
    AND length(trim(COALESCE(author_name, ''))) >= 2
    AND length(trim(COALESCE(comment, ''))) >= 10
  );
