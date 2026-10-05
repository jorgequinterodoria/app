"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Proyecto {
  id: string;
  empresaId: string;
  nombre: string;
  descripcion: string | null;
  contratante: string;
  ejecutor: string;
  contrato: string;
  tipoContrato: string;
  proyecto: string | null;
  alcance: string | null;
  fechaInicio: string;
  fechaFin: string;
  estado: string;
  createdAt: string;
}

function ProyectosContent() {
  const searchParams = useSearchParams();
  const empresaId = searchParams.get("empresa");
  const [empresas, setEmpresas] = useState<{ id: string; nombre: string }[]>([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(empresaId || "");
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/empresas", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setEmpresas(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedEmpresa) return;

    let isActive = true;

    fetch(`/api/proyectos?empresaId=${selectedEmpresa}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar proyectos");
        return res.json();
      })
      .then((data) => {
        if (isActive) {
          setProyectos(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isActive) {
          setError(err instanceof Error ? err.message : "Error al cargar proyectos");
          setProyectos([]);
        }
      });

    return () => {
      isActive = false;
    };
  }, [selectedEmpresa]);

  if (!empresaId && empresas.length > 0 && !selectedEmpresa) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecciona una empresa para ver sus proyectos
          </label>
          <select
            value={selectedEmpresa}
            onChange={(e) => {
              setSelectedEmpresa(e.target.value);
              window.history.replaceState(null, "", `/proyectos?empresa=${e.target.value}`);
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm"
          >
            <option value="">Seleccionar empresa...</option>
            {empresas.map((e) => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
        <Link
          href={`/proyectos/nueva?empresa=${selectedEmpresa}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          + Nuevo Proyecto
        </Link>
      </div>

      {proyectos.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-gray-500">No hay proyectos registrados.</p>
          <Link
            href={`/proyectos/nueva?empresa=${selectedEmpresa}`}
            className="mt-4 inline-block text-blue-600 font-medium hover:underline"
          >
            Crear el primer proyecto
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proyectos.map((proyecto) => (
            <Link
              key={proyecto.id}
              href={`/proyectos/${proyecto.id}`}
              className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {proyecto.nombre}
                </h2>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    proyecto.estado === "activa"
                      ? "bg-green-100 text-green-800"
                      : proyecto.estado === "finalizada"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {proyecto.estado}
                </span>
              </div>
              {proyecto.descripcion && (
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {proyecto.descripcion}
                </p>
              )}
              <div className="mt-4 space-y-1">
                <p className="text-xs text-gray-500">
                  Contratante: {proyecto.contratante}
                </p>
                <p className="text-xs text-gray-500">
                  Inicio: {new Date(proyecto.fechaInicio).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  Fin: {new Date(proyecto.fechaFin).toLocaleDateString()}
                </p>
              </div>
              <div className="mt-4">
                <span className="text-xs font-medium text-blue-600 hover:underline">
                  Ver detalles →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProyectosPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Cargando...</div>}>
      <ProyectosContent />
    </Suspense>
  );
}
