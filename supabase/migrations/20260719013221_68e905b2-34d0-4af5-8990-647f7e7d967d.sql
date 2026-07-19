
DROP POLICY IF EXISTS "Public can insert leads" ON public.leads;
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT TO anon, authenticated
WITH CHECK (
  char_length(nombre) between 2 and 120
  and char_length(email) between 5 and 200
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  and (mensaje is null or char_length(mensaje) <= 2000)
  and (empresa is null or char_length(empresa) <= 200)
  and (telefono is null or char_length(telefono) <= 40)
);
