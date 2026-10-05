"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ContenidoFormato } from "@/components/formatos/contenido-formato";

function CodigoContent({ codigo }: { codigo: string }) {
  const searchParams = useSearchParams();
  const proyectoId = searchParams.get("proyectoId") || "";
  return <ContenidoFormato codigo={codigo} proyectoId={proyectoId} />;
}

export default function FormatoCodigoPage({ params }: { params: Promise<{ codigo: string }> }) {
  const { codigo } = use(params);
  return (
    <Suspense fallback={<div className="text-gray-500 p-4">Cargando...</div>}>
      <CodigoContent codigo={codigo} />
    </Suspense>
  );
}
