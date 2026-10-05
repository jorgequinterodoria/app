import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { empresas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getUserIdFromCookie } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const userId = await getUserIdFromCookie(
    Object.fromEntries(request.cookies)
  );

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const userEmpresas = await db
    .select()
    .from(empresas)
    .where(eq(empresas.userId, userId));

  return NextResponse.json(userEmpresas);
}

export async function POST(request: NextRequest) {
  const userId = await getUserIdFromCookie(
    Object.fromEntries(request.cookies)
  );

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();

  const { nombre, nit, responsable, emailResponsable, logo } = body;

  if (!nombre || !nit || !responsable || !emailResponsable) {
    return NextResponse.json(
      { error: "Campos obligatorios faltantes" },
      { status: 400 }
    );
  }

  const [newEmpresa] = await db
    .insert(empresas)
    .values({
      userId,
      nombre,
      nit,
      responsable,
      emailResponsable,
      logo: logo || null,
    })
    .returning();

  return NextResponse.json(newEmpresa, { status: 201 });
}
