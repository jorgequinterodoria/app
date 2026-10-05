import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { isAdmin, hashPassword } from "@/lib/auth";

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
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "La contraseña es requerida" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const [updated] = await db
      .update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Contraseña actualizada" });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
