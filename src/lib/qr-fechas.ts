const FECHA_ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

export function hoyColombia(now: Date = new Date()): string {
  // sv-SE formatea como YYYY-MM-DD; Colombia no aplica horario de verano (UTC-5 fijo)
  return now.toLocaleDateString("sv-SE", { timeZone: "America/Bogota" });
}

export function esFechaPasada(fecha: string, now: Date = new Date()): boolean {
  if (!FECHA_ISO_RE.test(fecha)) return false;
  return fecha < hoyColombia(now);
}

export function finDeDiaColombia(fecha: string): Date {
  return new Date(`${fecha}T23:59:59-05:00`);
}
