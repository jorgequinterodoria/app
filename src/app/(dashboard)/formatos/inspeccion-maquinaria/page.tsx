"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface CheckItem {
  id: number;
  nombre: string;
  estado: "SI" | "NO" | "NA" | "";
  observacion: string;
}

const checklistItems = [
  // Motor
  "Nivel de aceite motor",
  "Nivel de refrigerante",
  "Correas del motor",
  "Fugas de aceite",
  "Fugas de refrigerante",
  "Filtro de aire",
  "Batería / bornes",
  "Cables de batería",
  // Sistema hidráulico
  "Nivel de aceite hidráulico",
  "Mangueras hidráulicas",
  "Cilindros hidráulicos",
  "Fugas hidráulicas",
  "Filtro hidráulico",
  "Válvulas hidráulicas",
  // Sistema eléctrico
  "Luces de trabajo",
  "Luces de marcha",
  "Alarma de reversa",
  "Claxon",
  "Tablero / indicadores",
  "Alternador",
  // Seguridad
  "Extintor",
  "Señalización",
  "Cinturón de seguridad",
  "ROPS / FOPS",
  "Parabrisas sin daños",
  "Espejos retrovisores",
  "Cámara de reversa",
  "Estopa / botiquín",
  // Estructura
  "Pala / cucharón",
  "Dientes de pala",
  "Orugas / cadenas",
  "Rodillos",
  "Bastidores",
  "Plumas / brazo",
  // Operación
  "Frenos principales",
  "Freno de estacionamiento",
  "Dirección",
  "Embrague",
  "Transmisión",
  "Ruedas motrices",
  "Ruedas locas",
  "Tensión de orugas",
  "Horómetro / Odómetro",
  "Fugas generales",
];

function InspeccionMaquinariaForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [inspeccionadoPor, setInspeccionadoPor] = useState("");
  const [fecha, setFecha] = useState("");
  const [tipoEquipo, setTipoEquipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [serie, setSerie] = useState("");
  const [items, setItems] = useState<CheckItem[]>(
    checklistItems.map((nombre, i) => ({ id: i, nombre, estado: "", observacion: "" }))
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
          tipo: "Inspección Preoperacional de Maquinaria",
          codigo: "FOR-086",
          datos: {
            inspeccionadoPor,
            fecha,
            tipoEquipo,
            marca,
            modelo,
            serie,
            items,
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
    <div className="space-y-4 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Inspección Preoperacional de Maquinaria</h1>
          <p className="text-sm text-gray-500">FOR-086</p>
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

      <div className="card p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Inspeccionado por</label>
            <input
              type="text"
              value={inspeccionadoPor}
              onChange={(e) => setInspeccionadoPor(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Fecha</label>
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Tipo de Equipo</label>
            <input
              type="text"
              value={tipoEquipo}
              onChange={(e) => setTipoEquipo(e.target.value)}
              className="input"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Marca</label>
            <input
              type="text"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Modelo</label>
            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Serie</label>
            <input
              type="text"
              value={serie}
              onChange={(e) => setSerie(e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="table-base">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                Elemento
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
                          name={`maq-${item.id}`}
                          checked={item.estado === opt}
                          onChange={() => updateItem(item.id, "estado", opt)}
                          className="text-blue-600"
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
                    className="input"
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
          <div key={item.id} className="card p-4 space-y-2">
            <div className="font-medium text-gray-900 text-sm">{item.nombre}</div>
            <div className="flex items-center gap-3">
              {(["SI", "NO", "NA"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name={`maq-m-${item.id}`}
                    checked={item.estado === opt}
                    onChange={() => updateItem(item.id, "estado", opt)}
                    className="text-blue-600"
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
              className="input"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InspeccionMaquinariaPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <InspeccionMaquinariaForm />
    </Suspense>
  );
}
