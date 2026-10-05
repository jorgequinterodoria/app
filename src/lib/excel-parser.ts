import * as XLSX from "xlsx";

interface EmployeeRow {
  nombre: string;
  identificacion: string;
  cargo: string;
  tipoVinculacion?: string;
  eps?: string;
  arl?: string;
  cajaCompensacion?: string;
  fechaIngreso?: string;
}

export function parseEmployeeExcel(buffer: Buffer): EmployeeRow[] {
  const workbook = XLSX.read(buffer, { type: "buffer", cellDates: true });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);
  return data.map((row) => {
    const values = Object.values(row);
    const rawDate = values[7];
    let fechaIngreso = "";
    if (rawDate instanceof Date && !isNaN(rawDate.getTime())) {
      fechaIngreso = rawDate.toISOString();
    } else if (rawDate && !isNaN(Number(rawDate))) {
      const d = XLSX.SSF.parse_date_code(Number(rawDate));
      if (d) fechaIngreso = `${d.y}-${String(d.m).padStart(2, "0")}-${String(d.d).padStart(2, "0")}`;
    } else if (rawDate) {
      const parsed = String(rawDate);
      if (!isNaN(Date.parse(parsed))) fechaIngreso = new Date(parsed).toISOString();
    }
    return {
      nombre: String(values[0] || ""),
      identificacion: String(values[1] || ""),
      cargo: String(values[2] || ""),
      tipoVinculacion: String(values[3] || ""),
      eps: String(values[4] || ""),
      arl: String(values[5] || ""),
      cajaCompensacion: String(values[6] || ""),
      fechaIngreso,
    };
  }).filter((e) => e.nombre && e.identificacion);
}