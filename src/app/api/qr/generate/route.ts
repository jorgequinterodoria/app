import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { asistenciaQr } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import crypto from "crypto";
import { esFechaPasada, finDeDiaColombia } from "@/lib/qr-fechas";

const FECHA_ISO_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { proyectoId, formatoTipo, fecha } = body;

  if (!proyectoId || !formatoTipo || !fecha) {
    return NextResponse.json(
      { error: "Campos obligatorios faltantes (proyectoId, formatoTipo, fecha)" },
      { status: 400 }
    );
  }

  if (!FECHA_ISO_RE.test(fecha)) {
    return NextResponse.json(
      { error: "Fecha inválida; use el formato YYYY-MM-DD" },
      { status: 400 }
    );
  }

  if (esFechaPasada(fecha)) {
    return NextResponse.json(
      { error: "No se puede generar un QR para una fecha pasada" },
      { status: 400 }
    );
  }

  const [existente] = await db
    .select()
    .from(asistenciaQr)
    .where(and(
      eq(asistenciaQr.proyectoId, proyectoId),
      eq(asistenciaQr.formatoTipo, formatoTipo),
      eq(asistenciaQr.fecha, fecha),
      eq(asistenciaQr.activo, true),
    ))
    .limit(1);

  if (existente) {
    return NextResponse.json({
      qrUrl: `/qr/${existente.token}`,
      token: existente.token,
      expiresAt: existente.expiresAt,
      id: existente.id,
      fecha: existente.fecha,
      alreadyExisted: true,
    });
  }

  const token = crypto.randomUUID();
  const expiresAt = finDeDiaColombia(fecha);

  const [qr] = await db
    .insert(asistenciaQr)
    .values({
      proyectoId,
      formatoTipo,
      fecha,
      token,
      expiresAt,
      activo: true,
    })
    .onConflictDoNothing()
    .returning();

  if (!qr) {
    // Carrera: otro request creó el QR para ese día primero — devolver el existente.
    const [reintentado] = await db
      .select()
      .from(asistenciaQr)
      .where(and(
        eq(asistenciaQr.proyectoId, proyectoId),
        eq(asistenciaQr.formatoTipo, formatoTipo),
        eq(asistenciaQr.fecha, fecha),
      ))
      .limit(1);
    return NextResponse.json({
      qrUrl: `/qr/${reintentado.token}`,
      token: reintentado.token,
      expiresAt: reintentado.expiresAt,
      id: reintentado.id,
      fecha: reintentado.fecha,
      alreadyExisted: true,
    });
  }

  return NextResponse.json({
    qrUrl: `/qr/${qr.token}`,
    token: qr.token,
    expiresAt: qr.expiresAt,
    id: qr.id,
    fecha: qr.fecha,
    alreadyExisted: false,
  }, { status: 201 });
}
