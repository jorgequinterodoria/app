"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Empresa {
  id: string;
  nombre: string;
  nit: string;
  responsable: string;
}

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/empresas", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar");
        return res.json();
      })
      .then((data) => setEmpresas(data))
      .catch(() => setEmpresas([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Empresas</h1>
        <Link
          href="/empresas/nueva"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          + Nueva
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-500 text-sm">Cargando...</p>
        </div>
      ) : empresas.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">No hay empresas registradas.</p>
          <Link
            href="/empresas/nueva"
            className="mt-4 inline-block text-blue-600 font-medium hover:underline"
          >
            Crear la primera empresa
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {empresas.map((empresa) => (
            <div
              key={empresa.id}
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <Link
                href={`/proyectos?empresa=${empresa.id}`}
                className="block"
              >
                <h2 className="text-lg font-semibold text-gray-900 truncate hover:text-blue-600">
                  {empresa.nombre}
                </h2>
                <p className="mt-1 text-sm text-gray-500 truncate">
                  NIT: {empresa.nit}
                </p>
                <p className="mt-1 text-sm text-gray-500 truncate">
                  Responsable: {empresa.responsable}
                </p>
              </Link>
              <div className="mt-4 flex items-center justify-between">
                <Link
                  href={`/proyectos?empresa=${empresa.id}`}
                  className="text-xs font-medium text-blue-600 hover:underline"
                >
                  Ver proyectos →
                </Link>
                <Link
                  href={`/empresas/${empresa.id}`}
                  className="text-xs font-medium text-gray-500 hover:text-gray-700 hover:underline"
                >
                  Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
