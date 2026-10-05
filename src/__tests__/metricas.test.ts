import { describe, it, expect } from "vitest";
import {
  cuentaPor,
  sumaPor,
  sumaTotal,
  topN,
  porcentaje,
  filasDeTabla,
  valoresCampo,
} from "@/lib/formatos/metricas/primitivas";
import { registroMetricas, tieneMetricas } from "@/lib/formatos/metricas/registro-metricas";
import { metricasFor006 } from "@/lib/formatos/metricas/for-006";
import { metricasFor009 } from "@/lib/formatos/metricas/for-009";
import { metricasFor015 } from "@/lib/formatos/metricas/for-015";
import { metricasFor083 } from "@/lib/formatos/metricas/for-083";
import type {
  BloqueMetrica,
  DistribucionMetrica,
  RankingMetrica,
  RegistroFormato,
  TarjetaMetrica,
} from "@/lib/formatos/metricas/tipos";

function reg(datos: Record<string, unknown> | null): RegistroFormato {
  return { id: `r-${Math.random()}`, codigo: "FOR-XXX", datos, createdAt: "2026-10-01T00:00:00.000Z" };
}

function tarjeta(bloques: BloqueMetrica[], etiqueta: string): TarjetaMetrica | undefined {
  return bloques.find((b): b is TarjetaMetrica => b.tipo === "tarjeta" && b.etiqueta === etiqueta);
}

function ranking(bloques: BloqueMetrica[], titulo: string): RankingMetrica | undefined {
  return bloques.find((b): b is RankingMetrica => b.tipo === "ranking" && b.titulo === titulo);
}

function distribucion(bloques: BloqueMetrica[], titulo: string): DistribucionMetrica | undefined {
  return bloques.find((b): b is DistribucionMetrica => b.tipo === "distribucion" && b.titulo === titulo);
}

describe("primitivas de métricas", () => {
  it("cuentaPor agrupa por clave y ordena de mayor a menor", () => {
    const items = [{ n: "a" }, { n: "a" }, { n: "b" }];
    expect(cuentaPor(items, (i) => i.n)).toEqual([
      { etiqueta: "a", valor: 2 },
      { etiqueta: "b", valor: 1 },
    ]);
  });

  it("cuentaPor desempata por etiqueta ascendente", () => {
    const items = [{ n: "b" }, { n: "a" }, { n: "c" }];
    expect(cuentaPor(items, (i) => i.n)).toEqual([
      { etiqueta: "a", valor: 1 },
      { etiqueta: "b", valor: 1 },
      { etiqueta: "c", valor: 1 },
    ]);
  });

  it("sumaPor acumula valores numéricos por clave", () => {
    const items = [
      { t: "Ana", d: 2 },
      { t: "Ana", d: 3 },
      { t: "Luis", d: 4 },
    ];
    expect(sumaPor(items, (i) => i.t, (i) => i.d)).toEqual([
      { etiqueta: "Ana", valor: 5 },
      { etiqueta: "Luis", valor: 4 },
    ]);
  });

  it("sumaTotal suma todos los valores", () => {
    expect(sumaTotal([{ d: 2 }, { d: 3 }], (i) => i.d)).toBe(5);
    expect(sumaTotal([], (i: { d: number }) => i.d)).toBe(0);
  });

  it("topN limita a los N primeros", () => {
    const items = [
      { etiqueta: "a", valor: 1 },
      { etiqueta: "b", valor: 2 },
      { etiqueta: "c", valor: 3 },
      { etiqueta: "d", valor: 4 },
    ];
    expect(topN(items, 2)).toEqual([
      { etiqueta: "d", valor: 4 },
      { etiqueta: "c", valor: 3 },
    ]);
  });

  it("porcentaje calcula con un decimal y protege división por cero", () => {
    expect(porcentaje(1, 3)).toBe(33.3);
    expect(porcentaje(5, 5)).toBe(100);
    expect(porcentaje(0, 0)).toBe(0);
  });

  it("filasDeTabla extrae filas de todas las tablas del mismo id", () => {
    const registros = [
      reg({ tablas: { ausentismos: [{ x: "1" }] } }),
      reg({ tablas: { ausentismos: [{ x: "2" }, { x: "3" }] } }),
      reg({ tablas: { otra: [{ x: "9" }] } }),
    ];
    expect(filasDeTabla(registros, "ausentismos")).toHaveLength(3);
  });

  it("valoresCampo extrae valores de un campo sin undefined", () => {
    const registros = [reg({ campos: { fecha: "2026-01-01" } }), reg({ campos: {} }), reg(null)];
    expect(valoresCampo(registros, "fecha")).toEqual(["2026-01-01"]);
  });
});

