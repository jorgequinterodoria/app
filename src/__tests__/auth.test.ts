import { describe, it, expect, beforeAll } from "vitest";
import {
  hashPassword,
  verifyPassword,
  createToken,
  verifyToken,
} from "@/lib/auth";

describe("Auth utilities", () => {
  const testPassword = "TestPassword123!";
  let hashedPassword: string;

  beforeAll(async () => {
    hashedPassword = await hashPassword(testPassword);
  });

  describe("hashPassword", () => {
    it("should hash a password", async () => {
      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(testPassword);
      expect(hashedPassword.length).toBeGreaterThan(0);
    });

    it("should produce different hashes for same password", async () => {
      const hash2 = await hashPassword(testPassword);
      expect(hash2).not.toBe(hashedPassword);
    });
  });

  describe("verifyPassword", () => {
    it("should return true for correct password", async () => {
      const result = await verifyPassword(testPassword, hashedPassword);
      expect(result).toBe(true);
    });

    it("should return false for incorrect password", async () => {
      const result = await verifyPassword("WrongPassword", hashedPassword);
      expect(result).toBe(false);
    });
  });

  describe("createToken and verifyToken", () => {
    it("should create and verify a token with custom role", async () => {
      const token = await createToken("user-123", "admin");
      expect(token).toBeDefined();
      expect(typeof token).toBe("string");

      const payload = await verifyToken(token);
      expect(payload).toBeDefined();
      expect(payload?.userId).toBe("user-123");
      expect(payload?.role).toBe("admin");
    });

    it("should create and verify a token with default role", async () => {
      const token = await createToken("user-456");
      const payload = await verifyToken(token);
      expect(payload?.userId).toBe("user-456");
      expect(payload?.role).toBe("user");
    });

    it("should return null for invalid token", async () => {
      const payload = await verifyToken("invalid.token.here");
      expect(payload).toBeNull();
    });

    it("should return null for empty string", async () => {
      const payload = await verifyToken("");
      expect(payload).toBeNull();
    });
  });
});
