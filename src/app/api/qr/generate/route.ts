import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { asistenciaQr } from "@/lib/db/schema";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { proyectoId, formatoTipo, durationHours } = body;

  if (!proyectoId || !formatoTipo || !durationHours) {
    return NextResponse.json(
      { error: "Campos obligatorios faltantes" },
      { status: 400 }
    );
  }

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000);

  const [qr] = await db
    .insert(asistenciaQr)
    .values({
      proyectoId,
      formatoTipo,
      token,
      expiresAt,
      activo: true,
    })
    .returning();

  return NextResponse.json({
    qrUrl: `/qr/${token}`,
    token: qr.token,
    expiresAt: qr.expiresAt,
    id: qr.id,
  }, { status: 201 });
}
