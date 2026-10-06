"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface EnfermedadPreexistente {
  nombre: string;
  identificacion: string;
  cargo: string;
  antiguedad: string;
  hipertension: "" | "SI" | "NO";
  diabetes: "" | "SI" | "NO";
  asma: "" | "SI" | "NO";
  epilepsia: "" | "SI" | "NO";
  problemas_corazon: "" | "SI" | "NO";
  cancer: "" | "SI" | "NO";
  depression_ansiedad: "" | "SI" | "NO";
  otras_enfermedades: string;
  medications: string;
  tratamiedo: "" | "SI" | "NO";
  restriccionesActividades: string;
  observaciones: string;
}

const initialForm: EnfermedadPreexistente = {
  nombre: "", identificacion: "", cargo: "", antiguedad: "",
  hipertension: "", diabetes: "", asma: "", epilepsia: "",
  problemas_corazon: "", cancer: "", depression_ansiedad: "",
  otras_enfermedades: "", medications: "", tratamiedo: "",
  restriccionesActividades: "", observaciones: "",
};

function EncuestaPreexistenciasForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [form, setForm] = useState<EnfermedadPreexistente>(initialForm);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function update<K extends keyof EnfermedadPreexistente>(field: K, value: EnfermedadPreexistente[K]) {
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
          tipo: "Encuesta de Enfermedades Preexistentes",
          codigo: "FOR-080",
          datos: form,
        }),
        credentials: "include",
      });
      if (!res.ok) throw new Error();
      setMensaje({ type: "success", text: "Encuesta guardada exitosamente" });
    } catch {
      setMensaje({ type: "error", text: "Error al guardar la encuesta" });
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
          <h1 className="text-xl font-semibold text-gray-900">Encuesta de Enfermedades Preexistentes</h1>
          <p className="text-sm text-gray-500">FOR-080</p>
        </div>
        <button onClick={handleSave} disabled={guardando}
          className="btn btn-primary">
          {guardando ? "Guardando..." : "Guardar"}
        </button>
      </div>

      {mensaje && (
        <div className={`rounded-lg px-4 py-3 text-sm ${mensaje.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
          {mensaje.text}
        </div>
      )}

      <div className="card p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Datos Personales</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="label">Nombre completo</label>
            <input type="text" value={form.nombre} onChange={(e) => update("nombre", e.target.value)}
              className="input" />
          </div>
          <div>
            <label className="label">Identificación</label>
            <input type="text" value={form.identificacion} onChange={(e) => update("identificacion", e.target.value)}
              className="input" />
          </div>
          <div>
            <label className="label">Cargo</label>
            <input type="text" value={form.cargo} onChange={(e) => update("cargo", e.target.value)}
              className="input" />
          </div>
          <div>
            <label className="label">Antigüedad en la empresa</label>
            <input type="text" value={form.antiguedad} onChange={(e) => update("antiguedad", e.target.value)}
              placeholder="Ej: 2 años, 6 meses"
              className="input" />
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Antecedentes Médicos</h2>
        <p className="text-sm text-gray-500">Indique si padece alguna de las siguientes condiciones:</p>
        <div className="space-y-3">
          {[
            { key: "hipertension", label: "Hipertensión (presión alta)" },
            { key: "diabetes", label: "Diabetes" },
            { key: "asma", label: "Asma o enfermedades respiratorias crónicas" },
            { key: "epilepsia", label: "Epilepsia o convulsiones" },
            { key: "problemas_corazon", label: "Problemas cardíacos" },
            { key: "cancer", label: "Cáncer" },
            { key: "depression_ansiedad", label: "Depresión o ansiedad severa" },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-700">{label}</span>
              <div className="flex gap-4">
                {(["SI", "NO"] as const).map((opt) => (
                  <label key={opt} className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name={key} value={opt}
                      checked={form[key as keyof EnfermedadPreexistente] === opt}
                      onChange={() => update(key as keyof EnfermedadPreexistente, opt)}
                      className="text-blue-600" />
                    <span className="text-sm text-gray-600">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <label className="label">Otras enfermedades (especificar)</label>
          <textarea value={form.otras_enfermedades} onChange={(e) => update("otras_enfermedades", e.target.value)} rows={2}
            className="input" />
        </div>
        <div>
          <label className="label">Medicamentos que toma actualmente</label>
          <textarea value={form.medications} onChange={(e) => update("medications", e.target.value)} rows={2}
            className="input" />
        </div>
      </div>

      <div className="card p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Aptitud Laboral</h2>
        <div className="space-y-3">
          <div>
            <label className="label mb-2">¿Tiene miedo de trabajar en altura?</label>
            <div className="flex gap-4">
              {(["SI", "NO"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                  <input type="radio" name="tratamiedo" value={opt}
                    checked={form.tratamiedo === opt}
                    onChange={() => update("tratamiedo", opt)}
                    className="text-blue-600" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="label">¿Tiene restricciones para algunas actividades laborales?</label>
            <textarea value={form.restriccionesActividades} onChange={(e) => update("restriccionesActividades", e.target.value)} rows={2}
              placeholder="Describa las restricciones..."
              className="input" />
          </div>
          <div>
            <label className="label">Observaciones generales</label>
            <textarea value={form.observaciones} onChange={(e) => update("observaciones", e.target.value)} rows={2}
              className="input" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EncuestaPreexistenciasPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <EncuestaPreexistenciasForm />
    </Suspense>
  );
}
