"use client";

import { useState } from "react";
import Link from "next/link";
import { getEntrada, resuelveHref } from "@/lib/formatos/registro";
import { tieneMetricas } from "@/lib/formatos/metricas/registro-metricas";
import { Formatorenderizador } from "@/components/formatos/renderizador-formato";
import { MetricasFormato } from "./metricas-formato";

interface Props {
  codigo: string;
  proyectoId: string;
}

const claseTab = (activo: boolean) =>
  `px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
    activo ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-700"
  }`;

function VistaDiligenciar({ entrada, proyectoId }: { entrada: NonNullable<ReturnType<typeof getEntrada>>; proyectoId: string }) {
  if (entrada.href) {
    const destino = resuelveHref(entrada.href, proyectoId);
    const separador = destino.includes("?") ? "&" : "?";
    const query = destino.startsWith("/proyectos/") ? "" : `${separador}proyectoId=${proyectoId}`;
    return (
      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg px-4 py-3 text-sm space-y-2">
        <p>{entrada.nombre} tiene una página propia.</p>
        <Link className="underline font-medium" href={`${destino}${query}`}>
          Abrir {entrada.codigo} →
        </Link>
      </div>
    );
  }
  return <Formatorenderizador config={entrada.config!} proyectoId={proyectoId} />;
}

export function ContenidoFormato({ codigo, proyectoId }: Props) {
  const [vista, setVista] = useState<"diligenciar" | "metricas">("diligenciar");
  const entrada = getEntrada(codigo);
  const conMetricas = tieneMetricas(codigo);

  if (!entrada) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
        Formato {codigo.toUpperCase()} no encontrado.{" "}
        <Link className="underline" href={`/formatos?proyectoId=${proyectoId}`}>
          Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {conMetricas && (
        <div className="flex gap-1 border-b border-gray-200">
          <button
            type="button"
            onClick={() => setVista("diligenciar")}
            className={claseTab(vista === "diligenciar")}
          >
            Diligenciar
          </button>
          <button
            type="button"
            onClick={() => setVista("metricas")}
            className={claseTab(vista === "metricas")}
          >
            Métricas
          </button>
        </div>
      )}
      {conMetricas && vista === "metricas" ? (
        <MetricasFormato codigo={codigo} proyectoId={proyectoId} />
      ) : (
        <VistaDiligenciar entrada={entrada} proyectoId={proyectoId} />
      )}
    </div>
  );
}
