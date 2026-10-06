"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface FilaParte1 {
  id: string;
  nombre: string;
  identificacion: string;
  fecha: string;
  sexo: string;
  edad: string;
  estadoCivil: string;
  eps: string;
  arl: string;
  afp: string;
  cargo: string;
  tiempoEmpresa: string;
  tiempoSector: string;
}

interface FilaParte2 {
  id: string;
  nombre: string;
  identificacion: string;
  sintomaEnfermedad: string;
  tiempoSintomas: string;
  afectaActividades: "" | "SI" | "NO";
  haConsultado: "" | "SI" | "NO";
  incapacidad: "" | "SI" | "NO";
  tiempoIncapacidad: string;
  remitidoMedicinaLaboral: "" | "SI" | "NO";
}

function createEmptyParte1(): FilaParte1 {
  return {
    id: crypto.randomUUID(),
    nombre: "",
    identificacion: "",
    fecha: "",
    sexo: "",
    edad: "",
    estadoCivil: "",
    eps: "",
    arl: "",
    afp: "",
    cargo: "",
    tiempoEmpresa: "",
    tiempoSector: "",
  };
}

function createEmptyParte2(): FilaParte2 {
  return {
    id: crypto.randomUUID(),
    nombre: "",
    identificacion: "",
    sintomaEnfermedad: "",
    tiempoSintomas: "",
    afectaActividades: "",
    haConsultado: "",
    incapacidad: "",
    tiempoIncapacidad: "",
    remitidoMedicinaLaboral: "",
  };
}

function ControlAutorreporteForm() {
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
          tipo: "Control de Autorreporte de Condiciones de Salud",
          codigo: "FOR-023",
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
          <h1 className="text-xl font-semibold text-gray-900">Control de Autorreporte de Condiciones de Salud</h1>
          <p className="text-sm text-gray-500">FOR-023</p>
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
          <h2 className="text-lg font-semibold text-gray-900">Parte 1 - Datos Personales</h2>
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
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Fecha</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Sexo</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Edad</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Estado civil</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">EPS</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">ARL</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">AFP</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Cargo</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Tiempo empresa</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-gray-200">Tiempo sector</th>
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
                    <input type="date" value={fila.fecha} onChange={(e) => updateParte1(fila.id, "fecha", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <select value={fila.sexo} onChange={(e) => updateParte1(fila.id, "sexo", e.target.value)} className="input text-xs">
                      <option value="">-</option>
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input type="number" value={fila.edad} onChange={(e) => updateParte1(fila.id, "edad", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.estadoCivil} onChange={(e) => updateParte1(fila.id, "estadoCivil", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.eps} onChange={(e) => updateParte1(fila.id, "eps", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.arl} onChange={(e) => updateParte1(fila.id, "arl", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.afp} onChange={(e) => updateParte1(fila.id, "afp", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.cargo} onChange={(e) => updateParte1(fila.id, "cargo", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.tiempoEmpresa} onChange={(e) => updateParte1(fila.id, "tiempoEmpresa", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-gray-200">
                    <input value={fila.tiempoSector} onChange={(e) => updateParte1(fila.id, "tiempoSector", e.target.value)} className="input text-xs" />
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
          <h2 className="text-lg font-semibold text-gray-900">Parte 2 - Condición de Salud</h2>
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
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Síntoma / Enfermedad</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Tiempo notando síntomas</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Afecta actividades</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Ha consultado</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Incapacidad</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-r border-gray-200">Tiempo incapacidad</th>
                <th className="px-2 py-2 text-left font-medium text-gray-500 border-b border-gray-200">Remitido medicina laboral</th>
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
                    <input value={fila.sintomaEnfermedad} onChange={(e) => updateParte2(fila.id, "sintomaEnfermedad", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.tiempoSintomas} onChange={(e) => updateParte2(fila.id, "tiempoSintomas", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <select value={fila.afectaActividades} onChange={(e) => updateParte2(fila.id, "afectaActividades", e.target.value as "" | "SI" | "NO")} className="input text-xs">
                      <option value="">-</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                    </select>
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <select value={fila.haConsultado} onChange={(e) => updateParte2(fila.id, "haConsultado", e.target.value as "" | "SI" | "NO")} className="input text-xs">
                      <option value="">-</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                    </select>
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <select value={fila.incapacidad} onChange={(e) => updateParte2(fila.id, "incapacidad", e.target.value as "" | "SI" | "NO")} className="input text-xs">
                      <option value="">-</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                    </select>
                  </td>
                  <td className="px-1 py-1 border-b border-r border-gray-200">
                    <input value={fila.tiempoIncapacidad} onChange={(e) => updateParte2(fila.id, "tiempoIncapacidad", e.target.value)} className="input text-xs" />
                  </td>
                  <td className="px-1 py-1 border-b border-gray-200">
                    <select value={fila.remitidoMedicinaLaboral} onChange={(e) => updateParte2(fila.id, "remitidoMedicinaLaboral", e.target.value as "" | "SI" | "NO")} className="input text-xs">
                      <option value="">-</option>
                      <option value="SI">SI</option>
                      <option value="NO">NO</option>
                    </select>
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

export default function ControlAutorreportePage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <ControlAutorreporteForm />
    </Suspense>
  );
}
