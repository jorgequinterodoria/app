import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { registro, agrupaPorGrupo, buscaFormatos } from "@/lib/formatos/registro";

const esperados = Array.from({ length: 133 }, (_, i) => `FOR-${String(i + 1).padStart(3, "0")}`);

describe("registro de formatos", () => {
  it("contiene los 133 códigos exactamente una vez", () => {
    const codigos = registro.map((e) => e.codigo);
    expect(codigos.sort()).toEqual([...esperados].sort());
    expect(new Set(codigos).size).toBe(133);
  });

  it("cada entrada tiene href o config (nunca ambas, nunca ninguna)", () => {
    for (const e of registro) {
      expect(Boolean(e.href) !== Boolean(e.config), `${e.codigo} debe tener exactamente uno`).toBe(true);
      if (e.config) expect(e.config.codigo).toBe(e.codigo);
      if (e.config) expect(e.config.secciones.length).toBeGreaterThan(0);
      expect(e.nombre.length).toBeGreaterThan(3);
      expect(e.grupo.length).toBeGreaterThan(0);
    }
  });

  it("los href estáticos apuntan a páginas que existen", () => {
    const dirFormatos = path.join(process.cwd(), "src/app/(dashboard)/formatos");
    for (const e of registro) {
      if (!e.href) continue;
      const ruta = e.href.replace("{proyectoId}", "x");
      if (!ruta.startsWith("/formatos/")) continue;
      const rel = ruta.replace("/formatos/", "");
      expect(fs.existsSync(path.join(dirFormatos, rel, "page.tsx")), `${e.codigo} → ${ruta}`).toBe(true);
    }
  });

  it("las 22 páginas artesanales existentes están registradas con href", () => {
    const conHref = registro.filter((e) => e.href?.startsWith("/formatos/")).map((e) => e.codigo);
    const canonicas = [
      "FOR-006", "FOR-008", "FOR-009", "FOR-010", "FOR-022", "FOR-023", "FOR-024", "FOR-025",
      "FOR-026", "FOR-032", "FOR-052", "FOR-055", "FOR-056", "FOR-057", "FOR-062", "FOR-064",
      "FOR-066", "FOR-067", "FOR-069", "FOR-080", "FOR-086", "FOR-107",
    ];
    expect([...conHref].sort()).toEqual([...canonicas].sort());
  });

  it("FOR-003 enlaza al upload de empleados", () => {
    const for3 = registro.find((e) => e.codigo === "FOR-003");
    expect(for3?.href).toBe("/proyectos/{proyectoId}/empleados");
  });
});

describe("índice de formatos", () => {
  it("incluye FOR-066, FOR-067 y FOR-052 (antes sin enlace)", () => {
    for (const c of ["FOR-066", "FOR-067", "FOR-052"]) {
      expect(registro.find((e) => e.codigo === c)?.href).toBeTruthy();
    }
  });

  it("agrupa sin perder entradas", () => {
    const grupos = agrupaPorGrupo(registro);
    expect(grupos.reduce((n, g) => n + g.entradas.length, 0)).toBe(133);
  });

  it("búsqueda por código y por nombre", () => {
    expect(buscaFormatos(registro, "for-021").map((e) => e.codigo)).toContain("FOR-021");
    expect(buscaFormatos(registro, "extintores").map((e) => e.codigo)).toContain("FOR-066");
    expect(buscaFormatos(registro, "zzz-no-existe")).toHaveLength(0);
  });
});
