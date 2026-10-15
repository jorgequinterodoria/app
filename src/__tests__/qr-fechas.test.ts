import { describe, it, expect } from "vitest";
import { hoyColombia, esFechaPasada, esFechaValida, finDeDiaColombia } from "@/lib/qr-fechas";

describe("qr-fechas", () => {
  it("hoyColombia devuelve YYYY-MM-DD en hora Colombia", () => {
    expect(hoyColombia(new Date("2026-10-14T12:00:00Z"))).toBe("2026-10-14");
  });

  it("hoyColombia cruza medianoche UTC correctamente (COT = UTC-5)", () => {
    // 2026-10-15T02:00Z = 2026-10-14 21:00 en Colombia
    expect(hoyColombia(new Date("2026-10-15T02:00:00Z"))).toBe("2026-10-14");
  });

  it("esFechaPasada compara contra hoy Colombia", () => {
    const ahora = new Date("2026-10-14T15:00:00Z");
    expect(esFechaPasada("2026-10-13", ahora)).toBe(true);
    expect(esFechaPasada("2026-10-14", ahora)).toBe(false);
    expect(esFechaPasada("2026-10-15", ahora)).toBe(false);
  });

  it("finDeDiaColombia devuelve 23:59:59 UTC-5 del día", () => {
    // 23:59:59 COT (UTC-5) = 04:59:59 UTC del día siguiente
    expect(finDeDiaColombia("2026-10-14").toISOString()).toBe("2026-10-15T04:59:59.000Z");
  });

  it("esFechaValida valida días reales del calendario", () => {
    expect(esFechaValida("2026-02-30")).toBe(false);
    expect(esFechaValida("2026-13-40")).toBe(false);
    expect(esFechaValida("2026-10-14")).toBe(true);
  });

  it("rechaza formatos de fecha inválidos en esFechaPasada", () => {
    expect(esFechaPasada("14-10-2026")).toBe(false);
    expect(esFechaPasada("")).toBe(false);
  });

  it("rechaza fechas de calendario imposibles en esFechaPasada", () => {
    const ahora = new Date("2026-10-14T15:00:00Z");
    expect(esFechaPasada("2026-02-30", ahora)).toBe(false);
    expect(esFechaPasada("2026-13-01", ahora)).toBe(false);
  });

  it("finDeDiaColombia lanza RangeError con formato inválido", () => {
    expect(() => finDeDiaColombia("14-10-2026")).toThrow(RangeError);
  });

  it("finDeDiaColombia lanza RangeError con fecha de calendario imposible", () => {
    expect(() => finDeDiaColombia("2026-02-30")).toThrow(RangeError);
  });
});
