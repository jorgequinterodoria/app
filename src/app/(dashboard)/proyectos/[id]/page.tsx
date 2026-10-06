"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
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
}

interface Empleado {
  id: string;
  nombre: string;
  identificacion: string;
  cargo: string;
  tipoVinculacion: string;
}

export default function ProyectoDetailPage() {
  const params = useParams();
  const proyectoId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [proyecto, setProyecto] = useState<Proyecto | null>(null);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/proyectos/${proyectoId}`, { credentials: "include" }).then((res) => {
        if (!res.ok) throw new Error("Error al cargar proyecto");
        return res.json();
      }),
      fetch(`/api/empleados?proyectoId=${proyectoId}`, { credentials: "include" }).then((res) => {
        if (!res.ok) throw new Error("Error al cargar empleados");
        return res.json();
      }),
    ])
      .then(([proyectoData, empleadosData]) => {
        setProyecto(proyectoData);
        setEmpleados(empleadosData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [proyectoId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadMsg(null);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("proyectoId", proyectoId);

    try {
      const res = await fetch("/api/empleados/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al subir archivo");
      }

      const data = await res.json();
      setUploadMsg(`${data.count} empleados cargados correctamente`);
      setEmpleados(data.employees);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir archivo");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-gray-900">Proyecto</h1>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error && !proyecto) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-gray-900">Proyecto</h1>
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/proyectos?empresa=${proyecto!.empresaId}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Volver a proyectos
          </Link>
          <h1 className="mt-2 text-xl font-semibold text-gray-900">{proyecto!.nombre}</h1>
        </div>
        <span
          className={`badge ${
            proyecto!.estado === "activa"
              ? "bg-green-100 text-green-800"
              : proyecto!.estado === "finalizada"
              ? "bg-gray-100 text-gray-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {proyecto!.estado}
        </span>
      </div>

      {/* Detalles del proyecto */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Información</h2>
        {proyecto!.descripcion && (
          <p className="text-sm text-gray-600 mb-4">{proyecto!.descripcion}</p>
        )}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Contratante:</span>{" "}
            <span className="text-gray-600">{proyecto!.contratante}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Ejecutor:</span>{" "}
            <span className="text-gray-600">{proyecto!.ejecutor}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Contrato:</span>{" "}
            <span className="text-gray-600">{proyecto!.contrato}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Tipo de Contrato:</span>{" "}
            <span className="text-gray-600">{proyecto!.tipoContrato}</span>
          </div>
          {proyecto!.proyecto && (
            <div>
              <span className="font-medium text-gray-700">Proyecto:</span>{" "}
              <span className="text-gray-600">{proyecto!.proyecto}</span>
            </div>
          )}
          {proyecto!.alcance && (
            <div className="col-span-2">
              <span className="font-medium text-gray-700">Alcance:</span>{" "}
              <span className="text-gray-600">{proyecto!.alcance}</span>
            </div>
          )}
          <div>
            <span className="font-medium text-gray-700">Inicio:</span>{" "}
            <span className="text-gray-600">
              {new Date(proyecto!.fechaInicio).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Fin:</span>{" "}
            <span className="text-gray-600">
              {new Date(proyecto!.fechaFin).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Empleados */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Empleados ({empleados.length})
          </h2>
        </div>

        {/* Botón de carga */}
        <div className="mb-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="btn btn-secondary"
          >
            {uploading ? "Subiendo..." : "Subir archivo Excel (FOR-003)"}
          </button>
          <span className="ml-3 text-xs text-gray-400">.xlsx, .xls, .csv</span>
        </div>

        {uploadMsg && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-green-700 text-sm">
            {uploadMsg}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        {empleados.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-500">No hay empleados registrados.</p>
            <p className="mt-1 text-xs text-gray-400">
              Sube un archivo Excel con el formato FOR-003 (Listado de personal)
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {empleados.slice(0, 10).map((empleado) => (
              <div
                key={empleado.id}
                className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
              >
                <div>
                  <p className="font-medium text-gray-900 text-sm">{empleado.nombre}</p>
                  <p className="text-xs text-gray-500">{empleado.cargo}</p>
                </div>
                <span className="text-xs text-gray-400">{empleado.identificacion}</span>
              </div>
            ))}
            {empleados.length > 10 && (
              <p className="text-center text-sm text-gray-500">
                Y {empleados.length - 10} más...
              </p>
            )}
          </div>
        )}
      </div>

      {/* Formatos */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Formatos</h2>
        <Link
          href={`/formatos?proyectoId=${proyectoId}`}
          className="btn btn-secondary"
        >
          Ver formatos SST →
        </Link>
      </div>
    </div>
  );
}
