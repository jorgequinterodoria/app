import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";

const TOKEN = "aa3eba4d-001f-4d00-a648-6e0638a7c906";

function req(path: string, method: "GET" | "POST" = "GET") {
  return new NextRequest(`https://mgasst.example${path}`, { method });
}

describe("proxy (middleware)", () => {
  describe("flujo público de asistencia por QR (empleados sin cuenta)", () => {
    it("permite GET /api/qr/<token> sin cookie de sesión", async () => {
      const res = await proxy(req(`/api/qr/${TOKEN}`));
      expect(res.status).toBe(200);
      expect(res.headers.get("location")).toBeNull();
    });

    it("permite POST /api/qr/register sin cookie de sesión", async () => {
      const res = await proxy(req("/api/qr/register", "POST"));
      expect(res.status).toBe(200);
      expect(res.headers.get("location")).toBeNull();
    });

    it("permite la página /qr/<token> sin cookie de sesión", async () => {
      const res = await proxy(req(`/qr/${TOKEN}`));
      expect(res.status).toBe(200);
      expect(res.headers.get("location")).toBeNull();
    });
  });

  describe("endpoints que deben seguir protegidos", () => {
    it("rechaza POST /api/qr/generate sin sesión (401)", async () => {
      const res = await proxy(req("/api/qr/generate", "POST"));
      expect(res.status).toBe(401);
      expect(await res.json()).toEqual({ error: "No autorizado" });
    });

    it("rechaza GET /api/qr/generate sin sesión (401)", async () => {
      const res = await proxy(req("/api/qr/generate"));
      expect(res.status).toBe(401);
    });

    it("rechaza GET /api/qr/registros sin sesión (401)", async () => {
      const res = await proxy(req("/api/qr/registros"));
      expect(res.status).toBe(401);
      expect(await res.json()).toEqual({ error: "No autorizado" });
    });

    it("redirige a /login las rutas de app sin sesión", async () => {
      const res = await proxy(req("/formatos"));
      expect(res.status).toBeGreaterThanOrEqual(300);
      expect(res.status).toBeLessThan(400);
      expect(res.headers.get("location")).toContain("/login");
    });
  });
});
