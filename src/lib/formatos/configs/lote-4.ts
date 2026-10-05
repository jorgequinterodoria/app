import type { FormatoConfig } from "../tipos";
import { checklistsIniciales } from "./checklists-iniciales";

const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

const COLS_SIN_NA = [
  { id: "requisito", etiqueta: "Requisito", tipo: "area" as const },
  { id: "si", etiqueta: "Sí", tipo: "si-no" as const },
  { id: "no", etiqueta: "No", tipo: "si-no" as const },
  { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" as const },
];

const COLS_CON_NA = [
  { id: "requisito", etiqueta: "Requisito", tipo: "area" as const },
  { id: "si", etiqueta: "Sí", tipo: "si-no" as const },
  { id: "no", etiqueta: "No", tipo: "si-no" as const },
  { id: "na", etiqueta: "N. A.", tipo: "si-no" as const },
  { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" as const },
];

export const configsLote4: Record<string, FormatoConfig> = {
  "FOR-110": {
    codigo: "FOR-110",
    nombre: "Control participación de los trabajadores en la inducción, reinducción y capacitación",
    grupo: "Personal y Dotación",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha del registro", tipo: "fecha", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inducción / capacitación", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Participantes",
        tablas: [
          {
            id: "participantes",
            etiquetaAgregar: "Agregar participante",
            columnas: [
              { id: "nombres", etiqueta: "Nombres y apellidos", tipo: "texto" },
              { id: "identificacion", etiqueta: "Identificación", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "induccionInicial", etiqueta: "Inducción inicial", tipo: "fecha" },
              { id: "reinduccion", etiqueta: "Reinducción", tipo: "fecha" },
              { id: "tema1", etiqueta: "Tema 1", tipo: "texto" },
              { id: "tema2", etiqueta: "Tema 2", tipo: "texto" },
              { id: "tema3", etiqueta: "Tema 3", tipo: "texto" },
              { id: "tema4", etiqueta: "Tema 4", tipo: "texto" },
              { id: "tema5", etiqueta: "Tema 5", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "observaciones",
        titulo: "Observaciones",
        campos: [{ id: "observaciones", etiqueta: "Observaciones", tipo: "area" }],
      },
    ],
  },
  "FOR-111": {
    codigo: "FOR-111",
    nombre: "Control participación notificación de riesgos",
    grupo: "Salud",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha del registro", tipo: "fecha", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la notificación", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Trabajadores notificados",
        tablas: [
          {
            id: "notificados",
            etiquetaAgregar: "Agregar trabajador",
            columnas: [
              { id: "nombres", etiqueta: "Nombres y apellidos", tipo: "texto" },
              { id: "identificacion", etiqueta: "Identificación", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "actividades", etiqueta: "Actividades que realiza el trabajador", tipo: "area" },
              { id: "fechaNotificacion", etiqueta: "Fecha de realización de notificación de riesgos", tipo: "fecha" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-112": {
    codigo: "FOR-112",
    nombre: "Control consolidado mensual de entrega de EPP",
    grupo: "Personal y Dotación",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "mes", etiqueta: "Mes", tipo: "seleccion", opciones: MESES, requerido: true },
          { id: "responsable", etiqueta: "Responsable del registro", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Entregas de elementos de protección personal",
        tablas: [
          {
            id: "entregas",
            etiquetaAgregar: "Agregar entrega",
            columnas: [
              { id: "nombres", etiqueta: "Nombres y apellidos", tipo: "texto" },
              { id: "identificacion", etiqueta: "Identificación", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "eppEntregado", etiqueta: "EPP entregado", tipo: "area" },
              { id: "fechaEntrega", etiqueta: "Fecha de entrega", tipo: "fecha" },
            ],
          },
        ],
      },
      {
        id: "observaciones",
        titulo: "Observaciones",
        campos: [{ id: "observaciones", etiqueta: "Observaciones", tipo: "area" }],
      },
    ],
  },
  "FOR-113": {
    codigo: "FOR-113",
    nombre: "Matriz de valoracion de riesgos de procesos",
    grupo: "Planeación y Gestión",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha de elaboración", tipo: "fecha", requerido: true },
          { id: "proceso", etiqueta: "Proceso evaluado", tipo: "texto", requerido: true },
          { id: "elaboradoPor", etiqueta: "Elaborado por", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Identificación y valoración de riesgos del proceso",
        tablas: [
          {
            id: "riesgos",
            etiquetaAgregar: "Agregar riesgo",
            columnas: [
              { id: "numero", etiqueta: "No.", tipo: "texto" },
              { id: "descripcion", etiqueta: "Descripción del riesgo / oportunidad (posible + evento)", tipo: "area" },
              { id: "clasificacion", etiqueta: "Clasificación del riesgo", tipo: "texto" },
              { id: "causas", etiqueta: "Causas posibles", tipo: "area" },
              { id: "efectos", etiqueta: "Efectos (consecuencias)", tipo: "area" },
              { id: "tip", etiqueta: "TIP", tipo: "numero" },
              { id: "tpp", etiqueta: "TPP", tipo: "numero" },
              { id: "evaluacion", etiqueta: "Evaluación del riesgo", tipo: "texto" },
              { id: "controlExistente", etiqueta: "Control existente", tipo: "area" },
              { id: "tni", etiqueta: "TNI", tipo: "numero" },
              { id: "tnp", etiqueta: "TNP", tipo: "numero" },
              { id: "valoracion", etiqueta: "Valoración del riesgo", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusiones",
        campos: [
          { id: "conclusiones", etiqueta: "Conclusiones y medidas de tratamiento", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-114": {
    codigo: "FOR-114",
    nombre: "Informe de avance de obra",
    grupo: "Registros y Soportes",
    secciones: [
      {
        id: "contrato",
        titulo: "1. Información del contrato",
        campos: [
          { id: "contratoObra", etiqueta: "Contrato de obra N°", tipo: "texto", requerido: true },
          { id: "contratoInterventoria", etiqueta: "Contrato de interventoría N°", tipo: "texto" },
          { id: "plazoInicial", etiqueta: "Plazo inicial", tipo: "texto" },
          { id: "fechaInicio", etiqueta: "Fecha de inicio", tipo: "fecha" },
          { id: "fechaTerminacion", etiqueta: "Fecha de terminación final", tipo: "fecha" },
          { id: "valorInicial", etiqueta: "Valor inicial", tipo: "numero" },
          { id: "valorAdiciones", etiqueta: "Valor de adiciones", tipo: "numero" },
          { id: "valorFinal", etiqueta: "Valor final", tipo: "numero" },
          { id: "interventoria", etiqueta: "Interventoría", tipo: "texto" },
          { id: "supervisor", etiqueta: "Supervisor", tipo: "texto" },
        ],
      },
      {
        id: "cantidades",
        titulo: "2. Informe de avance - cantidades de obra ejecutadas",
        tablas: [
          {
            id: "cantidades",
            etiquetaAgregar: "Agregar partida",
            columnas: [
              { id: "numero", etiqueta: "No.", tipo: "texto" },
              { id: "descripcion", etiqueta: "Descripción", tipo: "area" },
              { id: "unidad", etiqueta: "Unidad", tipo: "texto" },
              { id: "cantidad", etiqueta: "Cantidad", tipo: "numero" },
              { id: "valorUnitario", etiqueta: "Valor unitario", tipo: "numero" },
              { id: "valorTotal", etiqueta: "Valor total", tipo: "numero" },
              { id: "cantidadPeriodo", etiqueta: "Cantidad periodo", tipo: "numero" },
              { id: "valorPeriodo", etiqueta: "Valor periodo", tipo: "numero" },
              { id: "cantidadAcumulada", etiqueta: "Cantidad acumulada", tipo: "numero" },
              { id: "valorAcumulado", etiqueta: "Valor acumulado", tipo: "numero" },
              { id: "reportado", etiqueta: "Reportado", tipo: "numero" },
              { id: "diferencia", etiqueta: "Diferencia", tipo: "numero" },
            ],
          },
        ],
      },
      {
        id: "avance",
        titulo: "3. Resumen de avance",
        campos: [
          { id: "avanceFisicoAnterior", etiqueta: "% avance físico acumulado anterior", tipo: "numero" },
          { id: "avancePeriodo", etiqueta: "% avance físico del periodo", tipo: "numero" },
          { id: "avanceAcumulado", etiqueta: "% avance físico acumulado total", tipo: "numero" },
          { id: "avancePendiente", etiqueta: "% avance pendiente por ejecutar", tipo: "numero" },
          { id: "valorTotalProyecto", etiqueta: "Valor total del proyecto", tipo: "numero" },
          { id: "valorAvance", etiqueta: "Valor avance del proyecto", tipo: "numero" },
          { id: "observaciones", etiqueta: "Observaciones", tipo: "area" },
        ],
      },
      {
        id: "firmas",
        titulo: "Firmas",
        campos: [
          { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "fechaFirma", etiqueta: "Fecha", tipo: "fecha" },
        ],
      },
    ],
  },
  "FOR-115": {
    codigo: "FOR-115",
    nombre: "Modelo bitacora de obra",
    grupo: "Registros y Soportes",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "contratoObra", etiqueta: "Contrato de obra N°", tipo: "texto", requerido: true },
          { id: "contratista", etiqueta: "Contratista", tipo: "texto" },
          { id: "contratante", etiqueta: "Contratante", tipo: "texto" },
          { id: "interventoria", etiqueta: "Interventoría", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "diaSemana", etiqueta: "Día de la semana", tipo: "seleccion", opciones: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] },
          { id: "objeto", etiqueta: "Objeto del contrato", tipo: "area" },
        ],
      },
      {
        id: "tabla",
        titulo: "Registro diario de actividades",
        tablas: [
          {
            id: "bitacora",
            etiquetaAgregar: "Agregar día",
            columnas: [
              { id: "fecha", etiqueta: "Fecha", tipo: "fecha" },
              { id: "estadoTiempo", etiqueta: "Estado del tiempo", tipo: "seleccion", opciones: ["Seco", "Lluvia", "Soleado", "Nublado"] },
              { id: "tiempoLluvia", etiqueta: "Tiempo de lluvia (hh:mm)", tipo: "texto" },
              { id: "afectacion", etiqueta: "Afectación (hh:mm)", tipo: "texto" },
              { id: "personalObra", etiqueta: "Personal en obra (profesional, técnico, operativo)", tipo: "area" },
              { id: "frentesTrabajo", etiqueta: "Frentes de trabajo (número, personal y ubicación)", tipo: "area" },
              { id: "herramientas", etiqueta: "Herramientas y equipos menores (tipo y cantidad)", tipo: "area" },
              { id: "maquinaria", etiqueta: "Maquinaria y vehículos (tipo y cantidad)", tipo: "area" },
              { id: "actividades", etiqueta: "Actividades en obra", tipo: "area" },
              { id: "inspecciones", etiqueta: "Inspecciones y controles", tipo: "area" },
              { id: "inconvenientes", etiqueta: "Inconvenientes e imprevistos", tipo: "area" },
            ],
          },
        ],
      },
      {
        id: "legalizacion",
        titulo: "Legalización de firmas",
        campos: [
          { id: "directorObra", etiqueta: "Director de obra", tipo: "texto" },
          { id: "residenteObra", etiqueta: "Residente de obra", tipo: "texto" },
          { id: "directorInterventoria", etiqueta: "Director de interventoría", tipo: "texto" },
          { id: "residenteInterventoria", etiqueta: "Residente de interventoría", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-116": {
    codigo: "FOR-116",
    nombre: "Inspección de armado y desarmado de andamios",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "frente", etiqueta: "Frente / localización", tipo: "texto", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Actividad a inspeccionar", tipo: "area" },
        ],
      },
      {
        id: "tabla",
        titulo: "Requisito a inspeccionar",
        tablas: [
          {
            id: "requisitos",
            etiquetaAgregar: "Agregar requisito",
            columnas: COLS_SIN_NA,
            filasIniciales: checklistsIniciales["FOR-116"],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusión de inspección",
        campos: [
          { id: "condicionesAdecuadas", etiqueta: "¿Se cuenta en general con las condiciones de seguridad adecuadas para realizar la actividad?", tipo: "si-no" },
          { id: "procederSinCondiciones", etiqueta: "¿A pesar de no recomendarse, se procederá con la actividad? (si sí, describa los controles adicionales)", tipo: "si-no" },
          { id: "controlesAdicionales", etiqueta: "Controles adicionales definidos", tipo: "area" },
          { id: "observacionesGenerales", etiqueta: "Observaciones generales", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-117": {
    codigo: "FOR-117",
    nombre: "Inspección de escaleras",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "frente", etiqueta: "Frente / localización", tipo: "texto", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Actividad a inspeccionar", tipo: "area" },
        ],
      },
      {
        id: "tabla",
        titulo: "Requisito a inspeccionar",
        tablas: [
          {
            id: "requisitos",
            etiquetaAgregar: "Agregar requisito",
            columnas: COLS_SIN_NA,
            filasIniciales: checklistsIniciales["FOR-117"],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusión de inspección",
        campos: [
          { id: "condicionesAdecuadas", etiqueta: "¿Se cuenta en general con las condiciones de seguridad adecuadas para realizar la actividad?", tipo: "si-no" },
          { id: "procederSinCondiciones", etiqueta: "¿A pesar de no recomendarse, se procederá con la actividad? (si sí, describa los controles adicionales)", tipo: "si-no" },
          { id: "controlesAdicionales", etiqueta: "Controles adicionales definidos", tipo: "area" },
          { id: "observacionesGenerales", etiqueta: "Observaciones generales", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-118": {
    codigo: "FOR-118",
    nombre: "Inspección de condiciones seguras para trabajos eléctricos",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "frente", etiqueta: "Frente / localización", tipo: "texto", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Actividad a inspeccionar", tipo: "area" },
        ],
      },
      {
        id: "tabla",
        titulo: "Requisito a inspeccionar",
        tablas: [
          {
            id: "requisitos",
            etiquetaAgregar: "Agregar requisito",
            columnas: COLS_SIN_NA,
            filasIniciales: checklistsIniciales["FOR-118"],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusión de inspección",
        campos: [
          { id: "condicionesAdecuadas", etiqueta: "¿Se cuenta en general con las condiciones de seguridad adecuadas para realizar la actividad?", tipo: "si-no" },
          { id: "procederSinCondiciones", etiqueta: "¿A pesar de no recomendarse, se procederá con la actividad? (si sí, describa los controles adicionales)", tipo: "si-no" },
          { id: "controlesAdicionales", etiqueta: "Controles adicionales definidos", tipo: "area" },
          { id: "observacionesGenerales", etiqueta: "Observaciones generales", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-119": {
    codigo: "FOR-119",
    nombre: "Inspección de trabajo seguro de pintura, estuco y yeso",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "frente", etiqueta: "Frente / localización", tipo: "texto", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Actividad a inspeccionar", tipo: "area" },
        ],
      },
      {
        id: "tabla",
        titulo: "Requisito a inspeccionar",
        tablas: [
          {
            id: "requisitos",
            etiquetaAgregar: "Agregar requisito",
            columnas: COLS_SIN_NA,
            filasIniciales: checklistsIniciales["FOR-119"],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusión de inspección",
        campos: [
          { id: "condicionesAdecuadas", etiqueta: "¿Se cuenta en general con las condiciones de seguridad adecuadas para realizar la actividad?", tipo: "si-no" },
          { id: "procederSinCondiciones", etiqueta: "¿A pesar de no recomendarse, se procederá con la actividad? (si sí, describa los controles adicionales)", tipo: "si-no" },
          { id: "controlesAdicionales", etiqueta: "Controles adicionales definidos", tipo: "area" },
          { id: "observacionesGenerales", etiqueta: "Observaciones generales", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-120": {
    codigo: "FOR-120",
    nombre: "Acta de vecindad",
    grupo: "Registros y Soportes",
    secciones: [
      {
        id: "contractual",
        titulo: "1. Información contractual",
        campos: [
          { id: "contratoObra", etiqueta: "Contrato de obra N°", tipo: "texto", requerido: true },
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "elaboro", etiqueta: "Elaboró", tipo: "texto" },
          { id: "objeto", etiqueta: "Objeto del contrato", tipo: "area" },
          { id: "contratante", etiqueta: "Contratante", tipo: "texto" },
          { id: "contratista", etiqueta: "Contratista", tipo: "texto" },
          { id: "interventoria", etiqueta: "Interventoría", tipo: "texto" },
        ],
      },
      {
        id: "predio",
        titulo: "2. Información del predio",
        campos: [
          { id: "responsablePropiedad", etiqueta: "Responsable de la propiedad", tipo: "texto" },
          { id: "direccion", etiqueta: "Dirección", tipo: "texto" },
          { id: "telefono", etiqueta: "Teléfono", tipo: "texto" },
          { id: "municipio", etiqueta: "Municipio", tipo: "texto" },
          { id: "departamento", etiqueta: "Departamento", tipo: "texto" },
          { id: "tipoTenencia", etiqueta: "Tipo de tenencia", tipo: "seleccion", opciones: ["Arrendatario", "Poseedor", "Propietario", "Otro"] },
          { id: "arrendatario", etiqueta: "Arrendatario", tipo: "texto" },
          { id: "poseedor", etiqueta: "Poseedor", tipo: "texto" },
          { id: "propietario", etiqueta: "Propietario", tipo: "texto" },
          { id: "tenenciaOtro", etiqueta: "Otro (cuál)", tipo: "texto" },
          { id: "usoActual", etiqueta: "Uso actual", tipo: "seleccion", opciones: ["Residencial", "Comercial", "Industrial", "Institucional", "Recreacional", "Baldío", "Otro"] },
          { id: "usoOtro", etiqueta: "Otro uso (cuál)", tipo: "texto" },
          { id: "tipoPredio", etiqueta: "Tipo de predio", tipo: "seleccion", opciones: ["Construido", "En construcción", "Sin edificar", "Otro"] },
          { id: "tipoPredioOtro", etiqueta: "Otro tipo (cuál)", tipo: "texto" },
          { id: "accesoVehicular", etiqueta: "Acceso vehicular", tipo: "si-no" },
          { id: "garajes", etiqueta: "N° de garajes", tipo: "numero" },
          { id: "tipoUsoGaraje", etiqueta: "Tipo de uso del garaje", tipo: "texto" },
          { id: "area", etiqueta: "Área (m² / ha)", tipo: "texto" },
          { id: "dimensiones", etiqueta: "Dimensiones (m)", tipo: "texto" },
          { id: "pisos", etiqueta: "N° de pisos", tipo: "numero" },
          { id: "zona", etiqueta: "Zona", tipo: "seleccion", opciones: ["Urbano", "Rural"] },
          { id: "estrato", etiqueta: "Estrato", tipo: "texto" },
        ],
      },
      {
        id: "servicios",
        titulo: "Servicios públicos",
        tablas: [
          {
            id: "serviciosPublicos",
            etiquetaAgregar: "Agregar servicio",
            columnas: [
              { id: "servicio", etiqueta: "Servicio", tipo: "texto" },
              { id: "dispone", etiqueta: "Dispone", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: [
              { servicio: "Acueducto", dispone: "", observaciones: "" },
              { servicio: "Alcantarillado", dispone: "", observaciones: "" },
              { servicio: "Energía", dispone: "", observaciones: "" },
              { servicio: "Teléfono", dispone: "", observaciones: "" },
              { servicio: "Gas", dispone: "", observaciones: "" },
              { servicio: "Televisión - Cable", dispone: "", observaciones: "" },
              { servicio: "Otro - ¿cuál?", dispone: "", observaciones: "" },
            ],
          },
        ],
      },
      {
        id: "estadoPredio",
        titulo: "3. Estado del predio antes de la intervención del proyecto",
        campos: [
          { id: "estructura", etiqueta: "Estructura", tipo: "area" },
          { id: "grietas", etiqueta: "Grietas y fisuras", tipo: "area" },
          { id: "muros", etiqueta: "Muros", tipo: "area" },
          { id: "humedades", etiqueta: "Humedades", tipo: "area" },
          { id: "cubierta", etiqueta: "Cubierta", tipo: "area" },
          { id: "hundimientos", etiqueta: "Hundimiento de pisos", tipo: "area" },
          { id: "pisos", etiqueta: "Pisos", tipo: "area" },
          { id: "desplazamientos", etiqueta: "Desplazamientos", tipo: "area" },
          { id: "fachada", etiqueta: "Fachada", tipo: "area" },
          { id: "otro", etiqueta: "Otro / ¿cuál?", tipo: "texto" },
        ],
      },
      {
        id: "observaciones",
        titulo: "4. Observaciones adicionales",
        campos: [{ id: "observacionesAdicionales", etiqueta: "Observaciones adicionales", tipo: "area" }],
      },
      {
        id: "firmas",
        titulo: "Firmas",
        campos: [
          { id: "responsablePredio", etiqueta: "Responsable del predio", tipo: "texto" },
          { id: "representanteContratista", etiqueta: "Representante contratista", tipo: "texto" },
          { id: "representanteInterventoria", etiqueta: "Representante interventoría", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-121": {
    codigo: "FOR-121",
    nombre: "Formato de investigación de enfermedades laborales",
    grupo: "Salud",
    secciones: [
      {
        id: "empleador",
        titulo: "I. Identificación general del empleador, contratante o cooperativa",
        campos: [
          { id: "tipoVinculador", etiqueta: "Tipo de vinculador laboral", tipo: "seleccion", opciones: ["(1) Empleador", "(2) Contratante", "(3) Cooperativa de trabajo asociado"], requerido: true },
          { id: "nombreActividad", etiqueta: "Nombre de la actividad económica", tipo: "texto" },
          { id: "codigoActividad", etiqueta: "Código", tipo: "texto" },
          { id: "razonSocial", etiqueta: "Nombre o razón social", tipo: "texto", requerido: true },
          { id: "tipoIdentificacion", etiqueta: "Tipo de identificación", tipo: "seleccion", opciones: ["NI", "CC", "CE", "N. U.", "PA"] },
          { id: "numeroIdentificacion", etiqueta: "Número", tipo: "texto" },
          { id: "direccion", etiqueta: "Dirección", tipo: "texto" },
          { id: "telefono", etiqueta: "Teléfono", tipo: "texto" },
          { id: "correo", etiqueta: "Correo electrónico", tipo: "texto" },
          { id: "departamento", etiqueta: "Departamento", tipo: "texto" },
          { id: "municipio", etiqueta: "Municipio", tipo: "texto" },
          { id: "zona", etiqueta: "Zona", tipo: "seleccion", opciones: ["U", "R"] },
        ],
      },
      {
        id: "centroTrabajo",
        titulo: "Centro de trabajo donde labora el trabajador",
        campos: [
          { id: "mismoSede", etiqueta: "¿Los datos del centro de trabajo son los mismos de la sede principal?", tipo: "si-no" },
          { id: "nombreActividadCt", etiqueta: "Nombre de la actividad económica del centro de trabajo", tipo: "texto" },
          { id: "codigoCt", etiqueta: "Código de la actividad económica del centro de trabajo", tipo: "texto" },
          { id: "direccionCt", etiqueta: "Dirección", tipo: "texto" },
          { id: "telefonoCt", etiqueta: "Teléfono", tipo: "texto" },
          { id: "correoCt", etiqueta: "Correo electrónico", tipo: "texto" },
          { id: "departamentoCt", etiqueta: "Departamento", tipo: "texto" },
          { id: "municipioCt", etiqueta: "Municipio", tipo: "texto" },
          { id: "zonaCt", etiqueta: "Zona", tipo: "seleccion", opciones: ["U", "R"] },
        ],
      },
      {
        id: "trabajador",
        titulo: "II. Información de la persona que presenta la enfermedad laboral",
        campos: [
          { id: "eps", etiqueta: "EPS a la que está afiliado", tipo: "texto" },
          { id: "codigoEps", etiqueta: "Código EPS", tipo: "texto" },
          { id: "arl", etiqueta: "ARL a la que está afiliado", tipo: "texto" },
          { id: "codigoArl", etiqueta: "Código ARL", tipo: "texto" },
          { id: "afp", etiqueta: "AFP a la que está afiliado", tipo: "texto" },
          { id: "codigoAfp", etiqueta: "Código AFP", tipo: "texto" },
          { id: "tipoVinculacion", etiqueta: "Tipo de vinculación", tipo: "seleccion", opciones: ["(1) Planta", "(2) Misión", "(3) Cooperado", "(4) Estudiante o aprendiz", "(5) Independiente"] },
          { id: "apellidos", etiqueta: "Apellidos", tipo: "texto", requerido: true },
          { id: "nombres", etiqueta: "Nombres", tipo: "texto", requerido: true },
          { id: "tipoIdentificacionTrabajador", etiqueta: "Tipo de identificación", tipo: "seleccion", opciones: ["CC", "CE", "N. U.", "TI", "PA"] },
          { id: "numeroIdentificacionTrabajador", etiqueta: "Número", tipo: "texto" },
          { id: "fechaNacimiento", etiqueta: "Fecha de nacimiento", tipo: "fecha" },
          { id: "genero", etiqueta: "Género", tipo: "seleccion", opciones: ["M", "F"] },
          { id: "direccionTrabajador", etiqueta: "Dirección", tipo: "texto" },
          { id: "telefonoTrabajador", etiqueta: "Teléfono", tipo: "texto" },
          { id: "departamentoTrabajador", etiqueta: "Departamento", tipo: "texto" },
          { id: "municipioTrabajador", etiqueta: "Municipio", tipo: "texto" },
          { id: "zonaTrabajador", etiqueta: "Zona", tipo: "seleccion", opciones: ["U", "R"] },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "ocupacionHabitual", etiqueta: "Ocupación habitual", tipo: "texto" },
          { id: "tiempoOcupacion", etiqueta: "Tiempo en la ocupación habitual al momento del reconocimiento (mm/aa)", tipo: "texto" },
          { id: "fechaIngreso", etiqueta: "Fecha de ingreso a la empresa", tipo: "fecha" },
          { id: "salario", etiqueta: "Salario u honorarios (mensual)", tipo: "numero" },
          { id: "jornada", etiqueta: "Jornada de trabajo habitual", tipo: "seleccion", opciones: ["(1) Diurna", "(2) Nocturna", "(3) Mixta", "(4) Turnos"] },
          { id: "mano", etiqueta: "Mano dominante", tipo: "seleccion", opciones: ["Diestro", "Zurdo", "Ambidiestro"] },
          { id: "causoIncapacidad", etiqueta: "¿Causó incapacidad temporal?", tipo: "si-no" },
          { id: "numeroIncapacidades", etiqueta: "N° de incapacidades", tipo: "numero" },
        ],
      },
      {
        id: "enfermedad",
        titulo: "III. Información sobre la enfermedad laboral",
        campos: [
          { id: "fechaDiagnostico", etiqueta: "Fecha del diagnóstico clínico", tipo: "fecha" },
          { id: "fechaCalificacionOrigen", etiqueta: "Fecha de calificación de origen", tipo: "fecha" },
          { id: "entidadCalifica", etiqueta: "Entidad que califica el origen", tipo: "texto" },
          { id: "enfermedadesPrevias", etiqueta: "Enfermedades laborales previas (cod. CIE 10)", tipo: "texto" },
          { id: "diagnosticoCie10", etiqueta: "Diagnóstico / cod. CIE 10", tipo: "texto" },
          { id: "fechaCalificacionDefinitiva", etiqueta: "Fecha de la calificación de origen definitiva", tipo: "fecha" },
          { id: "entidadDefinitiva", etiqueta: "Entidad que califica el origen de manera definitiva", tipo: "texto" },
          { id: "municipioOcurrencia", etiqueta: "Municipio de ocurrencia de la EL", tipo: "texto" },
          { id: "departamentoOcurrencia", etiqueta: "Departamento de ocurrencia de la EL", tipo: "texto" },
          { id: "ubicacion", etiqueta: "Ubicación", tipo: "seleccion", opciones: ["U", "R"] },
          { id: "factorRiesgo", etiqueta: "Factor o agente de riesgo (FR/AR) asociado", tipo: "area", requerido: true },
          { id: "vigilanciaSalud", etiqueta: "¿Existe vigilancia de la salud (ambiente y salud)?", tipo: "si-no" },
          { id: "descripcionEnfermedad", etiqueta: "Descripción de la enfermedad laboral", tipo: "area", requerido: true },
        ],
      },
      {
        id: "exposicionLugar",
        titulo: "Antecedentes de exposición al factor o agente de riesgo asociado en el lugar de trabajo",
        tablas: [
          {
            id: "exposicionLugar",
            etiquetaAgregar: "Agregar antecedente",
            columnas: [
              { id: "area", etiqueta: "Área", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo u oficio", tipo: "texto" },
              { id: "tiempo", etiqueta: "Tiempo de exposición (mm/aa)", tipo: "texto" },
              { id: "mediciones", etiqueta: "Mediciones ambientales (si aplica)", tipo: "texto" },
              { id: "resultado", etiqueta: "Resultado", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "exposicionEmpresa",
        titulo: "Antecedentes de exposición al factor o agente de riesgo asociado en empresa u otros lugares",
        tablas: [
          {
            id: "exposicionEmpresa",
            etiquetaAgregar: "Agregar antecedente",
            columnas: [
              { id: "area", etiqueta: "Área", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo u oficio", tipo: "texto" },
              { id: "tiempo", etiqueta: "Tiempo de exposición (mm/aa)", tipo: "texto" },
              { id: "mediciones", etiqueta: "Mediciones ambientales (si aplica)", tipo: "texto" },
              { id: "resultado", etiqueta: "Resultado", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "seguimientoBiologico",
        titulo: "Antecedentes de seguimiento biológico de los sistemas de vigilancia epidemiológica",
        tablas: [
          {
            id: "seguimientoBiologico",
            etiquetaAgregar: "Agregar examen",
            columnas: [
              { id: "tipoExamen", etiqueta: "Tipo de examen (ingreso, control periódico, retiro)", tipo: "texto" },
              { id: "examen", etiqueta: "Examen o prueba funcional realizada", tipo: "texto" },
              { id: "fecha", etiqueta: "Fecha", tipo: "fecha" },
              { id: "resultado", etiqueta: "Resultado", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusión de la investigación",
        campos: [
          { id: "conclusion", etiqueta: "Conclusión de la investigación", tipo: "area" },
          { id: "recomendaciones", etiqueta: "Recomendaciones", tipo: "area" },
          { id: "investigador", etiqueta: "Investigador responsable", tipo: "texto" },
          { id: "fechaInvestigacion", etiqueta: "Fecha de la investigación", tipo: "fecha" },
        ],
      },
    ],
  },
  "FOR-122": {
    codigo: "FOR-122",
    nombre: "Inspección de trabajo seguro de excavación",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "frente", etiqueta: "Frente / localización", tipo: "texto", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Actividad a inspeccionar", tipo: "area" },
        ],
      },
      {
        id: "tabla",
        titulo: "Requisito a inspeccionar",
        tablas: [
          {
            id: "requisitos",
            etiquetaAgregar: "Agregar requisito",
            columnas: COLS_SIN_NA,
            filasIniciales: checklistsIniciales["FOR-122"],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusión de inspección",
        campos: [
          { id: "condicionesAdecuadas", etiqueta: "¿Se cuenta en general con las condiciones de seguridad adecuadas para realizar la actividad?", tipo: "si-no" },
          { id: "procederSinCondiciones", etiqueta: "¿A pesar de no recomendarse, se procederá con la actividad? (si sí, describa los controles adicionales)", tipo: "si-no" },
          { id: "controlesAdicionales", etiqueta: "Controles adicionales definidos", tipo: "area" },
          { id: "observacionesGenerales", etiqueta: "Observaciones generales", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-123": {
    codigo: "FOR-123",
    nombre: "Listado de maquinas",
    grupo: "Listados y Maestros",
    secciones: [
      {
        id: "tabla",
        titulo: "Listado de máquinas",
        tablas: [
          {
            id: "maquinas",
            etiquetaAgregar: "Agregar máquina",
            columnas: [
              { id: "numero", etiqueta: "N°", tipo: "texto" },
              { id: "descripcion", etiqueta: "Descripción", tipo: "texto" },
              { id: "marca", etiqueta: "Marca", tipo: "texto" },
              { id: "tipo", etiqueta: "Tipo", tipo: "texto" },
              { id: "capacidad", etiqueta: "Capacidad", tipo: "texto" },
              { id: "propietario", etiqueta: "Propietario", tipo: "texto" },
              { id: "runt", etiqueta: "RUNT", tipo: "texto" },
            ],
            filasIniciales: Array.from({ length: 25 }, (_, i) => ({
              numero: String(i + 1),
              descripcion: "",
              marca: "",
              tipo: "",
              capacidad: "",
              propietario: "",
              runt: "",
            })),
          },
        ],
      },
      {
        id: "actualizacion",
        titulo: "Actualización",
        campos: [
          { id: "responsable", etiqueta: "Responsable de actualización", tipo: "texto" },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "fechaActualizacion", etiqueta: "Fecha de actualización", tipo: "fecha" },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-124": {
    codigo: "FOR-124",
    nombre: "Inspección de condiciones seguras para trabajos de izaje de cargas",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "frente", etiqueta: "Frente / localización", tipo: "texto", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Actividad a inspeccionar", tipo: "area" },
        ],
      },
      {
        id: "tabla",
        titulo: "Requisito a inspeccionar",
        tablas: [
          {
            id: "requisitos",
            etiquetaAgregar: "Agregar requisito",
            columnas: COLS_SIN_NA,
            filasIniciales: checklistsIniciales["FOR-124"],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusión de inspección",
        campos: [
          { id: "condicionesAdecuadas", etiqueta: "¿Se cuenta en general con las condiciones de seguridad adecuadas para realizar la actividad?", tipo: "si-no" },
          { id: "procederSinCondiciones", etiqueta: "¿A pesar de no recomendarse, se procederá con la actividad? (si sí, describa los controles adicionales)", tipo: "si-no" },
          { id: "controlesAdicionales", etiqueta: "Controles adicionales definidos", tipo: "area" },
          { id: "observacionesGenerales", etiqueta: "Observaciones generales", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-125": {
    codigo: "FOR-125",
    nombre: "Inspección de equipos de izaje",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        titulo: "Información del equipo",
        campos: [
          { id: "placa", etiqueta: "Placa", tipo: "texto", requerido: true },
          { id: "modelo", etiqueta: "Modelo", tipo: "texto" },
          { id: "marca", etiqueta: "Marca", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto" },
        ],
      },
      {
        id: "documentacion",
        titulo: "Documentación",
        campos: [
          { id: "soatNumero", etiqueta: "SOAT - Número", tipo: "texto" },
          { id: "soatVence", etiqueta: "SOAT - Vence", tipo: "fecha" },
          { id: "licenciaConduccion", etiqueta: "Licencia de conducción", tipo: "texto" },
          { id: "manejoDefensivo", etiqueta: "Manejo defensivo", tipo: "texto" },
          { id: "fechaInicio", etiqueta: "Fecha de inicio", tipo: "fecha" },
          { id: "fechaFinalizacion", etiqueta: "Fecha de finalización", tipo: "fecha" },
          { id: "revisionTecnicomecanica", etiqueta: "Revisión tecnicomecánica", tipo: "texto" },
          { id: "licenciaTransito", etiqueta: "Licencia de tránsito", tipo: "texto" },
          { id: "certificadoOperador", etiqueta: "Certificado de operador", tipo: "texto" },
          { id: "certificadoAparejador", etiqueta: "Certificado de aparejador", tipo: "texto" },
          { id: "tipoMaquinaIzaje", etiqueta: "Tipo de máquina de izaje", tipo: "texto" },
          { id: "prce", etiqueta: "PRCE N° (especificar entidad)", tipo: "texto" },
          { id: "prceVence", etiqueta: "PRCE - Vence", tipo: "fecha" },
          { id: "certificadoInspeccion", etiqueta: "Certificado de inspección de máquina", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Ítems de revisión por sistema",
        tablas: [
          {
            id: "revision",
            etiquetaAgregar: "Agregar ítem",
            columnas: [
              { id: "sistema", etiqueta: "Sistema del vehículo", tipo: "texto" },
              { id: "item", etiqueta: "Ítem de revisión", tipo: "area" },
              { id: "cumple", etiqueta: "Cumple", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: checklistsIniciales["FOR-125"],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusión",
        campos: [
          { id: "condicionesAdecuadas", etiqueta: "¿El equipo se encuentra en condiciones seguras de operación?", tipo: "si-no" },
          { id: "observacionesGenerales", etiqueta: "Observaciones generales", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-126": {
    codigo: "FOR-126",
    nombre: "Permiso de trabajo seguro de izaje de carga",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        titulo: "Datos del permiso",
        campos: [
          { id: "fechaAutorizacion", etiqueta: "Fecha de autorización del permiso", tipo: "fecha", requerido: true },
          { id: "fechaInicio", etiqueta: "Fecha de inicio del permiso", tipo: "fecha", requerido: true },
          { id: "fechaFin", etiqueta: "Fecha de fin del permiso", tipo: "fecha", requerido: true },
          { id: "horario", etiqueta: "Horario", tipo: "texto" },
          { id: "localizacion", etiqueta: "Localización del frente de trabajo", tipo: "texto", requerido: true },
          { id: "descripcionTarea", etiqueta: "Descripción de la tarea", tipo: "area", requerido: true },
          { id: "empresaEjecutante", etiqueta: "Empresa ejecutante (en caso de ser subcontratada)", tipo: "texto" },
        ],
      },
      {
        id: "riesgos",
        titulo: "Riesgos asociados y equipo contra incendio",
        campos: [
          { id: "riesgos", etiqueta: "Riesgos asociados (tildar los aplicables): caída a distinto nivel, proyección de fragmentos, golpeado contra objetos, posturas inadecuadas, caída de objetos en manipulación, atrapamientos, radiaciones no ionizantes, ruido, caída de alturas", tipo: "area" },
          { id: "equipoIncendio", etiqueta: "Equipo utilizado contra incendio (tildar): manguera de agua, extintor multipropósito, otro (especifique)", tipo: "area" },
        ],
      },
      {
        id: "caracteristicas",
        titulo: "Características del izaje",
        campos: [
          { id: "razonIzaje", etiqueta: "Razón del izaje", tipo: "area" },
          { id: "equipoUtilizado", etiqueta: "Equipo utilizado para el izaje (grúa, excavadora, polipasto, guinche, manipuladora, montacargas, poleas, otras condiciones)", tipo: "area" },
          { id: "capacidadUtilizacion", etiqueta: "Porcentaje de capacidad utilizado / instalaciones existentes / uso de más de una máquina", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Comprobaciones previas y elementos de protección personal",
        tablas: [
          {
            id: "comprobaciones",
            etiquetaAgregar: "Agregar comprobación",
            columnas: COLS_CON_NA,
            filasIniciales: checklistsIniciales["FOR-126"],
          },
        ],
      },
      {
        id: "firmas",
        titulo: "Personal responsable",
        campos: [
          { id: "residenteObra", etiqueta: "Residente de obra", tipo: "texto" },
          { id: "maestroObra", etiqueta: "Maestro de obra", tipo: "texto" },
          { id: "supervisorObra", etiqueta: "Supervisor", tipo: "texto" },
          { id: "profesionalSst", etiqueta: "Profesional SST", tipo: "texto" },
          { id: "rigger", etiqueta: "Rigger responsable del plan de izaje", tipo: "texto" },
          { id: "personalAutorizado", etiqueta: "Personal autorizado", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-127": {
    codigo: "FOR-127",
    nombre: "Lista de chequeo de izaje con excavadora",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "frenteObra", etiqueta: "Frente de obra", tipo: "texto", requerido: true },
          { id: "operador", etiqueta: "Operador", tipo: "texto", requerido: true },
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Aspectos a verificar",
        tablas: [
          {
            id: "aspectos",
            etiquetaAgregar: "Agregar aspecto",
            columnas: [
              { id: "numero", etiqueta: "N°", tipo: "texto" },
              { id: "item", etiqueta: "Aspecto a verificar", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
            ],
            filasIniciales: checklistsIniciales["FOR-127"],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusiones",
        campos: [
          { id: "condicionesInseguras", etiqueta: "Condiciones / acciones inseguras identificadas", tipo: "area" },
          { id: "accionesMejoras", etiqueta: "Acciones de mejoras", tipo: "area" },
        ],
      },
      {
        id: "firmas",
        titulo: "Realizó la inspección",
        campos: [
          { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
          { id: "fechaFirma", etiqueta: "Fecha", tipo: "fecha" },
        ],
      },
    ],
  },
  "FOR-128": {
    codigo: "FOR-128",
    nombre: "Lista de chequeo para la grua movil",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "frenteObra", etiqueta: "Frente de obra", tipo: "texto", requerido: true },
          { id: "operador", etiqueta: "Operador", tipo: "texto", requerido: true },
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Aspectos a verificar",
        tablas: [
          {
            id: "aspectos",
            etiquetaAgregar: "Agregar aspecto",
            columnas: [
              { id: "numero", etiqueta: "N°", tipo: "texto" },
              { id: "item", etiqueta: "Aspecto a verificar", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
            ],
            filasIniciales: checklistsIniciales["FOR-128"],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusiones",
        campos: [
          { id: "condicionesInseguras", etiqueta: "Condiciones / acciones inseguras identificadas", tipo: "area" },
          { id: "accionesMejoras", etiqueta: "Acciones de mejoras", tipo: "area" },
        ],
      },
      {
        id: "firmas",
        titulo: "Realizó la inspección",
        campos: [
          { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
          { id: "fechaFirma", etiqueta: "Fecha", tipo: "fecha" },
        ],
      },
    ],
  },
  "FOR-129": {
    codigo: "FOR-129",
    nombre: "Inspección de aparejos de izaje",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "frenteObra", etiqueta: "Frente de obra", tipo: "texto", requerido: true },
          { id: "elementos", etiqueta: "Elementos de izaje a utilizar (eslinga, grillete, gancho, cable de acero, cadena)", tipo: "area" },
        ],
      },
      {
        id: "pesos",
        titulo: "Indique el peso (lbs / kg / ton)",
        campos: [
          { id: "pesoEslinga", etiqueta: "Eslinga", tipo: "texto" },
          { id: "pesoGrillete", etiqueta: "Grillete", tipo: "texto" },
          { id: "pesoCable", etiqueta: "Cable de acero", tipo: "texto" },
          { id: "pesoGancho", etiqueta: "Gancho", tipo: "texto" },
          { id: "pesoCadena", etiqueta: "Cadena", tipo: "texto" },
          { id: "pesoTotal", etiqueta: "Peso total", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Inspección de los elementos de izaje",
        tablas: [
          {
            id: "aspectos",
            etiquetaAgregar: "Agregar aspecto",
            columnas: [
              { id: "seccion", etiqueta: "Elemento", tipo: "texto" },
              { id: "numero", etiqueta: "N°", tipo: "texto" },
              { id: "item", etiqueta: "Aspecto a verificar", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
            ],
            filasIniciales: checklistsIniciales["FOR-129"],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusiones",
        campos: [
          { id: "condicionesInseguras", etiqueta: "Condiciones / acciones inseguras identificadas", tipo: "area" },
          { id: "accionesMejoras", etiqueta: "Acciones de mejoras", tipo: "area" },
        ],
      },
      {
        id: "firmas",
        titulo: "Realizó la inspección",
        campos: [
          { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-130": {
    codigo: "FOR-130",
    nombre: "Plan de Izaje de carga",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        titulo: "Datos de la maniobra",
        campos: [
          { id: "fechaIzaje", etiqueta: "Fecha del izaje", tipo: "fecha", requerido: true },
          { id: "sitioManiobra", etiqueta: "Sitio de la maniobra", tipo: "texto", requerido: true },
          { id: "elementoIzar", etiqueta: "Elemento a ser izado", tipo: "texto", requerido: true },
          { id: "referenciaGrua", etiqueta: "Referencia (identificación) de la grúa utilizada", tipo: "texto", requerido: true },
          { id: "cuadranteOperacion", etiqueta: "Cuadrante de operación", tipo: "texto" },
          { id: "frente", etiqueta: "Frente", tipo: "texto" },
          { id: "lado", etiqueta: "Lado", tipo: "texto" },
        ],
      },
      {
        id: "posiciones",
        titulo: "Posición inicial / posición final",
        campos: [
          { id: "radioInicial", etiqueta: "Radio inicial", tipo: "texto" },
          { id: "radioFinal", etiqueta: "Radio final", tipo: "texto" },
          { id: "anguloInicial", etiqueta: "Ángulo inicial", tipo: "texto" },
          { id: "anguloFinal", etiqueta: "Ángulo final", tipo: "texto" },
          { id: "plumaInicial", etiqueta: "Longitud de pluma inicial", tipo: "texto" },
          { id: "plumaFinal", etiqueta: "Longitud de pluma final", tipo: "texto" },
          { id: "capacidadInicial", etiqueta: "Capacidad de la grúa - posición inicial (lbs / kg / ton)", tipo: "texto" },
          { id: "capacidadFinal", etiqueta: "Capacidad de la grúa - posición final (lbs / kg / ton)", tipo: "texto" },
        ],
      },
      {
        id: "aparejador",
        titulo: "Datos del aparejador",
        campos: [
          { id: "referenciaEslinga", etiqueta: "Referencia de la eslinga / estrobo", tipo: "texto" },
          { id: "configuracion", etiqueta: "Configuración (vertical / canasta / ahorcado / ramales)", tipo: "texto" },
          { id: "capacidadEslinga", etiqueta: "Capacidad de la eslinga (lbs / kg / ton)", tipo: "texto" },
          { id: "capacidadGrillete", etiqueta: "Capacidad del grillete / dispositivo (lbs / kg / ton)", tipo: "texto" },
        ],
      },
      {
        id: "analisis",
        titulo: "Análisis de carga y capacidad",
        campos: [
          { id: "pesoCarga", etiqueta: "Peso de carga", tipo: "numero" },
          { id: "pesoAparejos", etiqueta: "Peso de aparejos", tipo: "numero" },
          { id: "pesoOtros", etiqueta: "Peso de otros", tipo: "numero" },
          { id: "pesoGanchos", etiqueta: "Peso de ganchos", tipo: "numero" },
          { id: "cargaBruta", etiqueta: "Carga bruta", tipo: "numero" },
          { id: "capacidadGrua", etiqueta: "Capacidad de la grúa menor", tipo: "numero" },
          { id: "porcentaje", etiqueta: "Carga bruta ÷ capacidad de la grúa × 100 = %", tipo: "numero" },
          { id: "conclusionIzaje", etiqueta: "¿Se puede realizar el izaje sin restricciones (porcentaje menor al 80%)?", tipo: "si-no" },
          { id: "consideraciones", etiqueta: "Consideraciones especiales", tipo: "area" },
        ],
      },
      {
        id: "aprobacion",
        titulo: "Aprobación del plan de izaje",
        campos: [
          { id: "fechaElaboracion", etiqueta: "Fecha de elaboración del plan de izaje", tipo: "fecha" },
          { id: "supervisor", etiqueta: "Supervisor", tipo: "texto" },
          { id: "aparejador", etiqueta: "Aparejador", tipo: "texto" },
          { id: "operadorGrua", etiqueta: "Operador de la grúa", tipo: "texto" },
          { id: "sst", etiqueta: "SST", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-131": {
    codigo: "FOR-131",
    nombre: "Plan de Izaje de carga con excavadora",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        titulo: "Datos de la maniobra",
        campos: [
          { id: "fechaIzaje", etiqueta: "Fecha del izaje", tipo: "fecha", requerido: true },
          { id: "sitioManiobra", etiqueta: "Sitio de la maniobra", tipo: "texto", requerido: true },
          { id: "elementoIzar", etiqueta: "Elemento a ser izado", tipo: "texto", requerido: true },
          { id: "referenciaMaquina", etiqueta: "Referencia (identificación) de la máquina utilizada", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "posiciones",
        titulo: "Posición inicial / posición final",
        campos: [
          { id: "alturaInicial", etiqueta: "Altura inicial", tipo: "texto" },
          { id: "alturaFinal", etiqueta: "Altura final", tipo: "texto" },
          { id: "alcanceInicial", etiqueta: "Alcance inicial", tipo: "texto" },
          { id: "alcanceFinal", etiqueta: "Alcance final", tipo: "texto" },
          { id: "capacidadInicial", etiqueta: "Capacidad - posición inicial (lbs / kg / ton)", tipo: "texto" },
          { id: "capacidadFinal", etiqueta: "Capacidad - posición final (lbs / kg / ton)", tipo: "texto" },
        ],
      },
      {
        id: "aparejador",
        titulo: "Datos del aparejador",
        campos: [
          { id: "referenciaEslinga", etiqueta: "Referencia de la eslinga / estrobo", tipo: "texto" },
          { id: "configuracion", etiqueta: "Configuración (vertical / canasta / ahorcado / ramales)", tipo: "texto" },
          { id: "capacidadEslinga", etiqueta: "Capacidad de la eslinga (lbs / kg / ton)", tipo: "texto" },
          { id: "capacidadGrillete", etiqueta: "Capacidad del grillete / dispositivo (lbs / kg / ton)", tipo: "texto" },
        ],
      },
      {
        id: "analisis",
        titulo: "Análisis de carga y capacidad",
        campos: [
          { id: "pesoCarga", etiqueta: "Peso de carga", tipo: "numero" },
          { id: "pesoAparejos", etiqueta: "Peso de aparejos", tipo: "numero" },
          { id: "pesoOtros", etiqueta: "Peso de otros", tipo: "numero" },
          { id: "pesoGanchos", etiqueta: "Peso de ganchos", tipo: "numero" },
          { id: "cargaBruta", etiqueta: "Carga bruta", tipo: "numero" },
          { id: "capacidadMenor", etiqueta: "Capacidad de carga menor", tipo: "numero" },
          { id: "porcentaje", etiqueta: "Carga bruta ÷ capacidad de carga menor × 100 = %", tipo: "numero" },
          { id: "conclusionIzaje", etiqueta: "¿Se puede realizar el izaje sin restricciones (porcentaje menor al 80%)?", tipo: "si-no" },
          { id: "consideraciones", etiqueta: "Consideraciones especiales", tipo: "area" },
        ],
      },
      {
        id: "aprobacion",
        titulo: "Aprobación del plan de izaje",
        campos: [
          { id: "fechaElaboracion", etiqueta: "Fecha de elaboración del plan de izaje", tipo: "fecha" },
          { id: "supervisor", etiqueta: "Supervisor", tipo: "texto" },
          { id: "aparejador", etiqueta: "Aparejador", tipo: "texto" },
          { id: "operador", etiqueta: "Operador de la máquina", tipo: "texto" },
          { id: "sst", etiqueta: "SST", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-132": {
    codigo: "FOR-132",
    nombre: "Evaluación de impactos ambientales mediante la metodología Conesa",
    grupo: "Ambiental",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha de evaluación", tipo: "fecha", requerido: true },
          { id: "evaluador", etiqueta: "Evaluador responsable", tipo: "texto", requerido: true },
          { id: "proyecto", etiqueta: "Proyecto / actividad evaluada", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Matriz de valoración de impactos ambientales",
        tablas: [
          {
            id: "impactos",
            etiquetaAgregar: "Agregar impacto",
            columnas: [
              { id: "actividad", etiqueta: "Actividad", tipo: "texto" },
              { id: "aspectoAmbiental", etiqueta: "Aspecto ambiental", tipo: "texto" },
              { id: "impacto", etiqueta: "Impacto", tipo: "area" },
              { id: "signo", etiqueta: "Signo", tipo: "seleccion", opciones: ["+", "-"] },
              { id: "mo", etiqueta: "MO", tipo: "numero" },
              { id: "pe", etiqueta: "PE", tipo: "numero" },
              { id: "rv", etiqueta: "RV", tipo: "numero" },
              { id: "si", etiqueta: "SI", tipo: "numero" },
              { id: "ac", etiqueta: "AC", tipo: "numero" },
              { id: "ef", etiqueta: "EF", tipo: "numero" },
              { id: "pr", etiqueta: "PR", tipo: "numero" },
              { id: "mc", etiqueta: "MC", tipo: "numero" },
              { id: "importancia", etiqueta: "Importancia ambiental", tipo: "numero" },
              { id: "criterio", etiqueta: "Criterio", tipo: "seleccion", opciones: ["Significativo", "No significativo"] },
            ],
          },
        ],
      },
      {
        id: "conclusion",
        titulo: "Conclusiones",
        campos: [
          { id: "conclusion", etiqueta: "Conclusiones de la evaluación", tipo: "area" },
          { id: "acciones", etiqueta: "Acciones de mitigación / seguimiento", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-133": {
    codigo: "FOR-133",
    nombre: "Acta de donación de residuos RCD",
    grupo: "Ambiental",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "frenteObra", etiqueta: "Frente de obra", tipo: "texto", requerido: true },
          { id: "fechaGeneracion", etiqueta: "Fecha de generación del material", tipo: "fecha", requerido: true },
        ],
      },
      {
        id: "materiales",
        titulo: "Descripción del material donado",
        tablas: [
          {
            id: "materiales",
            etiquetaAgregar: "Agregar material",
            columnas: [
              { id: "tipo", etiqueta: "Tipo de material", tipo: "texto" },
              { id: "origen", etiqueta: "Origen (actividad)", tipo: "texto" },
              { id: "volumen", etiqueta: "Volumen (m², m³, und, m, kg)", tipo: "texto" },
              { id: "estado", etiqueta: "Estado", tipo: "texto" },
              { id: "observacion", etiqueta: "Observación", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "receptor",
        titulo: "Datos del receptor del material",
        campos: [
          { id: "nombreReceptor", etiqueta: "Nombre completo / razón social", tipo: "texto", requerido: true },
          { id: "cedulaNit", etiqueta: "Cédula / NIT", tipo: "texto" },
          { id: "telefono", etiqueta: "Teléfono", tipo: "texto" },
          { id: "direccion", etiqueta: "Dirección del predio receptor", tipo: "texto" },
          { id: "ubicacion", etiqueta: "Ubicación (vereda / barrio)", tipo: "texto" },
        ],
      },
      {
        id: "destinacion",
        titulo: "Destinación del material",
        campos: [
          { id: "destinacion", etiqueta: "El material será utilizado para", tipo: "seleccion", opciones: ["Relleno de terreno", "Mejoramiento de vías", "Nivelación de predio", "Otro"], requerido: true },
          { id: "destinacionOtro", etiqueta: "Otro (especifique)", tipo: "texto" },
          { id: "declaraciones", etiqueta: "Declaraciones del receptor", tipo: "area" },
        ],
      },
      {
        id: "entrega",
        titulo: "Condiciones de entrega",
        campos: [
          { id: "medioTransporte", etiqueta: "Medio de transporte", tipo: "texto" },
          { id: "numeroViajes", etiqueta: "Número de viajes", tipo: "numero" },
          { id: "fechasEntrega", etiqueta: "Fecha(s) de entrega", tipo: "texto" },
          { id: "responsableCargue", etiqueta: "Responsable de cargue", tipo: "texto" },
          { id: "responsableTransporte", etiqueta: "Responsable de transporte", tipo: "texto" },
        ],
      },
      {
        id: "firmas",
        titulo: "Responsables del diligenciamiento",
        campos: [
          { id: "nombre1", etiqueta: "Nombre (responsable 1)", tipo: "texto" },
          { id: "cargo1", etiqueta: "Cargo (responsable 1)", tipo: "texto" },
          { id: "firma1", etiqueta: "Firma (responsable 1)", tipo: "texto" },
          { id: "nombre2", etiqueta: "Nombre (responsable 2)", tipo: "texto" },
          { id: "cargo2", etiqueta: "Cargo (responsable 2)", tipo: "texto" },
          { id: "firma2", etiqueta: "Firma (responsable 2)", tipo: "texto" },
          { id: "registroFotografico", etiqueta: "Registro fotográfico (adjuntar evidencias)", tipo: "area" },
        ],
      },
    ],
  },
};
