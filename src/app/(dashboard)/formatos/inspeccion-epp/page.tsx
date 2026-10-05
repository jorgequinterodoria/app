"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface CheckItem {
  id: number;
  nombre: string;
  estado: "SI" | "NO" | "NA" | "";
  observacion: string;
}

const eppItems = [
  "Casco",
  "Guantes",
  "Gafas",
  "Mascarilla",
  "Botas",
  "Protector auditivo",
  "Chaleco",
  "Camisa",
  "Pantalón",
  "Calzado dieléctrico",
  "Crema protectora",
  "Implemento anticaídas",
  "Arnés",
  "Eslinga",
  "Lentes",
  "Careta soldador",
  "Guantes dieléctricos",
  "Tapones",
];

function InspeccionEppForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [inspeccionadoPor, setInspeccionadoPor] = useState("");
  const [fecha, setFecha] = useState("");
  const [areaInspeccionada, setAreaInspeccionada] = useState("");
  const [items, setItems] = useState<CheckItem[]>(
    eppItems.map((nombre, i) => ({ id: i, nombre, estado: "", observacion: "" }))
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function updateItem(id: number, field: "estado" | "observacion", value: string) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
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
          tipo: "Inspección de Uso de EPP",
          codigo: "FOR-062",
          datos: { inspeccionadoPor, fecha, areaInspeccionada, items },
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
          <h1 className="text-2xl font-bold text-gray-900">Inspección de Uso de EPP</h1>
          <p className="text-sm text-gray-500">FOR-062</p>
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

      <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Inspeccionado por</label>
            <input
              type="text"
              value={inspeccionadoPor}
              onChange={(e) => setInspeccionadoPor(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área Inspeccionada</label>
            <input
              type="text"
              value={areaInspeccionada}
              onChange={(e) => setAreaInspeccionada(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                EPP
              </th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 border-b border-r border-gray-200 min-w-[200px]">
                Estado (SI / NO / NA)
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-gray-200">
                Observación
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-3 py-2 border-b border-r border-gray-200 font-medium text-gray-900">
                  {item.nombre}
                </td>
                <td className="px-3 py-2 border-b border-r border-gray-200">
                  <div className="flex items-center justify-center gap-3">
                    {(["SI", "NO", "NA"] as const).map((opt) => (
                      <label key={opt} className="flex items-center gap-1 cursor-pointer">
                        <input
                          type="radio"
                          name={`epp-${item.id}`}
                          checked={item.estado === opt}
                          onChange={() => updateItem(item.id, "estado", opt)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{opt}</span>
                      </label>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={item.observacion}
                    onChange={(e) => updateItem(item.id, "observacion", e.target.value)}
                    placeholder="Observación..."
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: cards */}
      <div className="sm:hidden space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
            <div className="font-medium text-gray-900 text-sm">{item.nombre}</div>
            <div className="flex items-center gap-3">
              {(["SI", "NO", "NA"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name={`epp-m-${item.id}`}
                    checked={item.estado === opt}
                    onChange={() => updateItem(item.id, "estado", opt)}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
            <input
              type="text"
              value={item.observacion}
              onChange={(e) => updateItem(item.id, "observacion", e.target.value)}
              placeholder="Observación..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InspeccionEppPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <InspeccionEppForm />
    </Suspense>
  );
}
