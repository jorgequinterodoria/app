import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { empresas } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { getUserIdFromCookie } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserIdFromCookie(
    Object.fromEntries(request.cookies)
  );

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const [empresa] = await db
    .select()
    .from(empresas)
    .where(and(eq(empresas.id, id), eq(empresas.userId, userId)));

  if (!empresa) {
    return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 });
  }

  return NextResponse.json(empresa);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserIdFromCookie(
    Object.fromEntries(request.cookies)
  );

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const [updated] = await db
    .update(empresas)
    .set(body)
    .where(and(eq(empresas.id, id), eq(empresas.userId, userId)))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserIdFromCookie(
    Object.fromEntries(request.cookies)
  );

  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const [deleted] = await db
    .delete(empresas)
    .where(and(eq(empresas.id, id), eq(empresas.userId, userId)))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Empresa no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
