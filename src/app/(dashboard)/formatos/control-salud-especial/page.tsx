"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface FilaParte1 {
  id: string;
  nombre: string;
  identificacion: string;
  cargo: string;
  area: string;
  arl: string;
  eps: string;
  afp: string;
  diagnostico: string;
  criterioCalificacion: string;
}

interface FilaParte2 {
  id: string;
  nombre: string;
  identificacion: string;
  cargo: string;
  incapacitado: "" | "SI" | "NO";
  cumpleMedicamentos: "" | "SI" | "NO" | "NA";
  examenesPeriodicos: "" | "SI" | "NO" | "NA";
  recomendaciones: "" | "SI" | "NO" | "NA";
  restricciones: "" | "SI" | "NO" | "NA";
  fechaProximoControl: string;
  especialidad: string;
}

function createEmptyParte1(): FilaParte1 {
  return {
    id: crypto.randomUUID(),
    nombre: "",
    identificacion: "",
    cargo: "",
    area: "",
    arl: "",
    eps: "",
    afp: "",
    diagnostico: "",
    criterioCalificacion: "",
  };
}

function createEmptyParte2(): FilaParte2 {
  return {
    id: crypto.randomUUID(),
    nombre: "",
    identificacion: "",
    cargo: "",
    incapacitado: "",
    cumpleMedicamentos: "",
    examenesPeriodicos: "",
    recomendaciones: "",
    restricciones: "",
    fechaProximoControl: "",
    especialidad: "",
  };
}

function ControlSaludEspecialForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [parte1, setParte1] = useState<FilaParte1[]>([createEmptyParte1()]);
  const [parte2, setParte2] = useState<FilaParte2[]>([createEmptyParte2()]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function updateParte1(id: string, field: keyof FilaParte1, value: string) {
    setParte1((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  }

  function updateParte2(id: string, field: keyof FilaParte2, value: string) {
    setParte2((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
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
          tipo: "Control de Casos de Salud Especial",
          codigo: "FOR-026",
          datos: {
            parte1: parte1.map((item) =>
              Object.fromEntries(
                Object.entries(item).filter(([key]) => key !== "id")
              ) as Omit<typeof item, "id">
            ),
            parte2: parte2.map((item) =>
              Object.fromEntries(
                Object.entries(item).filter(([key]) => key !== "id")
              ) as Omit<typeof item, "id">
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
          <h1 className="text-xl font-semibold text-gray-900">Control de Casos de Salud Especial</h1>
          <p className="text-sm text-gray-500">FOR-026</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary"
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

      {/* Parte 1 */}
      <div className="card p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Parte 1 - Datos del Caso</h2>
          <button
            onClick={() => setParte1((prev) => [...prev, createEmptyParte1()])}
            className="btn btn-secondary px-3 py-1.5 text-xs"
          >
            + Agregar fila
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="table-base text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Nombre</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Identificación</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Cargo</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Área</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">ARL</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">EPS</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">AFP</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Diagnóstico</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-gray-200">Criterio calificación</th>
              </tr>
            </thead>
            <tbody>
              {parte1.map((fila) => (
                <tr key={fila.id} className="hover:bg-gray-50">
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.nombre} onChange={(e) => updateParte1(fila.id, "nombre", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.identificacion} onChange={(e) => updateParte1(fila.id, "identificacion", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.cargo} onChange={(e) => updateParte1(fila.id, "cargo", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.area} onChange={(e) => updateParte1(fila.id, "area", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.arl} onChange={(e) => updateParte1(fila.id, "arl", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.eps} onChange={(e) => updateParte1(fila.id, "eps", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.afp} onChange={(e) => updateParte1(fila.id, "afp", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.diagnostico} onChange={(e) => updateParte1(fila.id, "diagnostico", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-gray-200">
                    <input value={fila.criterioCalificacion} onChange={(e) => updateParte1(fila.id, "criterioCalificacion", e.target.value)} className="input text-xs" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Parte 2 */}
      <div className="card p-4 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Parte 2 - Control y Seguimiento</h2>
          <button
            onClick={() => setParte2((prev) => [...prev, createEmptyParte2()])}
            className="btn btn-secondary px-3 py-1.5 text-xs"
          >
            + Agregar fila
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="table-base text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Nombre</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Identificación</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Cargo</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Incapacitado</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Cumple medicamentos</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Exámenes periódicos</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Recomendaciones</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Restricciones</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Fecha próximo control</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-gray-200">Especialidad</th>
              </tr>
            </thead>
            <tbody>
              {parte2.map((fila) => (
                <tr key={fila.id} className="hover:bg-gray-50">
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.nombre} onChange={(e) => updateParte2(fila.id, "nombre", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.identificacion} onChange={(e) => updateParte2(fila.id, "identificacion", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.cargo} onChange={(e) => updateParte2(fila.id, "cargo", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <select value={fila.incapacitado} onChange={(e) => updateParte2(fila.id, "incapacitado", e.target.value as "" | "SI" | "NO")} className="input text-xs">
                      <option value="">-</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                    </select>
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <select value={fila.cumpleMedicamentos} onChange={(e) => updateParte2(fila.id, "cumpleMedicamentos", e.target.value as "" | "SI" | "NO" | "NA")} className="input text-xs">
                      <option value="">-</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                      <option value="NA">NA</option>
                    </select>
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <select value={fila.examenesPeriodicos} onChange={(e) => updateParte2(fila.id, "examenesPeriodicos", e.target.value as "" | "SI" | "NO" | "NA")} className="input text-xs">
                      <option value="">-</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                      <option value="NA">NA</option>
                    </select>
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <select value={fila.recomendaciones} onChange={(e) => updateParte2(fila.id, "recomendaciones", e.target.value as "" | "SI" | "NO" | "NA")} className="input text-xs">
                      <option value="">-</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                      <option value="NA">NA</option>
                    </select>
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <select value={fila.restricciones} onChange={(e) => updateParte2(fila.id, "restricciones", e.target.value as "" | "SI" | "NO" | "NA")} className="input text-xs">
                      <option value="">-</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                      <option value="NA">NA</option>
                    </select>
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input type="date" value={fila.fechaProximoControl} onChange={(e) => updateParte2(fila.id, "fechaProximoControl", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-gray-200">
                    <input value={fila.especialidad} onChange={(e) => updateParte2(fila.id, "especialidad", e.target.value)} className="input text-xs" />
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

export default function ControlSaludEspecialPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <ControlSaludEspecialForm />
    </Suspense>
  );
}
