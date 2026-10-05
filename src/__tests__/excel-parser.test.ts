import { describe, it, expect } from "vitest";
import * as XLSX from "xlsx";
import { parseEmployeeExcel } from "@/lib/excel-parser";

function createExcelBuffer(data: Record<string, unknown>[]): Buffer {
  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, sheet, "Empleados");
  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }) as Buffer;
}

describe("parseEmployeeExcel", () => {
  it("should parse a valid employee Excel file", () => {
    const buffer = createExcelBuffer([
      { Nombre: "Juan Pérez", Identificacion: "1234567890", Cargo: "Ingeniero" },
      { Nombre: "María García", Identificacion: "0987654321", Cargo: "Arquitecta" },
    ]);

    const result = parseEmployeeExcel(buffer);

    expect(result).toHaveLength(2);
    expect(result[0].nombre).toBe("Juan Pérez");
    expect(result[0].identificacion).toBe("1234567890");
    expect(result[0].cargo).toBe("Ingeniero");
  });

  it("should filter out empty rows", () => {
    const buffer = createExcelBuffer([
      { Nombre: "Juan Pérez", Identificacion: "1234567890", Cargo: "Ingeniero" },
      { Nombre: "", Identificacion: "", Cargo: "" },
      { Nombre: "María García", Identificacion: "0987654321", Cargo: "Arquitecta" },
    ]);

    const result = parseEmployeeExcel(buffer);

    expect(result).toHaveLength(2);
  });

  it("should handle missing optional fields", () => {
    const buffer = createExcelBuffer([
      { Nombre: "Juan Pérez", Identificacion: "1234567890", Cargo: "Ingeniero" },
    ]);

    const result = parseEmployeeExcel(buffer);

    expect(result).toHaveLength(1);
    expect(result[0].nombre).toBe("Juan Pérez");
    expect(result[0].tipoVinculacion).toBe("");
    expect(result[0].eps).toBe("");
    expect(result[0].arl).toBe("");
  });

  it("should return empty array for empty Excel", () => {
    const buffer = createExcelBuffer([]);

    const result = parseEmployeeExcel(buffer);

    expect(result).toHaveLength(0);
  });

  it("should parse additional fields when present", () => {
    const buffer = createExcelBuffer([
      {
        Nombre: "Juan Pérez",
        Identificacion: "1234567890",
        Cargo: "Ingeniero",
        TipoVinculacion: "Contrato",
        EPS: "Sanitas",
        ARL: "Sura",
        CajaCompensacion: "Comfandi",
        FechaIngreso: "2024-01-15",
      },
    ]);

    const result = parseEmployeeExcel(buffer);

    expect(result).toHaveLength(1);
    expect(result[0].tipoVinculacion).toBe("Contrato");
    expect(result[0].eps).toBe("Sanitas");
    expect(result[0].arl).toBe("Sura");
    expect(result[0].cajaCompensacion).toBe("Comfandi");
  });
});
