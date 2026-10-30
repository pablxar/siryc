# SIRYC WEB

Construye el sitio web corporativo completo de SIRYC (Servicios de Ingeniería en Electricidad, Refrigeración y Climatización), una empresa chilena con más de 20 años de trayectoria técnica (fundada en 2004, anteriormente operando como INGEMI), especializada en refrigeración industrial, aire acondicionado, climatización y electricidad. Sus clientes incluyen centros comerciales, edificios corporativos, oficinas, establecimientos educacionales, y la Armada de Chile. El tono de la marca es técnico, institucional y profesional — NO informal, NO con humor, NO con lenguaje de venta agresiva. Es una empresa de ingeniería que le habla a gerentes de operaciones, administradores de edificios y mandos institucionales.

## STACK TÉCNICO

- React + TypeScript + Vite

- Tailwind CSS

- React Router para navegación

- Framer Motion para animaciones sutiles (sin exagerar — esta marca es seria, no juguetona)

- shadcn/ui para componentes base

- Lucide React para íconos

- Supabase para el formulario de contacto/cotización (guarda leads en una tabla) y para el blog técnico (CMS simple)

- React Hook Form + Zod para validación de formularios

## IDENTIDAD DE MARCA (extraída del brandbook oficial)

### Colores (usar exactamente estos, definidos como variables CSS/Tailwind custom)

- Gris principal (texto, fondo oscuro institucional): #484A4C

- Gris azul oscuro (fondo hero, secciones dark): #1B232C

- Rojo principal (acento calor/urgencia/CTA secundario): #E30613

- Azul principal (acento frío/CTA primario/links): #14398E

- Blanco: #FFFFFF

- Gris claro (fondos secundarios, cards): #B0BEC5

- Negro: #000000

### Tipografía

- Titulares y logo: Exo 2 (Google Fonts) — pesos 600 y 700

- Cuerpo de texto: Inter (Google Fonts) — pesos 400 y 500

### Logo e isotipo

El isotipo es un engranaje gris oscuro con un copo de nieve en el centro, rodeado por un arco de circunferencia dividido en rojo (superior) y azul (inferior) simbolizando calor y frío. El wordmark "SIRYC" usa la tipografía técnica con la "i" estilizada como un rayo eléctrico (referencia al área de electricidad). Debajo del wordmark: "SERVICIOS DE INGENIERÍA EN ELECTRICIDAD, REFRIGERACIÓN Y CLIMATIZACIÓN" en mayúsculas pequeñas.

Como el archivo del logo real se subirá después, usa un placeholder SVG que replique esta estructura (engranaje + copo + arco bicolor) en el header y footer, dejando comentario `{/* TODO: reemplazar con logo oficial SIRYC en /public/logo-siryc.svg */}`.

### Tagline

"Tu clima, nuestra ingeniería." — SIEMPRE se usa completo, con este orden de palabras exacto. Aparece en el hero, footer y página de contacto.

### Tono de copy (crítico — seguir estrictamente)

- Directo, técnico, con datos concretos (m², cantidad de equipos, años de contrato, plazos cumplidos)

- Institucional pero no distante

- CERO sarcasmo, CERO humor, CERO exclamaciones tipo "¡Arreglamos tu equipo al tiro!"

- Ejemplo de tono correcto: "Mantenemos operativos los sistemas de más de 30 edificios corporativos en la V Región."

- Ejemplo de tono incorrecto (NO USAR): "¡Tu aire acondicionado no da más! Nosotros lo arreglamos altiro."

- Cuando cites experiencia, usa cifras: "+20 años", "+250 proyectos ejecutados", "Contrato vigente con la Armada de Chile desde 2018"

## ESTRUCTURA DEL SITIO (páginas)

### 1. HOME

**Header fijo (sticky):**

- Logo SIRYC a la izquierda

- Navegación: Inicio / Nosotros / Servicios / Proyectos / Clientes / Blog Técnico / Contacto

