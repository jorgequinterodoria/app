import { describe, it, expect } from "vitest";
import {
  construirAsistenciaHidratada,
  resolverDiaQr,
  sanitizarQrCells,
  type DiaAsistencia,
  type QrRegistro,
} from "@/lib/qr-asistencia";

const DAYS = [
  { iso: "2026-10-12" },
  { iso: "2026-10-13" },
  { iso: "2026-10-14" },
  { iso: "2026-10-15" },
  { iso: "2026-10-16" },
  { iso: "2026-10-17" },
  { iso: "2026-10-18" },
];

function vacia(): DiaAsistencia {
  return { sintomas: "", novedad: "" };
}

describe("construirAsistenciaHidratada", () => {
  it("llena celdas vacías desde los registros QR y las marca", () => {
    const empleados = [{ id: "e1" }];
    const registros: QrRegistro[] = [
      { empleadoId: "e1", fecha: "2026-10-13", sintomas: "NO", novedad: "I" },
    ];

    const { merged, marks } = construirAsistenciaHidratada(empleados, null, registros, DAYS);

    expect(merged.e1[1]).toEqual({ sintomas: "NO", novedad: "I" });
    expect(marks.e1).toEqual([1]);
  });

  it("prioriza la base guardada sobre el registro QR", () => {
    const empleados = [{ id: "e1" }];
    const base: Record<string, DiaAsistencia[]> = {
      e1: [vacia(), { sintomas: "SI", novedad: "manual" }, vacia(), vacia(), vacia(), vacia(), vacia()],
    };
    const registros: QrRegistro[] = [
      { empleadoId: "e1", fecha: "2026-10-13", sintomas: "NO", novedad: "QR" },
    ];

    const { merged, marks } = construirAsistenciaHidratada(empleados, base, registros, DAYS);

    expect(merged.e1[1]).toEqual({ sintomas: "SI", novedad: "manual" });
    expect(marks.e1).toBeUndefined();
  });

  it("ignora registros con fecha fuera del rango de días", () => {
    const empleados = [{ id: "e1" }];
    const registros: QrRegistro[] = [
      { empleadoId: "e1", fecha: "2026-10-01", sintomas: "NO", novedad: "" },
    ];

    const { merged, marks } = construirAsistenciaHidratada(empleados, null, registros, DAYS);

    expect(marks.e1).toBeUndefined();
    expect(merged.e1.every((c) => c.sintomas === "" && c.novedad === "")).toBe(true);
  });

  it("ignora registros sin síntomas ni novedad", () => {
    const empleados = [{ id: "e1" }];
    const registros: QrRegistro[] = [
      { empleadoId: "e1", fecha: "2026-10-13", sintomas: null, novedad: null },
    ];

    const { merged, marks } = construirAsistenciaHidratada(empleados, null, registros, DAYS);

    expect(marks.e1).toBeUndefined();
    expect(merged.e1[1]).toEqual(vacia());
  });

  it("ignora registros de empleados que no están en la lista", () => {
    const empleados = [{ id: "e1" }];
    const registros: QrRegistro[] = [
      { empleadoId: "desconocido", fecha: "2026-10-13", sintomas: "NO", novedad: "" },
    ];

    const { merged, marks } = construirAsistenciaHidratada(empleados, null, registros, DAYS);

    expect(Object.keys(marks)).toEqual([]);
    expect(merged.e1.every((c) => c.sintomas === "" && c.novedad === "")).toBe(true);
  });

  it("inicializa celdas vacías cuando la base tiene longitud distinta de 7", () => {
    const empleados = [{ id: "e1" }];
    const base: Record<string, DiaAsistencia[]> = {
      e1: [{ sintomas: "SI", novedad: "x" }],
    };

    const { merged } = construirAsistenciaHidratada(empleados, base, [], DAYS);

    expect(merged.e1).toHaveLength(7);
    expect(merged.e1.every((c) => c.sintomas === "" && c.novedad === "")).toBe(true);
  });

  it("no duplica la marca si ya fue agregada", () => {
    const empleados = [{ id: "e1" }];
    const registros: QrRegistro[] = [
      { empleadoId: "e1", fecha: "2026-10-13", sintomas: "NO", novedad: "" },
    ];

    const { marks } = construirAsistenciaHidratada(empleados, null, registros, DAYS);

    expect(marks.e1).toEqual([1]);
  });
});

