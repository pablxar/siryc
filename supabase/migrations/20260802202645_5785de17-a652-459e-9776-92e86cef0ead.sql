-- 1. Proyectos: hide cliente_nombre when mostrar_cliente is false
DROP POLICY IF EXISTS "Public can read proyectos" ON public.proyectos;

REVOKE SELECT ON public.proyectos FROM anon, authenticated;
GRANT ALL ON public.proyectos TO service_role;

CREATE POLICY "No direct public access to proyectos"
  ON public.proyectos FOR SELECT
  USING (false);

CREATE OR REPLACE VIEW public.proyectos_public
WITH (security_invoker = off) AS
  SELECT
    id,
    titulo,
    categoria,
    descripcion,
    metros_cuadrados,
    cantidad_equipos,
    anio,
    imagen_principal_url,
    galeria,
    CASE WHEN mostrar_cliente THEN cliente_nombre ELSE NULL END AS cliente_nombre,
    mostrar_cliente,
    created_at
  FROM public.proyectos;

GRANT SELECT ON public.proyectos_public TO anon, authenticated;

-- 2. Leads: ensure contact data stays unreadable through the API
REVOKE SELECT, UPDATE, DELETE ON public.leads FROM anon, authenticated;
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;