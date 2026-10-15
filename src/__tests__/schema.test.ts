import { describe, it, expect } from "vitest";
import {
  users,
  empresas,
  proyectos,
  empleados,
  formatos,
  asistenciaQr,
  asistenciaRegistros,
} from "@/lib/db/schema";

describe("Database Schema", () => {
  describe("users table", () => {
    it("should have all required columns", () => {
      const columns = Object.keys(users);
      expect(columns).toContain("id");
      expect(columns).toContain("email");
      expect(columns).toContain("password");
      expect(columns).toContain("nombre");
      expect(columns).toContain("role");
      expect(columns).toContain("createdAt");
    });
  });

  describe("empresas table", () => {
    it("should have all required columns", () => {
      const columns = Object.keys(empresas);
      expect(columns).toContain("id");
      expect(columns).toContain("userId");
      expect(columns).toContain("nombre");
      expect(columns).toContain("nit");
      expect(columns).toContain("responsable");
      expect(columns).toContain("emailResponsable");
      expect(columns).toContain("logo");
      expect(columns).toContain("createdAt");
    });
  });

  describe("proyectos table", () => {
    it("should have all required columns", () => {
      const columns = Object.keys(proyectos);
      expect(columns).toContain("id");
      expect(columns).toContain("empresaId");
      expect(columns).toContain("nombre");
      expect(columns).toContain("descripcion");
      expect(columns).toContain("contratante");
      expect(columns).toContain("ejecutor");
      expect(columns).toContain("contrato");
      expect(columns).toContain("tipoContrato");
      expect(columns).toContain("proyecto");
      expect(columns).toContain("alcance");
      expect(columns).toContain("fechaInicio");
      expect(columns).toContain("fechaFin");
      expect(columns).toContain("estado");
      expect(columns).toContain("createdAt");
    });
  });

  describe("empleados table", () => {
    it("should have all required columns", () => {
      const columns = Object.keys(empleados);
      expect(columns).toContain("id");
      expect(columns).toContain("proyectoId");
      expect(columns).toContain("nombre");
      expect(columns).toContain("identificacion");
      expect(columns).toContain("cargo");
      expect(columns).toContain("tipoVinculacion");
      expect(columns).toContain("eps");
      expect(columns).toContain("arl");
      expect(columns).toContain("cajaCompensacion");
      expect(columns).toContain("fechaIngreso");
    });
  });

  describe("formatos table", () => {
    it("should have all required columns", () => {
      const columns = Object.keys(formatos);
      expect(columns).toContain("id");
      expect(columns).toContain("proyectoId");
      expect(columns).toContain("tipo");
      expect(columns).toContain("codigo");
      expect(columns).toContain("datos");
      expect(columns).toContain("creadoBy");
      expect(columns).toContain("createdAt");
      expect(columns).toContain("updatedAt");
    });
  });

  describe("asistenciaQr table", () => {
    it("should have all required columns", () => {
      const columns = Object.keys(asistenciaQr);
      expect(columns).toContain("id");
      expect(columns).toContain("proyectoId");
      expect(columns).toContain("formatoTipo");
      expect(columns).toContain("fecha");
      expect(columns).toContain("token");
      expect(columns).toContain("expiresAt");
      expect(columns).toContain("activo");
      expect(columns).toContain("createdAt");
    });
  });

  describe("asistenciaRegistros table", () => {
    it("should have all required columns", () => {
      const columns = Object.keys(asistenciaRegistros);
      expect(columns).toContain("id");
      expect(columns).toContain("qrId");
      expect(columns).toContain("empleadoId");
      expect(columns).toContain("fechaRegistro");
      expect(columns).toContain("sintomas");
      expect(columns).toContain("novedad");
      expect(columns).toContain("ipAddress");
    });
  });

  describe("table relationships", () => {
    it("empresas should reference users", () => {
      expect(empresas.userId).toBeDefined();
    });

    it("proyectos should reference empresas", () => {
      expect(proyectos.empresaId).toBeDefined();
    });

    it("empleados should reference proyectos", () => {
      expect(empleados.proyectoId).toBeDefined();
    });

    it("formatos should reference proyectos and users", () => {
      expect(formatos.proyectoId).toBeDefined();
      expect(formatos.creadoBy).toBeDefined();
    });

    it("asistenciaQr should reference proyectos", () => {
      expect(asistenciaQr.proyectoId).toBeDefined();
    });

    it("asistenciaRegistros should reference asistenciaQr and empleados", () => {
      expect(asistenciaRegistros.qrId).toBeDefined();
      expect(asistenciaRegistros.empleadoId).toBeDefined();
    });
  });
});
