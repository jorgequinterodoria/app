"use client";

import { useEffect, useState } from "react";
import type { CampoConfig, FormatoConfig, SeccionConfig, TablaConfig } from "@/lib/formatos/tipos";

type CamposState = Record<string, string>;
type TablasState = Record<string, Record<string, string>[]>;

interface Props {
  config: FormatoConfig;
  proyectoId: string;
}

const claseInput =
  "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
const claseInputCelda = "w-full border border-gray-300 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-500";

function filasIniciales(seccion: SeccionConfig): TablasState {
  const out: TablasState = {};
  for (const t of seccion.tablas ?? []) {
    out[t.id] = t.filasIniciales?.length
      ? t.filasIniciales.map((f) => ({ ...f }))
      : [Object.fromEntries(t.columnas.map((c) => [c.id, ""]))];
  }
  return out;
}

function Campo({ campo, value, onChange }: { campo: CampoConfig; value: string; onChange: (v: string) => void }) {
  const id = `campo-${campo.id}`;
  return (
    <div className={campo.tipo === "area" ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {campo.etiqueta}
      </label>
      {campo.tipo === "area" ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          placeholder={campo.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={claseInput}
        />
      ) : campo.tipo === "seleccion" ? (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={claseInput}>
          <option value="">Seleccionar...</option>
          {campo.opciones?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={campo.tipo === "fecha" ? "date" : campo.tipo === "numero" ? "number" : "text"}
          value={value}
          placeholder={campo.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={claseInput}
        />
      )}
    </div>
  );
}

function Celda({
  tipo,
  opciones,
  value,
  onChange,
}: {
  tipo: string;
  opciones?: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  if (tipo === "seleccion" || tipo === "si-no") {
    const opts = tipo === "si-no" ? ["SI", "NO"] : (opciones ?? []);
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)} className={claseInputCelda}>
        <option value="">-</option>
        {opts.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  if (tipo === "area") {
    return <textarea rows={2} value={value} onChange={(e) => onChange(e.target.value)} className={claseInputCelda} />;
  }
  return (
    <input
      type={tipo === "fecha" ? "date" : tipo === "numero" ? "number" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={claseInputCelda}
    />
  );
}

function Tabla({
  tabla,
  filas,
  onChange,
}: {
  tabla: TablaConfig;
  filas: Record<string, string>[];
  onChange: (f: Record<string, string>[]) => void;
}) {
  function update(idx: number, colId: string, v: string) {
    onChange(filas.map((f, i) => (i === idx ? { ...f, [colId]: v } : f)));
  }
  function add() {
    onChange([...filas, Object.fromEntries(tabla.columnas.map((c) => [c.id, ""]))]);
  }
  function remove(idx: number) {
    if (filas.length <= 1) return;
    onChange(filas.filter((_, i) => i !== idx));
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            {tabla.columnas.map((c) => (
              <th
                key={c.id}
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 border-b border-r border-gray-200"
              >
                {c.etiqueta}
              </th>
            ))}
            <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 border-b w-12">·</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {tabla.columnas.map((c) => (
                <td key={c.id} className="px-2 py-1.5 border-b border-r border-gray-200">
                  <Celda
                    tipo={c.tipo}
                    opciones={c.opciones}
                    value={fila[c.id] ?? ""}
                    onChange={(v) => update(idx, c.id, v)}
                  />
                </td>
              ))}
              <td className="px-1 py-1.5 border-b text-center">
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  aria-label={`Eliminar fila ${idx + 1}`}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={add}
        className="mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-1 rounded-lg text-sm transition-colors"
      >
        {tabla.etiquetaAgregar ?? "+ Agregar fila"}
      </button>
    </div>
  );
}

export function Formatorenderizador({ config, proyectoId }: Props) {
  const [campos, setCampos] = useState<CamposState>({});
  const [tablas, setTablas] = useState<TablasState>(() => {
    const init: TablasState = {};
    for (const s of config.secciones) Object.assign(init, filasIniciales(s));
    return init;
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!proyectoId) return;
    let cancelado = false;
    fetch(`/api/formatos?proyectoId=${proyectoId}&codigo=${config.codigo}`, { credentials: "include" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: Array<{ codigo: string; datos: { campos?: CamposState; tablas?: TablasState } }>) => {
        if (cancelado || !Array.isArray(data)) return;
        const ultimo = data.filter((f) => f.codigo === config.codigo).at(-1);
        if (ultimo?.datos?.campos) setCampos((prev) => ({ ...prev, ...ultimo.datos.campos }));
        if (ultimo?.datos?.tablas) setTablas((prev) => ({ ...prev, ...ultimo.datos.tablas }));
      })
      .catch(() => {});
    return () => {
      cancelado = true;
    };
  }, [proyectoId, config.codigo]);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/formatos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proyectoId,
          tipo: config.nombre,
          codigo: config.codigo,
          datos: { campos, tablas },
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
          <h1 className="text-2xl font-bold text-gray-900">{config.nombre}</h1>
          <p className="text-sm text-gray-500">{config.codigo}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
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

      {config.secciones.map((sec) => (
        <div key={sec.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4">
          {sec.titulo && <h2 className="font-semibold text-gray-900">{sec.titulo}</h2>}
          {sec.campos && sec.campos.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sec.campos.map((c) => (
                <Campo
                  key={c.id}
                  campo={c}
                  value={campos[c.id] ?? ""}
                  onChange={(v) => setCampos((p) => ({ ...p, [c.id]: v }))}
                />
              ))}
            </div>
          )}
          {(sec.tablas ?? []).map((t) => (
            <div key={t.id}>
              <Tabla tabla={t} filas={tablas[t.id] ?? []} onChange={(f) => setTablas((p) => ({ ...p, [t.id]: f }))} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
