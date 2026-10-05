"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface HeightCheck {
  id: number;
  descripcion: string;
  cumple: "" | "SI" | "NO";
  observacion: string;
}

const initialChecks: HeightCheck[] = [
  { id: 1, descripcion: "Arnés en buen estado y certificado vigente", cumple: "", observacion: "" },
  { id: 2, descripcion: "Línea de vida instalada y certificada", cumple: "", observacion: "" },
  { id: 3, descripcion: "Mosquetones con seguro y certificados", cumple: "", observacion: "" },
  { id: 4, descripcion: "Eslingas y tensoras en buen estado", cumple: "", observacion: "" },
  { id: 5, descripcion: "Andamios certificados y nivelados", cumple: "", observacion: "" },
  { id: 6, descripcion: "Escaleras en buenas condiciones", cumple: "", observacion: "" },
  { id: 7, descripcion: "Barandas y protección perimetral instaladas", cumple: "", observacion: "" },
  { id: 8, descripcion: "Zona de caída delimitada y señalizada", cumple: "", observacion: "" },
  { id: 9, descripcion: "Extintor disponible en el área", cumple: "", observacion: "" },
  { id: 10, descripcion: "Trabajador capacitado para trabajos en altura", cumple: "", observacion: "" },
  { id: 11, descripcion: "Tool belt para evitar caída de objetos", cumple: "", observacion: "" },
  { id: 12, descripcion: "Supervisor designado para la actividad", cumple: "", observacion: "" },
];

function PermisoAlturasForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [fecha, setFecha] = useState("");
  const [altura, setAltura] = useState("");
  const [tipoTrabajo, setTipoTrabajo] = useState("");
  const [lugar, setLugar] = useState("");
  const [trabajador, setTrabajador] = useState("");
  const [cedula, setCedula] = useState("");
  const [responsable, setResponsable] = useState("");
  const [condicionesSeguras, setCondicionesSeguras] = useState("");
  const [checks, setChecks] = useState<HeightCheck[]>(initialChecks);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function updateCheck(id: number, field: "cumple" | "observacion", value: string) {
    setChecks((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }

  async function handleSave() {
    setGuardando(true);
    setMensaje(null);
    try {
      const res = await fetch("/api/formatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proyectoId,
          tipo: "Permiso de Trabajos en Altura",
          codigo: "FOR-107",
          datos: { fecha, altura, tipoTrabajo, lugar, trabajador, cedula, responsable, condicionesSeguras, checks },
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setMensaje({ type: "success", text: "Formato guardado exitosamente" });
    } catch {
      setMensaje({ type: "error", text: "Error al guardar el formato" });
    } finally {
      setGuardando(false);
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
          <h1 className="text-2xl font-bold text-gray-900">Permiso de Trabajos en Altura</h1>
          <p className="text-sm text-gray-500">FOR-107</p>
        </div>
        <button onClick={handleSave} disabled={guardando}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors">
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {mensaje && (
        <div className={`rounded-lg px-4 py-3 text-sm ${mensaje.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
          {mensaje.text}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Altura (metros)</label>
            <input type="number" step="0.1" value={altura} onChange={(e) => setAltura(e.target.value)}
              placeholder="Ej: 3.5"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de trabajo</label>
            <select value={tipoTrabajo} onChange={(e) => setTipoTrabajo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Seleccione...</option>
              <option value="Uso de escalera">Uso de escalera</option>
              <option value="Trabajo sobre andamio">Trabajo sobre andamio</option>
              <option value="Trabajo en estructura metálica">Trabajo en estructura metálica</option>
              <option value="Trabajo en techos">Trabajo en techos</option>
              <option value="Uso de plataforma elevadora">Uso de plataforma elevadora</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lugar / Ubicación</label>
            <input type="text" value={lugar} onChange={(e) => setLugar(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
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
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsable del permiso</label>
            <input type="text" value={responsable} onChange={(e) => setResponsable(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Condiciones seguras identificadas</label>
          <textarea value={condicionesSeguras} onChange={(e) => setCondicionesSeguras(e.target.value)} rows={3}
            placeholder="Describa las condiciones de seguridad identificadas antes de iniciar el trabajo..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Verificaciones de Seguridad</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">#</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Verificación</th>
                <th className="px-3 py-2 text-center text-xs font-medium text-gray-500">Cumple</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">Observación</th>
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
                        <input type="radio" name={`ca-${check.id}`} checked={check.cumple === "SI"}
                          onChange={() => updateCheck(check.id, "cumple", "SI")}
                          className="text-blue-600 focus:ring-blue-500" />
                        <span className="text-xs">SI</span>
                      </label>
                      <label className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name={`ca-${check.id}`} checked={check.cumple === "NO"}
                          onChange={() => updateCheck(check.id, "cumple", "NO")}
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

export default function PermisoAlturasPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <PermisoAlturasForm />
    </Suspense>
  );
}
