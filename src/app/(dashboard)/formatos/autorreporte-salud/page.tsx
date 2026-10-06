"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Formulario {
  nombre: string;
  identificacion: string;
  sexo: "" | "M" | "F";
  edad: string;
  estadoCivil: string;
  eps: string;
  arl: string;
  afp: string;
  cargo: string;
  tiempoEmpresa: string;
  tiempoSector: string;
  descripcionEnfermedad: string;
  tiempoSintomas: string;
  periodicidad: string;
  afectaActividades: "" | "SI" | "NO";
  haConsultado: "" | "SI" | "NO";
  leHanDadoIncapacidad: "" | "SI" | "NO";
  haSidoRemitido: "" | "SI" | "NO";
}

const initialForm: Formulario = {
  nombre: "",
  identificacion: "",
  sexo: "",
  edad: "",
  estadoCivil: "",
  eps: "",
  arl: "",
  afp: "",
  cargo: "",
  tiempoEmpresa: "",
  tiempoSector: "",
  descripcionEnfermedad: "",
  tiempoSintomas: "",
  periodicidad: "",
  afectaActividades: "",
  haConsultado: "",
  leHanDadoIncapacidad: "",
  haSidoRemitido: "",
};

function AutorreporteSaludForm() {
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
          tipo: "Autorreporte de Condiciones de Salud",
          codigo: "FOR-022",
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
          <h1 className="text-xl font-semibold text-gray-900">Autorreporte de Condiciones de Salud</h1>
          <p className="text-sm text-gray-500">FOR-022</p>
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

      <div className="card p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Datos del Trabajador</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="label">Nombre completo</label>
            <input
              type="text"
              value={form.nombre}
              onChange={(e) => update("nombre", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Identificación</label>
            <input
              type="text"
              value={form.identificacion}
              onChange={(e) => update("identificacion", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Sexo</label>
            <div className="flex gap-4 mt-1">
              {(["M", "F"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="sexo"
                    value={opt}
                    checked={form.sexo === opt}
                    onChange={() => update("sexo", opt)}
                    className="text-blue-600"
                  />
                  {opt === "M" ? "Masculino" : "Femenino"}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Edad</label>
            <input
              type="number"
              value={form.edad}
              onChange={(e) => update("edad", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Estado civil</label>
            <select
              value={form.estadoCivil}
              onChange={(e) => update("estadoCivil", e.target.value)}
              className="input"
            >
              <option value="">Seleccione...</option>
              <option value="Soltero(a)">Soltero(a)</option>
              <option value="Casado(a)">Casado(a)</option>
              <option value="Unión libre">Unión libre</option>
              <option value="Divorciado(a)">Divorciado(a)</option>
              <option value="Viudo(a)">Viudo(a)</option>
            </select>
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
            <label className="label">ARL</label>
            <input
              type="text"
              value={form.arl}
              onChange={(e) => update("arl", e.target.value)}
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
            <label className="label">Tiempo en la empresa</label>
            <input
              type="text"
              placeholder="Ej: 2 años, 6 meses"
              value={form.tiempoEmpresa}
              onChange={(e) => update("tiempoEmpresa", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Tiempo en el sector</label>
            <input
              type="text"
              placeholder="Ej: 5 años"
              value={form.tiempoSector}
              onChange={(e) => update("tiempoSector", e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Condición de Salud</h2>
        <div>
          <label className="label">
            Descripción del síntoma o enfermedad que padece
          </label>
          <textarea
            value={form.descripcionEnfermedad}
            onChange={(e) => update("descripcionEnfermedad", e.target.value)}
            rows={3}
            className="input"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Tiempo notando los síntomas</label>
            <input
              type="text"
              placeholder="Ej: 3 meses"
              value={form.tiempoSintomas}
              onChange={(e) => update("tiempoSintomas", e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Periodicidad</label>
            <input
              type="text"
              placeholder="Ej: Diaria, Semanal, Mensual"
              value={form.periodicidad}
              onChange={(e) => update("periodicidad", e.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>

      <div className="card p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Impacto y Atención</h2>
        <div className="space-y-3">
          <div>
            <label className="label mb-2">¿Afecta las actividades laborales?</label>
            <div className="flex gap-4">
              {(["SI", "NO"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="afectaActividades"
                    value={opt}
                    checked={form.afectaActividades === opt}
                    onChange={() => update("afectaActividades", opt)}
                    className="text-blue-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="label mb-2">¿Ha consultado servicios de salud?</label>
            <div className="flex gap-4">
              {(["SI", "NO"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="haConsultado"
                    value={opt}
                    checked={form.haConsultado === opt}
                    onChange={() => update("haConsultado", opt)}
                    className="text-blue-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="label mb-2">¿Le han dado incapacidad?</label>
            <div className="flex gap-4">
              {(["SI", "NO"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="leHanDadoIncapacidad"
                    value={opt}
                    checked={form.leHanDadoIncapacidad === opt}
                    onChange={() => update("leHanDadoIncapacidad", opt)}
                    className="text-blue-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="label mb-2">¿Ha sido remitido a medicina laboral?</label>
            <div className="flex gap-4">
              {(["SI", "NO"] as const).map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    name="haSidoRemitido"
                    value={opt}
                    checked={form.haSidoRemitido === opt}
                    onChange={() => update("haSidoRemitido", opt)}
                    className="text-blue-600"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AutorreporteSaludPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <AutorreporteSaludForm />
    </Suspense>
  );
}
