// Genera src/lib/formatos/configs/checklists-iniciales.ts desde docs/formatos-headers.json
// Uso: node scripts/generar-checklists.mjs
import fs from "node:fs";
import path from "node:path";

const HEADERS = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "docs/formatos-headers.json"), "utf8"));
const OUT = path.resolve(process.cwd(), "src/lib/formatos/configs/checklists-iniciales.ts");

const filas = (codigo) => HEADERS[codigo].sheets[Object.keys(HEADERS[codigo].sheets)[0]];
const txt = (v) => String(v ?? "").replace(/\s+/g, " ").trim();

function requisitos(codigo, desde, col, excluir = [], hasta = Infinity) {
  const out = [];
  for (let i = desde; i <= hasta && i < filas(codigo).length; i++) {
    const t = txt(filas(codigo)[i][col]);
    if (!t || excluir.includes(t)) continue;
    out.push(t);
  }
  return out;
}

function aspectos(codigo, desde) {
  const out = [];
  let equipo = "";
  let partes = "";
  for (let i = desde; i < filas(codigo).length; i++) {
    const r = filas(codigo)[i];
    const [c0, c1, c2, c3] = [txt(r[0]), txt(r[1]), txt(r[2]), txt(r[3])];
    if (c0 && c0 !== equipo) equipo = c0;
    if (c1 && c1 !== partes) partes = c1;
    if (!c2) continue;
    out.push({ equipo, partes, aspecto: c2, estandar: c3, si: "", no: "", observaciones: "" });
  }
  return out;
}

const EXCLUIR_FIN = /^(Conclusión de inspección|¿A pesar de que|OBSERVACIONES GENERALES|Nombre:)/;

const conNA = (codigo, desde, excluir, hasta = Infinity) =>
  requisitos(codigo, desde, 0, excluir, hasta)
    .filter((r) => !EXCLUIR_FIN.test(r))
    .map((r) => ({ requisito: r, si: "", no: "", na: "", observaciones: "" }));
const sinNA = (codigo, desde, excluir, hasta = Infinity) =>
  requisitos(codigo, desde, 0, excluir, hasta)
    .filter((r) => !EXCLUIR_FIN.test(r))
    .map((r) => ({ requisito: r, si: "", no: "", observaciones: "" }));

function itemsNumerados(codigo, desde) {
  const out = [];
  for (let i = desde; i < filas(codigo).length; i++) {
    const r = filas(codigo)[i];
    const n = txt(r[0]);
    const item = txt(r[1]);
    if (!/^\d+$/.test(n) || !item) continue;
    out.push({ numero: n, item, si: "", no: "", na: "" });
  }
  return out;
}

function itemsConSeccion125() {
  const out = [];
  let sistema = "";
  const rows = filas("FOR-125");
  for (let i = 17; i < rows.length; i++) {
    const c0 = txt(rows[i][0]);
    const c1 = txt(rows[i][1]);
    if (c0) sistema = c0;
    if (!c1) continue;
    out.push({ sistema, item: c1, cumple: "", observaciones: "" });
  }
  return out;
}

function itemsConSeccion129() {
  const out = [];
  let seccion = "";
  const rows = filas("FOR-129");
  for (let i = 16; i < rows.length; i++) {
    const c0 = txt(rows[i][0]);
    const c1 = txt(rows[i][1]);
    if (c0 && !/^\d+$/.test(c0)) {
      seccion = c0;
      continue;
    }
    if (/^\d+$/.test(c0) && c1) out.push({ seccion, numero: c0, item: c1, si: "", no: "", na: "" });
  }
  return out;
}

function matrizRes0312() {
  const out = [];
  let ciclo = "";
  let estandar = "";
  let subestandar = "";
  const rows = filas("FOR-095");
  for (let i = 12; i < rows.length; i++) {
    const r = rows[i];
    const [c0, c1, c2, c3, c4, c5] = [txt(r[0]), txt(r[1]), txt(r[2]), txt(r[3]), txt(r[4]), txt(r[5])];
    if (c0) ciclo = c0;
    if (c1) estandar = c1;
    if (c2) subestandar = c2;
    if (!c3 || !/^\d+\.\d+\./.test(c3)) continue;
    out.push({
      ciclo,
      estandar,
      subestandar,
      item: c3,
      criterio: c4,
      modoVerificacion: c5,
      cumple: "",
      noCumple: "",
      noAplica: "",
      observacion: "",
      planAccion: "",
      responsable: "",
      fecha: "",
      fundamentos: "",
    });
  }
  return out;
}

const data = {
  "FOR-083": sinNA("FOR-083", 12, ["REQUISITO A INSPECCIONAR"]),
  "FOR-084": conNA("FOR-084", 12, ["REQUISITO A INSPECCIONAR"]),
  "FOR-085": sinNA("FOR-085", 12, ["REQUISITO A INSPECCIONAR"]),
  "FOR-100": conNA("FOR-100", 12, ["REQUISITO A INSPECCIONAR", "INSPECCIÓN DEL PERSONAL"]),
  "FOR-090": requisitos("FOR-090", 7, 1).map((t, i) => ({
    numero: String(i + 1),
    item: t,
    si: "",
    no: "",
    na: "",
    observaciones: "",
  })),
  "FOR-102": aspectos("FOR-102", 15),
  "FOR-103": aspectos("FOR-103", 16),
  "FOR-104": aspectos("FOR-104", 16),
  "FOR-094": itemsNumerados("FOR-094", 17),
  "FOR-093": requisitos("FOR-093", 31, 0, [], 40).map((t) => ({ aspecto: t, condicion: "" })),
  "FOR-095": matrizRes0312(),
  "FOR-116": sinNA("FOR-116", 12),
  "FOR-117": sinNA("FOR-117", 12),
  "FOR-118": sinNA("FOR-118", 12, ["REQUISITO A INSPECCIONAR"]),
  "FOR-119": sinNA("FOR-119", 11, ["REQUISITO A INSPECCIONAR"]),
  "FOR-122": sinNA("FOR-122", 12, ["REQUISITO A INSPECCIONAR"]),
  "FOR-124": sinNA("FOR-124", 12, ["REQUISITO A INSPECCIONAR"]),
  "FOR-127": itemsNumerados("FOR-127", 10),
  "FOR-128": itemsNumerados("FOR-128", 10),
  "FOR-126": conNA("FOR-126", 23, [
    "ELEMENTOS DE PROTECCION PERSONAL REQUERIDOS (TILDE LA CASILLA)",
    "OTROS, ESPECIFICAR",
  ], 49),
  "FOR-129": itemsConSeccion129(),
  "FOR-125": itemsConSeccion125(),
};

const conteo = Object.entries(data)
  .map(([c, rows]) => `${c}: ${rows.length}`)
  .join(", ");

const salida = `// Generado por scripts/generar-checklists.mjs desde docs/formatos-headers.json — no editar a mano.

export const checklistsIniciales = ${JSON.stringify(data, null, 2)} as Record<string, Record<string, string>[]>;
`;

fs.writeFileSync(OUT, salida);
console.log(`OK checklists → ${OUT} (${conteo})`);
