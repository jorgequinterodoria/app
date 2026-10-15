import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb, date, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: text("password").notNull(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const empresas = pgTable("empresas", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  nit: varchar("nit", { length: 50 }).notNull(),
  responsable: varchar("responsable", { length: 255 }).notNull(),
  emailResponsable: varchar("email_responsable", { length: 255 }).notNull(),
  logo: text("logo"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const proyectos = pgTable("proyectos", {
  id: uuid("id").primaryKey().defaultRandom(),
  empresaId: uuid("empresa_id")
    .references(() => empresas.id)
    .notNull(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  descripcion: text("descripcion"),
  contratante: varchar("contratante", { length: 255 }),
  ejecutor: varchar("ejecutor", { length: 255 }),
  contrato: varchar("contrato", { length: 255 }),
  tipoContrato: varchar("tipo_contrato", { length: 255 }),
  proyecto: text("proyecto"),
  alcance: text("alcance"),
  fechaInicio: timestamp("fecha_inicio"),
  fechaFin: timestamp("fecha_fin"),
  estado: varchar("estado", { length: 50 }).default("activa").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const empleados = pgTable("empleados", {
  id: uuid("id").primaryKey().defaultRandom(),
  proyectoId: uuid("proyecto_id")
    .references(() => proyectos.id)
    .notNull(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  identificacion: varchar("identificacion", { length: 100 }).notNull(),
  cargo: varchar("cargo", { length: 255 }).notNull(),
  tipoVinculacion: varchar("tipo_vinculacion", { length: 255 }).notNull(),
  eps: varchar("eps", { length: 255 }),
  arl: varchar("arl", { length: 255 }),
  cajaCompensacion: varchar("caja_compensacion", { length: 255 }),
  fechaIngreso: timestamp("fecha_ingreso").notNull(),
});

export const formatos = pgTable("formatos", {
  id: uuid("id").primaryKey().defaultRandom(),
  proyectoId: uuid("proyecto_id")
    .references(() => proyectos.id)
    .notNull(),
  tipo: varchar("tipo", { length: 255 }).notNull(),
  codigo: varchar("codigo", { length: 255 }).notNull(),
  datos: jsonb("datos"),
  creadoBy: uuid("creado_by")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const asistenciaQr = pgTable("asistencia_qr", {
  id: uuid("id").primaryKey().defaultRandom(),
  proyectoId: uuid("proyecto_id")
    .references(() => proyectos.id)
    .notNull(),
  formatoTipo: varchar("formato_tipo", { length: 255 }).notNull(),
  fecha: date("fecha"),
  token: varchar("token", { length: 255 }).unique().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  activo: boolean("activo").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  proyectoFormatoFechaIdx: uniqueIndex("asistencia_qr_proyecto_formato_fecha_idx")
    .on(table.proyectoId, table.formatoTipo, table.fecha),
}));

export const asistenciaRegistros = pgTable("asistencia_registros", {
  id: uuid("id").primaryKey().defaultRandom(),
  qrId: uuid("qr_id")
    .references(() => asistenciaQr.id)
    .notNull(),
  empleadoId: uuid("empleado_id")
    .references(() => empleados.id)
    .notNull(),
  fechaRegistro: timestamp("fecha_registro").defaultNow().notNull(),
  sintomas: varchar("sintomas", { length: 255 }),
  novedad: varchar("novedad", { length: 255 }),
  ipAddress: varchar("ip_address", { length: 45 }),
}, (table) => ({
  qrEmpleadoIdx: uniqueIndex("asistencia_registros_qr_empleado_idx")
    .on(table.qrId, table.empleadoId),
}));
