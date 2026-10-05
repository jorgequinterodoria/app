import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { proyectos, empresas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserIdFromCookie(Object.fromEntries(request.cookies));
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const proyecto = await db
    .select()
    .from(proyectos)
    .where(eq(proyectos.id, id))
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

  return NextResponse.json(proyecto[0]);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserIdFromCookie(Object.fromEntries(request.cookies));
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const proyecto = await db
    .select()
    .from(proyectos)
    .where(eq(proyectos.id, id))
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

  const body = await request.json();
  const {
    nombre,
    descripcion,
    contratante,
    ejecutor,
    contrato,
    tipoContrato,
    proyecto: proyectoField,
    alcance,
    fechaInicio,
    fechaFin,
    estado,
  } = body;

  const [updatedProyecto] = await db
    .update(proyectos)
    .set({
      nombre: nombre || proyecto[0].nombre,
      descripcion: descripcion !== undefined ? descripcion : proyecto[0].descripcion,
      contratante: contratante !== undefined ? contratante : proyecto[0].contratante,
      ejecutor: ejecutor !== undefined ? ejecutor : proyecto[0].ejecutor,
      contrato: contrato !== undefined ? contrato : proyecto[0].contrato,
      tipoContrato: tipoContrato !== undefined ? tipoContrato : proyecto[0].tipoContrato,
      proyecto: proyectoField !== undefined ? proyectoField : proyecto[0].proyecto,
      alcance: alcance !== undefined ? alcance : proyecto[0].alcance,
      fechaInicio: fechaInicio ? new Date(fechaInicio) : proyecto[0].fechaInicio,
      fechaFin: fechaFin ? new Date(fechaFin) : proyecto[0].fechaFin,
      estado: estado || proyecto[0].estado,
    })
    .where(eq(proyectos.id, id))
    .returning();

  return NextResponse.json(updatedProyecto);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserIdFromCookie(Object.fromEntries(request.cookies));
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const proyecto = await db
    .select()
    .from(proyectos)
    .where(eq(proyectos.id, id))
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

  await db.delete(proyectos).where(eq(proyectos.id, id));

  return NextResponse.json({ message: "Proyecto eliminado" });
}
