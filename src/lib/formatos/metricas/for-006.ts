import { sumaPor, topN } from "./primitivas";
import type { BloqueMetrica, MetricaDefinition } from "./tipos";

interface CeldaAsistencia {
  novedad?: string;
  sintomas?: string;
}

interface Evento {
  empleadoId: string;
}

export const metricasFor006: MetricaDefinition = {
  codigo: "FOR-006",
  titulo: "Métricas de asistencia diaria",
  requiereEmpleados: true,
  compute: (registros, contexto = {}) => {
    const nombres = new Map((contexto.empleados ?? []).map((e) => [e.id, e.nombre]));
    const nombrar = (id: string) => nombres.get(id) ?? id;

    const eventosNovedad: Evento[] = [];
    const eventosSintoma: Evento[] = [];

    for (const registro of registros) {
      const asistencia = registro.datos?.asistencia;
      if (!asistencia || typeof asistencia !== "object") continue;
      for (const [empleadoId, celdas] of Object.entries(asistencia as Record<string, unknown>)) {
        if (!Array.isArray(celdas)) continue;
        for (const celda of celdas as CeldaAsistencia[]) {
          if (celda?.novedad?.trim()) eventosNovedad.push({ empleadoId });
          if (celda?.sintomas === "SI") eventosSintoma.push({ empleadoId });
        }
      }
    }

    const bloques: BloqueMetrica[] = [
      { tipo: "tarjeta", etiqueta: "Registros guardados", valor: registros.length },
      { tipo: "tarjeta", etiqueta: "Novedades registradas", valor: eventosNovedad.length },
      { tipo: "tarjeta", etiqueta: "Días con síntomas (SI)", valor: eventosSintoma.length },
      {
        tipo: "tarjeta",
        etiqueta: "Empleados con novedades",
        valor: new Set(eventosNovedad.map((e) => e.empleadoId)).size,
      },
      {
        tipo: "ranking",
        titulo: "Empleados con más novedades",
        items: topN(sumaPor(eventosNovedad, (e) => nombrar(e.empleadoId), () => 1), 10),
      },
      {
        tipo: "ranking",
        titulo: "Empleados con síntomas (SI)",
        items: topN(sumaPor(eventosSintoma, (e) => nombrar(e.empleadoId), () => 1), 10),
      },
    ];
    return bloques;
  },
};
