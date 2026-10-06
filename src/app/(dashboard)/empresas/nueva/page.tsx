"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NuevaEmpresaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const body: Record<string, string> = {};
    form.forEach((value, key) => {
      if (key !== "logo") body[key] = value as string;
    });

    try {
      const res = await fetch("/api/empresas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al crear empresa");
      }

      router.push("/empresas");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Nueva Empresa</h1>

      <form onSubmit={handleSubmit} className="space-y-4 card p-6">
        <Field name="nombre" label="Nombre" required />
        <Field name="nit" label="NIT" required />
        <Field name="responsable" label="Responsable" required />
        <Field name="emailResponsable" label="Email Responsable" type="email" required />
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
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary py-2.5"
          >
            {loading ? "Guardando..." : "Guardar"}
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

function Field({ name, label, required, type }: { name: string; label: string; required?: boolean; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type || "text"}
        required={required}
        className="input"
      />
    </div>
  );
}
