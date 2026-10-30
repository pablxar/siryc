// Muestra para el laboratorio de cards: copia de la tabla `proyectos` de Supabase
// (respaldo 2026-10-30). Las páginas reales leerán Supabase; esto solo sirve para
// comparar diseños con datos reales. Las fotos son provisorias (las del sitio actual).
import refrigeracion from "../assets/refrigeracion.png";
import climatizacion from "../assets/climatizacion.png";
import electricidad from "../assets/electricidad.png";
import banner from "../assets/banner-web-siryc.png";

export type ProyectoMuestra = {
  titulo: string;
  segmento: string;
  descripcion: string;
  metros: number;
  equipos: number;
  anio: number;
  cliente: string | null;
  foto: ImageMetadata;
};

export const proyectos: ProyectoMuestra[] = [
  {
    titulo: "Climatización integral centro comercial Viña",
    segmento: "Centro comercial",
    descripcion:
      "Instalación de sistema VRF y ventilación mecánica para 12.000 m² de superficie comercial, con contrato de mantención anual vigente desde 2020.",
    metros: 12000,
    equipos: 48,
    anio: 2020,
    cliente: null,
    foto: climatizacion,
  },
  {
    titulo: "Mantención sistemas HVAC Armada de Chile",
    segmento: "Gobierno",
    descripcion:
      "Contrato de mantención preventiva y correctiva de sistemas de climatización y refrigeración para instalaciones institucionales, vigente desde 2018.",
    metros: 8500,
    equipos: 62,
    anio: 2018,
    cliente: "Armada de Chile",
    foto: refrigeracion,
  },
  {
    titulo: "Instalación eléctrica edificio corporativo",
    segmento: "Corporativo",
    descripcion:
      "Proyecto llave en mano: tableros de distribución, sistema de control centralizado y climatización para 14 pisos de oficinas.",
    metros: 6200,
    equipos: 32,
    anio: 2022,
    cliente: null,
    foto: electricidad,
  },
  {
    titulo: "Climatización establecimiento educacional",
    segmento: "Educación",
    descripcion:
      "Sistema de climatización para 28 salas de clases y áreas administrativas, con foco en eficiencia energética y bajo nivel de ruido.",
    metros: 3800,
    equipos: 34,
    anio: 2023,
    cliente: null,
    foto: banner,
  },
];

export const miles = (n: number) => n.toLocaleString("es-CL");
export const indice = (i: number, total: number) =>
  `${String(i + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
