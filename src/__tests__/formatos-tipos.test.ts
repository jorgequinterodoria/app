import { describe, it, expect } from "vitest";
import type { FormatoConfig } from "@/lib/formatos/tipos";

describe("FormatoConfig (compile-time shape)", () => {
  it("acepta una config de ejemplo válida", () => {
    const cfg: FormatoConfig = {
      codigo: "FOR-021",
      nombre: "Control de Notificaciones de Actos y Condiciones Seguras",
      grupo: "Seguridad",
      secciones: [
        {
          id: "general",
          campos: [{ id: "fecha", etiqueta: "Fecha", tipo: "fecha" }],
          tablas: [
            {
              id: "notificaciones",
              columnas: [
                { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
                { id: "clasificacion", etiqueta: "Clasificación", tipo: "seleccion", opciones: ["AI", "CI"] },
              ],
            },
          ],
        },
      ],
    };
    expect(cfg.codigo).toBe("FOR-021");
    expect(cfg.secciones[0].tablas?.[0].columnas).toHaveLength(2);
  });
});
