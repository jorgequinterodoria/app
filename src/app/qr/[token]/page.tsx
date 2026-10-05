"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Empleado {
  id: string;
  nombre: string;
  identificacion: string;
  cargo: string;
}

interface QrData {
  qr: { id: string; proyectoId: string; formatoTipo: string; expiresAt: string };
  proyecto: { nombre: string } | null;
  empleados: Empleado[];
}

const NOVEDADES = [
  { value: "I", label: "I - Incapacidad" },
  { value: "R", label: "R - Retiro" },
  { value: "S", label: "S - Suspensión" },
  { value: "Re", label: "Re - Renuncia" },
  { value: "IN", label: "IN - Inasistencia" },
  { value: "EG", label: "EG - Egreso" },
  { value: "SJC", label: "SJC - Sin Justificación" },
];

export default function QrAttendancePage() {
  const params = useParams();
  const token = params.token as string;

  const [data, setData] = useState<QrData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedEmpleado, setSelectedEmpleado] = useState("");
  const [sintomas, setSintomas] = useState<"SI" | "NO">("NO");
  const [novedad, setNovedad] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQr() {
      try {
        const res = await fetch(`/api/qr/${token}`);
        if (!res.ok) {
          const err = await res.json();
          setError(err.error || "Error al cargar QR");
          return;
        }
        const json = await res.json();
        setData(json);
      } catch {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    }
    fetchQr();
  }, [token]);

  async function handleSubmit() {
    if (!selectedEmpleado) {
      setSubmitError("Seleccione un empleado");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/qr/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          empleadoId: selectedEmpleado,
          sintomas,
          novedad: novedad || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setSubmitError(err.error || "Error al registrar");
        return;
      }

      setSuccess(true);
    } catch {
      setSubmitError("Error de conexión");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-lg">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <div className="text-red-500 text-5xl mb-4">✕</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Asistencia registrada
          </h1>
          <p className="text-gray-600">Tu registro fue exitoso.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-sm mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-xl font-bold text-gray-900 text-center mb-1">
            {data?.proyecto?.nombre || "Registro de Asistencia"}
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Complete los campos para registrar su asistencia
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Empleado
              </label>
              <select
                value={selectedEmpleado}
                onChange={(e) => setSelectedEmpleado(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Seleccionar empleado</option>
                {data?.empleados.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.nombre} - {emp.identificacion}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Presenta síntomas?
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSintomas("SI")}
                  className={`flex-1 py-3 rounded-lg text-base font-semibold border-2 transition-colors ${
                    sintomas === "SI"
                      ? "bg-red-50 border-red-500 text-red-700"
                      : "bg-white border-gray-300 text-gray-600"
                  }`}
                >
                  SI
                </button>
                <button
                  type="button"
                  onClick={() => setSintomas("NO")}
                  className={`flex-1 py-3 rounded-lg text-base font-semibold border-2 transition-colors ${
                    sintomas === "NO"
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "bg-white border-gray-300 text-gray-600"
                  }`}
                >
                  NO
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Novedad (opcional)
              </label>
              <select
                value={novedad}
                onChange={(e) => setNovedad(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Sin novedad</option>
                {NOVEDADES.map((n) => (
                  <option key={n.value} value={n.value}>
                    {n.label}
                  </option>
                ))}
              </select>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                {submitError}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg text-base transition-colors"
            >
              {submitting ? "Registrando..." : "Registrar Asistencia"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
