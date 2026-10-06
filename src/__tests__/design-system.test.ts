import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const css = readFileSync(resolve(__dirname, "../app/globals.css"), "utf8");

describe("sistema de diseño (globals.css)", () => {
  it("define los tokens de color primario", () => {
    expect(css).toContain("--color-primary: #2563eb");
    expect(css).toContain("--color-primary-hover: #1d4ed8");
    expect(css).toContain("--color-primary-active: #1e40af");
    expect(css).toContain("--color-primary-subtle: #eff6ff");
  });

  it("fuerza tema claro y tipografía Geist en el body", () => {
    expect(css).toContain("color-scheme: light");
    expect(css).toContain("var(--font-geist-sans)");
    expect(css).not.toContain("prefers-color-scheme: dark");
    expect(css).toMatch(/font-family:\s*var\(--font-geist-sans\)/);
  });

  it("define las clases compartidas del sistema", () => {
    for (const cls of [
      ".card", ".btn", ".btn-primary", ".btn-secondary", ".btn-danger",
      ".btn-danger-outline", ".input", ".label", ".link", ".badge", ".table-base",
    ]) {
      expect(css, `falta la clase ${cls}`).toContain(cls);
    }
  });

  it("los archivos usan btn-* solo junto a btn base", () => {
    const files = execSync('find src -name "*.tsx"', { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
    for (const file of files) {
      const content = readFileSync(file, "utf8");
      if (/btn-(primary|secondary|danger)/.test(content)) {
        expect(
          /(^|[\s"`])btn([\s"`])/.test(content),
          `${file} usa btn-* pero no incluye la clase base "btn"`
        ).toBe(true);
      }
    }
  });
});
