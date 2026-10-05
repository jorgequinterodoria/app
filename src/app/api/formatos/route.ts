import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { formatos } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { getUserIdFromCookie } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromCookie(
    Object.fromEntries(request.cookies)
  );

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const proyectoId = request.nextUrl.searchParams.get("proyectoId");
  const codigo = request.nextUrl.searchParams.get("codigo");

  let result;
  if (proyectoId && codigo) {
    result = await db
      .select()
      .from(formatos)
      .where(and(eq(formatos.proyectoId, proyectoId), eq(formatos.codigo, codigo)));
  } else if (proyectoId) {
    result = await db
      .select()
      .from(formatos)
      .where(eq(formatos.proyectoId, proyectoId));
  } else {
    result = await db.select().from(formatos);
  }

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const userId = await getUserIdFromCookie(
    Object.fromEntries(request.cookies)
  );

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  const { proyectoId, tipo, codigo, datos } = body;

  if (!proyectoId || !tipo || !codigo) {
    return NextResponse.json(
      { error: "Campos obligatorios faltantes" },
      { status: 400 }
    );
  }

  const [formato] = await db
    .insert(formatos)
    .values({
      proyectoId,
      tipo,
      codigo,
      datos: datos || null,
      creadoBy: userId,
    })
    .returning();

  return NextResponse.json(formato, { status: 201 });
}
