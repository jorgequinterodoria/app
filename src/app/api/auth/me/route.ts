import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getUserFromCookie } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie") || "";
    const cookies: Record<string, { value: string }> = {};
    cookieHeader.split(";").forEach((c) => {
      const [key, ...val] = c.split("=");
      if (key) cookies[key.trim()] = { value: val.join("=").trim() };
    });

    const payload = await getUserFromCookie(cookies);
    if (!payload) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.userId))
      .limit(1);

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      user: { id: user.id, email: user.email, nombre: user.nombre, role: user.role },
    });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
