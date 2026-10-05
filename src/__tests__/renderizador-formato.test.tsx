import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Formatorenderizador } from "@/components/formatos/renderizador-formato";
import type { FormatoConfig } from "@/lib/formatos/tipos";

const config: FormatoConfig = {
  codigo: "FOR-021",
  nombre: "Control de Notificaciones",
  grupo: "Seguridad",
  secciones: [
    {
      id: "general",
      titulo: "General",
      campos: [{ id: "fecha", etiqueta: "Fecha de notificación", tipo: "fecha" }],
      tablas: [
        {
          id: "notificaciones",
          etiquetaAgregar: "+ Agregar notificación",
          columnas: [
            { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
            { id: "clasificacion", etiqueta: "Clasificación", tipo: "seleccion", opciones: ["AI", "CI"] },
          ],
          filasIniciales: [{ nombre: "", clasificacion: "" }],
        },
      ],
    },
  ],
};

beforeEach(() => {
  vi.restoreAllMocks();
  global.fetch = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("/api/formatos?")) {
      return { ok: true, json: async () => [] } as Response;
    }
    return { ok: true, json: async () => ({ id: "1" }) } as Response;
  }) as typeof fetch;
});

describe("Formatorenderizador", () => {
  it("renderiza campos y tabla desde la config", () => {
    render(<Formatorenderizador config={config} proyectoId="p1" />);
    expect(screen.getByLabelText(/Fecha de notificación/)).toBeDefined();
    expect(screen.getByText("Nombre")).toBeDefined();
    expect(screen.getByText("Clasificación")).toBeDefined();
  });

  it("agrega filas a la tabla", () => {
    render(<Formatorenderizador config={config} proyectoId="p1" />);
    const filasAntes = screen.getAllByRole("row").length;
    fireEvent.click(screen.getByText("+ Agregar notificación"));
    expect(screen.getAllByRole("row").length).toBe(filasAntes + 1);
  });

  it("guarda vía POST con proyectoId, codigo, tipo y datos", async () => {
    render(<Formatorenderizador config={config} proyectoId="p1" />);
    fireEvent.change(screen.getByLabelText(/Fecha de notificación/), { target: { value: "2026-10-05" } });
    fireEvent.click(screen.getByText("Guardar"));
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const post = (global.fetch as ReturnType<typeof vi.fn>).mock.calls.find(
      (c) => String(c[0]).includes("/api/formatos") && c[1]?.method === "POST"
    );
    expect(post).toBeTruthy();
    const body = JSON.parse(String(post![1].body));
    expect(body).toMatchObject({ proyectoId: "p1", codigo: "FOR-021" });
    expect(body.tipo).toBe("Control de Notificaciones");
    expect(body.datos.campos.fecha).toBe("2026-10-05");
    expect(Array.isArray(body.datos.tablas.notificaciones)).toBe(true);
  });

  it("muestra aviso si falta proyectoId", () => {
    render(<Formatorenderizador config={config} proyectoId="" />);
    expect(screen.getByText(/No se proporcionó un proyecto/)).toBeDefined();
  });
});
