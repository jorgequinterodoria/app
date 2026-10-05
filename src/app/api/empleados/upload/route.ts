import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { empleados, proyectos, empresas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { parseEmployeeExcel } from "@/lib/excel-parser";

export async function POST(request: NextRequest) {
  const userId = await getUserIdFromCookie(Object.fromEntries(request.cookies));
  if (!userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const proyectoId = formData.get("proyectoId") as string | null;

  if (!file || !proyectoId) {
    return NextResponse.json({ error: "Archivo y proyectoId requeridos" }, { status: 400 });
  }

  const proyecto = await db
    .select()
    .from(proyectos)
    .where(eq(proyectos.id, proyectoId))
    .limit(1);

  if (proyecto.length === 0) {
    return NextResponse.json({ error: "Proyecto no encontrado" }, { status: 404 });
  }

  const empresa = await db
    .select()
    .from(empresas)
    .where(eq(empresas.id, proyecto[0].empresaId))
    .limit(1);

  if (empresa.length === 0 || empresa[0].userId !== userId) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const employeesData = parseEmployeeExcel(buffer);

  if (employeesData.length === 0) {
    return NextResponse.json({ error: "No se encontraron empleados en el archivo" }, { status: 400 });
  }

  await db.delete(empleados).where(eq(empleados.proyectoId, proyectoId));

  const newEmployees = await db
    .insert(empleados)
    .values(
      employeesData.map((emp) => ({
        proyectoId,
        nombre: emp.nombre,
        identificacion: emp.identificacion,
        cargo: emp.cargo,
        tipoVinculacion: emp.tipoVinculacion || "N/A",
        eps: emp.eps || null,
        arl: emp.arl || null,
        cajaCompensacion: emp.cajaCompensacion || null,
        fechaIngreso: emp.fechaIngreso && !isNaN(Date.parse(emp.fechaIngreso)) ? new Date(emp.fechaIngreso) : new Date(),
      }))
    )
    .returning();

  return NextResponse.json({
    count: newEmployees.length,
    employees: newEmployees,
  });
}
