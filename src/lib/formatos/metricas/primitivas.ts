import type { ItemRanking, RegistroFormato } from "./tipos";

function ordena(items: ItemRanking[]): ItemRanking[] {
  return [...items].sort((a, b) => b.valor - a.valor || a.etiqueta.localeCompare(b.etiqueta));
}

export function cuentaPor<T>(items: T[], clave: (item: T) => string): ItemRanking[] {
  const conteos = new Map<string, number>();
  for (const item of items) {
    const k = clave(item);
    conteos.set(k, (conteos.get(k) ?? 0) + 1);
  }
  return ordena([...conteos].map(([etiqueta, valor]) => ({ etiqueta, valor })));
}

export function sumaPor<T>(items: T[], clave: (item: T) => string, valor: (item: T) => number): ItemRanking[] {
  const sumas = new Map<string, number>();
  for (const item of items) {
    const k = clave(item);
    sumas.set(k, (sumas.get(k) ?? 0) + valor(item));
  }
  return ordena([...sumas].map(([etiqueta, v]) => ({ etiqueta, valor: v })));
}

export function sumaTotal<T>(items: T[], valor: (item: T) => number): number {
  return items.reduce((acc, item) => acc + valor(item), 0);
}

export function topN(items: ItemRanking[], n = 5): ItemRanking[] {
  return ordena(items).slice(0, n);
}

export function porcentaje(parte: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((parte / total) * 1000) / 10;
}

export function filasDeTabla(registros: RegistroFormato[], tablaId: string): Record<string, string>[] {
  const out: Record<string, string>[] = [];
  for (const registro of registros) {
    const tablas = registro.datos?.tablas;
    if (!tablas || typeof tablas !== "object") continue;
    const filas = (tablas as Record<string, unknown>)[tablaId];
    if (Array.isArray(filas)) out.push(...(filas as Record<string, string>[]));
  }
  return out;
}

export function valoresCampo(registros: RegistroFormato[], campoId: string): string[] {
  const out: string[] = [];
  for (const registro of registros) {
    const campos = registro.datos?.campos;
    if (!campos || typeof campos !== "object") continue;
    const valor = (campos as Record<string, unknown>)[campoId];
    if (typeof valor === "string" && valor.trim()) out.push(valor);
  }
  return out;
}
