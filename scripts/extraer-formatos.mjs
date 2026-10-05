// Extrae cabeceras de los XLSX de ../15. Formatos y texto de PDFs (fallback).
// Uso: node scripts/extraer-formatos.mjs
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import XLSX from "xlsx";

const SRC = path.resolve(process.cwd(), "../15. Formatos");
const OUT_JSON = path.resolve(process.cwd(), "docs/formatos-headers.json");
const OUT_PDF = path.resolve(process.cwd(), "docs/formatos-text");

fs.mkdirSync(path.dirname(OUT_JSON), { recursive: true });
fs.mkdirSync(OUT_PDF, { recursive: true });

const archivos = fs.readdirSync(SRC);
const salida = {};

for (let i = 1; i <= 133; i++) {
  const codigo = `FOR-${String(i).padStart(3, "0")}`;
  const xlsx = archivos.find((f) => f.startsWith(codigo + " ") && /\.(xlsx|xls)$/i.test(f));

  if (xlsx) {
    try {
      const wb = XLSX.readFile(path.join(SRC, xlsx), { cellDates: true });
      const sheets = {};
      for (const name of wb.SheetNames) {
        const rows = XLSX.utils.sheet_to_json(wb.Sheets[name], { header: 1, defval: "", raw: false });
        sheets[name] = rows.slice(0, 80);
      }
      salida[codigo] = {
        nombre: xlsx.replace(/^FOR-\d{3} /, "").replace(/ V\.\d+\..*$/, "").trim(),
        fuente: "xlsx",
        archivo: xlsx,
        sheets,
      };
      continue;
    } catch (e) {
      salida[codigo] = { nombre: codigo, fuente: "error", error: String(e.message) };
      continue;
    }
  }

  const pdf = archivos.find((f) => f.startsWith(codigo + " ") && f.endsWith(".pdf"));
  if (pdf) {
    const txtOut = path.join(OUT_PDF, `${codigo}.txt`);
    try {
      execFileSync("pdftotext", ["-layout", "-f", "1", "-l", "6", path.join(SRC, pdf), txtOut]);
      salida[codigo] = {
        nombre: pdf.replace(/^FOR-\d{3} /, "").replace(/ V\.\d+\..*$/, "").trim(),
        fuente: "pdf",
        archivo: pdf,
        texto: path.relative(process.cwd(), txtOut),
      };
    } catch (e) {
      salida[codigo] = { nombre: codigo, fuente: "pdf-error", error: String(e.message) };
    }
  } else {
    salida[codigo] = { nombre: codigo, fuente: "ninguna" };
  }
}

fs.writeFileSync(OUT_JSON, JSON.stringify(salida, null, 2));
console.log(`OK: ${Object.keys(salida).length} formatos → ${OUT_JSON}`);
