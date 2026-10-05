import type { EntradaRegistro } from "./tipos";
import { configsLote1 } from "./configs/lote-1";
import { configsLote2 } from "./configs/lote-2";
import { configsLote3 } from "./configs/lote-3";
import { configsLote4 } from "./configs/lote-4";

/** Páginas artesanalmente implementadas (no tocar). grupo fijo para el índice. */
const artesanales: EntradaRegistro[] = [
  { codigo: "FOR-006", nombre: "Registro de asistencia diaria del personal en obra", grupo: "Asistencia", href: "/formatos/asistencia-diaria" },
  { codigo: "FOR-009", nombre: "Control de asistencia a capacitación", grupo: "Asistencia", href: "/formatos/asistencia-capacitacion" },
  { codigo: "FOR-008", nombre: "Formato de análisis de trabajo seguro", grupo: "Seguridad", href: "/formatos/analisis-trabajo-seguro" },
  { codigo: "FOR-032", nombre: "Permiso de trabajo seguro de soldadura", grupo: "Seguridad", href: "/formatos/permiso-soldadura" },
  { codigo: "FOR-107", nombre: "Permiso de trabajos en alturas", grupo: "Altura e Izaje", href: "/formatos/permiso-alturas" },
  { codigo: "FOR-055", nombre: "Reporte interno de incidentes-accidentes de trabajo", grupo: "Incidentes", href: "/formatos/reporte-incidentes" },
  { codigo: "FOR-056", nombre: "Registro de casos de incidentes y accidentes de trabajo", grupo: "Incidentes", href: "/formatos/registro-incidentes" },
  { codigo: "FOR-057", nombre: "Formato de informe de investigación de accidente de trabajo", grupo: "Incidentes", href: "/formatos/investigacion-accidente" },
  { codigo: "FOR-052", nombre: "Matriz de identificación de peligros, evaluación y valoración del riesgo", grupo: "Seguridad", href: "/formatos/matriz-peligros" },
  { codigo: "FOR-069", nombre: "Matriz de control operativo de seguridad y salud en el trabajo", grupo: "Seguridad", href: "/formatos/matriz-control-sst" },
  { codigo: "FOR-010", nombre: "Notificación de riesgos", grupo: "Salud", href: "/formatos/notificacion-riesgos" },
  { codigo: "FOR-022", nombre: "Autorreporte de condiciones de salud", grupo: "Salud", href: "/formatos/autorreporte-salud" },
  { codigo: "FOR-023", nombre: "Control de autorreporte de condiciones de salud", grupo: "Salud", href: "/formatos/control-autorreporte" },
  { codigo: "FOR-024", nombre: "Registro de casos de enfermedad laboral", grupo: "Salud", href: "/formatos/registro-enfermedad-laboral" },
  { codigo: "FOR-025", nombre: "Seguimiento de casos de salud especial", grupo: "Salud", href: "/formatos/seguimiento-salud-especial" },
  { codigo: "FOR-026", nombre: "Control de casos de salud especiales", grupo: "Salud", href: "/formatos/control-salud-especial" },
  { codigo: "FOR-080", nombre: "Encuesta de enfermedades preexistentes", grupo: "Salud", href: "/formatos/encuesta-preexistencias" },
  { codigo: "FOR-062", nombre: "Inspección de uso de elementos de protección personal y dotación", grupo: "Inspecciones", href: "/formatos/inspeccion-epp" },
  { codigo: "FOR-064", nombre: "Inspección de orden y limpieza", grupo: "Inspecciones", href: "/formatos/inspeccion-orden-limpieza" },
  { codigo: "FOR-066", nombre: "Inspección de extintores", grupo: "Inspecciones", href: "/formatos/inspeccion-extintores" },
  { codigo: "FOR-067", nombre: "Inspección preoperacional de volquetas", grupo: "Vehículos y Maquinaria", href: "/formatos/inspeccion-volquetas" },
  { codigo: "FOR-086", nombre: "Inspección preoperacional de maquinaria", grupo: "Vehículos y Maquinaria", href: "/formatos/inspeccion-maquinaria" },
  // FOR-003 = upload de empleados (ya implementado como flujo de subida Excel)
  { codigo: "FOR-003", nombre: "Listado de personal", grupo: "Listados y Maestros", href: "/proyectos/{proyectoId}/empleados" },
];

const configs = { ...configsLote1, ...configsLote2, ...configsLote3, ...configsLote4 };

const genericas: EntradaRegistro[] = Object.values(configs).map((c) => ({
  codigo: c.codigo,
  nombre: c.nombre,
  grupo: c.grupo,
  config: c,
}));

export const registro: EntradaRegistro[] = [...artesanales, ...genericas];

export function getEntrada(codigo: string): EntradaRegistro | undefined {
  return registro.find((e) => e.codigo === codigo.toUpperCase());
}

export function resuelveHref(href: string, proyectoId: string): string {
  return href.replace("{proyectoId}", proyectoId);
}

export function agrupaPorGrupo(entradas: EntradaRegistro[]): Array<{ grupo: string; entradas: EntradaRegistro[] }> {
  const mapa = new Map<string, EntradaRegistro[]>();
  for (const e of entradas) {
    const lista = mapa.get(e.grupo) ?? [];
    lista.push(e);
    mapa.set(e.grupo, lista);
  }
  return [...mapa.entries()].map(([grupo, entradas]) => ({
    grupo,
    entradas: entradas.sort((a, b) => a.codigo.localeCompare(b.codigo)),
  }));
}

export function buscaFormatos(entradas: EntradaRegistro[], texto: string): EntradaRegistro[] {
  const q = texto.trim().toLowerCase();
  if (!q) return entradas;
  return entradas.filter((e) => e.codigo.toLowerCase().includes(q) || e.nombre.toLowerCase().includes(q));
}
