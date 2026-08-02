DROP VIEW IF EXISTS public.proyectos_public;

ALTER TABLE public.proyectos
  ADD COLUMN IF NOT EXISTS cliente_nombre_publico text
  GENERATED ALWAYS AS (CASE WHEN mostrar_cliente THEN cliente_nombre ELSE NULL END) STORED;

DROP POLICY IF EXISTS "No direct public access to proyectos" ON public.proyectos;

CREATE POLICY "Public can read proyectos"
  ON public.proyectos FOR SELECT
  TO anon, authenticated
  USING (true);

GRANT SELECT (id, titulo, categoria, descripcion, metros_cuadrados, cantidad_equipos, anio, imagen_principal_url, galeria, mostrar_cliente, cliente_nombre_publico, created_at)
  ON public.proyectos TO anon, authenticated;