describe("registro de métricas (lista curada)", () => {
  it("contiene exactamente los 4 formularios del piloto", () => {
    expect(Object.keys(registroMetricas).sort()).toEqual(["FOR-006", "FOR-009", "FOR-015", "FOR-083"]);
  });

  it("cada entrada tiene título y compute", () => {
    for (const def of Object.values(registroMetricas)) {
      expect(def.titulo.length).toBeGreaterThan(3);
      expect(typeof def.compute).toBe("function");
    }
  });

  it("tieneMetricas solo es true para códigos curados", () => {
    expect(tieneMetricas("FOR-006")).toBe(true);
    expect(tieneMetricas("FOR-083")).toBe(true);
    expect(tieneMetricas("FOR-021")).toBe(false);
    expect(tieneMetricas("FOR-130")).toBe(false);
  });
});

describe("métricas FOR-006 (asistencia diaria)", () => {
  const celda = (novedad = "", sintomas = "") => ({ novedad, sintomas });
  const semana1 = [
    celda("Retardo"),
    celda("Retardo"),
    celda("", "SI"),
    celda(),
    celda(),
    celda(),
    celda(),
  ];
  const semana2 = [celda("Incapacidad"), celda("Incapacidad"), celda("Incapacidad"), celda("Incapacidad"), celda(), celda(), celda()];
  const semana3 = [celda("Retardo"), celda(), celda(), celda(), celda(), celda(), celda()];
  const semana4 = [celda(), celda(), celda(), celda(), celda(), celda(), celda()];

  const registros = [
    reg({ asistencia: { emp1: semana1, emp2: semana2 } }),
    reg({ asistencia: { emp1: semana3, emp2: semana4 } }),
  ];
  const contexto = { empleados: [{ id: "emp1", nombre: "Ana Pérez" }, { id: "emp2", nombre: "Luis Gómez" }] };

  it("tarjetas agregan registros, novedades, síntomas y empleados", () => {
    const bloques = metricasFor006.compute(registros, contexto);
    expect(tarjeta(bloques, "Registros guardados")?.valor).toBe(2);
    expect(tarjeta(bloques, "Novedades registradas")?.valor).toBe(7);
    expect(tarjeta(bloques, "Días con síntomas (SI)")?.valor).toBe(1);
    expect(tarjeta(bloques, "Empleados con novedades")?.valor).toBe(2);
  });

  it("ranking: empleado con más novedades primero, con nombre real", () => {
    const bloques = metricasFor006.compute(registros, contexto);
    const r = ranking(bloques, "Empleados con más novedades");
    expect(r?.items).toEqual([
      { etiqueta: "Luis Gómez", valor: 4 },
      { etiqueta: "Ana Pérez", valor: 3 },
    ]);
  });

  it("ranking de síntomas solo incluye empleados con síntomas", () => {
    const bloques = metricasFor006.compute(registros, contexto);
    const r = ranking(bloques, "Empleados con síntomas (SI)");
    expect(r?.items).toEqual([{ etiqueta: "Ana Pérez", valor: 1 }]);
  });

  it("sin contexto de empleados usa el id como etiqueta", () => {
    const bloques = metricasFor006.compute(registros, {});
    const r = ranking(bloques, "Empleados con más novedades");
    expect(r?.items[0].etiqueta).toBe("emp2");
  });

  it("sin registros devuelve tarjetas en cero y rankings vacíos", () => {
    const bloques = metricasFor006.compute([], {});
    expect(tarjeta(bloques, "Registros guardados")?.valor).toBe(0);
    expect(tarjeta(bloques, "Novedades registradas")?.valor).toBe(0);
    expect(ranking(bloques, "Empleados con más novedades")?.items).toEqual([]);
  });
});

describe("métricas FOR-009 (asistencia a capacitación)", () => {
  const registros = [
    reg({
      fecha: "2026-09-01",
      temaCapacitacion: "Trabajo seguro en altura",
      asistencia: [
        { nombre: "Ana Pérez", firma: true },
        { nombre: "Luis Gómez", firma: false },
        { nombre: "Sofia Ríos", firma: true },
      ],
    }),
    reg({
      fecha: "2026-09-08",
      temaCapacitacion: "Trabajo seguro en altura",
      asistencia: [
        { nombre: "Ana Pérez", firma: false },
        { nombre: "Luis Gómez", firma: false },
        { nombre: "Sofia Ríos", firma: true },
      ],
    }),
  ];

  it("tarjetas agregan sesiones, asistentes, firmas y promedio", () => {
    const bloques = metricasFor009.compute(registros, {});
    expect(tarjeta(bloques, "Sesiones de capacitación")?.valor).toBe(2);
    expect(tarjeta(bloques, "Asistentes registrados")?.valor).toBe(6);
    expect(tarjeta(bloques, "Asistencias confirmadas")?.valor).toBe(3);
    expect(tarjeta(bloques, "Asistencia promedio (%)")?.valor).toBe(50);
  });

  it("ranking: personal con menor asistencia (sin firma)", () => {
    const bloques = metricasFor009.compute(registros, {});
    const r = ranking(bloques, "Personal con menor asistencia");
    expect(r?.items).toEqual([
      { etiqueta: "Luis Gómez", valor: 2 },
      { etiqueta: "Ana Pérez", valor: 1 },
    ]);
  });

  it("distribución de temas de capacitación", () => {
    const bloques = metricasFor009.compute(registros, {});
    const d = distribucion(bloques, "Temas de capacitación");
    expect(d?.items).toEqual([{ etiqueta: "Trabajo seguro en altura", valor: 2 }]);
  });
});

