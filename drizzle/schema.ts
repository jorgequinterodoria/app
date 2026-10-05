import { pgTable, foreignKey, uuid, varchar, text, timestamp, unique, boolean, jsonb } from "drizzle-orm/pg-core"

export const campanas = pgTable("campanas", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	empresaId: uuid("empresa_id").notNull(),
	nombre: varchar({ length: 255 }).notNull(),
	descripcion: text(),
	fechaInicio: timestamp("fecha_inicio", { mode: 'string' }).notNull(),
	fechaFin: timestamp("fecha_fin", { mode: 'string' }).notNull(),
	estado: varchar({ length: 50 }).default('activa').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.empresaId],
			foreignColumns: [empresas.id],
			name: "campanas_empresa_id_empresas_id_fk"
		}),
]);

export const asistenciaQr = pgTable("asistencia_qr", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	campanaId: uuid("campana_id").notNull(),
	formatoTipo: varchar("formato_tipo", { length: 255 }).notNull(),
	token: varchar({ length: 255 }).notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	activo: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.campanaId],
			foreignColumns: [campanas.id],
			name: "asistencia_qr_campana_id_campanas_id_fk"
		}),
	unique("asistencia_qr_token_unique").on(table.token),
]);

export const asistenciaRegistros = pgTable("asistencia_registros", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	qrId: uuid("qr_id").notNull(),
	empleadoId: uuid("empleado_id").notNull(),
	fechaRegistro: timestamp("fecha_registro", { mode: 'string' }).defaultNow().notNull(),
	sintomas: varchar({ length: 255 }),
	novedad: varchar({ length: 255 }),
	ipAddress: varchar("ip_address", { length: 45 }),
}, (table) => [
	foreignKey({
			columns: [table.qrId],
			foreignColumns: [asistenciaQr.id],
			name: "asistencia_registros_qr_id_asistencia_qr_id_fk"
		}),
	foreignKey({
			columns: [table.empleadoId],
			foreignColumns: [empleados.id],
			name: "asistencia_registros_empleado_id_empleados_id_fk"
		}),
]);

export const empleados = pgTable("empleados", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	campanaId: uuid("campana_id").notNull(),
	nombre: varchar({ length: 255 }).notNull(),
	identificacion: varchar({ length: 50 }).notNull(),
	cargo: varchar({ length: 255 }).notNull(),
	tipoVinculacion: varchar("tipo_vinculacion", { length: 255 }).notNull(),
	eps: varchar({ length: 255 }),
	arl: varchar({ length: 255 }),
	cajaCompensacion: varchar("caja_compensacion", { length: 255 }),
	fechaIngreso: timestamp("fecha_ingreso", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.campanaId],
			foreignColumns: [campanas.id],
			name: "empleados_campana_id_campanas_id_fk"
		}),
]);

export const empresas = pgTable("empresas", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	nombre: varchar({ length: 255 }).notNull(),
	contratante: varchar({ length: 255 }).notNull(),
	ejecutor: varchar({ length: 255 }).notNull(),
	contrato: varchar({ length: 255 }).notNull(),
	tipoContrato: varchar("tipo_contrato", { length: 255 }).notNull(),
	proyecto: text(),
	alcance: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "empresas_user_id_users_id_fk"
		}),
]);

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	email: varchar({ length: 255 }).notNull(),
	password: text().notNull(),
	nombre: varchar({ length: 255 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const formatos = pgTable("formatos", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	campanaId: uuid("campana_id").notNull(),
	tipo: varchar({ length: 255 }).notNull(),
	codigo: varchar({ length: 255 }).notNull(),
	datos: jsonb(),
	creadoBy: uuid("creado_by").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.campanaId],
			foreignColumns: [campanas.id],
			name: "formatos_campana_id_campanas_id_fk"
		}),
	foreignKey({
			columns: [table.creadoBy],
			foreignColumns: [users.id],
			name: "formatos_creado_by_users_id_fk"
		}),
]);
