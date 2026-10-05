"use client";

import { useEffect, useState } from "react";
import { registroMetricas } from "@/lib/formatos/metricas/registro-metricas";
import type { BloqueMetrica, ItemRanking, RegistroFormato } from "@/lib/formatos/metricas/tipos";

interface Props {
  codigo: string;
  proyectoId: string;
}

function BarraItems({ items }: { items: ItemRanking[] }) {
  const max = Math.max(...items.map((i) => i.valor), 1);
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.etiqueta}>
          <div className="flex items-center justify-between text-sm text-gray-700 mb-1">
            <span className="truncate pr-2">{item.etiqueta}</span>
            <span className="font-semibold text-gray-900">{item.valor}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded overflow-hidden">
            <div
              className="h-2 bg-blue-500 rounded"
              style={{ width: `${Math.max(4, Math.round((item.valor / max) * 100))}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Bloques({ bloques }: { bloques: BloqueMetrica[] }) {
  const tarjetas = bloques.filter((b) => b.tipo === "tarjeta");
  const listas = bloques.filter((b) => b.tipo !== "tarjeta");
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {tarjetas.map((t) => (
          <div key={t.etiqueta} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900 break-words">{t.valor}</div>
            <div className="text-xs text-gray-500 mt-1">{t.etiqueta}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {listas.map((b) => (
          <div key={b.titulo} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">{b.titulo}</h3>
            {b.items.length === 0 ? (
              <p className="text-sm text-gray-400">Sin datos para mostrar.</p>
            ) : (
              <BarraItems items={b.items} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MetricasFormato({ codigo, proyectoId }: Props) {
  const def = registroMetricas[codigo];
  const [bloques, setBloques] = useState<BloqueMetrica[] | null>(null);
  const [vacio, setVacio] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!def || !proyectoId) return;
    let cancelado = false;

    const traeRegistros = fetch(`/api/formatos?proyectoId=${proyectoId}&codigo=${codigo}`, {
      credentials: "include",
    }).then((r) => (r.ok ? r.json() : Promise.reject(new Error("registros"))));

    const traeEmpleados = def.requiereEmpleados
      ? fetch(`/api/empleados?proyectoId=${proyectoId}`, { credentials: "include" }).then((r) =>
          r.ok ? r.json() : []
        )
      : Promise.resolve(undefined);

    Promise.all([traeRegistros, traeEmpleados])
      .then(([registros, empleados]) => {
        if (cancelado) return;
        const filas: RegistroFormato[] = Array.isArray(registros) ? registros : [];
        setVacio(filas.length === 0);
        setBloques(def.compute(filas, { empleados }));
      })
      .catch(() => {
        if (!cancelado) setError(true);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => {
      cancelado = true;
    };
  }, [codigo, proyectoId, def]);

  if (!def) return null;

  if (!proyectoId) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg px-4 py-3 text-sm">
        No se proporcionó un proyecto. Vuelva al listado y seleccione un proyecto.
      </div>
    );
  }

  if (cargando) {
    return <p className="text-sm text-gray-500">Calculando métricas…</p>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
        No se pudieron cargar las métricas. Intente de nuevo.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-semibold text-gray-900">{def.titulo}</h2>
        <span className="text-xs text-gray-400">{codigo}</span>
      </div>
      {vacio ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-6 text-sm text-gray-500 text-center">
          Este formato aún no tiene registros para calcular métricas.
        </div>
      ) : (
        bloques && <Bloques bloques={bloques} />
      )}
    </div>
  );
}
