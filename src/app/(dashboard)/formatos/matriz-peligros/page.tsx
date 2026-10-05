"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface PeligroRow {
  id: number;
  proceso: string;
  actividad: string;
  peligro: string;
  consecuencia: string;
  personasExpuestas: string;
  fuentePeligro: string;
  controlesExistentes: string;
  probabilidad: string;
  severidad: string;
  nivelRiesgo: string;
  medidasTratamiento: string;
  responsable: string;
  recursos: string;
  plazo: string;
}

const emptyRow: Omit<PeligroRow, "id"> = {
  proceso: "",
  actividad: "",
  peligro: "",
  consecuencia: "",
  personasExpuestas: "",
  fuentePeligro: "",
  controlesExistentes: "",
  probabilidad: "",
  severidad: "",
  nivelRiesgo: "",
  medidasTratamiento: "",
  responsable: "",
  recursos: "",
  plazo: "",
};

let nextId = 1;

function MatrizPeligrosForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [rows, setRows] = useState<PeligroRow[]>([
    { ...emptyRow, id: nextId++ },
  ]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function updateRow(id: number, field: keyof PeligroRow, value: string) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }

  function addRow() {
    setRows((prev) => [...prev, { ...emptyRow, id: nextId++ }]);
  }

  function removeRow(id: number) {
    setRows((prev) => (prev.length === 1 ? prev : prev.filter((r) => r.id !== id)));
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
          tipo: "Matriz de Identificación de Peligros",
          codigo: "FOR-052",
          datos: { filas: rows },
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
    <div className="space-y-4 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Matriz de Identificación de Peligros</h1>
          <p className="text-sm text-gray-500">FOR-052</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addRow}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            + Fila
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
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

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-50">
              {[
                "Proceso",
                "Actividad",
                "Peligro",
                "Consecuencia",
                "Personas Expuestas",
                "Fuente Peligro",
                "Controles Existentes",
                "Probabilidad",
                "Severidad",
                "Nivel Riesgo",
                "Medidas Tratamiento",
                "Responsable",
                "Recursos",
                "Plazo",
              ].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200 min-w-[150px]"
                >
                  {h}
                </th>
              ))}
              <th className="px-3 py-2 border-b border-gray-200 min-w-[50px]" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {(
                  [
                    "proceso",
                    "actividad",
                    "peligro",
                    "consecuencia",
                    "personasExpuestas",
                    "fuentePeligro",
                    "controlesExistentes",
                    "probabilidad",
                    "severidad",
                    "nivelRiesgo",
                    "medidasTratamiento",
                    "responsable",
                    "recursos",
                    "plazo",
                  ] as const
                ).map((field) => (
                  <td key={field} className="px-2 py-1 border-b border-r border-gray-200">
                    <input
                      type="text"
                      value={row[field]}
                      onChange={(e) => updateRow(row.id, field, e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                ))}
                <td className="px-2 py-1 border-b border-gray-200">
                  {rows.length > 1 && (
                    <button
                      onClick={() => removeRow(row.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-bold"
                    >
                      ×
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function MatrizPeligrosPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <MatrizPeligrosForm />
    </Suspense>
  );
}
