import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { asistenciaQr, asistenciaRegistros } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token, empleadoId, sintomas, novedad } = body;

  if (!token || !empleadoId) {
    return NextResponse.json(
      { error: "Campos obligatorios faltantes" },
      { status: 400 }
    );
  }

  const [qr] = await db
    .select()
    .from(asistenciaQr)
    .where(eq(asistenciaQr.token, token))
    .limit(1);

  if (!qr) {
    return NextResponse.json(
      { error: "QR no encontrado" },
      { status: 404 }
    );
  }

  if (!qr.activo) {
    return NextResponse.json(
      { error: "QR inactivo" },
      { status: 410 }
    );
  }

  if (new Date(qr.expiresAt) < new Date()) {
    return NextResponse.json(
      { error: "QR expirado" },
      { status: 410 }
    );
  }

  const [registro] = await db
    .insert(asistenciaRegistros)
    .values({
      qrId: qr.id,
      empleadoId,
      sintomas: sintomas || null,
      novedad: novedad || null,
      ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || null,
    })
    .returning();

  return NextResponse.json({ success: true, registro }, { status: 201 });
}
