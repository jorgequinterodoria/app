"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import { Suspense } from "react";

interface Empleado {
  id: string;
  nombre: string;
  identificacion: string;
  cargo: string;
}

interface DiaAsistencia {
  sintomas: "SI" | "NO" | "";
  novedad: string;
}

function AsistenciaDiariaForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [frenteObra, setFrenteObra] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [asistencia, setAsistencia] = useState<Record<string, DiaAsistencia[]>>({});
  const [saving, setSaving] = useState(false);
  const [generatingQr, setGeneratingQr] = useState(false);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!proyectoId) return;
    fetch(`/api/empleados?proyectoId=${proyectoId}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setEmpleados(data);
        const initial: Record<string, DiaAsistencia[]> = {};
        data.forEach((emp: Empleado) => {
          initial[emp.id] = Array(7).fill(null).map(() => ({ sintomas: "", novedad: "" }));
        });
        setAsistencia(initial);
      });
  }, [proyectoId]);

  const getDays = () => {
    if (!fechaInicio) return [];
    const start = new Date(fechaInicio);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d.toLocaleDateString("es-CO", { weekday: "short", day: "numeric", month: "short" });
    });
  };

  const days = getDays();

  function updateCell(empleadoId: string, dayIndex: number, field: keyof DiaAsistencia, value: string) {
    setAsistencia((prev) => {
      const updated = { ...prev };
      if (!updated[empleadoId]) return prev;
      updated[empleadoId] = [...updated[empleadoId]];
      updated[empleadoId][dayIndex] = { ...updated[empleadoId][dayIndex], [field]: value };
      return updated;
    });
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
          tipo: "Asistencia Diaria",
          codigo: "FOR-006",
          datos: { frenteObra, fechaInicio, fechaFin, asistencia },
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

  async function handleGenerateQr() {
    setGeneratingQr(true);
    setMessage(null);

    try {
      const res = await fetch("/api/qr/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proyectoId,
          formatoTipo: "FOR-006",
          durationHours: 24,
        }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error al generar QR");

      const data = await res.json();
      const fullUrl = `${window.location.origin}${data.qrUrl}`;
      setQrUrl(fullUrl);

      const qrDataUrl = await QRCode.toDataURL(fullUrl, { width: 300, margin: 2 });
      setQrImage(qrDataUrl);
    } catch {
      setMessage({ type: "error", text: "Error al generar el QR" });
    } finally {
      setGeneratingQr(false);
    }
  }

  function handleDownloadQr() {
    if (!qrImage) return;
    const link = document.createElement("a");
    link.href = qrImage;
    link.download = `qr-asistencia-${Date.now()}.png`;
    link.click();
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
          <h1 className="text-xl font-semibold text-gray-900">Asistencia Diaria</h1>
          <p className="text-sm text-gray-500">FOR-006 - Registro de asistencia diaria del personal en obra</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={handleGenerateQr}
            disabled={generatingQr}
            className="btn bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white"
          >
            {generatingQr ? "Generando..." : "Generar QR"}
          </button>
        </div>
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

      {qrImage && (
        <div className="card p-6 flex flex-col items-center gap-4">
          <h2 className="font-semibold text-gray-900">QR de Asistencia</h2>
          <Image src={qrImage} alt="QR Code" width={220} height={220} className="rounded-lg" unoptimized />
          <p className="text-xs text-gray-500 break-all text-center max-w-xs">{qrUrl}</p>
          <button
            onClick={handleDownloadQr}
            className="btn btn-secondary"
          >
            Descargar QR
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="label">Frente de Obra</label>
          <input
            type="text"
            value={frenteObra}
            onChange={(e) => setFrenteObra(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label">Fecha Inicio</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label className="label">Fecha Fin</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {empleados.length > 0 && days.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="table-base">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 sticky left-0 bg-gray-50 border-b border-r border-gray-200 min-w-45">
                  Empleado
                </th>
                {days.map((day, i) => (
                  <th key={i} className="px-3 py-2 text-center text-xs font-medium text-gray-500 border-b border-gray-200 min-w-35">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {empleados.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b border-r border-gray-200 sticky left-0 bg-white">
                    <div className="text-sm font-medium text-gray-900">{emp.nombre}</div>
                    <div className="text-xs text-gray-500">{emp.identificacion}</div>
                  </td>
                  {days.map((_, dayIndex) => (
                    <td key={dayIndex} className="px-2 py-2 border-b border-gray-200">
                      <div className="flex flex-col gap-1">
                        <select
                          value={asistencia[emp.id]?.[dayIndex]?.sintomas || ""}
                          onChange={(e) => updateCell(emp.id, dayIndex, "sintomas", e.target.value)}
                          className="input"
                        >
                          <option value="">-</option>
                          <option value="SI">SI</option>
                          <option value="NO">NO</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Novedad"
                          value={asistencia[emp.id]?.[dayIndex]?.novedad || ""}
                          onChange={(e) => updateCell(emp.id, dayIndex, "novedad", e.target.value)}
                          className="input"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {empleados.length === 0 && proyectoId && (
        <div className="text-center text-gray-500 py-8">
          No hay empleados registrados para este proyecto.
        </div>
      )}
    </div>
  );
}

export default function AsistenciaDiariaPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <AsistenciaDiariaForm />
    </Suspense>
  );
}
