const FECHA_ISO_RE = /^\d{4}-\d{2}-\d{2}$/;
const COT_OFFSET = "-05:00";

function esFechaValida(fecha: string): boolean {
  if (!FECHA_ISO_RE.test(fecha)) return false;
  const d = new Date(`${fecha}T00:00:00Z`);
  // NaN-check primero: toISOString() lanza RangeError en fechas fuera de rango (mes 13, día 40)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === fecha;
}

export function hoyColombia(now: Date = new Date()): string {
  // sv-SE formatea como YYYY-MM-DD; Colombia no aplica horario de verano (UTC-5 fijo)
  return now.toLocaleDateString("sv-SE", { timeZone: "America/Bogota" });
}

export function esFechaPasada(fecha: string, now: Date = new Date()): boolean {
  if (!esFechaValida(fecha)) return false;
  return fecha < hoyColombia(now);
}

export function finDeDiaColombia(fecha: string): Date {
  if (!esFechaValida(fecha)) {
    throw new RangeError("Fecha inválida: use YYYY-MM-DD con un día válido");
  }
  return new Date(`${fecha}T23:59:59${COT_OFFSET}`);
}
