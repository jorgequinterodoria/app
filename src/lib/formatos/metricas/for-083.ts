import { cuentaPor, filasDeTabla, porcentaje, topN, valoresCampo } from "./primitivas";
import type { BloqueMetrica, MetricaDefinition } from "./tipos";

export const metricasFor083: MetricaDefinition = {
  codigo: "FOR-083",
  titulo: "Métricas de inspección de trabajo seguro",
  compute: (registros) => {
    const filas = filasDeTabla(registros, "requisitos");
    const conSi = filas.filter((f) => f.si === "SI").length;
    const conNo = filas.filter((f) => f.no === "SI").length;
    const fechas = valoresCampo(registros, "fecha");
    const ultima = fechas.length > 0 ? [...fechas].sort().at(-1)! : "—";

    const bloques: BloqueMetrica[] = [
      { tipo: "tarjeta", etiqueta: "Inspecciones realizadas", valor: registros.length },
      { tipo: "tarjeta", etiqueta: "Hallazgos (No)", valor: conNo },
      { tipo: "tarjeta", etiqueta: "Cumplimiento general (%)", valor: porcentaje(conSi, conSi + conNo) },
      { tipo: "tarjeta", etiqueta: "Última inspección", valor: ultima },
      {
        tipo: "ranking",
        titulo: "Requisitos más incumplidos",
        items: topN(
          cuentaPor(
            filas.filter((f) => f.no === "SI"),
            (f) => f.requisito?.trim() || "Sin texto"
          ),
          10
        ),
      },
      {
        tipo: "distribucion",
        titulo: "Inspecciones por localización",
        items: topN(cuentaPor(valoresCampo(registros, "localizacion"), (v) => v), 10),
      },
    ];
    return bloques;
  },
};
