import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { asistenciaQr, empleados, proyectos } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

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

  const [proyecto] = await db
    .select()
    .from(proyectos)
    .where(eq(proyectos.id, qr.proyectoId))
    .limit(1);

  const empleadosList = await db
    .select()
    .from(empleados)
    .where(eq(empleados.proyectoId, qr.proyectoId));

  return NextResponse.json({
    qr,
    proyecto,
    empleados: empleadosList,
  });
}