- Botón CTA destacado a la derecha: "Solicitar cotización" (fondo rojo #E30613, texto blanco)

- Al hacer scroll, el header se comprime y añade sombra sutil

**Hero section (fondo oscuro #1B232C, altura completa de viewport):**

- Video de fondo en loop (muted, autoplay) mostrando sala de máquinas / instalación HVAC industrial con overlay oscuro al 60% para legibilidad del texto (usar un video placeholder de stock industrial por ahora, comentario TODO para reemplazar)

- Titular grande en Exo 2 bold: "Ingeniería que sostiene la operación de tu edificio." (o similar, en tono institucional)

- Subtítulo: "Más de 20 años en refrigeración, climatización y electricidad para centros comerciales, edificios corporativos, instituciones educacionales y las Fuerzas Armadas de Chile."

- Dos botones: "Solicitar cotización" (rojo, primario) y "Conoce nuestros servicios" (outline blanco, secundario)

- Tagline "Tu clima, nuestra ingeniería." en rojo, con línea divisoria roja/azul debajo, posicionado en la parte inferior del hero

- Badge flotante esquina superior derecha del hero: "Certificación ISO 9001:2015" o similar sello de calidad (placeholder editable)

**Sección de cifras (banda oscura justo debajo del hero, fondo #484A4C):**

4 columnas con números grandes en blanco:

- "+20" Años de experiencia

- "+250" Proyectos ejecutados

- "100%" Plazos cumplidos

- "ISO 9001:2015" Gestión de calidad

**Sección de especialidades (fondo blanco, 3 columnas con ícono):**

- Refrigeración industrial — ícono de copo de nieve

- Climatización y aire acondicionado — ícono de aire/viento

- Electricidad industrial — ícono de rayo

Cada columna con 2-3 líneas de descripción técnica y link "Ver más" hacia la sección de servicios correspondiente.

**Sección "Por qué SIRYC" (fondo gris claro #B0BEC5 con opacidad, 2 columnas):**

Columna izquierda: imagen de técnico en terreno (placeholder).

Columna derecha: lista de 5 puntos con ícono de check azul:

- Ingeniería documentada en cada proyecto

- Equipos certificados y personal capacitado

- Experiencia en sectores exigentes: gobierno, FFAA, corporativo

- Respuesta técnica garantizada

- Más de dos décadas de continuidad operativa

**Sección de clientes / logos (banda blanca, carrusel o grid estático):**

Título: "Empresas e instituciones que confían en SIRYC"

Grid de logos placeholder (incluir espacio para: Armada de Chile, centros comerciales, edificios corporativos, colegios). Usar recuadros grises neutros como placeholder de logo con texto "LOGO CLIENTE".

**Sección de proyecto destacado (fondo oscuro, layout tipo caso de éxito):**

Imagen grande de un proyecto (placeholder industrial) + texto: "Proyecto destacado: Climatización de [X] m² en centro comercial. [Y] unidades instaladas, plazo cumplido." con botón "Ver todos los proyectos"

**Sección de blog técnico (preview, 3 cards):**

Título: "Actualidad técnica" — 3 artículos preview con imagen, título y fecha (contenido placeholder sobre eficiencia energética, regulación chilena de refrigerantes, mantención preventiva)

**CTA final (banda azul #14398E, texto blanco centrado):**

"¿Necesitas una cotización técnica?" + botón blanco "Contactar a SIRYC"

**Footer (fondo #1B232C):**

- Logo + tagline

- 4 columnas: Enlaces rápidos / Servicios / Contacto (teléfono, email, dirección V Región) / Redes sociales (Instagram, Facebook, LinkedIn con íconos)

- Línea divisoria roja/azul

- Copyright + "Desarrollado por Biztech"

---

### 2. NOSOTROS

- Hero secundario (banda oscura, más baja que el home) con título "Nosotros"

- Sección de historia: timeline horizontal o vertical desde 2004 (fundación como Ingemi) hasta 2026 (evolución a SIRYC), con hitos técnicos (ISO 9001, contrato Armada, expansión de servicios)

- Sección "Esencia" tomada directo del brandbook: dos columnas "SIRYC es" / "SIRYC no es" con checks verdes y X rojas

- Manifiesto completo del brandbook, tipografía grande, fondo oscuro, texto centrado en bloque (usar el texto exacto del brandbook: "Existen empresas que instalan equipos...")

- Sección de equipo (placeholder de 3-4 cargos: Gerente General, Jefe Técnico, Supervisor de Terreno) con foto placeholder circular, nombre y especialidad

- Sección de certificaciones y normativa (ISO 9001:2015, SEC para electricidad, cumplimiento normativa de refrigerantes)

---

### 3. SERVICIOS

- Hero con título "Servicios"

- 3 bloques grandes, uno por especialidad, cada uno con:

  - Refrigeración industrial: mantención preventiva/correctiva, cambio de compresores, reparación de fugas de refrigerante, plantas de agua fría, sistemas para data centers y salas eléctricas, refrigerantes ecológicos

  - Climatización y aire acondicionado: instalación residencial y comercial, sistemas VRF, proyectos llave en mano, climatización de centros comerciales y oficinas, sistemas de ventilación industrial

  - Electricidad industrial: instalaciones eléctricas, sistemas de control centralizado, tableros y paneles, mantención eléctrica preventiva

- Cada bloque en formato alternado (imagen-texto, texto-imagen) con fondo alternante blanco/gris claro

- Al final de cada bloque, botón "Solicitar cotización de [servicio]"

- Sección final: "Contratos de mantención" explicando modalidad de contrato anual/semestral con visitas programadas — dirigido a clientes corporativos e institucionales

---

### 4. PROYECTOS

- Hero con título "Proyectos"

- Filtros por categoría: Todos / Corporativo / Gobierno y FFAA / Educación / Centros comerciales

- Grid de cards de proyecto (3 columnas desktop, 1 mobile), cada card con:

  - Imagen placeholder

  - Badge de categoría (color según segmento)

  - Título del proyecto

  - Datos técnicos breves: m², cantidad de equipos, año

  - Link "Ver detalle"

- Modal o página de detalle al hacer clic: descripción completa, galería de fotos, datos del cliente (si autoriza mostrarlo), alcance técnico del trabajo

---

### 5. CLIENTES

- Hero con título "Clientes e instituciones"

- Grid de logos por segmento (Corporativo / Gobierno y FFAA / Educación) — placeholders

- Sección de testimonios (2-3 quotes placeholder de administradores de edificios o gerentes de operaciones, con nombre, cargo y empresa)

- Mención específica a la relación con la Armada de Chile como caso de confianza institucional de largo plazo

---

### 6. BLOG TÉCNICO

- Hero con título "Blog técnico"

- Grid de artículos (usar Supabase para almacenar posts: título, extracto, contenido, imagen, fecha, categoría)

- Categorías sugeridas: Eficiencia energética / Normativa y regulación / Mantención preventiva / Casos técnicos

- Página de artículo individual con diseño limpio tipo editorial, imagen destacada, cuerpo de texto legible con tipografía Inter

- Objetivo: posicionamiento SEO técnico — estructurar con H1/H2 correctos y meta descripción editable

---

### 7. CONTACTO

- Hero con título "Contacto"

- Formulario de cotización (guarda en Supabase, tabla `leads`):

  - Nombre completo

  - Empresa / Institución

  - Cargo

  - Email

  - Teléfono

  - Tipo de servicio requerido (select: Refrigeración / Climatización / Electricidad / Mantención / Proyecto integral)

  - Segmento (select: Corporativo / Gobierno-FFAA / Educación / Otro)

  - Mensaje / detalle del requerimiento

  - Botón "Enviar solicitud" (rojo)

- Información de contacto directo: teléfono, email, dirección V Región, horario de atención

- Mapa embebido (placeholder de Google Maps, V Región)

- Botón flotante de WhatsApp en todas las páginas del sitio (esquina inferior derecha, ícono discreto, no intrusivo)

## COMPORTAMIENTO Y UX GENERAL

- Diseño mobile-first: el sitio debe verse impecable en celular, ya que muchos administradores de edificios revisan desde el teléfono

- Animaciones sutiles al hacer scroll (fade-in, slide-up leves) usando Framer Motion — nunca animaciones llamativas o "divertidas"

- Velocidad de carga optimizada: imágenes lazy-loaded, sin librerías innecesarias

- Todos los CTAs de "Solicitar cotización" llevan al formulario de contacto con el tipo de servicio pre-seleccionado según la página de origen

- SEO: cada página con title y meta description únicos, orientados a búsquedas como "climatización industrial Chile", "mantención aire acondicionado edificios corporativos", "electricidad industrial V región"

- Formato de números y fechas en español chileno

## BASE DE DATOS SUPABASE (crear estas tablas)

```sql

create table leads (

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

create table blog_posts (

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

create table proyectos (

  id uuid primary key default gen_random_uuid(),

  titulo text not null,

  categoria text check (categoria in ('corporativo', 'gobierno', 'educacion', 'centro_comercial')),

  descripcion text,

  metros_cuadrados int,

  cantidad_equipos int,

  año int,

  imagen_principal_url text,

  galeria jsonb,

  cliente_nombre text,

  mostrar_cliente boolean default false,

  created_at timestamptz default now()

);

```

Habilita RLS: lectura pública en `blog_posts` (solo publicado=true) y `proyectos`, escritura solo autenticada. La tabla `leads` permite insert público pero no select público.

Genera 3-4 registros de ejemplo en `proyectos` y `blog_posts` para que el sitio no se vea vacío durante el desarrollo.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://siryc.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/677beb3d-3aa9-420d-b1fe-e8cfb67f3218).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
