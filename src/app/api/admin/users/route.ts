import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
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

export async function GET(request: Request) {
  try {
    const cookies = parseCookies(request);
    if (!(await isAdmin(cookies))) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const allUsers = await db.select().from(users);
    const sanitized = allUsers.map((user) =>
      Object.fromEntries(
        Object.entries(user).filter(([key]) => key !== "password")
      ) as Omit<typeof user, "password">
    );
    return NextResponse.json(sanitized);
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookies = parseCookies(request);
    if (!(await isAdmin(cookies))) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const { email, password, nombre, role } = await request.json();

    if (!email || !password || !nombre) {
      return NextResponse.json(
        { error: "Email, contraseña y nombre son requeridos" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({ email, password: hashedPassword, nombre, role: role || "user" })
      .returning();

    const sanitized = Object.fromEntries(
      Object.entries(newUser).filter(([key]) => key !== "password")
    ) as Omit<typeof newUser, "password">;
    return NextResponse.json(sanitized, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
