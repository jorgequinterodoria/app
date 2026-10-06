import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

const publicPaths = ["/login", "/register"];

// Flujo de asistencia QR: empleados sin cuenta firman desde el celular.
// Solo son públicos el lookup por token (UUID) y el registro; generate sigue protegido.
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isPublicQrApi(pathname: string) {
  if (pathname === "/api/qr/register") return true;
  const match = pathname.match(/^\/api\/qr\/([^/]+)$/);
  return match !== null && UUID_RE.test(match[1]);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/qr") ||
    isPublicQrApi(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    publicPaths.includes(pathname)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const payload = await verifyToken(token);

  if (!payload) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 }
      );
    }
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("auth_token");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
