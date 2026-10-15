"use client";

import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import QRCode from "qrcode";
import { Suspense } from "react";
import { esFechaPasada, esFechaValida, formatFechaLarga } from "@/lib/qr-fechas";

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

interface QrRegistro {
  empleadoId: string;
  fecha: string;
  sintomas: string | null;
  novedad: string | null;
}

type SetAsistencia = Dispatch<SetStateAction<AsistenciaRow[]>>;
type SetQrFirmas = Dispatch<SetStateAction<Set<string>>>;
type SetBoolean = Dispatch<SetStateAction<boolean>>;
type SetMensaje = Dispatch<SetStateAction<{ type: "success" | "error"; text: string } | null>>;

function useHydratarFirmas(
  proyectoId: string,
  fecha: string,
  empleados: Empleado[],
  setAsistencia: SetAsistencia,
  setQrFirmas: SetQrFirmas,
  setCargandoDatos: SetBoolean,
  setMessage: SetMensaje,
) {
  useEffect(() => {
    if (!proyectoId || !fecha || !esFechaValida(fecha) || empleados.length === 0) return;
    let cancelled = false;
    (async () => {
      setCargandoDatos(true);
      try {
        const res = await fetch(
          `/api/qr/registros?proyectoId=${proyectoId}&formatoTipo=FOR-009&desde=${fecha}&hasta=${fecha}`,
          { credentials: "include" },
        );
        const registros: QrRegistro[] = res.ok ? await res.json() : [];
        if (cancelled) return;
        const firmados = new Set(registros.map((r) => r.empleadoId));
        setQrFirmas(firmados);
        setAsistencia((prev) =>
          prev.map((row) => (firmados.has(row.empleadoId) ? { ...row, firma: true } : row))
        );
      } catch {
        if (!cancelled) setMessage({ type: "error", text: "No se pudieron cargar los registros del QR" });
      } finally {
        if (!cancelled) setCargandoDatos(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [proyectoId, fecha, empleados, setAsistencia, setQrFirmas, setCargandoDatos, setMessage]);
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
  const [qrFirmas, setQrFirmas] = useState<Set<string>>(new Set());
  const [qrFecha, setQrFecha] = useState<string | null>(null);
  const [cargandoDatos, setCargandoDatos] = useState(false);

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

  useHydratarFirmas(proyectoId, fecha, empleados, setAsistencia, setQrFirmas, setCargandoDatos, setMessage);

  function toggleFirma(index: number) {
    setAsistencia((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], firma: !updated[index].firma };
      return updated;
    });
    setQrFirmas((prev) => {
      const empleadoId = asistencia[index]?.empleadoId;
      if (!empleadoId || !prev.has(empleadoId)) return prev;
      const next = new Set(prev);
      next.delete(empleadoId);
      return next;
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
    if (!fecha) {
      setMessage({ type: "error", text: "Seleccione la fecha de la capacitación" });
      return;
    }
    setGeneratingQr(true);
    setMessage(null);

    try {
      const res = await fetch("/api/qr/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proyectoId,
          formatoTipo: "FOR-009",
          fecha,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Error al generar QR");
      }

      const data = await res.json();
      const fullUrl = `${window.location.origin}${data.qrUrl}`;
      setQrUrl(fullUrl);

      const qrDataUrl = await QRCode.toDataURL(fullUrl, { width: 300, margin: 2 });
      setQrImage(qrDataUrl);
      setQrFecha(data.fecha);

      if (data.alreadyExisted) {
        setMessage({ type: "success", text: "Esta fecha ya tenía un QR; se muestra el existente." });
      }
    } catch (e) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "Error al generar el QR" });
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
          <h1 className="text-xl font-semibold text-gray-900">Control de Asistencia a Capacitación</h1>
          <p className="text-sm text-gray-500">FOR-009 - Registro de asistencia a capacitación</p>
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
            disabled={generatingQr || !fecha || esFechaPasada(fecha)}
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
          {qrFecha && (
            <p className="text-xs font-medium text-gray-700">
              QR para el {formatFechaLarga(qrFecha)}
            </p>
          )}
          <button
            onClick={handleDownloadQr}
            className="btn btn-secondary"
          >
            Descargar QR
          </button>
        </div>
      )}

      <div className="card p-4 space-y-4">
        <h2 className="font-semibold text-gray-900">Información General</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Localización</label>
            <input
              type="text"
              value={localizacion}
              onChange={(e) => setLocalizacion(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Tema de Capacitación</label>
            <input
              type="text"
              value={temaCapacitacion}
              onChange={(e) => setTemaCapacitacion(e.target.value)}
              className="input"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Objetivo</label>
            <input
              type="text"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
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
            <label className="label">Personal Dirigido</label>
            <input
              type="text"
              value={personalDirigido}
              onChange={(e) => setPersonalDirigido(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <label className="label">Responsable</label>
            <input
              type="text"
              value={responsable}
              onChange={(e) => setResponsable(e.target.value)}
              className="input"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Contenido</label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={3}
              className="input"
            />
          </div>
        </div>
      </div>

      {cargandoDatos ? (
        <div className="text-center text-gray-500 py-8">Cargando registros...</div>
      ) : (
        asistencia.length > 0 && (
          <div className="card p-4 space-y-4">
            <h2 className="font-semibold text-gray-900">Lista de Asistencia</h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="table-base">
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
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="checkbox"
                            checked={row.firma}
                            onChange={() => toggleFirma(i)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          {qrFirmas.has(row.empleadoId) && (
                            <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 rounded px-1 py-0.5">
                              QR
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
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
