import { relations } from "drizzle-orm/relations";
import { empresas, campanas, asistenciaQr, asistenciaRegistros, empleados, users, formatos } from "./schema";

export const campanasRelations = relations(campanas, ({one, many}) => ({
	empresa: one(empresas, {
		fields: [campanas.empresaId],
		references: [empresas.id]
	}),
	asistenciaQrs: many(asistenciaQr),
	empleados: many(empleados),
	formatos: many(formatos),
}));

export const empresasRelations = relations(empresas, ({one, many}) => ({
	campanas: many(campanas),
	user: one(users, {
		fields: [empresas.userId],
		references: [users.id]
	}),
}));

export const asistenciaQrRelations = relations(asistenciaQr, ({one, many}) => ({
	campana: one(campanas, {
		fields: [asistenciaQr.campanaId],
		references: [campanas.id]
	}),
	asistenciaRegistros: many(asistenciaRegistros),
}));

export const asistenciaRegistrosRelations = relations(asistenciaRegistros, ({one}) => ({
	asistenciaQr: one(asistenciaQr, {
		fields: [asistenciaRegistros.qrId],
		references: [asistenciaQr.id]
	}),
	empleado: one(empleados, {
		fields: [asistenciaRegistros.empleadoId],
		references: [empleados.id]
	}),
}));

export const empleadosRelations = relations(empleados, ({one, many}) => ({
	asistenciaRegistros: many(asistenciaRegistros),
	campana: one(campanas, {
		fields: [empleados.campanaId],
		references: [campanas.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	empresas: many(empresas),
	formatos: many(formatos),
}));

export const formatosRelations = relations(formatos, ({one}) => ({
	campana: one(campanas, {
		fields: [formatos.campanaId],
		references: [campanas.id]
	}),
	user: one(users, {
		fields: [formatos.creadoBy],
		references: [users.id]
	}),
}));