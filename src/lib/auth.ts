import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "test-secret-key-for-development-only";

async function getSecretKey() {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(JWT_SECRET.padEnd(32, "0"));
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  return cryptoKey;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function createToken(userId: string, role: string = "user") {
  const key = await getSecretKey();
  return new SignJWT({ userId, role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(key);
}

export async function verifyToken(token: string) {
  try {
    const key = await getSecretKey();
    const { payload } = await jwtVerify(token, key);
    return payload as { userId: string; role: string };
  } catch {
    return null;
  }
}

export async function getUserIdFromCookie(
  cookies: Record<string, { value: string }>
): Promise<string | null> {
  const token = cookies.auth_token?.value;
  if (!token) return null;
  const payload = await verifyToken(token);
  return payload?.userId ?? null;
}

export async function getUserFromCookie(
  cookies: Record<string, { value: string }>
): Promise<{ userId: string; role: string } | null> {
  const token = cookies.auth_token?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function isAdmin(
  cookies: Record<string, { value: string }>
): Promise<boolean> {
  const user = await getUserFromCookie(cookies);
  return user?.role === "admin";
}
