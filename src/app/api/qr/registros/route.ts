import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { asistenciaQr, asistenciaRegistros, empleados } from "@/lib/db/schema";
import { and, asc, eq, gte, lte } from "drizzle-orm";
import { getUserIdFromCookie } from "@/lib/auth";
import { esFechaValida } from "@/lib/qr-fechas";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

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

  if (!proyectoId || !formatoTipo || !desde || !hasta) {
    return NextResponse.json(
      { error: "Parámetros inválidos: proyectoId, formatoTipo, desde, hasta (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  if (!UUID_RE.test(proyectoId)) {
    return NextResponse.json(
      { error: "proyectoId inválido: se espera un UUID" },
      { status: 400 }
    );
  }

  if (!esFechaValida(desde) || !esFechaValida(hasta)) {
    return NextResponse.json(
      { error: "Fechas inválidas: desde y hasta deben ser fechas reales en formato YYYY-MM-DD" },
      { status: 400 }
    );
  }

  if (desde > hasta) {
    return NextResponse.json(
      { error: "desde debe ser anterior o igual a hasta" },
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
    ))
    .orderBy(asc(asistenciaQr.fecha), asc(empleados.nombre));

  return NextResponse.json(registros);
}
