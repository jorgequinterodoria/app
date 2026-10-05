import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContenidoFormato } from "@/components/formatos/contenido-formato";

const registro006 = [
  {
    id: "f1",
    codigo: "FOR-006",
    createdAt: "2026-09-01T00:00:00.000Z",
    datos: {
      asistencia: {
        emp1: [
          { novedad: "Retardo", sintomas: "NO" },
          { novedad: "", sintomas: "" },
          { novedad: "", sintomas: "" },
          { novedad: "", sintomas: "" },
          { novedad: "", sintomas: "" },
          { novedad: "", sintomas: "" },
          { novedad: "", sintomas: "" },
        ],
        emp2: [
          { novedad: "Incapacidad", sintomas: "NO" },
          { novedad: "Incapacidad", sintomas: "NO" },
          { novedad: "", sintomas: "" },
          { novedad: "", sintomas: "" },
          { novedad: "", sintomas: "" },
          { novedad: "", sintomas: "" },
          { novedad: "", sintomas: "" },
        ],
      },
    },
  },
];

beforeEach(() => {
  vi.restoreAllMocks();
  global.fetch = vi.fn(async (input: RequestInfo | URL) => {
    const url = String(input);
    if (url.includes("/api/empleados")) {
      return {
        ok: true,
        json: async () => [
          { id: "emp1", nombre: "Ana Pérez" },
          { id: "emp2", nombre: "Luis Gómez" },
        ],
      } as Response;
    }
    if (url.includes("codigo=FOR-006")) {
      return { ok: true, json: async () => registro006 } as Response;
    }
    return { ok: true, json: async () => [] } as Response;
  }) as typeof fetch;
});

describe("ContenidoFormato (pestañas Diligenciar / Métricas)", () => {
  it("muestra la pestaña Métricas solo para códigos curados", async () => {
    render(<ContenidoFormato codigo="FOR-006" proyectoId="p1" />);
    expect(screen.getByRole("button", { name: "Diligenciar" })).toBeDefined();
    expect(screen.getByRole("button", { name: "Métricas" })).toBeDefined();

    render(<ContenidoFormato codigo="FOR-021" proyectoId="p1" />);
    const botones = screen.getAllByRole("button", { name: "Métricas" });
    expect(botones).toHaveLength(1);
  });

  it("al abrir Métricas renderiza tarjetas y rankings calculados", async () => {
    render(<ContenidoFormato codigo="FOR-006" proyectoId="p1" />);
    fireEvent.click(screen.getByRole("button", { name: "Métricas" }));

    expect(await screen.findByText("Métricas de asistencia diaria")).toBeDefined();
    expect(screen.getByText("Novedades registradas")).toBeDefined();
    expect(screen.getByText("Empleados con más novedades")).toBeDefined();
    expect(screen.getByText("Luis Gómez")).toBeDefined();
    await waitFor(() =>
      expect(
        (global.fetch as ReturnType<typeof vi.fn>).mock.calls.some((c) => String(c[0]).includes("/api/empleados"))
      ).toBe(true)
    );
  });

  it("vuelve a Diligenciar al pulsar la otra pestaña", async () => {
    render(<ContenidoFormato codigo="FOR-006" proyectoId="p1" />);
    fireEvent.click(screen.getByRole("button", { name: "Métricas" }));
    await screen.findByText("Métricas de asistencia diaria");
    fireEvent.click(screen.getByRole("button", { name: "Diligenciar" }));
    expect(screen.queryByText("Métricas de asistencia diaria")).toBeNull();
    expect(screen.getByText(/tiene una página propia/)).toBeDefined();
  });

  it("sin registros muestra estado vacío en Métricas", async () => {
    render(<ContenidoFormato codigo="FOR-083" proyectoId="p1" />);
    fireEvent.click(screen.getByRole("button", { name: "Métricas" }));
    expect(
      await screen.findByText("Este formato aún no tiene registros para calcular métricas.")
    ).toBeDefined();
  });
});
