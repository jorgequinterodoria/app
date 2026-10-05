"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import QRCode from "qrcode";
import { Suspense } from "react";

interface Empleado {
  id: string;
  nombre: string;
  identificacion: string;
  cargo: string;
}

interface AsistenciaRow {
  empleadoId: string;
  nombre: string;
  documentoIdentificacion: string;
  cargo: string;
  firma: boolean;
}

function AsistenciaCapacitacionForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [localizacion, setLocalizacion] = useState("");
  const [temaCapacitacion, setTemaCapacitacion] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [fecha, setFecha] = useState("");
  const [personalDirigido, setPersonalDirigido] = useState("");
  const [responsable, setResponsable] = useState("");
  const [contenido, setContenido] = useState("");
  const [asistencia, setAsistencia] = useState<AsistenciaRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [generatingQr, setGeneratingQr] = useState(false);
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!proyectoId) return;
    fetch(`/api/empleados?proyectoId=${proyectoId}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data: Empleado[]) => {
        setEmpleados(data);
        setAsistencia(
          data.map((emp) => ({
            empleadoId: emp.id,
            nombre: emp.nombre,
            documentoIdentificacion: emp.identificacion,
            cargo: emp.cargo,
            firma: false,
          }))
        );
      });
  }, [proyectoId]);

  function toggleFirma(index: number) {
    setAsistencia((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], firma: !updated[index].firma };
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
          tipo: "Control de Asistencia a Capacitación",
          codigo: "FOR-009",
          datos: {
            localizacion,
            temaCapacitacion,
            objetivo,
            fecha,
            personalDirigido,
            responsable,
            contenido,
            asistencia,
          },
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
          formatoTipo: "FOR-009",
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
    link.download = `qr-asistencia-capacitacion-${Date.now()}.png`;
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
          <h1 className="text-2xl font-bold text-gray-900">Control de Asistencia a Capacitación</h1>
          <p className="text-sm text-gray-500">FOR-009 - Registro de asistencia a capacitación</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
          <button
            onClick={handleGenerateQr}
            disabled={generatingQr}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
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
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center gap-4">
          <h2 className="font-semibold text-gray-900">QR de Asistencia</h2>
          <Image src={qrImage} alt="QR Code" width={220} height={220} className="rounded-lg" unoptimized />
          <p className="text-xs text-gray-500 break-all text-center max-w-xs">{qrUrl}</p>
          <button
            onClick={handleDownloadQr}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Descargar QR
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
        <h2 className="font-semibold text-gray-900">Información General</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localización</label>
            <input
              type="text"
              value={localizacion}
              onChange={(e) => setLocalizacion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tema de Capacitación</label>
            <input
              type="text"
              value={temaCapacitacion}
              onChange={(e) => setTemaCapacitacion(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
            <input
              type="text"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Personal Dirigido</label>
            <input
              type="text"
              value={personalDirigido}
              onChange={(e) => setPersonalDirigido(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Responsable</label>
            <input
              type="text"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenido</label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {asistencia.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
          <h2 className="font-semibold text-gray-900">Lista de Asistencia</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                    Nombre
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                    Documento Identificación
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200">
                    Cargo
                  </th>
                  <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 border-b border-gray-200">
                    Firma
                  </th>
                </tr>
              </thead>
              <tbody>
                {asistencia.map((row, i) => (
                  <tr key={row.empleadoId} className="hover:bg-gray-50">
                    <td className="px-3 py-2 border-b border-r border-gray-200 text-sm text-gray-900">
                      {row.nombre}
                    </td>
                    <td className="px-3 py-2 border-b border-r border-gray-200 text-sm text-gray-700">
                      {row.documentoIdentificacion}
                    </td>
                    <td className="px-3 py-2 border-b border-r border-gray-200 text-sm text-gray-700">
                      {row.cargo}
                    </td>
                    <td className="px-3 py-2 border-b border-gray-200 text-center">
                      <input
                        type="checkbox"
                        checked={row.firma}
                        onChange={() => toggleFirma(i)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

export default function AsistenciaCapacitacionPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <AsistenciaCapacitacionForm />
    </Suspense>
  );
}
