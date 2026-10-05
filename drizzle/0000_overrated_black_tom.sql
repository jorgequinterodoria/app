-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "campanas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"empresa_id" uuid NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"descripcion" text,
	"fecha_inicio" timestamp NOT NULL,
	"fecha_fin" timestamp NOT NULL,
	"estado" varchar(50) DEFAULT 'activa' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "asistencia_qr" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campana_id" uuid NOT NULL,
	"formato_tipo" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"activo" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "asistencia_qr_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "asistencia_registros" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"qr_id" uuid NOT NULL,
	"empleado_id" uuid NOT NULL,
	"fecha_registro" timestamp DEFAULT now() NOT NULL,
	"sintomas" varchar(255),
	"novedad" varchar(255),
	"ip_address" varchar(45)
);
--> statement-breakpoint
CREATE TABLE "empleados" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campana_id" uuid NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"identificacion" varchar(50) NOT NULL,
	"cargo" varchar(255) NOT NULL,
	"tipo_vinculacion" varchar(255) NOT NULL,
	"eps" varchar(255),
	"arl" varchar(255),
	"caja_compensacion" varchar(255),
	"fecha_ingreso" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "empresas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"contratante" varchar(255) NOT NULL,
	"ejecutor" varchar(255) NOT NULL,
	"contrato" varchar(255) NOT NULL,
	"tipo_contrato" varchar(255) NOT NULL,
	"proyecto" text,
	"alcance" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"nombre" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "formatos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"campana_id" uuid NOT NULL,
	"tipo" varchar(255) NOT NULL,
	"codigo" varchar(255) NOT NULL,
	"datos" jsonb,
	"creado_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "campanas" ADD CONSTRAINT "campanas_empresa_id_empresas_id_fk" FOREIGN KEY ("empresa_id") REFERENCES "public"."empresas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "asistencia_qr" ADD CONSTRAINT "asistencia_qr_campana_id_campanas_id_fk" FOREIGN KEY ("campana_id") REFERENCES "public"."campanas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "asistencia_registros" ADD CONSTRAINT "asistencia_registros_qr_id_asistencia_qr_id_fk" FOREIGN KEY ("qr_id") REFERENCES "public"."asistencia_qr"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "asistencia_registros" ADD CONSTRAINT "asistencia_registros_empleado_id_empleados_id_fk" FOREIGN KEY ("empleado_id") REFERENCES "public"."empleados"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "empleados" ADD CONSTRAINT "empleados_campana_id_campanas_id_fk" FOREIGN KEY ("campana_id") REFERENCES "public"."campanas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "empresas" ADD CONSTRAINT "empresas_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formatos" ADD CONSTRAINT "formatos_campana_id_campanas_id_fk" FOREIGN KEY ("campana_id") REFERENCES "public"."campanas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "formatos" ADD CONSTRAINT "formatos_creado_by_users_id_fk" FOREIGN KEY ("creado_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
*/