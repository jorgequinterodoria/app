import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { proyectos, empresas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromCookie(Object.fromEntries(request.cookies));
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const empresaId = searchParams.get("empresaId");

  if (!empresaId) {
    return NextResponse.json({ error: "empresaId requerido" }, { status: 400 });
  }

  const empresa = await db
    .select()
    .from(empresas)
    .where(eq(empresas.id, empresaId))
    .limit(1);

  if (empresa.length === 0 || empresa[0].userId !== userId) {
    return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 });
  }

  const proyectosList = await db
    .select()
    .from(proyectos)
    .where(eq(proyectos.empresaId, empresaId));

  return NextResponse.json(proyectosList);
}

export async function POST(request: NextRequest) {
  const userId = await getUserIdFromCookie(Object.fromEntries(request.cookies));
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const {
    empresaId,
    nombre,
    descripcion,
    contratante,
    ejecutor,
    contrato,
    tipoContrato,
    proyecto,
    alcance,
    fechaInicio,
    fechaFin,
  } = body;

  if (!empresaId || !nombre || !fechaInicio || !fechaFin) {
    return NextResponse.json({ error: "Campos obligatorios faltantes" }, { status: 400 });
  }

  const empresa = await db
    .select()
    .from(empresas)
    .where(eq(empresas.id, empresaId))
    .limit(1);

  if (empresa.length === 0 || empresa[0].userId !== userId) {
    return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 });
  }

  const [newProyecto] = await db
    .insert(proyectos)
    .values({
      empresaId,
      nombre,
      descripcion: descripcion || null,
      contratante: contratante || null,
      ejecutor: ejecutor || null,
      contrato: contrato || null,
      tipoContrato: tipoContrato || null,
      proyecto: proyecto || null,
      alcance: alcance || null,
      fechaInicio: new Date(fechaInicio),
      fechaFin: new Date(fechaFin),
    })
    .returning();

  return NextResponse.json(newProyecto, { status: 201 });
}
