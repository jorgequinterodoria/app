"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface MatrizRow {
  id: number;
  proceso: string;
  actividad: string;
  peligro: string;
  consecuencia: string;
  personasExpuestas: string;
  controlsExistentes: string;
  probabilidad: "" | "Baja" | "Media" | "Alta";
  severidad: "" | "Baja" | "Media" | "Alta";
  nivelRiesgo: "" | "Bajo" | "Medio" | "Alto" | "Crítico";
  tratamiento: string;
}

function MatrizPeligrosForm() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";

  const [filas, setFilas] = useState<MatrizRow[]>([]);
  const [inspeccionadoPor, setInspeccionadoPor] = useState("");
  const [fecha, setFecha] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState<{ type: "success" | "error"; text: string } | null>(null);

  type FormatoMatriz = {
    codigo: string;
    datos?: {
      filas?: MatrizRow[];
      inspeccionadoPor?: string;
      fecha?: string;
    };
  };

  useEffect(() => {
    if (!proyectoId) return;
    fetch(`/api/formatos?proyectoId=${proyectoId}&codigo=FOR-069`, { credentials: "include" })
      .then((res) => res.json())
      .then((data: FormatoMatriz[]) => {
        const ultimo = data.find((f) => f.codigo === "FOR-069");
        if (ultimo?.datos?.filas) setFilas(ultimo.datos.filas);
        if (ultimo?.datos?.inspeccionadoPor) setInspeccionadoPor(ultimo.datos.inspeccionadoPor);
        if (ultimo?.datos?.fecha) setFecha(ultimo.datos.fecha);
      })
      .catch(() => {});
  }, [proyectoId]);

  function agregarFila() {
    setFilas((prev) => [
      ...prev,
      {
        id: Date.now(),
        proceso: "", actividad: "", peligro: "", consecuencia: "",
        personasExpuestas: "", controlsExistentes: "",
        probabilidad: "", severidad: "", nivelRiesgo: "", tratamiento: "",
      },
    ]);
  }

  function eliminarFila(id: number) {
    setFilas((prev) => prev.filter((f) => f.id !== id));
  }

  function actualizarFila(id: number, campo: keyof MatrizRow, valor: string) {
    setFilas((prev) =>
      prev.map((f) => {
        if (f.id !== id) return f;
        const updated = { ...f, [campo]: valor };
        if (campo === "probabilidad" || campo === "severidad") {
          const p = campo === "probabilidad" ? valor : f.probabilidad;
          const s = campo === "severidad" ? valor : f.severidad;
          updated.nivelRiesgo = calcularNivel(p, s);
        }
        return updated;
      })
    );
  }

  function calcularNivel(prob: string, sev: string): MatrizRow["nivelRiesgo"] {
    if (!prob || !sev) return "";
    const map: Record<string, number> = { "Baja": 1, "Media": 2, "Alta": 3 };
    const total = (map[prob] ?? 1) + (map[sev] ?? 1);
    if (total <= 2) return "Bajo";
    if (total <= 4) return "Medio";
    if (total <= 5) return "Alto";
    return "Crítico";
  }

  async function handleGuardar() {
    setGuardando(true);
    setMensaje(null);
    try {
      const res = await fetch("/api/formatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proyectoId,
          tipo: "Matriz de Control Operativo SST",
          codigo: "FOR-069",
          datos: { filas, inspeccionadoPor, fecha },
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

  const riesgoColor: Record<string, string> = {
    Bajo: "text-green-600 bg-green-50",
    Medio: "text-yellow-700 bg-yellow-50",
    Alto: "text-orange-600 bg-orange-50",
    Critico: "text-red-700 bg-red-50",
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Matriz de Control Operativo SST</h1>
          <p className="text-sm text-gray-500">FOR-069</p>
        </div>
        <div className="flex gap-2">
          <button onClick={agregarFila}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors">
            + Agregar fila
          </button>
          <button onClick={handleGuardar} disabled={guardando}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors">
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>

      {mensaje && (
        <div className={`rounded-lg px-4 py-3 text-sm ${mensaje.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
          {mensaje.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Inspeccionado por</label>
          <input type="text" value={inspeccionadoPor} onChange={(e) => setInspeccionadoPor(e.target.value)}
            placeholder="Nombre del inspector"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
        </div>
      </div>

      {filas.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-xl border border-gray-200">
          No hay registros. Haga clic en &quot;+ Agregar fila&quot; para comenzar.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 border-b whitespace-nowrap">Proceso</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 border-b whitespace-nowrap">Actividad</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 border-b whitespace-nowrap">Peligro</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 border-b whitespace-nowrap">Consecuencia</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 border-b whitespace-nowrap">Personas exp.</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 border-b whitespace-nowrap">Controles existentes</th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 border-b">Prob.</th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 border-b">Sev.</th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 border-b">Nivel</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 border-b">Tratamiento</th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 border-b w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filas.map((fila) => (
                <tr key={fila.id} className="hover:bg-gray-50">
                  <td className="px-2 py-1 border-b"><input type="text" value={fila.proceso} onChange={(e) => actualizarFila(fila.id, "proceso", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-xs" /></td>
                  <td className="px-2 py-1 border-b"><input type="text" value={fila.actividad} onChange={(e) => actualizarFila(fila.id, "actividad", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-xs" /></td>
                  <td className="px-2 py-1 border-b"><input type="text" value={fila.peligro} onChange={(e) => actualizarFila(fila.id, "peligro", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-xs" /></td>
                  <td className="px-2 py-1 border-b"><input type="text" value={fila.consecuencia} onChange={(e) => actualizarFila(fila.id, "consecuencia", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-xs" /></td>
                  <td className="px-2 py-1 border-b"><input type="text" value={fila.personasExpuestas} onChange={(e) => actualizarFila(fila.id, "personasExpuestas", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-xs" /></td>
                  <td className="px-2 py-1 border-b"><input type="text" value={fila.controlsExistentes} onChange={(e) => actualizarFila(fila.id, "controlsExistentes", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-xs" /></td>
                  <td className="px-2 py-1 border-b text-center">
                    <select value={fila.probabilidad} onChange={(e) => actualizarFila(fila.id, "probabilidad", e.target.value)}
                      className="border border-gray-200 rounded px-1 py-1 text-xs">
                      <option value="">-</option>
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </td>
                  <td className="px-2 py-1 border-b text-center">
                    <select value={fila.severidad} onChange={(e) => actualizarFila(fila.id, "severidad", e.target.value)}
                      className="border border-gray-200 rounded px-1 py-1 text-xs">
                      <option value="">-</option>
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </select>
                  </td>
                  <td className="px-2 py-1 border-b text-center">
                    {fila.nivelRiesgo ? (
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${riesgoColor[fila.nivelRiesgo]}`}>{fila.nivelRiesgo}</span>
                    ) : <span className="text-gray-300">-</span>}
                  </td>
                  <td className="px-2 py-1 border-b"><input type="text" value={fila.tratamiento} onChange={(e) => actualizarFila(fila.id, "tratamiento", e.target.value)}
                    className="w-full border border-gray-200 rounded px-2 py-1 text-xs" /></td>
                  <td className="px-2 py-1 border-b text-center">
                    <button onClick={() => eliminarFila(fila.id)}
                      className="text-red-400 hover:text-red-600 text-lg leading-none">&times;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function MatrizControlPage() {
  return (
    <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
      <MatrizPeligrosForm />
    </Suspense>
  );
}
