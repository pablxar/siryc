
DROP POLICY IF EXISTS "Authenticated can manage posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Authenticated can manage proyectos" ON public.proyectos;
DROP POLICY IF EXISTS "Authenticated can read leads" ON public.leads;
REVOKE INSERT, UPDATE, DELETE ON public.blog_posts FROM authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.proyectos FROM authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.leads FROM authenticated;
