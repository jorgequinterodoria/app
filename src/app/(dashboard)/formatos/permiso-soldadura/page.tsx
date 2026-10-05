"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface WeldingCheck {
  id: number;
  descripcion: string;
  cumple: "" | "SI" | "NO";
  observacion: string;
}

const initialChecks: WeldingCheck[] = [
  { id: 1, descripcion: "Permiso de trabajo en caliente aprobado", cumple: "", observacion: "" },
  { id: 2, descripcion: "Extintor disponible y en buenas condiciones", cumple: "", observacion: "" },
  { id: 3, descripcion: "Área despejada de materiales combustibles", cumple: "", observacion: "" },
  { id: 4, descripcion: "Pantalla o cortina de protección colocada", cumple: "", observacion: "" },
  { id: 5, descripcion: "Casco con careta para soldador", cumple: "", observacion: "" },
  { id: 6, descripcion: "Guantes de cuero para soldador", cumple: "", observacion: "" },
  { id: 7, descripcion: "Botas dieléctricas", cumple: "", observacion: "" },
  { id: 8, descripcion: "Ropa de trabajo sin aceites ni grasas", cumple: "", observacion: "" },
  { id: 9, descripcion: "Protección auditiva disponible", cumple: "", observacion: "" },
  { id: 10, descripcion: "Ventilación del área garantizada", cumple: "", observacion: "" },
  { id: 11, descripcion: "Cables y conexiones eléctricas inspeccionados", cumple: "", observacion: "" },
  { id: 12, descripcion: "No personalextranos en el área de trabajo", cumple: "", observacion: "" },
];

function PermisoSoldaduraForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [fecha, setFecha] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [trabajador, setTrabajador] = useState("");
  const [cedula, setCedula] = useState("");
  const [areaTrabajo, setAreaTrabajo] = useState("");
  const [descripcionTrabajo, setDescripcionTrabajo] = useState("");
  const [responsable, setResponsable] = useState("");
  const [checks, setChecks] = useState<WeldingCheck[]>(initialChecks);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function updateCheck(id: number, field: "cumple" | "observacion", value: string) {
    setChecks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
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
          proyectoId,
          tipo: "Permiso de Trabajo Seguro de Soldadura",
          codigo: "FOR-032",
          datos: { fecha, horaInicio, horaFin, trabajador, cedula, areaTrabajo, descripcionTrabajo, responsable, checks },
        }),
        credentials: "include",
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
          <h1 className="text-2xl font-bold text-gray-900">Permiso de Trabajo Seguro de Soldadura</h1>
          <p className="text-sm text-gray-500">FOR-032</p>
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
        <div className={`rounded-lg px-4 py-3 text-sm ${message.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Datos del Permiso</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Inicio</label>
              <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fin</label>
              <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trabajador</label>
            <input type="text" value={trabajador} onChange={(e) => setTrabajador(e.target.value)}
              placeholder="Nombre completo"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cédula</label>
            <input type="text" value={cedula} onChange={(e) => setCedula(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área de Trabajo</label>
            <input type="text" value={areaTrabajo} onChange={(e) => setAreaTrabajo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
            <input type="text" value={responsable} onChange={(e) => setResponsable(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción del trabajo</label>
          <textarea value={descripcionTrabajo} onChange={(e) => setDescripcionTrabajo(e.target.value)} rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Verificaciones de Seguridad</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 py-2 text-left font-medium text-gray-500">#</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Verificación</th>
                <th className="px-3 py-2 text-center font-medium text-gray-500">Cumple</th>
                <th className="px-3 py-2 text-left font-medium text-gray-500">Observación</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((check) => (
                <tr key={check.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-3 py-2 text-gray-400">{check.id}</td>
                  <td className="px-3 py-2 text-gray-700">{check.descripcion}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-3">
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name={`c-${check.id}`} checked={check.cumple === "SI"} onChange={() => updateCheck(check.id, "cumple", "SI")}
                          className="text-blue-600 focus:ring-blue-500" />
                        <span className="text-xs">SI</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name={`c-${check.id}`} checked={check.cumple === "NO"} onChange={() => updateCheck(check.id, "cumple", "NO")}
                          className="text-red-600 focus:ring-red-500" />
                        <span className="text-xs">NO</span>
                      </label>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <input type="text" value={check.observacion} onChange={(e) => updateCheck(check.id, "observacion", e.target.value)}
                      placeholder="..." className="border border-gray-300 rounded px-2 py-1 text-xs w-full" />
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

export default function PermisoSoldaduraPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <PermisoSoldaduraForm />
    </Suspense>
  );
}
