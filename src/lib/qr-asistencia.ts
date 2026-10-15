import { hoyColombia } from "@/lib/qr-fechas";

export interface DiaAsistencia {
  sintomas: "SI" | "NO" | "";
  novedad: string;
}

export interface QrRegistro {
  empleadoId: string;
  fecha: string;
  sintomas: string | null;
  novedad: string | null;
}

export function sanitizarQrCells(
  raw: unknown,
  empleados: { id: string }[],
): Record<string, number[]> {
  const ids = new Set(empleados.map((e) => e.id));
  const out: Record<string, number[]> = {};
  if (!raw || typeof raw !== "object") return out;
  for (const [empleadoId, idxs] of Object.entries(raw as Record<string, unknown>)) {
    if (!ids.has(empleadoId) || !Array.isArray(idxs)) continue;
    const validos = [...new Set(idxs.filter((n): n is number => Number.isInteger(n) && n >= 0 && n <= 6))];
    if (validos.length > 0) out[empleadoId] = validos.sort((a, b) => a - b);
  }
  return out;
}

export function construirAsistenciaHidratada(
  empleados: { id: string }[],
  base: Record<string, DiaAsistencia[]> | null,
  registros: QrRegistro[],
  days: { iso: string }[],
  prevMarks: Record<string, number[]> = {},
): { merged: Record<string, DiaAsistencia[]>; marks: Record<string, number[]> } {
  const merged: Record<string, DiaAsistencia[]> = {};
  for (const emp of empleados) {
    merged[emp.id] =
      base?.[emp.id]?.length === 7
        ? base[emp.id].map((c) => ({
            sintomas: (c.sintomas || "") as DiaAsistencia["sintomas"],
            novedad: c.novedad || "",
          }))
        : Array(7).fill(null).map(() => ({ sintomas: "", novedad: "" }));
  }

  const fechaToIndex = new Map(days.map((d, i) => [d.iso, i] as const));
  const marks: Record<string, number[]> = {};
  const marcar = (empleadoId: string, dayIndex: number) => {
    if (!marks[empleadoId]) marks[empleadoId] = [];
    if (!marks[empleadoId].includes(dayIndex)) marks[empleadoId].push(dayIndex);
  };

  // Restaura la procedencia persistida (celdas llenadas por QR en una sesión previa)
  // solo si la celda quedó efectivamente no vacía tras el merge.
  for (const [empleadoId, idxs] of Object.entries(prevMarks)) {
    const cells = merged[empleadoId];
    if (!cells) continue;
    for (const dayIndex of idxs) {
      const cell = cells[dayIndex];
      if (!cell) continue;
      if (cell.sintomas !== "" || cell.novedad !== "") marcar(empleadoId, dayIndex);
    }
  }

  for (const reg of registros) {
    const dayIndex = fechaToIndex.get(reg.fecha) ?? -1;
    if (dayIndex === -1) continue;
    if (!reg.sintomas && !reg.novedad) continue;
    const cell = merged[reg.empleadoId]?.[dayIndex];
    if (!cell) continue;
    if (cell.sintomas === "" && cell.novedad === "") {
      cell.sintomas = (reg.sintomas || "") as DiaAsistencia["sintomas"];
      cell.novedad = reg.novedad || "";
      marcar(reg.empleadoId, dayIndex);
    }
  }
  return { merged, marks };
}

export function resolverDiaQr(
  days: { iso: string }[],
  diaQr: string,
  hoy: string = hoyColombia(),
): string {
  if (days.length === 0) return "";
  const isos = days.map((d) => d.iso);
  if (diaQr && isos.includes(diaQr)) return diaQr;
  return isos.includes(hoy) ? hoy : isos[0];
}
