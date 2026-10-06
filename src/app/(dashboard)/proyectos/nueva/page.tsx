"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Empresa {
  id: string;
  nombre: string;
}

function NuevoProyectoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const empresaIdParam = searchParams.get("empresa");

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresaId, setEmpresaId] = useState(empresaIdParam || "");

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    contratante: "",
    ejecutor: "",
    contrato: "",
    tipoContrato: "",
    proyecto: "",
    alcance: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/empresas", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setEmpresas(data))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!empresaId) {
      setError("Selecciona una empresa");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/proyectos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          empresaId,
          ...form,
          fechaInicio: new Date(form.fechaInicio).toISOString(),
          fechaFin: new Date(form.fechaFin).toISOString(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al crear proyecto");
      }

      router.push(`/proyectos?empresa=${empresaId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Nuevo Proyecto</h1>
        <Link
          href={empresaId ? `/proyectos?empresa=${empresaId}` : "/proyectos"}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="label">
            Empresa *
          </label>
          <select
            required
            value={empresaId}
            onChange={(e) => setEmpresaId(e.target.value)}
            className="input"
          >
            <option value="">Seleccionar empresa...</option>
            {empresas.map((e) => (
              <option key={e.id} value={e.id}>{e.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">
            Nombre *
          </label>
          <input
            type="text"
            required
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="input"
            placeholder="Nombre del proyecto"
          />
        </div>

        <div>
          <label className="label">
            Descripción
          </label>
          <textarea
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="input"
            rows={3}
            placeholder="Descripción del proyecto"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">
              Contratante
            </label>
            <input
              type="text"
              value={form.contratante}
              onChange={(e) => setForm({ ...form, contratante: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="label">
              Ejecutor
            </label>
            <input
              type="text"
              value={form.ejecutor}
              onChange={(e) => setForm({ ...form, ejecutor: e.target.value })}
              className="input"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">
              Contrato
            </label>
            <input
              type="text"
              value={form.contrato}
              onChange={(e) => setForm({ ...form, contrato: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="label">
              Tipo de Contrato
            </label>
            <input
              type="text"
              value={form.tipoContrato}
              onChange={(e) => setForm({ ...form, tipoContrato: e.target.value })}
              className="input"
            />
          </div>
        </div>

        <div>
          <label className="label">
            Proyecto
          </label>
          <input
            type="text"
            value={form.proyecto}
            onChange={(e) => setForm({ ...form, proyecto: e.target.value })}
            className="input"
          />
        </div>

        <div>
          <label className="label">
            Alcance
          </label>
          <textarea
            value={form.alcance}
            onChange={(e) => setForm({ ...form, alcance: e.target.value })}
            className="input"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">
              Fecha Inicio *
            </label>
            <input
              type="date"
              required
              value={form.fechaInicio}
              onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="label">
              Fecha Fin *
            </label>
            <input
              type="date"
              required
              value={form.fechaFin}
              onChange={(e) => setForm({ ...form, fechaFin: e.target.value })}
              className="input"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full py-2.5"
        >
          {loading ? "Creando..." : "Crear Proyecto"}
        </button>
      </form>
    </div>
  );
}

export default function NuevoProyectoPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Cargando...</div>}>
      <NuevoProyectoContent />
    </Suspense>
  );
}
