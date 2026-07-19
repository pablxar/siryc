
CREATE TABLE public.leads (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  empresa text,
  cargo text,
  email text not null,
  telefono text,
  tipo_servicio text,
  segmento text,
  mensaje text,
  origen_pagina text,
  created_at timestamptz default now()
);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can read leads" ON public.leads FOR SELECT TO authenticated USING (true);

CREATE TABLE public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  slug text unique not null,
  extracto text,
  contenido text,
  imagen_url text,
  categoria text,
  publicado boolean default false,
  created_at timestamptz default now()
);
GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published posts" ON public.blog_posts FOR SELECT TO anon, authenticated USING (publicado = true);
CREATE POLICY "Authenticated can manage posts" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.proyectos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  categoria text check (categoria in ('corporativo', 'gobierno', 'educacion', 'centro_comercial')),
  descripcion text,
  metros_cuadrados int,
  cantidad_equipos int,
  anio int,
  imagen_principal_url text,
  galeria jsonb,
  cliente_nombre text,
  mostrar_cliente boolean default false,
  created_at timestamptz default now()
);
GRANT SELECT ON public.proyectos TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.proyectos TO authenticated;
GRANT ALL ON public.proyectos TO service_role;
ALTER TABLE public.proyectos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read proyectos" ON public.proyectos FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Authenticated can manage proyectos" ON public.proyectos FOR ALL TO authenticated USING (true) WITH CHECK (true);

INSERT INTO public.proyectos (titulo, categoria, descripcion, metros_cuadrados, cantidad_equipos, anio, imagen_principal_url, cliente_nombre, mostrar_cliente) VALUES
('Climatización integral centro comercial Viña', 'centro_comercial', 'Instalación de sistema VRF y ventilación mecánica para 12.000 m² de superficie comercial, con contrato de mantención anual vigente desde 2020.', 12000, 48, 2020, 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200', 'Centro Comercial V Región', false),
('Mantención sistemas HVAC Armada de Chile', 'gobierno', 'Contrato de mantención preventiva y correctiva de sistemas de climatización y refrigeración para instalaciones institucionales, vigente desde 2018.', 8500, 62, 2018, 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200', 'Armada de Chile', true),
('Instalación eléctrica edificio corporativo', 'corporativo', 'Proyecto llave en mano: tableros de distribución, sistema de control centralizado y climatización para 14 pisos de oficinas.', 6200, 32, 2022, 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200', 'Grupo Corporativo Regional', false),
('Climatización establecimiento educacional', 'educacion', 'Sistema de climatización para 28 salas de clases y áreas administrativas, con foco en eficiencia energética y bajo nivel de ruido.', 3800, 34, 2023, 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200', 'Colegio V Región', false);

INSERT INTO public.blog_posts (titulo, slug, extracto, contenido, imagen_url, categoria, publicado) VALUES
('Nueva normativa chilena sobre refrigerantes: qué implica para edificios corporativos', 'normativa-refrigerantes-2026', 'Chile avanza en la eliminación progresiva de hidrofluorocarbonos (HFC). Analizamos los plazos y las implicancias operacionales para administradores de edificios.', 'La regulación chilena de refrigerantes se enmarca en la Enmienda de Kigali al Protocolo de Montreal. La eliminación progresiva de HFC afecta directamente la planificación de recambio de equipos en edificios corporativos e instalaciones industriales.\n\nRecomendamos evaluar el inventario de refrigerantes, planificar migración a alternativas de bajo GWP y documentar cada intervención técnica.', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200', 'Normativa y regulación', true),
('Mantención preventiva vs correctiva: costo real en instalaciones industriales', 'mantencion-preventiva-industrial', 'Un análisis técnico del costo de ciclo de vida cuando se opta por planes de mantención preventiva versus intervenciones correctivas reactivas.', 'La mantención preventiva reduce la tasa de falla imprevista en equipos HVAC industriales entre un 40% y 60% según registros de operación en instalaciones sobre 5.000 m².\n\nEn contratos de largo plazo, el costo total de operación disminuye al planificar recambio de componentes críticos antes de la falla.', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200', 'Mantención preventiva', true),
('Eficiencia energética en sistemas VRF: métricas que importan', 'eficiencia-vrf', 'COP, EER y SEER: cómo interpretar las métricas de eficiencia al especificar equipos VRF para proyectos corporativos.', 'Los sistemas de volumen de refrigerante variable (VRF) permiten modular la carga térmica de forma independiente por zona. Las métricas clave son COP en operación, EER estacional y factor de carga parcial.\n\nUn sistema bien dimensionado opera en cargas parciales el 70% del año, por lo que los valores nominales a plena carga no son representativos del consumo real.', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200', 'Eficiencia energética', true),
('Climatización de salas eléctricas y data centers: consideraciones críticas', 'climatizacion-salas-electricas', 'La refrigeración de salas eléctricas exige redundancia, control de humedad y monitoreo continuo. Revisamos los requisitos técnicos mínimos.', 'Las salas eléctricas y data centers requieren mantener temperatura entre 18 y 24 °C y humedad relativa entre 40% y 55%. La redundancia N+1 es el estándar mínimo para instalaciones críticas.\n\nEl monitoreo continuo con alarmas remotas y contratos de respuesta técnica garantizada son parte del diseño operacional, no un extra.', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200', 'Casos técnicos', true);
