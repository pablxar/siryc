// Lectura de Supabase al compilar (REST con la clave publicable; RLS decide qué se ve).
// En el build de producción un error detiene la publicación: mejor eso que secciones vacías.
const URL_BASE = import.meta.env.PUBLIC_SUPABASE_URL;
const CLAVE = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

async function consulta<T>(ruta: string): Promise<T[]> {
  try {
    const r = await fetch(`${URL_BASE}/rest/v1/${ruta}`, { headers: { apikey: CLAVE } });
    if (!r.ok) throw new Error(`Supabase ${r.status}: ${await r.text()}`);
    return (await r.json()) as T[];
  } catch (e) {
    if (import.meta.env.PROD) throw e;
    console.warn(`[supabase] ${ruta}:`, e);
    return [];
  }
}

export type Proyecto = {
  id: string;
  titulo: string;
  categoria: "corporativo" | "gobierno" | "educacion" | "centro_comercial" | null;
  descripcion: string | null;
  metros_cuadrados: number | null;
  cantidad_equipos: number | null;
  anio: number | null;
  imagen_principal_url: string | null;
  cliente_nombre_publico: string | null;
};

export type Articulo = {
  id: string;
  titulo: string;
  slug: string;
  extracto: string | null;
  categoria: string | null;
  created_at: string;
};

export type ArticuloCompleto = Articulo & { contenido: string | null; imagen_url: string | null };

// Solo columnas con permiso público (cliente_nombre real nunca sale de la base).
const COLUMNAS_PROYECTO =
  "id,titulo,categoria,descripcion,metros_cuadrados,cantidad_equipos,anio,imagen_principal_url,cliente_nombre_publico";

export const proyectos = (limite?: number) =>
  consulta<Proyecto>(`proyectos?select=${COLUMNAS_PROYECTO}&order=anio.desc${limite ? `&limit=${limite}` : ""}`);

export const articulos = (limite?: number) =>
  consulta<Articulo>(
    `blog_posts?select=id,titulo,slug,extracto,categoria,created_at&publicado=eq.true&order=created_at.desc${limite ? `&limit=${limite}` : ""}`,
  );

/** Todos los publicados con su texto, para generar /blog/[slug] al compilar. */
export const articulosCompletos = () =>
  consulta<ArticuloCompleto>(
    "blog_posts?select=id,titulo,slug,extracto,categoria,created_at,contenido,imagen_url&publicado=eq.true&order=created_at.desc",
  );

/** Párrafos del contenido. Lovable guardó los saltos como «\\n» literal: se aceptan ambos. */
export const parrafos = (texto: string | null) =>
  (texto ?? "")
    .replace(/\\n/g, "\n")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export const fechaLarga = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Santiago" });

export const SEGMENTO: Record<string, string> = {
  corporativo: "Corporativo",
  gobierno: "Gobierno",
  educacion: "Educación",
  centro_comercial: "Centro comercial",
};