describe("métricas FOR-015 (control de ausentismo)", () => {
  const registros = [
    reg({
      campos: { desde: "2026-09-01", hasta: "2026-09-30" },
      tablas: {
        ausentismos: [
          { cedula: "1", trabajador: "Ana Pérez", motivoTipo: "Incapacidad médica", horas: "16", dias: "2" },
          { cedula: "2", trabajador: "Luis Gómez", motivoTipo: "Personal", horas: "8", dias: "1" },
        ],
      },
    }),
    reg({
      campos: { desde: "2026-10-01", hasta: "2026-10-31" },
      tablas: {
        ausentismos: [{ cedula: "1", trabajador: "Ana Pérez", motivoTipo: "Incapacidad médica", horas: "24", dias: "3" }],
      },
    }),
  ];

  it("tarjetas agregan ausentismos, días, horas y trabajadores", () => {
    const bloques = metricasFor015.compute(registros, {});
    expect(tarjeta(bloques, "Ausentismos registrados")?.valor).toBe(3);
    expect(tarjeta(bloques, "Días perdidos")?.valor).toBe(6);
    expect(tarjeta(bloques, "Horas perdidas")?.valor).toBe(48);
    expect(tarjeta(bloques, "Trabajadores afectados")?.valor).toBe(2);
  });

  it("ranking: trabajadores con más días de ausentismo", () => {
    const bloques = metricasFor015.compute(registros, {});
    const r = ranking(bloques, "Trabajadores con más días de ausentismo");
    expect(r?.items).toEqual([
      { etiqueta: "Ana Pérez", valor: 5 },
      { etiqueta: "Luis Gómez", valor: 1 },
    ]);
  });

  it("distribución por tipo de motivo", () => {
    const bloques = metricasFor015.compute(registros, {});
    const d = distribucion(bloques, "Ausentismos por tipo de motivo");
    expect(d?.items).toEqual([
      { etiqueta: "Incapacidad médica", valor: 2 },
      { etiqueta: "Personal", valor: 1 },
    ]);
  });
});

describe("métricas FOR-083 (inspección de trabajo seguro)", () => {
  const registros = [
    reg({
      campos: { fecha: "2026-09-01", localizacion: "Frente A" },
      tablas: {
        requisitos: [
          { requisito: "R1", si: "SI", no: "" },
          { requisito: "R2", si: "", no: "SI" },
          { requisito: "R3", si: "SI", no: "" },
        ],
      },
    }),
    reg({
      campos: { fecha: "2026-09-15", localizacion: "Frente B" },
      tablas: {
        requisitos: [
          { requisito: "R1", si: "", no: "SI" },
          { requisito: "R2", si: "SI", no: "" },
        ],
      },
    }),
  ];

  it("tarjetas agregan inspecciones, hallazgos, cumplimiento y última fecha", () => {
    const bloques = metricasFor083.compute(registros, {});
    expect(tarjeta(bloques, "Inspecciones realizadas")?.valor).toBe(2);
    expect(tarjeta(bloques, "Hallazgos (No)")?.valor).toBe(2);
    expect(tarjeta(bloques, "Cumplimiento general (%)")?.valor).toBe(60);
    expect(tarjeta(bloques, "Última inspección")?.valor).toBe("2026-09-15");
  });

  it("ranking: requisitos más incumplidos", () => {
    const bloques = metricasFor083.compute(registros, {});
    const r = ranking(bloques, "Requisitos más incumplidos");
    expect(r?.items).toEqual([
      { etiqueta: "R1", valor: 1 },
      { etiqueta: "R2", valor: 1 },
    ]);
  });

  it("distribución de inspecciones por localización", () => {
    const bloques = metricasFor083.compute(registros, {});
    const d = distribucion(bloques, "Inspecciones por localización");
    expect(d?.items).toEqual([
      { etiqueta: "Frente A", valor: 1 },
      { etiqueta: "Frente B", valor: 1 },
    ]);
  });

  it("sin registros no explota y devuelve cumplimiento 0", () => {
    const bloques = metricasFor083.compute([], {});
    expect(tarjeta(bloques, "Cumplimiento general (%)")?.valor).toBe(0);
    expect(tarjeta(bloques, "Última inspección")?.valor).toBe("—");
  });
});
