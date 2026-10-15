export const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const FORMATOS_QR = new Set(["FOR-006", "FOR-009"]);

export function esFormatoQr(formatoTipo: string): boolean {
  return FORMATOS_QR.has(formatoTipo);
}
