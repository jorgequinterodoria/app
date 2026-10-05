import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin, getUserIdFromCookie } from "@/lib/auth";

function parseCookies(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies: Record<string, { value: string }> = {};
  cookieHeader.split(";").forEach((c) => {
    const [key, ...val] = c.split("=");
    if (key) cookies[key.trim()] = { value: val.join("=").trim() };
  });
  return cookies;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookies = parseCookies(request);
    if (!(await isAdmin(cookies))) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const { id } = await params;
    const { nombre, email, role } = await request.json();

    if (!nombre || !email || !role) {
      return NextResponse.json(
        { error: "Nombre, email y rol son requeridos" },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(users)
      .set({ nombre, email, role })
      .where(eq(users.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const sanitized = Object.fromEntries(
      Object.entries(updated).filter(([key]) => key !== "password")
    ) as Omit<typeof updated, "password">;
    return NextResponse.json(sanitized);
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookies = parseCookies(request);
    if (!(await isAdmin(cookies))) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const { id } = await params;
    const currentUserId = await getUserIdFromCookie(cookies);

    if (currentUserId === id) {
      return NextResponse.json(
        { error: "No puedes eliminar tu propio usuario" },
        { status: 400 }
      );
    }

    const [deleted] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Usuario eliminado" });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
