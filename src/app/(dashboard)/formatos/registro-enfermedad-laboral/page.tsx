"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface FilaRegistro {
  id: string;
  numero: string;
  fechaDiagnosticoEps: string;
  fechaDiagnosticoArl: string;
  nombreTrabajador: string;
  identificacion: string;
  cargo: string;
  tipoVinculacion: string;
  ocupacionHabitual: string;
  tiempoOcupacion: string;
  jornada: string;
  antecedentesOcupacionales: string;
  diagnosticoEl: string;
  consecuencia: string;
  diasIncapacidad: string;
  diasPerdidos: string;
  diasRestricciones: string;
  diasTratamiento: string;
  rehabilitacion: "" | "SI" | "NO";
  costosDirectos: string;
  costosIndirectos: string;
  costosTotales: string;
}

function createEmptyRow(): FilaRegistro {
  return {
    id: crypto.randomUUID(),
    numero: "",
    fechaDiagnosticoEps: "",
    fechaDiagnosticoArl: "",
    nombreTrabajador: "",
    identificacion: "",
    cargo: "",
    tipoVinculacion: "",
    ocupacionHabitual: "",
    tiempoOcupacion: "",
    jornada: "",
    antecedentesOcupacionales: "",
    diagnosticoEl: "",
    consecuencia: "",
    diasIncapacidad: "",
    diasPerdidos: "",
    diasRestricciones: "",
    diasTratamiento: "",
    rehabilitacion: "",
    costosDirectos: "",
    costosIndirectos: "",
    costosTotales: "",
  };
}

function RegistroEnfermedadLaboralForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [filas, setFilas] = useState<FilaRegistro[]>([createEmptyRow()]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function updateRow(id: string, field: keyof FilaRegistro, value: string) {
    setFilas((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/formatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proyectoId: proyectoId,
          tipo: "Registro de Casos de Enfermedad Laboral",
          codigo: "FOR-024",
          datos: {
            registros: filas.map((fila) =>
              Object.fromEntries(
                Object.entries(fila).filter(([key]) => key !== "id")
              ) as Omit<typeof fila, "id">
            ),
          },
        }),
      });

      if (!res.ok) throw new Error("Error al guardar");
      setMessage({ type: "success", text: "Formato guardado exitosamente" });
    } catch {
      setMessage({ type: "error", text: "Error al guardar el formato" });
    } finally {
      setSaving(false);
    }
  }

  if (!proyectoId) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg px-4 py-3 text-sm">
        No se proporcionó un proyecto. Vuelva al listado y seleccione un proyecto.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registro de Casos de Enfermedad Laboral</h1>
          <p className="text-sm text-gray-500">FOR-024</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {message && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Registro de Enfermedad Laboral</h2>
          <button
            onClick={() => setFilas((prev) => [...prev, createEmptyRow()])}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1.5 rounded-lg text-xs transition-colors"
          >
            + Agregar fila
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">N°</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Fecha diagnóstico EPS</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Fecha diagnóstico ARL</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Nombre trabajador</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Identificación</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Cargo</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Tipo vinculación</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Ocupación habitual</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Tiempo ocupación</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Jornada</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Antecedentes ocupacionales</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Diagnóstico EL</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Consecuencia</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Días incapacidad</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Días perdidos</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Días restricciones</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Días tratamiento</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Rehabilitación</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Costos directos</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Costos indirectos</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-gray-200">Costos totales</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((fila) => (
                <tr key={fila.id} className="hover:bg-gray-50">
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.numero} onChange={(e) => updateRow(fila.id, "numero", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input type="date" value={fila.fechaDiagnosticoEps} onChange={(e) => updateRow(fila.id, "fechaDiagnosticoEps", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input type="date" value={fila.fechaDiagnosticoArl} onChange={(e) => updateRow(fila.id, "fechaDiagnosticoArl", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.nombreTrabajador} onChange={(e) => updateRow(fila.id, "nombreTrabajador", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.identificacion} onChange={(e) => updateRow(fila.id, "identificacion", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.cargo} onChange={(e) => updateRow(fila.id, "cargo", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.tipoVinculacion} onChange={(e) => updateRow(fila.id, "tipoVinculacion", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.ocupacionHabitual} onChange={(e) => updateRow(fila.id, "ocupacionHabitual", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.tiempoOcupacion} onChange={(e) => updateRow(fila.id, "tiempoOcupacion", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.jornada} onChange={(e) => updateRow(fila.id, "jornada", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.antecedentesOcupacionales} onChange={(e) => updateRow(fila.id, "antecedentesOcupacionales", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.diagnosticoEl} onChange={(e) => updateRow(fila.id, "diagnosticoEl", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.consecuencia} onChange={(e) => updateRow(fila.id, "consecuencia", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input type="number" value={fila.diasIncapacidad} onChange={(e) => updateRow(fila.id, "diasIncapacidad", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input type="number" value={fila.diasPerdidos} onChange={(e) => updateRow(fila.id, "diasPerdidos", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input type="number" value={fila.diasRestricciones} onChange={(e) => updateRow(fila.id, "diasRestricciones", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input type="number" value={fila.diasTratamiento} onChange={(e) => updateRow(fila.id, "diasTratamiento", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <select value={fila.rehabilitacion} onChange={(e) => updateRow(fila.id, "rehabilitacion", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500">
                      <option value="">-</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                    </select>
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input type="number" step="0.01" value={fila.costosDirectos} onChange={(e) => updateRow(fila.id, "costosDirectos", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input type="number" step="0.01" value={fila.costosIndirectos} onChange={(e) => updateRow(fila.id, "costosIndirectos", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                  <td className="px-1 py-1 border-b border-gray-200">
                    <input type="number" step="0.01" value={fila.costosTotales} onChange={(e) => updateRow(fila.id, "costosTotales", e.target.value)} className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function RegistroEnfermedadLaboralPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <RegistroEnfermedadLaboralForm />
    </Suspense>
  );
}
