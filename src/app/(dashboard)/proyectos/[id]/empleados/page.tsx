"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Empleado {
  id: string;
  nombre: string;
  identificacion: string;
  cargo: string;
  tipoVinculacion: string;
  eps: string | null;
  arl: string | null;
  cajaCompensacion: string | null;
  fechaIngreso: string;
}

export default function EmpleadosPage() {
  const params = useParams();
  const proyectoId = params.id as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/empleados?proyectoId=${proyectoId}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar empleados");
        return res.json();
      })
      .then((data) => setEmpleados(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [proyectoId]);

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Selecciona un archivo Excel");
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("proyectoId", proyectoId);

      const res = await fetch("/api/empleados/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al subir archivo");
      }

      const data = await res.json();
      setSuccess(`Se subieron ${data.count} empleados correctamente`);
      setEmpleados(data.employees);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-gray-900">Empleados</h1>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href={`/proyectos/${proyectoId}`}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Volver a proyecto
          </Link>
          <h1 className="mt-2 text-xl font-semibold text-gray-900">
            Empleados ({empleados.length})
          </h1>
        </div>
      </div>

      {/* Sección de carga */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Subir archivo Excel
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          El archivo debe tener columnas en este orden: Nombre, Identificación, Cargo, Tipo Vinculación, EPS, ARL, Caja Compensación, Fecha Ingreso
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-green-700 text-sm">
            {success}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            className="input flex-1 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="btn btn-primary"
          >
            {uploading ? "Subiendo..." : "Subir"}
          </button>
        </div>
      </div>

      {/* Lista de empleados */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Empleados registrados
        </h2>

        {empleados.length === 0 ? (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-500">No hay empleados registrados.</p>
            <p className="mt-2 text-sm text-gray-400">
              Sube un archivo Excel para agregar empleados.
            </p>
          </div>
        ) : (
          <>
            {/* Vista móvil: tarjetas */}
            <div className="sm:hidden space-y-3">
              {empleados.map((empleado) => (
                <div
                  key={empleado.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{empleado.nombre}</p>
                      <p className="text-sm text-gray-500">{empleado.cargo}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {empleado.identificacion}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-500">
                    <span>Vínculo: {empleado.tipoVinculacion}</span>
                    {empleado.eps && <span>EPS: {empleado.eps}</span>}
                    {empleado.arl && <span>ARL: {empleado.arl}</span>}
                    {empleado.cajaCompensacion && (
                      <span>Caja: {empleado.cajaCompensacion}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Vista escritorio: tabla */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="table-base">
                <thead className="bg-gray-50">
                  <tr>
                    <th>
                      Nombre
                    </th>
                    <th>
                      Identificación
                    </th>
                    <th>
                      Cargo
                    </th>
                    <th>
                      Tipo Vínculo
                    </th>
                    <th>
                      EPS
                    </th>
                    <th>
                      ARL
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.map((empleado) => (
                    <tr key={empleado.id}>
                      <td className="font-medium text-gray-900">
                        {empleado.nombre}
                      </td>
                      <td className="text-gray-500">
                        {empleado.identificacion}
                      </td>
                      <td className="text-gray-500">
                        {empleado.cargo}
                      </td>
                      <td className="text-gray-500">
                        {empleado.tipoVinculacion}
                      </td>
                      <td className="text-gray-500">
                        {empleado.eps || "-"}
                      </td>
                      <td className="text-gray-500">
                        {empleado.arl || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
