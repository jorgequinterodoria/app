"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Formulario {
  nombre: string;
  apellido: string;
  cedula: string;
  cargo: string;
  area: string;
  arl: string;
  eps: string;
  afp: string;
  casoAT: boolean;
  casoElDiagnosticada: boolean;
  casoProcesoCalificacion: boolean;
  casoIncapacidadMayor15: boolean;
  casoEspecialesVigilancia: boolean;
  casoRecomendacionesMedicas: boolean;
  casoReintegro: boolean;
  casoOtro: boolean;
  diagnosticoPrincipal: string;
  diagnosticoRelacionado1: string;
  diagnosticoRelacionado2: string;
  incapacitado: "" | "SI" | "NO";
  periodoIncapacidad: string;
  citasMedicas: string;
  cumplimientoTratamiento: string;
  restricciones: string;
  reintegroLaboral: string;
}

const initialForm: Formulario = {
  nombre: "",
  apellido: "",
  cedula: "",
  cargo: "",
  area: "",
  arl: "",
  eps: "",
  afp: "",
  casoAT: false,
  casoElDiagnosticada: false,
  casoProcesoCalificacion: false,
  casoIncapacidadMayor15: false,
  casoEspecialesVigilancia: false,
  casoRecomendacionesMedicas: false,
  casoReintegro: false,
  casoOtro: false,
  diagnosticoPrincipal: "",
  diagnosticoRelacionado1: "",
  diagnosticoRelacionado2: "",
  incapacitado: "",
  periodoIncapacidad: "",
  citasMedicas: "",
  cumplimientoTratamiento: "",
  restricciones: "",
  reintegroLaboral: "",
};

function SeguimientoSaludEspecialForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [form, setForm] = useState<Formulario>(initialForm);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function update<K extends keyof Formulario>(field: K, value: Formulario[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
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
          tipo: "Seguimiento de Casos de Salud Especial",
          codigo: "FOR-025",
          datos: form,
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
          <h1 className="text-xl font-semibold text-gray-900">Seguimiento de Casos de Salud Especial</h1>
          <p className="text-sm text-gray-500">FOR-025</p>
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

      {/* Datos del trabajador */}
      <div className="card p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Datos del Trabajador</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Nombre</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => update("nombre", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Apellido</label>
            <input
              type="text"
              value={form.apellido}
              onChange={(e) => update("apellido", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Cédula</label>
            <input
              type="text"
              value={form.cedula}
              onChange={(e) => update("cedula", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Cargo</label>
            <input
              type="text"
              value={form.cargo}
              onChange={(e) => update("cargo", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Área</label>
            <input
              type="text"
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">ARL</label>
            <input
              type="text"
              value={form.arl}
              onChange={(e) => update("arl", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">EPS</label>
            <input
              type="text"
              value={form.eps}
              onChange={(e) => update("eps", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">AFP</label>
            <input
              type="text"
              value={form.afp}
              onChange={(e) => update("afp", e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Tipo de caso */}
      <div className="card p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Tipo de Caso</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: "casoAT", label: "AT (Accidente de Trabajo)" },
            { key: "casoElDiagnosticada", label: "EL diagnosticada" },
            { key: "casoProcesoCalificacion", label: "Proceso de calificación" },
            { key: "casoIncapacidadMayor15", label: "Incapacidad > 15 días" },
            { key: "casoEspecialesVigilancia", label: "Especiales de vigilancia" },
            { key: "casoRecomendacionesMedicas", label: "Recomendaciones médicas" },
            { key: "casoReintegro", label: "Reintegro" },
            { key: "casoOtro", label: "Otro" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={form[key as keyof Formulario] as boolean}
                onChange={(e) => update(key as keyof Formulario, e.target.checked as never)}
                className="rounded border-gray-300 text-blue-600"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* Diagnósticos */}
      <div className="card p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Diagnósticos</h2>
        <div className="space-y-4">
          <div>
            <label className="label">Diagnóstico principal</label>
            <input
              type="text"
              value={form.diagnosticoPrincipal}
              onChange={(e) => update("diagnosticoPrincipal", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Diagnóstico relacionado 1</label>
            <input
              type="text"
              value={form.diagnosticoRelacionado1}
              onChange={(e) => update("diagnosticoRelacionado1", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Diagnóstico relacionado 2</label>
            <input
              type="text"
              value={form.diagnosticoRelacionado2}
              onChange={(e) => update("diagnosticoRelacionado2", e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Seguimiento */}
      <div className="card p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Seguimiento</h2>
        <div className="space-y-4">
          <div>
            <label className="label mb-2">¿Incapacitado?</label>
            <div className="flex gap-4">
              {(["SI", "NO"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="incapacitado"
                    value={opt}
                    checked={form.incapacitado === opt}
                    onChange={() => update("incapacitado", opt)}
                    className="text-blue-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Período de incapacidad</label>
            <input
              type="text"
              placeholder="Ej: 01/01/2026 - 15/01/2026"
              value={form.periodoIncapacidad}
              onChange={(e) => update("periodoIncapacidad", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Citas médicas</label>
            <textarea
              value={form.citasMedicas}
              onChange={(e) => update("citasMedicas", e.target.value)}
              rows={2}
              className="input"
            />
          </div>
          <div>
            <label className="label">Cumplimiento del tratamiento</label>
            <textarea
              value={form.cumplimientoTratamiento}
              onChange={(e) => update("cumplimientoTratamiento", e.target.value)}
              rows={2}
              className="input"
            />
          </div>
          <div>
            <label className="label">Restricciones</label>
            <textarea
              value={form.restricciones}
              onChange={(e) => update("restricciones", e.target.value)}
              rows={2}
              className="input"
            />
          </div>
          <div>
            <label className="label">Reintegro laboral</label>
            <textarea
              value={form.reintegroLaboral}
              onChange={(e) => update("reintegroLaboral", e.target.value)}
              rows={2}
              className="input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SeguimientoSaludEspecialPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <SeguimientoSaludEspecialForm />
    </Suspense>
  );
}
