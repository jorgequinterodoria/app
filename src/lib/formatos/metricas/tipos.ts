export interface RegistroFormato {
  id: string;
  codigo: string;
  datos: Record<string, unknown> | null;
  createdAt: string;
}

export interface ContextoMetricas {
  empleados?: Array<{ id: string; nombre: string }>;
}

export interface TarjetaMetrica {
  tipo: "tarjeta";
  etiqueta: string;
  valor: string | number;
  subtitulo?: string;
}

export interface ItemRanking {
  etiqueta: string;
  valor: number;
}

export interface RankingMetrica {
  tipo: "ranking";
  titulo: string;
  items: ItemRanking[];
}

export interface DistribucionMetrica {
  tipo: "distribucion";
  titulo: string;
  items: ItemRanking[];
}

export type BloqueMetrica = TarjetaMetrica | RankingMetrica | DistribucionMetrica;

export interface MetricaDefinition {
  codigo: string;
  titulo: string;
  /** true cuando la métrica necesita el catálogo de empleados del proyecto. */
  requiereEmpleados?: boolean;
  compute: (registros: RegistroFormato[], contexto?: ContextoMetricas) => BloqueMetrica[];
}
