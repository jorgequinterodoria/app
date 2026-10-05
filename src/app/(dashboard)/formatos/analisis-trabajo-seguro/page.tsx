"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface FilaAnalisis {
  id: number;
  descripcionTarea: string;
  peligros: string;
  consecuencias: string;
  controles: string;
}

interface FilaTrabajador {
  id: number;
  cargo: string;
  cantidadTrabajadores: number;
}

function AnalisisTrabajoSeguroForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [actividad, setActividad] = useState("");
  const [fechaAnalisis, setFechaAnalisis] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [altura, setAltura] = useState("");
  const [sitio, setSitio] = useState("");
  const [empresaEjecutante, setEmpresaEjecutante] = useState("");

  const [maquinaria, setMaquinaria] = useState("");
  const [equiposMenores, setEquiposMenores] = useState("");
  const [herramientas, setHerramientas] = useState("");
  const [sustanciasQuimicas, setSustanciasQuimicas] = useState("");

  const [trabajadores, setTrabajadores] = useState<FilaTrabajador[]>([
    { id: 1, cargo: "", cantidadTrabajadores: 0 },
  ]);

  const [extintor, setExtintor] = useState(false);
  const [manguera, setManguera] = useState(false);
  const [balde, setBalde] = useState(false);
  const [arena, setArena] = useState(false);

  const [analisis, setAnalisis] = useState<FilaAnalisis[]>([
    { id: 1, descripcionTarea: "", peligros: "", consecuencias: "", controles: "" },
  ]);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function addTrabajador() {
    setTrabajadores((prev) => [
      ...prev,
      { id: Date.now(), cargo: "", cantidadTrabajadores: 0 },
    ]);
  }

  function removeTrabajador(id: number) {
    setTrabajadores((prev) => prev.filter((t) => t.id !== id));
  }

  function updateTrabajador(id: number, field: keyof FilaTrabajador, value: string | number) {
    setTrabajadores((prev) =>
      prev.map((t) => (t.id === id ? { ...t, [field]: value } : t))
    );
  }

  function addAnalisis() {
    setAnalisis((prev) => [
      ...prev,
      { id: Date.now(), descripcionTarea: "", peligros: "", consecuencias: "", controles: "" },
    ]);
  }

  function removeAnalisis(id: number) {
    setAnalisis((prev) => prev.filter((a) => a.id !== id));
  }

  function updateAnalisis(id: number, field: keyof FilaAnalisis, value: string) {
    setAnalisis((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
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
          tipo: "Análisis de Trabajo Seguro",
          codigo: "FOR-008",
          datos: {
            actividad,
            fechaAnalisis,
            horaInicio,
            horaFin,
            altura,
            sitio,
            empresaEjecutante,
            recursos: { maquinaria, equiposMenores, herramientas, sustanciasQuimicas },
            trabajadores,
            equipoContraIncendios: { extintor, manguera, balde, arena },
            analisis,
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
          <h1 className="text-2xl font-bold text-gray-900">Análisis de Trabajo Seguro</h1>
          <p className="text-sm text-gray-500">FOR-008 - Formato de análisis de trabajo seguro</p>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Análisis</label>
            <input
              type="date"
              value={fechaAnalisis}
              onChange={(e) => setFechaAnalisis(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Inicio</label>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fin</label>
              <input
                type="time"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Altura</label>
            <input
              type="text"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitio</label>
            <input
              type="text"
              value={sitio}
              onChange={(e) => setSitio(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Empresa Ejecutante</label>
            <input
              type="text"
              value={empresaEjecutante}
              onChange={(e) => setEmpresaEjecutante(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
        <h2 className="font-semibold text-gray-900">Recursos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maquinaria</label>
            <input
              type="text"
              value={maquinaria}
              onChange={(e) => setMaquinaria(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Equipos Menores</label>
            <input
              type="text"
              value={equiposMenores}
              onChange={(e) => setEquiposMenores(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Herramientas</label>
            <input
              type="text"
              value={herramientas}
              onChange={(e) => setHerramientas(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sustancias Químicas</label>
            <input
              type="text"
              value={sustanciasQuimicas}
              onChange={(e) => setSustanciasQuimicas(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Trabajadores</h2>
          <button
            onClick={addTrabajador}
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
                  Cargo
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                  Cantidad de Trabajadores
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 border-b border-gray-200 w-16">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {trabajadores.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b border-r border-gray-200">
                    <input
                      type="text"
                      value={row.cargo}
                      onChange={(e) => updateTrabajador(row.id, "cargo", e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 border-b border-r border-gray-200">
                    <input
                      type="number"
                      value={row.cantidadTrabajadores || ""}
                      onChange={(e) => updateTrabajador(row.id, "cantidadTrabajadores", parseInt(e.target.value) || 0)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-center focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 border-b border-gray-200 text-center">
                    {trabajadores.length > 1 && (
                      <button
                        onClick={() => removeTrabajador(row.id)}
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

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
        <h2 className="font-semibold text-gray-900">Equipo Contra Incendios</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={extintor}
              onChange={(e) => setExtintor(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Extintor
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={manguera}
              onChange={(e) => setManguera(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Manguera
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={balde}
              onChange={(e) => setBalde(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Balde
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={arena}
              onChange={(e) => setArena(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Arena
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Análisis de Tareas</h2>
          <button
            onClick={addAnalisis}
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
                  Descripción de Tarea
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                  Peligros
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                  Consecuencias
                </th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                  Controles
                </th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 border-b border-gray-200 w-16">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {analisis.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b border-r border-gray-200">
                    <input
                      type="text"
                      value={row.descripcionTarea}
                      onChange={(e) => updateAnalisis(row.id, "descripcionTarea", e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 border-b border-r border-gray-200">
                    <input
                      type="text"
                      value={row.peligros}
                      onChange={(e) => updateAnalisis(row.id, "peligros", e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 border-b border-r border-gray-200">
                    <input
                      type="text"
                      value={row.consecuencias}
                      onChange={(e) => updateAnalisis(row.id, "consecuencias", e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 border-b border-r border-gray-200">
                    <input
                      type="text"
                      value={row.controles}
                      onChange={(e) => updateAnalisis(row.id, "controles", e.target.value)}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-3 py-2 border-b border-gray-200 text-center">
                    {analisis.length > 1 && (
                      <button
                        onClick={() => removeAnalisis(row.id)}
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

export default function AnalisisTrabajoSeguroPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <AnalisisTrabajoSeguroForm />
    </Suspense>
  );
}
