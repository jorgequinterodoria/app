"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface FilaRiesgo {
  id: number;
  factorRiesgo: string;
  clasificacion: string;
  efectoPosible: string;
}

function NotificacionRiesgosForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [actividad, setActividad] = useState("");
  const [tareas, setTareas] = useState("");
  const [cargos, setCargos] = useState("");
  const [fechaNotificacion, setFechaNotificacion] = useState("");

  const [riesgos, setRiesgos] = useState<FilaRiesgo[]>([
    { id: 1, factorRiesgo: "", clasificacion: "", efectoPosible: "" },
  ]);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function addRiesgo() {
    setRiesgos((prev) => [
      ...prev,
      { id: Date.now(), factorRiesgo: "", clasificacion: "", efectoPosible: "" },
    ]);
  }

  function removeRiesgo(id: number) {
    setRiesgos((prev) => prev.filter((r) => r.id !== id));
  }

  function updateRiesgo(id: number, field: keyof FilaRiesgo, value: string) {
    setRiesgos((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
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
          tipo: "Notificación de Riesgos",
          codigo: "FOR-010",
          datos: {
            actividad,
            tareas,
            cargos,
            fechaNotificacion,
            riesgos,
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
          <h1 className="text-2xl font-bold text-gray-900">Notificación de Riesgos</h1>
          <p className="text-sm text-gray-500">FOR-010 - Notificación de riesgos laborales</p>
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

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
        <h2 className="font-semibold text-gray-900">Información General</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Actividad</label>
            <input
              type="text"
              value={actividad}
              onChange={(e) => setActividad(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tareas</label>
            <textarea
              value={tareas}
              onChange={(e) => setTareas(e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Cargos</label>
            <input
              type="text"
              value={cargos}
              onChange={(e) => setCargos(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Notificación</label>
            <input
              type="date"
              value={fechaNotificacion}
              onChange={(e) => setFechaNotificacion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Factores de Riesgo</h2>
          <button
            onClick={addRiesgo}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1 rounded-lg text-sm transition-colors"
          >
            + Agregar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                  Factor de Riesgo
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                  Clasificación
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                  Efecto Posible
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 border-b border-gray-200 w-16">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {riesgos.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b border-r border-gray-200">
                    <input
                      type="text"
                      value={row.factorRiesgo}
                      onChange={(e) => updateRiesgo(row.id, "factorRiesgo", e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 border-b border-r border-gray-200">
                    <input
                      type="text"
                      value={row.clasificacion}
                      onChange={(e) => updateRiesgo(row.id, "clasificacion", e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 border-b border-r border-gray-200">
                    <input
                      type="text"
                      value={row.efectoPosible}
                      onChange={(e) => updateRiesgo(row.id, "efectoPosible", e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 border-b border-gray-200 text-center">
                    {riesgos.length > 1 && (
                      <button
                        onClick={() => removeRiesgo(row.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        ✕
                      </button>
                    )}
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

export default function NotificacionRiesgosPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <NotificacionRiesgosForm />
    </Suspense>
  );
}
