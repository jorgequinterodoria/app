import { cuentaPor, porcentaje, sumaPor, topN } from "./primitivas";
import type { BloqueMetrica, MetricaDefinition } from "./tipos";

interface FilaAsistencia {
  nombre?: string;
  firma?: boolean;
}

export const metricasFor009: MetricaDefinition = {
  codigo: "FOR-009",
  titulo: "Métricas de asistencia a capacitación",
  compute: (registros) => {
    const asistentes: FilaAsistencia[] = [];
    const temas: string[] = [];

    for (const registro of registros) {
      const filas = registro.datos?.asistencia;
      if (Array.isArray(filas)) asistentes.push(...(filas as FilaAsistencia[]));
      const tema = registro.datos?.temaCapacitacion;
      if (typeof tema === "string" && tema.trim()) temas.push(tema.trim());
    }

    const confirmadas = asistentes.filter((a) => a.firma === true).length;
    const sinFirma = asistentes.filter((a) => a.firma !== true);

    const bloques: BloqueMetrica[] = [
      { tipo: "tarjeta", etiqueta: "Sesiones de capacitación", valor: registros.length },
      { tipo: "tarjeta", etiqueta: "Asistentes registrados", valor: asistentes.length },
      { tipo: "tarjeta", etiqueta: "Asistencias confirmadas", valor: confirmadas },
      { tipo: "tarjeta", etiqueta: "Asistencia promedio (%)", valor: porcentaje(confirmadas, asistentes.length) },
      {
        tipo: "ranking",
        titulo: "Personal con menor asistencia",
        items: topN(sumaPor(sinFirma, (a) => a.nombre?.trim() || "Sin nombre", () => 1), 10),
      },
      {
        tipo: "distribucion",
        titulo: "Temas de capacitación",
        items: topN(cuentaPor(temas, (t) => t), 10),
      },
    ];
    return bloques;
  },
};
