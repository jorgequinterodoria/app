import { metricasFor006 } from "./for-006";
import { metricasFor009 } from "./for-009";
import { metricasFor015 } from "./for-015";
import { metricasFor083 } from "./for-083";
import type { MetricaDefinition } from "./tipos";

/**
 * Lista curada de formularios acumulativos con métricas.
 * Estar en este registro ES el flag "acumulativo": la pestaña de métricas
 * aparece en /formatos/[codigo] solo si el código está aquí.
 */
export const registroMetricas: Record<string, MetricaDefinition> = {
  "FOR-006": metricasFor006,
  "FOR-009": metricasFor009,
  "FOR-015": metricasFor015,
  "FOR-083": metricasFor083,
};

export function tieneMetricas(codigo: string): boolean {
  return Boolean(registroMetricas[codigo]);
}
