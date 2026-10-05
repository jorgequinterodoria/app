import "dotenv/config";
import { db } from "./index";
import { users } from "./schema";
import { hashPassword } from "../auth";
import { eq } from "drizzle-orm";

async function seed() {
  const adminEmail = "jquintedori@gmail.com";

  const existing = await db.select().from(users).where(eq(users.email, adminEmail)).limit(1);

  if (existing.length > 0) {
    console.log("Admin user already exists");
    return;
  }

  const hashedPassword = await hashPassword("FJ-3V&tzm");

  await db.insert(users).values({
    email: adminEmail,
    password: hashedPassword,
    nombre: "Jorge Quintero",
    role: "admin",
  });

  console.log("Admin user created successfully");
}

seed().catch(console.error);
