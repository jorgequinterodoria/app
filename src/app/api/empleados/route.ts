import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { empleados, proyectos, empresas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromCookie(Object.fromEntries(request.cookies));
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const proyectoId = searchParams.get("proyectoId");

  if (!proyectoId) {
    return NextResponse.json({ error: "proyectoId requerido" }, { status: 400 });
  }

  const proyecto = await db
    .select()
    .from(proyectos)
    .where(eq(proyectos.id, proyectoId))
    .limit(1);

  if (proyecto.length === 0) {
    return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
  }

  const empresa = await db
    .select()
    .from(empresas)
    .where(eq(empresas.id, proyecto[0].empresaId))
    .limit(1);

  if (empresa.length === 0 || empresa[0].userId !== userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const empleadosList = await db
    .select()
    .from(empleados)
    .where(eq(empleados.proyectoId, proyectoId));

  return NextResponse.json(empleadosList);
}
