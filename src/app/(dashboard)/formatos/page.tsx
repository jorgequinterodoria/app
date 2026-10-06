"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { registro, agrupaPorGrupo, buscaFormatos, resuelveHref } from "@/lib/formatos/registro";
import type { EntradaRegistro } from "@/lib/formatos/tipos";

function hrefFormato(entrada: EntradaRegistro, proyectoId: string): string {
  if (entrada.href) {
    const destino = resuelveHref(entrada.href, proyectoId);
    // Rutas que ya llevan el proyecto integrado (/proyectos/{id}/...) no necesitan query extra
    if (entrada.href.includes("{proyectoId}")) return destino;
    return `${destino}?proyectoId=${proyectoId}`;
  }
  return `/formatos/${entrada.codigo}?proyectoId=${proyectoId}`;
}

function FormatGroups({ entradas, proyectoId }: { entradas: EntradaRegistro[]; proyectoId: string }) {
  const grupos = agrupaPorGrupo(entradas);

  if (grupos.length === 0) {
    return <p className="text-gray-500 text-center py-8">No se encontraron formatos.</p>;
  }

  return (
    <div className="space-y-8">
      {grupos.map((g) => (
        <div key={g.grupo}>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{g.grupo}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {g.entradas.map((f) => (
              <Link
                key={f.codigo}
                href={hrefFormato(f, proyectoId)}
                className="card block p-4 hover:shadow-md hover:border-blue-300 transition-all"
              >
                <span className="text-xs font-mono text-primary">{f.codigo}</span>
                <p className="text-sm font-medium text-gray-900 mt-1">{f.nombre}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FormatosContent() {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";
  const [busqueda, setBusqueda] = useState("");

  const entradas = buscaFormatos(registro, busqueda);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Formatos</h1>
        {proyectoId && (
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por código o nombre..."
            className="input sm:w-72"
          />
        )}
      </div>
      {!proyectoId ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg px-4 py-3 text-sm">
          Seleccione un proyecto primero para ver los formatos disponibles.
        </div>
      ) : (
        <Suspense fallback={<div className="text-gray-500">Cargando...</div>}>
          <FormatGroups entradas={entradas} proyectoId={proyectoId} />
        </Suspense>
      )}
    </div>
  );
}

export default function FormatosPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Cargando...</div>}>
      <FormatosContent />
    </Suspense>
  );
}
