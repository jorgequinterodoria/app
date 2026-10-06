"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Empresa {
  id: string;
  nombre: string;
  nit: string;
  responsable: string;
  emailResponsable: string;
  logo: string | null;
}

export default function EmpresaDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/empresas/${id}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("No encontrada");
        return res.json();
      })
      .then(setEmpresa)
      .catch(() => setError("Error al cargar empresa"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body: Record<string, string> = {};
    form.forEach((value, key) => {
      if (key !== "logo") body[key] = value as string;
    });

    try {
      const res = await fetch(`/api/empresas/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al guardar");

      router.push("/empresas");
    } catch {
      setError("Error al guardar los cambios");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("¿Eliminar esta empresa?")) return;

    const res = await fetch(`/api/empresas/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) router.push("/empresas");
  }

  if (loading) {
    return <p className="text-gray-500">Cargando...</p>;
  }

  if (!empresa) {
    return <p className="text-red-600">{error || "Empresa no encontrada"}</p>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Editar Empresa</h1>
        <button
          onClick={handleDelete}
          className="btn btn-danger-outline"
        >
          Eliminar
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 card p-6">
        <Field name="nombre" label="Nombre" defaultValue={empresa.nombre} required />
        <Field name="nit" label="NIT" defaultValue={empresa.nit} required />
        <Field name="responsable" label="Responsable" defaultValue={empresa.responsable} required />
        <Field name="emailResponsable" label="Email Responsable" defaultValue={empresa.emailResponsable} type="email" required />
        <div>
          <label htmlFor="logo" className="label">
            Logo
          </label>
          <input
            id="logo"
            name="logo"
            type="file"
            accept="image/*"
            className="input"
          />
          {empresa.logo && (
            <p className="mt-1 text-xs text-gray-500">Archivo actual: {empresa.logo}</p>
          )}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary py-2.5"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-secondary py-2.5"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  defaultValue,
  required,
  type,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type || "text"}
        defaultValue={defaultValue}
        required={required}
        className="input"
      />
    </div>
  );
}
