import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { asistenciaQr, asistenciaRegistros, empleados } from "@/lib/db/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { getUserIdFromCookie } from "@/lib/auth";
import { FECHA_ISO_RE } from "@/lib/qr-fechas";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromCookie(
    Object.fromEntries(request.cookies)
  );

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const proyectoId = request.nextUrl.searchParams.get("proyectoId");
  const formatoTipo = request.nextUrl.searchParams.get("formatoTipo");
  const desde = request.nextUrl.searchParams.get("desde");
  const hasta = request.nextUrl.searchParams.get("hasta");

  if (
    !proyectoId ||
    !formatoTipo ||
    !desde ||
    !hasta ||
    !FECHA_ISO_RE.test(desde) ||
    !FECHA_ISO_RE.test(hasta)
  ) {
    return NextResponse.json(
      { error: "Parámetros inválidos: proyectoId, formatoTipo, desde, hasta (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  const registros = await db
    .select({
      empleadoId: asistenciaRegistros.empleadoId,
      nombre: empleados.nombre,
      identificacion: empleados.identificacion,
      fecha: asistenciaQr.fecha,
      sintomas: asistenciaRegistros.sintomas,
      novedad: asistenciaRegistros.novedad,
      fechaRegistro: asistenciaRegistros.fechaRegistro,
    })
    .from(asistenciaRegistros)
    .innerJoin(asistenciaQr, eq(asistenciaRegistros.qrId, asistenciaQr.id))
    .innerJoin(empleados, eq(asistenciaRegistros.empleadoId, empleados.id))
    .where(and(
      eq(asistenciaQr.proyectoId, proyectoId),
      eq(asistenciaQr.formatoTipo, formatoTipo),
      gte(asistenciaQr.fecha, desde),
      lte(asistenciaQr.fecha, hasta),
    ));

  return NextResponse.json(registros);
}
