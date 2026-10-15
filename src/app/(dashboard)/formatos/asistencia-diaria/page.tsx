"use client";

import { useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import QRCode from "qrcode";
import { Suspense } from "react";
import { esFechaPasada, esFechaValida, formatFechaLarga, hoyColombia } from "@/lib/qr-fechas";

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

interface QrRegistro {
  empleadoId: string;
  fecha: string;
  sintomas: string | null;
  novedad: string | null;
}

function construirAsistenciaHidratada(
  empleados: Empleado[],
  base: Record<string, DiaAsistencia[]> | null,
  registros: QrRegistro[],
  days: { iso: string }[],
): { merged: Record<string, DiaAsistencia[]>; marks: Record<string, number[]> } {
  const merged: Record<string, DiaAsistencia[]> = {};
  for (const emp of empleados) {
    merged[emp.id] =
      base?.[emp.id]?.length === 7
        ? base[emp.id].map((c) => ({
            sintomas: (c.sintomas || "") as DiaAsistencia["sintomas"],
            novedad: c.novedad || "",
          }))
        : Array(7).fill(null).map(() => ({ sintomas: "", novedad: "" }));
  }

  const fechaToIndex = new Map(days.map((d, i) => [d.iso, i] as const));
  const marks: Record<string, number[]> = {};
  for (const reg of registros) {
    const dayIndex = fechaToIndex.get(reg.fecha) ?? -1;
    if (dayIndex === -1) continue;
    if (!reg.sintomas && !reg.novedad) continue;
    const cell = merged[reg.empleadoId]?.[dayIndex];
    if (!cell) continue;
    if (cell.sintomas === "" && cell.novedad === "") {
      cell.sintomas = (reg.sintomas || "") as DiaAsistencia["sintomas"];
      cell.novedad = reg.novedad || "";
      if (!marks[reg.empleadoId]) marks[reg.empleadoId] = [];
      if (!marks[reg.empleadoId].includes(dayIndex)) marks[reg.empleadoId].push(dayIndex);
    }
  }
  return { merged, marks };
}

function resolverDiaQr(days: { iso: string }[], diaQr: string): string {
  if (days.length === 0) return "";
  const isos = days.map((d) => d.iso);
  if (diaQr && isos.includes(diaQr)) return diaQr;
  const hoy = hoyColombia();
  return isos.includes(hoy) ? hoy : isos[0];
}

type SetAsistencia = Dispatch<SetStateAction<Record<string, DiaAsistencia[]>>>;
type SetQrCells = Dispatch<SetStateAction<Record<string, number[]>>>;
type SetBoolean = Dispatch<SetStateAction<boolean>>;
type SetMensaje = Dispatch<SetStateAction<{ type: "success" | "error"; text: string } | null>>;

function useHydratarAsistencia(
  proyectoId: string,
  fechaInicio: string,
  empleados: Empleado[],
  days: { iso: string }[],
  setAsistencia: SetAsistencia,
  setQrCells: SetQrCells,
  setCargandoDatos: SetBoolean,
  setMessage: SetMensaje,
) {
  useEffect(() => {
    if (!proyectoId || !fechaInicio || empleados.length === 0 || days.length === 0) return;
    let cancelled = false;

    (async () => {
      try {
        setCargandoDatos(true);
        const [fmtRes, qrRes] = await Promise.all([
          fetch(`/api/formatos?proyectoId=${proyectoId}&codigo=FOR-006`, { credentials: "include" }),
          fetch(
            `/api/qr/registros?proyectoId=${proyectoId}&formatoTipo=FOR-006&desde=${days[0].iso}&hasta=${days[days.length - 1].iso}`,
            { credentials: "include" },
          ),
        ]);
        const formatosList = fmtRes.ok ? await fmtRes.json() : [];
        const registros: QrRegistro[] = qrRes.ok ? await qrRes.json() : [];
        if (cancelled) return;

        const guardado = [...formatosList]
          .reverse()
          .find((f: { datos?: { fechaInicio?: string } }) => f.datos?.fechaInicio === fechaInicio);
        const base: Record<string, DiaAsistencia[]> | null = guardado?.datos?.asistencia ?? null;

        const { merged, marks } = construirAsistenciaHidratada(empleados, base, registros, days);
        setAsistencia(merged);
        setQrCells(marks);
      } catch {
        if (!cancelled) {
          setMessage({ type: "error", text: "No se pudieron cargar los registros guardados" });
        }
      } finally {
        if (!cancelled) setCargandoDatos(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [proyectoId, fechaInicio, empleados, days, setAsistencia, setQrCells, setCargandoDatos, setMessage]);
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
  const [diaQr, setDiaQr] = useState("");
  const [qrCells, setQrCells] = useState<Record<string, number[]>>({});
  const [cargandoDatos, setCargandoDatos] = useState(false);
  const [qrFecha, setQrFecha] = useState<string | null>(null);

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

  const days = useMemo(() => {
    if (!fechaInicio || !esFechaValida(fechaInicio)) return [];
    const [y, m, d] = fechaInicio.split("-").map(Number);
    const start = new Date(Date.UTC(y, m - 1, d));
    return Array.from({ length: 7 }, (_, i) => {
      const dt = new Date(start);
      dt.setUTCDate(dt.getUTCDate() + i);
      return {
        iso: dt.toISOString().slice(0, 10),
        label: dt.toLocaleDateString("es-CO", {
          weekday: "short",
          day: "numeric",
          month: "short",
          timeZone: "UTC",
        }),
      };
    });
  }, [fechaInicio]);

  const diaQrActivo = useMemo(() => resolverDiaQr(days, diaQr), [days, diaQr]);

  useHydratarAsistencia(proyectoId, fechaInicio, empleados, days, setAsistencia, setQrCells, setCargandoDatos, setMessage);

  function updateCell(empleadoId: string, dayIndex: number, field: keyof DiaAsistencia, value: string) {
    setAsistencia((prev) => {
      const updated = { ...prev };
      if (!updated[empleadoId]) return prev;
      updated[empleadoId] = [...updated[empleadoId]];
      updated[empleadoId][dayIndex] = { ...updated[empleadoId][dayIndex], [field]: value };
      return updated;
    });
    setQrCells((prev) => {
      if (!prev[empleadoId]?.includes(dayIndex)) return prev;
      const filtered = prev[empleadoId].filter((i) => i !== dayIndex);
      return { ...prev, [empleadoId]: filtered };
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
    if (!diaQrActivo) {
      setMessage({ type: "error", text: "Seleccione el día para el QR" });
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
          formatoTipo: "FOR-006",
          fecha: diaQrActivo,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Error al generar el QR");
      }

      const data = await res.json();
      const fullUrl = `${window.location.origin}${data.qrUrl}`;
      setQrUrl(fullUrl);
      setQrFecha(data.fecha);

      const qrDataUrl = await QRCode.toDataURL(fullUrl, { width: 300, margin: 2 });
      setQrImage(qrDataUrl);

      if (data.alreadyExisted) {
        setMessage({ type: "success", text: "Este día ya tenía un QR; se muestra el existente." });
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

  const hayRango = empleados.length > 0 && days.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Asistencia Diaria</h1>
          <p className="text-sm text-gray-500">FOR-006 - Registro de asistencia diaria del personal en obra</p>
        </div>
        <div className="flex flex-col sm:items-end gap-2">
          <div className="flex items-center gap-2">
            <label htmlFor="dia-qr" className="text-sm text-gray-600 whitespace-nowrap">
              Día del QR
            </label>
            <select
              id="dia-qr"
              value={diaQrActivo}
              onChange={(e) => setDiaQr(e.target.value)}
              disabled={days.length === 0}
              className="input w-auto"
            >
              {days.map((d) => (
                <option key={d.iso} value={d.iso}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="btn btn-primary">
              {saving ? "Guardando..." : "Guardar"}
            </button>
            <button
              onClick={handleGenerateQr}
              disabled={generatingQr || !diaQrActivo || esFechaPasada(diaQrActivo)}
              className="btn bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white"
            >
              {generatingQr ? "Generando..." : "Generar QR"}
            </button>
          </div>
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

      {hayRango &&
        (cargandoDatos ? (
          <div className="text-center text-gray-500 py-8">Cargando registros...</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="table-base">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 sticky left-0 bg-gray-50 border-b border-r border-gray-200 min-w-45">
                    Empleado
                  </th>
                  {days.map((day) => (
                    <th key={day.iso} className="px-3 py-2 text-center text-xs font-medium text-gray-500 border-b border-gray-200 min-w-35">
                      {day.label}
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
                          <div className="flex items-center gap-1">
                            <select
                              value={asistencia[emp.id]?.[dayIndex]?.sintomas || ""}
                              onChange={(e) => updateCell(emp.id, dayIndex, "sintomas", e.target.value)}
                              className="input"
                            >
                              <option value="">-</option>
                              <option value="SI">SI</option>
                              <option value="NO">NO</option>
                            </select>
                            {qrCells[emp.id]?.includes(dayIndex) && (
                              <span className="text-[10px] font-semibold bg-blue-100 text-blue-700 rounded px-1 py-0.5 shrink-0">
                                QR
                              </span>
                            )}
                          </div>
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
        ))}

      {empleados.length === 0 && (
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
