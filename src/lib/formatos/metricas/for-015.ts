import { cuentaPor, filasDeTabla, sumaPor, sumaTotal, topN } from "./primitivas";
import type { BloqueMetrica, MetricaDefinition } from "./tipos";

const numero = (valor?: string) => {
  const n = Number(valor);
  return Number.isFinite(n) ? n : 0;
};

export const metricasFor015: MetricaDefinition = {
  codigo: "FOR-015",
  titulo: "Métricas de control de ausentismo",
  compute: (registros) => {
    const filas = filasDeTabla(registros, "ausentismos");
    const trabajadores = new Set(filas.map((f) => f.cedula?.trim() || f.trabajador?.trim()).filter(Boolean));

    const bloques: BloqueMetrica[] = [
      { tipo: "tarjeta", etiqueta: "Ausentismos registrados", valor: filas.length },
      { tipo: "tarjeta", etiqueta: "Días perdidos", valor: sumaTotal(filas, (f) => numero(f.dias)) },
      { tipo: "tarjeta", etiqueta: "Horas perdidas", valor: sumaTotal(filas, (f) => numero(f.horas)) },
      { tipo: "tarjeta", etiqueta: "Trabajadores afectados", valor: trabajadores.size },
      {
        tipo: "ranking",
        titulo: "Trabajadores con más días de ausentismo",
        items: topN(
          sumaPor(filas, (f) => f.trabajador?.trim() || "Sin nombre", (f) => numero(f.dias)),
          10
        ),
      },
      {
        tipo: "distribucion",
        titulo: "Ausentismos por tipo de motivo",
        items: topN(cuentaPor(filas, (f) => f.motivoTipo?.trim() || "Sin motivo"), 10),
      },
    ];
    return bloques;
  },
};
