export type TipoCampo = "texto" | "area" | "fecha" | "numero" | "seleccion" | "si-no";

export interface CampoConfig {
  id: string;
  etiqueta: string;
  tipo: TipoCampo;
  opciones?: string[];
  requerido?: boolean;
  placeholder?: string;
}

export interface ColumnaTabla {
  id: string;
  etiqueta: string;
  tipo: TipoCampo;
  opciones?: string[];
}

export interface TablaConfig {
  id: string;
  columnas: ColumnaTabla[];
  filasIniciales?: Record<string, string>[];
  etiquetaAgregar?: string;
}

export interface SeccionConfig {
  id: string;
  titulo?: string;
  campos?: CampoConfig[];
  tablas?: TablaConfig[];
}

export interface FormatoConfig {
  codigo: string;
  nombre: string;
  grupo: string;
  secciones: SeccionConfig[];
}

export interface EntradaRegistro {
  codigo: string;
  nombre: string;
  grupo: string;
  /** Ruta de página artesanal; puede contener {proyectoId}. Si existe, se ignora `config`. */
  href?: string;
  /** Config del renderizador genérico cuando no hay página artesanal. */
  config?: FormatoConfig;
}
