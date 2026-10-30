// Foto de un proyecto o artículo. Solo cuentan las fotos reales que el dueño suba al Storage de Supabase
// (URL remota, se optimiza al compilar); las de banco que dejó Lovable (Unsplash) no se publican: mientras
// tanto, foto provisoria por segmento.
import refrigeracion from "../assets/refrigeracion.png";
import climatizacion from "../assets/climatizacion.png";
import electricidad from "../assets/electricidad.png";
import banner from "../assets/banner-web-siryc.png";
import type { Proyecto } from "./supabase";

export type Foto = ImageMetadata | string;

const STORAGE = `${import.meta.env.PUBLIC_SUPABASE_URL}/storage/v1/object/public/`;
const PROVISORIA: Record<NonNullable<Proyecto["categoria"]>, ImageMetadata> = {
  centro_comercial: climatizacion,
  gobierno: refrigeracion,
  corporativo: electricidad,
  educacion: banner,
};
const ROTATIVAS = [refrigeracion, climatizacion, electricidad, banner];

/** La URL solo si es una foto real del Storage. */
export const fotoReal = (url: string | null) => (url?.startsWith(STORAGE) ? url : undefined);
export const foto = (url: string | null, respaldo: ImageMetadata): Foto => fotoReal(url) ?? respaldo;
export const fotoProyecto = (p: Proyecto, i = 0): Foto =>
  foto(p.imagen_principal_url, p.categoria ? PROVISORIA[p.categoria] : ROTATIVAS[i % ROTATIVAS.length]);
export const fotoRotativa = (i: number) => ROTATIVAS[i % ROTATIVAS.length];
