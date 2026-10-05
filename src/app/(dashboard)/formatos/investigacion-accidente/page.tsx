"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface InvestigacionForm {
  fechaEvento: string;
  horaEvento: string;
  lugar: string;
  area: string;
  tipoEvento: "" | "Accidente de trabajo" | "Enfermedad laboral" | "Incidente" | "Casi accidente";
  descripcionHechos: string;
  trabajadoresAfectados: string;
  testigos: string;
  causaInmediata: string;
  causaRaiz: string;
  accionesCorrectivas: string;
  responsables: string;
  fechasCumplimiento: string;
  observaciones: string;
}

const initialForm: InvestigacionForm = {
  fechaEvento: "", horaEvento: "", lugar: "", area: "",
  tipoEvento: "", descripcionHechos: "", trabajadoresAfectados: "",
  testigos: "", causaInmediata: "", causaRaiz: "",
  accionesCorrectivas: "", responsables: "", fechasCumplimiento: "", observaciones: "",
};

function InvestigacionAccidenteForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [form, setForm] = useState<InvestigacionForm>(initialForm);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function update<K extends keyof InvestigacionForm>(field: K, value: InvestigacionForm[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
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
          tipo: "Informe de Investigación de Accidente",
          codigo: "FOR-057",
          datos: form,
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
          <h1 className="text-2xl font-bold text-gray-900">Informe de Investigación de Accidente</h1>
          <p className="text-sm text-gray-500">FOR-057</p>
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
        <h2 className="text-lg font-semibold text-gray-900">Datos del Evento</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha del evento</label>
            <input type="date" value={form.fechaEvento} onChange={(e) => update("fechaEvento", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hora del evento</label>
            <input type="time" value={form.horaEvento} onChange={(e) => update("horaEvento", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de evento</label>
            <select value={form.tipoEvento} onChange={(e) => update("tipoEvento", e.target.value as InvestigacionForm["tipoEvento"])}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Seleccione...</option>
              <option value="Accidente de trabajo">Accidente de trabajo</option>
              <option value="Enfermedad laboral">Enfermedad laboral</option>
              <option value="Incidente">Incidente</option>
              <option value="Casi accidente">Casi accidente</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lugar del evento</label>
            <input type="text" value={form.lugar} onChange={(e) => update("lugar", e.target.value)}
              placeholder="Ej: Frente norte, bodega 3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Área</label>
            <input type="text" value={form.area} onChange={(e) => update("area", e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción de los hechos</label>
          <textarea value={form.descripcionHechos} onChange={(e) => update("descripcionHechos", e.target.value)} rows={4}
            placeholder="Relate cronológicamente lo sucedido..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Personal Afectado y Testigos</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trabajadores afectados</label>
            <textarea value={form.trabajadoresAfectados} onChange={(e) => update("trabajadoresAfectados", e.target.value)} rows={2}
              placeholder="Nombre, cédula, cargo..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Testigos</label>
            <textarea value={form.testigos} onChange={(e) => update("testigos", e.target.value)} rows={2}
              placeholder="Nombre, cédula, contacto..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Análisis de Causas</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Causa inmediata</label>
            <textarea value={form.causaInmediata} onChange={(e) => update("causaInmediata", e.target.value)} rows={2}
              placeholder="Condición o acto inseguro identificado..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Causa raíz</label>
            <textarea value={form.causaRaiz} onChange={(e) => update("causaRaiz", e.target.value)} rows={2}
              placeholder="Factores organizacionales, de supervisión o procedimiento..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Plan de Acción</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Acciones correctivas</label>
            <textarea value={form.accionesCorrectivas} onChange={(e) => update("accionesCorrectivas", e.target.value)} rows={3}
              placeholder="Detalle las acciones a implementar..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Responsables</label>
              <input type="text" value={form.responsables} onChange={(e) => update("responsables", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fechas de cumplimiento</label>
              <input type="text" value={form.fechasCumplimiento} onChange={(e) => update("fechasCumplimiento", e.target.value)}
                placeholder="Ej: 15/10/2026, 30/10/2026"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
            <textarea value={form.observaciones} onChange={(e) => update("observaciones", e.target.value)} rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InvestigacionAccidentePage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <InvestigacionAccidenteForm />
    </Suspense>
  );
}