describe("construirAsistenciaHidratada restaurando prevMarks (M-1)", () => {
  it("restaura la marca QR para una celda no vacía proveniente de la base guardada", () => {
    const empleados = [{ id: "e1" }];
    const base: Record<string, DiaAsistencia[]> = {
      e1: [vacia(), { sintomas: "NO", novedad: "I" }, vacia(), vacia(), vacia(), vacia(), vacia()],
    };

    const { merged, marks } = construirAsistenciaHidratada(empleados, base, [], DAYS, { e1: [1] });

    expect(merged.e1[1]).toEqual({ sintomas: "NO", novedad: "I" });
    expect(marks.e1).toEqual([1]);
  });

  it("descarta prevMarks de celdas vacías (sin valor persistido)", () => {
    const empleados = [{ id: "e1" }];
    const base: Record<string, DiaAsistencia[]> = { e1: Array(7).fill(null).map(vacia) };

    const { marks } = construirAsistenciaHidratada(empleados, base, [], DAYS, { e1: [1, 3] });

    expect(marks.e1).toBeUndefined();
  });

  it("descarta prevMarks de empleados inexistentes y de índices fuera de rango", () => {
    const empleados = [{ id: "e1" }];
    const base: Record<string, DiaAsistencia[]> = {
      e1: [vacia(), { sintomas: "SI", novedad: "x" }, vacia(), vacia(), vacia(), vacia(), vacia()],
    };

    const { marks } = construirAsistenciaHidratada(empleados, base, [], DAYS, {
      fantasma: [1],
      e1: [1, 99, -1],
    });

    expect(marks).toEqual({ e1: [1] });
  });

  it("une prevMarks con los registros QR nuevos sin duplicar", () => {
    const empleados = [{ id: "e1" }];
    const base: Record<string, DiaAsistencia[]> = {
      e1: [vacia(), { sintomas: "NO", novedad: "previa" }, vacia(), vacia(), vacia(), vacia(), vacia()],
    };
    const registros: QrRegistro[] = [
      { empleadoId: "e1", fecha: "2026-10-12", sintomas: "NO", novedad: "nueva" },
    ];

    const { marks } = construirAsistenciaHidratada(empleados, base, registros, DAYS, { e1: [1] });

    expect(marks.e1).toEqual([1, 0]);
  });
});

describe("sanitizarQrCells (M-1)", () => {
  it("devuelve vacío para entradas que no son objeto", () => {
    expect(sanitizarQrCells(null, [{ id: "e1" }])).toEqual({});
    expect(sanitizarQrCells("x", [{ id: "e1" }])).toEqual({});
    expect(sanitizarQrCells([1], [{ id: "e1" }])).toEqual({});
  });

  it("filtra empleados inexistentes e índices no enteros o fuera de 0-6", () => {
    const out = sanitizarQrCells(
      { e1: [0, 3, 3, 7, -1, 1.5, "2", null], fantasma: [1] },
      [{ id: "e1" }],
    );
    expect(out).toEqual({ e1: [0, 3] });
  });

  it("ordena y deduplica los índices válidos", () => {
    const out = sanitizarQrCells({ e1: [5, 1, 5, 2] }, [{ id: "e1" }]);
    expect(out).toEqual({ e1: [1, 2, 5] });
  });
});

describe("resolverDiaQr", () => {
  it("devuelve vacío si no hay días", () => {
    expect(resolverDiaQr([], "2026-10-13")).toBe("");
  });

  it("devuelve diaQr si está dentro del rango", () => {
    expect(resolverDiaQr(DAYS, "2026-10-15")).toBe("2026-10-15");
  });

  it("devuelve el día de hoy si está dentro del rango y diaQr no es válido", () => {
    expect(resolverDiaQr(DAYS, "2026-01-01", "2026-10-14")).toBe("2026-10-14");
  });

  it("usa el primer día si diaQr no está en el rango y hoy tampoco", () => {
    expect(resolverDiaQr(DAYS, "2026-01-01", "2026-01-01")).toBe("2026-10-12");
  });

  it("usa el primer día si diaQr está vacío y hoy no está en el rango", () => {
    expect(resolverDiaQr(DAYS, "", "2026-01-01")).toBe("2026-10-12");
  });
});
