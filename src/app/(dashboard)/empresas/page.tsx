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
        <h1 className="text-xl font-semibold text-gray-900">Empresas</h1>
        <Link
          href="/empresas/nueva"
          className="btn btn-primary"
        >
          + Nueva
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-500 text-sm">Cargando...</p>
        </div>
      ) : empresas.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">No hay empresas registradas.</p>
          <Link
            href="/empresas/nueva"
            className="mt-4 inline-block link"
          >
            Crear la primera empresa
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {empresas.map((empresa) => (
            <div
              key={empresa.id}
              className="card block p-5"
            >
              <Link
                href={`/proyectos?empresa=${empresa.id}`}
                className="block"
              >
                <h2 className="text-lg font-semibold text-gray-900 truncate hover:text-primary">
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
                  className="link text-xs"
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
