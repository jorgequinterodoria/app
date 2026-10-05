import type { FormatoConfig } from "../tipos";

const OPCIONES_CALIFICACION_1_5 = ["1 - Nunca", "2 - Esporádicamente", "3 - Ocasionalmente", "4 - Frecuentemente", "5 - Siempre"];
const OPCIONES_EVALUACION = ["Siempre", "Casi Siempre", "Nunca", "No aplica"];

export const configsLote2: Record<string, FormatoConfig> = {
  "FOR-040": {
    codigo: "FOR-040",
    nombre: "Programa de auditorías internas",
    grupo: "Auditorías",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "anio", etiqueta: "Programa de auditorías para el año", tipo: "texto", requerido: true },
          { id: "ciclo", etiqueta: "Ciclo de auditorías N°", tipo: "numero" },
          { id: "alcance", etiqueta: "Alcance de la auditoría", tipo: "area" },
        ],
      },
      {
        id: "tabla",
        tablas: [
          {
            id: "auditorias",
            etiquetaAgregar: "Agregar auditoría",
            columnas: [
              { id: "numero", etiqueta: "Auditoría N°", tipo: "numero" },
              { id: "proceso", etiqueta: "Proceso / actividad", tipo: "texto" },
              { id: "auditorLider", etiqueta: "Auditor líder", tipo: "texto" },
              { id: "equipo", etiqueta: "Equipo auditor (iniciales)", tipo: "texto" },
              { id: "requisitos", etiqueta: "Requisitos", tipo: "texto" },
              { id: "meses", etiqueta: "Meses para ejecutar la auditoría", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-041": {
    codigo: "FOR-041",
    nombre: "Plan de auditorías internas",
    grupo: "Auditorías",
    secciones: [
      {
        id: "equipo",
        titulo: "Equipo de auditoría",
        campos: [
          { id: "representante", etiqueta: "Representante del SG-SST", tipo: "texto" },
          { id: "auditorLider", etiqueta: "Auditor líder", tipo: "texto", requerido: true },
          { id: "equipoAuditor", etiqueta: "Equipo auditor", tipo: "texto" },
          { id: "expertoTecnico", etiqueta: "Experto técnico", tipo: "texto" },
          { id: "observador", etiqueta: "Observador", tipo: "texto" },
          { id: "guia", etiqueta: "Guía", tipo: "texto" },
          { id: "fechaEjecucion", etiqueta: "Fecha de ejecución", tipo: "fecha" },
        ],
      },
      {
        id: "alcance",
        titulo: "Alcance del plan",
        campos: [
          { id: "objetivo", etiqueta: "Objetivo", tipo: "area", requerido: true },
          { id: "alcance", etiqueta: "Alcance", tipo: "area", requerido: true },
          { id: "documentosReferencia", etiqueta: "Documentos de referencia", tipo: "area" },
        ],
      },
      {
        id: "agenda",
        titulo: "Agenda de auditoría",
        tablas: [
          {
            id: "agenda",
            etiquetaAgregar: "Agregar agenda",
            columnas: [
              { id: "fechaHora", etiqueta: "Fecha y hora", tipo: "texto" },
              { id: "proceso", etiqueta: "Proceso / requisito por auditar", tipo: "texto" },
              { id: "auditores", etiqueta: "Auditor(es)", tipo: "texto" },
              { id: "auditado", etiqueta: "Auditado (cargo, nombre, área)", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "aprobacion",
        titulo: "Aprobación del plan de auditoría",
        campos: [
          { id: "elaboro", etiqueta: "Elaboró (Auditor líder)", tipo: "texto" },
          { id: "reviso", etiqueta: "Revisó (Ingeniero SST)", tipo: "texto" },
          { id: "aprobó", etiqueta: "Aprobó (Alta Dirección)", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-042": {
    codigo: "FOR-042",
    nombre: "Lista de chequeo de auditoría interna",
    grupo: "Auditorías",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "auditoriaNumero", etiqueta: "Auditoría N°", tipo: "numero" },
          { id: "auditorLider", etiqueta: "Auditor líder", tipo: "texto" },
          { id: "auditorAcompanante", etiqueta: "Auditor acompañante", tipo: "texto" },
          { id: "auditadoNombre", etiqueta: "Auditado: nombre", tipo: "texto" },
          { id: "auditadoCargo", etiqueta: "Auditado: cargo", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        tablas: [
          {
            id: "checklist",
            etiquetaAgregar: "Agregar requisito",
            columnas: [
              { id: "requisito", etiqueta: "Requisito", tipo: "texto" },
              { id: "pregunta", etiqueta: "Pregunta", tipo: "area" },
              { id: "hallazgo", etiqueta: "Hallazgo", tipo: "area" },
              { id: "clasificacion", etiqueta: "Clasificación del hallazgo", tipo: "seleccion", opciones: ["No conformidad", "Observación", "Oportunidad de mejora", "Cumple"] },
            ],
          },
        ],
      },
    ],
  },
  "FOR-043": {
    codigo: "FOR-043",
    nombre: "Evaluación del proceso de auditoría",
    grupo: "Auditorías",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fechaAuditoria", etiqueta: "Fecha de auditoría", tipo: "fecha", requerido: true },
          { id: "evaluo", etiqueta: "Evaluó", tipo: "texto", requerido: true },
          { id: "nombreAuditor", etiqueta: "Nombre del auditor", tipo: "texto" },
          { id: "procesoAuditado", etiqueta: "Proceso auditado", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Evaluación de actividades de la auditoría (escala 1 a 5)",
        tablas: [
          {
            id: "afirmaciones",
            etiquetaAgregar: "Agregar afirmación",
            columnas: [
              { id: "afirmacion", etiqueta: "Afirmación", tipo: "area" },
              { id: "calificacion", etiqueta: "Calificación", tipo: "seleccion", opciones: OPCIONES_CALIFICACION_1_5 },
            ],
            filasIniciales: [
              { afirmacion: "El Auditor es independiente a los procesos/actividades que auditó.", calificacion: "" },
              { afirmacion: "En la reunión de apertura explicó el objetivo y el alcance de la auditoría, la metodología, la agenda de actividades y se presentaron los auditores y auditados.", calificacion: "" },
              { afirmacion: "Realizó las entrevistas de forma ordenada, coherente y cordial con el auditado.", calificacion: "" },
              { afirmacion: "Trató al auditado de forma que contribuya a alcanzar el propósito de la auditoría.", calificacion: "" },
              { afirmacion: "Realizó auditorías de campo para observar la ejecución de los procesos del SGI (cuando aplique).", calificacion: "" },
              { afirmacion: "Dedicó atención y apoyo completos al proceso de auditoría.", calificacion: "" },
              { afirmacion: "Revisó los documentos y registros incluidos en el plan de auditoría y los demás necesarios para evidenciar la conformidad del SGI.", calificacion: "" },
              { afirmacion: "Cumplió con puntualidad la agenda establecida en el Plan de Auditoría.", calificacion: "" },
              { afirmacion: "Permitió que el auditado se expresara.", calificacion: "" },
              { afirmacion: "En la reunión de cierre presentó de forma ordenada, clara y coherente los hallazgos de la auditoría, así como las fortalezas del SGI.", calificacion: "" },
              { afirmacion: "Redactó los hallazgos de la auditoría de forma clara y de acuerdo con los criterios de la auditoría.", calificacion: "" },
              { afirmacion: "Entregó oportunamente el informe de auditoría.", calificacion: "" },
            ],
          },
        ],
      },
      {
        id: "observaciones",
        campos: [{ id: "observaciones", etiqueta: "Observaciones", tipo: "area" }],
      },
    ],
  },
  "FOR-044": {
    codigo: "FOR-044",
    nombre: "Evaluación por el auditor líder",
    grupo: "Auditorías",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "elaboro", etiqueta: "Elaboró (auditor líder)", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Evaluación (ponderación: clasificación 30%, redacción 30%, apartado 30%, ortografía 10%)",
        tablas: [
          {
            id: "evaluacion",
            etiquetaAgregar: "Agregar evaluado",
            columnas: [
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "rol", etiqueta: "Rol", tipo: "texto" },
              { id: "clasificacion", etiqueta: "Clasificación (%)", tipo: "numero" },
              { id: "redaccion", etiqueta: "Redacción (%)", tipo: "numero" },
              { id: "apartado", etiqueta: "Apartado (%)", tipo: "numero" },
              { id: "ortografia", etiqueta: "Ortografía (%)", tipo: "numero" },
              { id: "total", etiqueta: "Total", tipo: "numero" },
              { id: "observaciones", etiqueta: "Observaciones / recomendaciones", tipo: "area" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-045": {
    codigo: "FOR-045",
    nombre: "Compromiso de confidencialidad de auditores externos",
    grupo: "Auditorías",
    secciones: [
      {
        id: "compromiso",
        titulo: "Compromiso de confidencialidad (Resolución 0312 de 2019, Decreto 1072 de 2015)",
        campos: [
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "acepta", etiqueta: "El auditor externo acepta el compromiso de confidencialidad descrito en el formato", tipo: "si-no", requerido: true },
          { id: "observaciones", etiqueta: "Observaciones", tipo: "area" },
          { id: "nombreAuditor", etiqueta: "Nombre del auditor externo", tipo: "texto", requerido: true },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-046": {
    codigo: "FOR-046",
    nombre: "Acta de reunión de apertura de auditoría interna",
    grupo: "Auditorías",
    secciones: [
      {
        id: "reunion",
        campos: [
          { id: "auditoriaNumero", etiqueta: "Auditoría interna N°", tipo: "numero", requerido: true },
          { id: "fecha", etiqueta: "Fecha de apertura", tipo: "fecha", requerido: true },
          { id: "horaInicio", etiqueta: "Hora de inicio", tipo: "texto", requerido: true },
          { id: "auditorLider", etiqueta: "Auditor líder", tipo: "texto", requerido: true },
          { id: "equipoAuditor", etiqueta: "Equipo auditor", tipo: "texto" },
          { id: "expertoTecnico", etiqueta: "Experto técnico", tipo: "texto" },
          { id: "observador", etiqueta: "Observador", tipo: "texto" },
          { id: "guia", etiqueta: "Guía", tipo: "texto" },
        ],
      },
      {
        id: "confirmacion",
        titulo: "Confirmación con los auditados",
        campos: [
          { id: "objetivo", etiqueta: "Objetivo", tipo: "area" },
          { id: "alcance", etiqueta: "Alcance", tipo: "area" },
          { id: "documentosReferencia", etiqueta: "Documentos de referencia (plan de auditoría)", tipo: "area" },
          { id: "modificaciones", etiqueta: "Modificaciones al plan de auditoría acordadas", tipo: "area" },
          { id: "horaCierre", etiqueta: "Hora de cierre de la reunión", tipo: "texto" },
        ],
      },
      {
        id: "asistentes",
        titulo: "Asistentes (constancia de firma)",
        tablas: [
          {
            id: "asistentes",
            etiquetaAgregar: "Agregar asistente",
            columnas: [
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "firma", etiqueta: "Firma", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-047": {
    codigo: "FOR-047",
    nombre: "Formato de gestión de acción correctiva, preventiva y de mejora",
    grupo: "Acciones y Mejora",
    secciones: [
      {
        id: "identificacion",
        titulo: "Identificación de la no conformidad",
        campos: [
          { id: "fechaIdentificacion", etiqueta: "Fecha de identificación de la no conformidad", tipo: "fecha", requerido: true },
          { id: "fechaAnalisis", etiqueta: "Fecha de análisis de la no conformidad", tipo: "fecha" },
          { id: "areaOcurrencia", etiqueta: "Área de ocurrencia", tipo: "texto", requerido: true },
          { id: "actividad", etiqueta: "Actividad", tipo: "texto" },
          { id: "responsableArea", etiqueta: "Responsable del área", tipo: "texto" },
          { id: "responsableActividad", etiqueta: "Responsable de la actividad", tipo: "texto" },
          { id: "tipoAccion", etiqueta: "Tipo de acción", tipo: "seleccion", opciones: ["Preventiva", "Mejora", "Correctiva"], requerido: true },
          { id: "fuente", etiqueta: "Fuente de la acción", tipo: "seleccion", opciones: ["Auditoría interna", "Análisis de datos del sistema (Indicadores de Gestión)", "Análisis del reporte de accidentes de trabajo", "Resultados de la revisión por la dirección", "Inspecciones de seguridad", "Otra"], requerido: true },
          { id: "fuenteOtra", etiqueta: "¿Cuál? (otra fuente)", tipo: "texto" },
          { id: "naturaleza", etiqueta: "Naturaleza de la no conformidad", tipo: "seleccion", opciones: ["Real", "Potencial"] },
          { id: "descripcionNc", etiqueta: "Descripción de la no conformidad", tipo: "area", requerido: true },
        ],
      },
      {
        id: "analisis",
        titulo: "Beneficio y análisis de causas",
        campos: [
          { id: "beneficio", etiqueta: "Beneficio generado (requerido para acción de mejora)", tipo: "area" },
          { id: "descripcionCausa", etiqueta: "Descripción de la causa (requerido para correctivas/preventivas)", tipo: "area" },
          { id: "instrumento", etiqueta: "Instrumento de análisis de causa utilizado", tipo: "seleccion", opciones: ["Causa/Efecto", "5 ¿Por qué?", "Otro"] },
          { id: "instrumentoOtro", etiqueta: "¿Cuál? (otro instrumento)", tipo: "texto" },
        ],
      },
      {
        id: "plan",
        titulo: "Plan de acción",
        tablas: [
          {
            id: "acciones",
            etiquetaAgregar: "Agregar acción",
            columnas: [
              { id: "descripcion", etiqueta: "Descripción de la acción", tipo: "area" },
              { id: "responsable", etiqueta: "Responsable (nombre y cargo)", tipo: "texto" },
              { id: "fechaInicio", etiqueta: "Fecha de inicio", tipo: "fecha" },
              { id: "fechaFin", etiqueta: "Fecha de fin", tipo: "fecha" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-048": {
    codigo: "FOR-048",
    nombre: "Conformación de brigadas de emergencias",
    grupo: "Emergencias",
    secciones: [
      {
        id: "acta",
        campos: [
          { id: "fecha", etiqueta: "Fecha de la reunión", tipo: "fecha", requerido: true },
          { id: "hora", etiqueta: "Hora", tipo: "texto" },
          { id: "lugar", etiqueta: "Lugar de la reunión", tipo: "texto", requerido: true },
          { id: "preside", etiqueta: "Preside la reunión", tipo: "texto" },
          { id: "presideCargo", etiqueta: "Cargo", tipo: "texto" },
        ],
      },
      {
        id: "direccion",
        titulo: "Dirección de las brigadas",
        tablas: [
          {
            id: "direccionBrigadas",
            etiquetaAgregar: "Agregar integrante",
            columnas: [
              { id: "cargoEmergencia", etiqueta: "Cargo de emergencia", tipo: "texto" },
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "telefono", etiqueta: "Teléfono", tipo: "texto" },
              { id: "firma", etiqueta: "Firma", tipo: "texto" },
            ],
            filasIniciales: [
              { cargoEmergencia: "Director de la emergencia principal", nombre: "", cargo: "", telefono: "", firma: "" },
              { cargoEmergencia: "Director de la emergencia suplente", nombre: "", cargo: "", telefono: "", firma: "" },
              { cargoEmergencia: "Coordinador de emergencia", nombre: "", cargo: "", telefono: "", firma: "" },
              { cargoEmergencia: "Líder de brigadas", nombre: "", cargo: "", telefono: "", firma: "" },
            ],
          },
        ],
      },
      {
        id: "brigadistas",
        titulo: "Brigadistas",
        tablas: [
          {
            id: "brigadistas",
            etiquetaAgregar: "Agregar brigadista",
            columnas: [
              { id: "brigada", etiqueta: "Brigada", tipo: "seleccion", opciones: ["Incendios", "Primeros auxilios", "Evacuación", "Búsqueda y rescate", "Contingencias ambientales"] },
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "telefono", etiqueta: "Teléfono", tipo: "texto" },
              { id: "firma", etiqueta: "Firma", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "constancia",
        titulo: "Constancia",
        campos: [
          { id: "testigo", etiqueta: "Testigo de asistencia", tipo: "texto" },
          { id: "testigoCargo", etiqueta: "Cargo del testigo", tipo: "texto" },
          { id: "observaciones", etiqueta: "Observaciones", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-049": {
    codigo: "FOR-049",
    nombre: "Conformación de la brigada de orden y limpieza",
    grupo: "Orden y Limpieza",
    secciones: [
      {
        id: "frente",
        campos: [
          { id: "frenteTrabajo", etiqueta: "Frente de trabajo", tipo: "texto", requerido: true },
          { id: "subcontratista", etiqueta: "Subcontratista", tipo: "texto" },
          { id: "liderCuadrilla", etiqueta: "Líder de la cuadrilla", tipo: "texto" },
          { id: "totalTrabajadores", etiqueta: "Total de trabajadores", tipo: "numero" },
          { id: "actividadesPrincipales", etiqueta: "Actividades principales que se realizan en el frente de obra", tipo: "area" },
          { id: "fecha", etiqueta: "Fecha de la reunión", tipo: "fecha", requerido: true },
          { id: "hora", etiqueta: "Hora", tipo: "texto" },
          { id: "lugar", etiqueta: "Lugar de la reunión", tipo: "texto" },
        ],
      },
      {
        id: "lider",
        titulo: "Líder de la brigada",
        campos: [
          { id: "liderNombre", etiqueta: "Nombre", tipo: "texto", requerido: true },
          { id: "liderCargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "liderTelefono", etiqueta: "Teléfono", tipo: "texto" },
          { id: "liderFirma", etiqueta: "Firma", tipo: "texto" },
        ],
      },
      {
        id: "brigadistas",
        titulo: "Brigadistas",
        tablas: [
          {
            id: "brigadistas",
            etiquetaAgregar: "Agregar brigadista",
            columnas: [
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "telefono", etiqueta: "Teléfono", tipo: "texto" },
              { id: "firma", etiqueta: "Firma", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "responsabilidades",
        titulo: "Responsabilidades",
        campos: [
          { id: "responsabilidades", etiqueta: "Responsabilidades del líder de la brigada", tipo: "area" },
          { id: "testigo", etiqueta: "Testigo de asistencia", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-050": {
    codigo: "FOR-050",
    nombre: "Perfil de cargo y profesiograma",
    grupo: "Personal y Dotación",
    secciones: [
      {
        id: "identificacion",
        titulo: "1. Identificación del cargo / 2. Vinculación",
        campos: [
          { id: "nombreCargo", etiqueta: "Nombre del cargo", tipo: "texto", requerido: true },
          { id: "tipoVinculacion", etiqueta: "Tipo de vinculación", tipo: "seleccion", opciones: ["Contrato a término fijo", "Contrato a término indefinido", "Prestación de servicios", "Obra o labor contratada"] },
          { id: "dedicacion", etiqueta: "Dedicación (%)", tipo: "texto" },
        ],
      },
      {
        id: "formacion",
        titulo: "3. Educación / 4. Experiencia / 5. Habilidades",
        campos: [
          { id: "educacion", etiqueta: "Educación", tipo: "area" },
          { id: "experienciaGeneral", etiqueta: "Experiencia general", tipo: "area" },
          { id: "experienciaEspecifica", etiqueta: "Experiencia específica", tipo: "area" },
          { id: "habilidadesGenerales", etiqueta: "Habilidades generales", tipo: "area" },
          { id: "habilidadesEspecificas", etiqueta: "Habilidades específicas del cargo", tipo: "area" },
        ],
      },
      {
        id: "funciones",
        titulo: "6. Objetivo / 7. Funciones y responsabilidades",
        campos: [
          { id: "objetivoCargo", etiqueta: "Objetivo del cargo", tipo: "area", requerido: true },
          { id: "funcionesTecnicas", etiqueta: "7.1 Funciones técnicas", tipo: "area" },
          { id: "funcionesCalidad", etiqueta: "7.2 Funciones de calidad", tipo: "area" },
          { id: "funcionesSst", etiqueta: "7.3 Funciones de seguridad y salud en el trabajo", tipo: "area" },
        ],
      },
      {
        id: "relaciones",
        titulo: "8. Autoridades / 9. Relaciones / 10-11. Condiciones",
        campos: [
          { id: "autoridades", etiqueta: "Autoridades", tipo: "area" },
          { id: "relacionesInternas", etiqueta: "9.1 Relaciones internas", tipo: "area" },
          { id: "relacionesExternas", etiqueta: "9.2 Relaciones externas", tipo: "area" },
          { id: "horario", etiqueta: "10. Horario de trabajo", tipo: "texto" },
          { id: "ambiente", etiqueta: "11. Ambiente de trabajo", tipo: "area" },
        ],
      },
      {
        id: "riesgos",
        titulo: "12. Riesgos inherentes al cargo",
        tablas: [
          {
            id: "riesgos",
            etiquetaAgregar: "Agregar peligro",
            columnas: [
              { id: "peligro", etiqueta: "Peligro / factor de riesgo", tipo: "texto" },
              { id: "efecto", etiqueta: "Efecto posible", tipo: "texto" },
              { id: "clasificacion", etiqueta: "Clasificación", tipo: "seleccion", opciones: ["Bajo", "Medio", "Alto"] },
            ],
          },
        ],
      },
      {
        id: "salud",
        titulo: "13-16. Protección y salud",
        campos: [
          { id: "epp", etiqueta: "13. Equipo de protección personal requerido", tipo: "area" },
          { id: "examenes", etiqueta: "14. Exámenes médicos requeridos", tipo: "area" },
          { id: "contraindicaciones", etiqueta: "15. Contraindicaciones médicas", tipo: "area" },
          { id: "requerimientosFisicos", etiqueta: "16. Requerimientos físicos", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-051": {
    codigo: "FOR-051",
    nombre: "Análisis de costos de implementación de la gestión de la obra",
    grupo: "Planeación y Gestión",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "costos",
            etiquetaAgregar: "Agregar componente",
            columnas: [
              { id: "componente", etiqueta: "Componente", tipo: "texto" },
              { id: "elementos", etiqueta: "Elementos", tipo: "texto" },
              { id: "unidad", etiqueta: "Unidad", tipo: "texto" },
              { id: "cantidad", etiqueta: "Cantidad", tipo: "numero" },
              { id: "valorUnitario", etiqueta: "Valor unitario", tipo: "numero" },
              { id: "valorTotal", etiqueta: "Valor total", tipo: "numero" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-053": {
    codigo: "FOR-053",
    nombre: "Ficha técnica de indicadores",
    grupo: "Indicadores y Gestión",
    secciones: [
      {
        id: "definicion",
        titulo: "Definición del indicador",
        campos: [
          { id: "nombre", etiqueta: "Nombre del indicador", tipo: "texto", requerido: true },
          { id: "responsableFormular", etiqueta: "Responsable: formular", tipo: "texto" },
          { id: "responsableCalcular", etiqueta: "Responsable: calcular", tipo: "texto" },
          { id: "responsableAnalizar", etiqueta: "Responsable: analizar", tipo: "texto" },
          { id: "definicion", etiqueta: "Definición", tipo: "area", requerido: true },
          { id: "escala", etiqueta: "Escala", tipo: "texto" },
          { id: "fuente", etiqueta: "Fuente", tipo: "texto" },
          { id: "tendencia", etiqueta: "Tendencia", tipo: "seleccion", opciones: ["Ascendente", "Descendente", "Estable"] },
          { id: "tipo", etiqueta: "Tipo", tipo: "seleccion", opciones: ["Gestión", "Proceso", "Resultado"] },
          { id: "nivelReferencia", etiqueta: "Nivel de referencia", tipo: "area" },
          { id: "criterio", etiqueta: "Criterio", tipo: "area" },
          { id: "frecuencia", etiqueta: "Frecuencia", tipo: "texto" },
          { id: "formula", etiqueta: "Fórmula de cálculo", tipo: "area", requerido: true },
          { id: "usuarios", etiqueta: "Usuarios", tipo: "area" },
          { id: "nivelDesagregacion", etiqueta: "Nivel de desagregación", tipo: "seleccion", opciones: ["General", "Por proceso", "Por área"] },
          { id: "metodoGraficacion", etiqueta: "Método de graficación", tipo: "texto" },
          { id: "observaciones", etiqueta: "Observaciones", tipo: "area" },
        ],
      },
      {
        id: "resultados",
        titulo: "Resultados obtenidos",
        tablas: [
          {
            id: "resultados",
            etiquetaAgregar: "Agregar periodo",
            columnas: [
              { id: "periodo", etiqueta: "Periodo", tipo: "texto" },
              { id: "numerador", etiqueta: "Numerador", tipo: "numero" },
              { id: "denominador", etiqueta: "Denominador", tipo: "numero" },
              { id: "resultado", etiqueta: "Resultado", tipo: "numero" },
              { id: "analisis", etiqueta: "Análisis", tipo: "area" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-054": {
    codigo: "FOR-054",
    nombre: "Matriz de indicadores de gestión",
    grupo: "Indicadores y Gestión",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "indicadores",
            etiquetaAgregar: "Agregar indicador",
            columnas: [
              { id: "politica", etiqueta: "Política", tipo: "texto" },
              { id: "objetivos", etiqueta: "Objetivos", tipo: "texto" },
              { id: "programa", etiqueta: "Programa", tipo: "texto" },
              { id: "tipo", etiqueta: "Tipo de indicador", tipo: "seleccion", opciones: ["Gestión", "Proceso", "Resultado"] },
              { id: "nombre", etiqueta: "Nombre del indicador", tipo: "texto" },
              { id: "definicion", etiqueta: "Definición", tipo: "area" },
              { id: "formula", etiqueta: "Fórmula", tipo: "texto" },
              { id: "meta", etiqueta: "Nivel de referencia o meta", tipo: "texto" },
              { id: "frecuencia", etiqueta: "Frecuencia", tipo: "texto" },
              { id: "calculoMensual", etiqueta: "Cálculo de indicadores (meses 1 a 12)", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-058": {
    codigo: "FOR-058",
    nombre: "Plan de control operativo de calidad",
    grupo: "Calidad",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "controles",
            etiquetaAgregar: "Agregar control",
            columnas: [
              { id: "actividad", etiqueta: "Actividad susceptible de control", tipo: "texto" },
              { id: "variable", etiqueta: "Variable de control", tipo: "texto" },
              { id: "metodo", etiqueta: "Método de control", tipo: "seleccion", opciones: ["Inspección", "Ensayo"] },
              { id: "metodologia", etiqueta: "Metodología de implementación y criterio de aceptabilidad", tipo: "area" },
              { id: "frecuencia", etiqueta: "Frecuencia de control", tipo: "texto" },
              { id: "responsable", etiqueta: "Responsable del control", tipo: "texto" },
              { id: "registro", etiqueta: "Registro de evidencia de la implementación del control", tipo: "texto" },
              { id: "fechaInspeccion", etiqueta: "Fecha de inspección", tipo: "fecha" },
              { id: "registroVerificacion", etiqueta: "Registro de verificación", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-059": {
    codigo: "FOR-059",
    nombre: "Control de equipos de medición",
    grupo: "Calidad",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "periodoDesde", etiqueta: "Periodo desde", tipo: "fecha", requerido: true },
          { id: "periodoHasta", etiqueta: "Periodo hasta", tipo: "fecha", requerido: true },
          { id: "localizacion", etiqueta: "Localización", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        tablas: [
          {
            id: "equipos",
            etiquetaAgregar: "Agregar equipo",
            columnas: [
              { id: "labor", etiqueta: "Labor a realizar", tipo: "texto" },
              { id: "equipoContratista", etiqueta: "Equipo (contratista)", tipo: "texto" },
              { id: "precisionContratista", etiqueta: "Precisión (contratista)", tipo: "texto" },
              { id: "certificadoContratista", etiqueta: "Certificado de calibración N° (contratista)", tipo: "texto" },
              { id: "serieContratista", etiqueta: "N° de serie / ID (contratista)", tipo: "texto" },
              { id: "vigenciaContratista", etiqueta: "Certificado vigente hasta (contratista)", tipo: "fecha" },
              { id: "precisionInterventoria", etiqueta: "Precisión (interventoría)", tipo: "texto" },
              { id: "equipoInterventoria", etiqueta: "Equipo (interventoría)", tipo: "texto" },
              { id: "certificadoInterventoria", etiqueta: "Certificado de calibración N° (interventoría)", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "firmas",
        titulo: "Firmas",
        campos: [
          { id: "contratistaFirma", etiqueta: "Contratista: firma", tipo: "texto" },
          { id: "contratistaNombre", etiqueta: "Contratista: nombre", tipo: "texto" },
          { id: "interventoriaFirma", etiqueta: "Interventoría: firma", tipo: "texto" },
          { id: "interventoriaNombre", etiqueta: "Interventoría: nombre", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-060": {
    codigo: "FOR-060",
    nombre: "Inspección de almacenamiento de materiales",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [{ id: "frenteObra", etiqueta: "Frente de obra", tipo: "texto", requerido: true }],
      },
      {
        id: "tabla",
        tablas: [
          {
            id: "materiales",
            etiquetaAgregar: "Agregar material",
            columnas: [
              { id: "producto", etiqueta: "Producto", tipo: "texto" },
              { id: "deterioro", etiqueta: "Directrices para evitar su deterioro", tipo: "area" },
              { id: "lesiones", etiqueta: "Directrices para evitar daños o lesiones", tipo: "area" },
              { id: "ambientales", etiqueta: "Directrices para evitar accidentes ambientales", tipo: "area" },
              { id: "cumpleSi", etiqueta: "¿Cumple? Sí", tipo: "si-no" },
              { id: "cumpleNo", etiqueta: "¿Cumple? No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: [
              { producto: "Cemento Portland", deterioro: "", lesiones: "", ambientales: "", cumpleSi: "", cumpleNo: "", na: "", observaciones: "" },
              { producto: "Agregados pétreos", deterioro: "", lesiones: "", ambientales: "", cumpleSi: "", cumpleNo: "", na: "", observaciones: "" },
              { producto: "Acero", deterioro: "", lesiones: "", ambientales: "", cumpleSi: "", cumpleNo: "", na: "", observaciones: "" },
              { producto: "Materiales de acabado", deterioro: "", lesiones: "", ambientales: "", cumpleSi: "", cumpleNo: "", na: "", observaciones: "" },
              { producto: "Tuberías y accesorios", deterioro: "", lesiones: "", ambientales: "", cumpleSi: "", cumpleNo: "", na: "", observaciones: "" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-061": {
    codigo: "FOR-061",
    nombre: "Registro fotográfico",
    grupo: "Registros y Soportes",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "informeNumero", etiqueta: "Informe N°", tipo: "texto", requerido: true },
          { id: "periodo", etiqueta: "Periodo", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        tablas: [
          {
            id: "fotografias",
            etiquetaAgregar: "Agregar fotografía",
            columnas: [
              { id: "numero", etiqueta: "Fotografía N°", tipo: "texto" },
              { id: "descripcion", etiqueta: "Texto explicativo de la fotografía", tipo: "area" },
            ],
            filasIniciales: [
              { numero: "Fotografía N°1", descripcion: "" },
              { numero: "Fotografía N°2", descripcion: "" },
              { numero: "Fotografía N°3", descripcion: "" },
              { numero: "Fotografía N°4", descripcion: "" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-063": {
    codigo: "FOR-063",
    nombre: "Inspección de uso seguro de herramientas y equipos",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "frenteObra", etiqueta: "Frente de obra", tipo: "texto", requerido: true },
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
        ],
      },
      {
        id: "requisitos",
        titulo: "Requisitos específicos por herramienta: 1) diseño ergonómico y específico para el trabajo; 2) buen estado de limpieza y conservación; 3) protecciones adecuadas en herramientas cortantes/punzantes; 4) óptimas condiciones de uso",
        tablas: [
          {
            id: "herramientas",
            etiquetaAgregar: "Agregar herramienta",
            columnas: [
              { id: "trabajador", etiqueta: "Trabajador", tipo: "texto" },
              { id: "herramienta", etiqueta: "Herramienta / equipo", tipo: "texto" },
              { id: "req1", etiqueta: "Cumple requisito 1", tipo: "si-no" },
              { id: "req2", etiqueta: "Cumple requisito 2", tipo: "si-no" },
              { id: "req3", etiqueta: "Cumple requisito 3", tipo: "si-no" },
              { id: "req4", etiqueta: "Cumple requisito 4", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "generales",
        titulo: "Requisitos generales del manejo de herramientas / equipos",
        tablas: [
          {
            id: "generales",
            etiquetaAgregar: "Agregar requisito",
            columnas: [
              { id: "requisito", etiqueta: "Requisito", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: [
              { requisito: "¿Existen lugares y/o medios idóneos para la ubicación de herramientas/equipos cuando no están en uso?", si: "", no: "", na: "", observaciones: "" },
              { requisito: "¿Existe un sitio o caneca para el lavado de herramientas/equipos?", si: "", no: "", na: "", observaciones: "" },
            ],
          },
        ],
      },
      {
        id: "inspeccion",
        titulo: "Inspeccionado por",
        campos: [
          { id: "inspeccionNombre", etiqueta: "Nombre", tipo: "texto", requerido: true },
          { id: "inspeccionCargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "inspeccionFirma", etiqueta: "Firma", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-065": {
    codigo: "FOR-065",
    nombre: "Control de orden y limpieza en frentes de obra",
    grupo: "Orden y Limpieza",
    secciones: [
      {
        id: "tabla",
        titulo: "Resultados semanales de la inspección (FOR-064) por frente de trabajo",
        tablas: [
          {
            id: "freintes",
            etiquetaAgregar: "Agregar frente de trabajo",
            columnas: [
              { id: "frente", etiqueta: "Frente de trabajo", tipo: "texto" },
              { id: "fechaInspeccion", etiqueta: "Fecha de inspección", tipo: "fecha" },
              { id: "realizo", etiqueta: "Realizó la inspección", tipo: "texto" },
              { id: "responsableFrente", etiqueta: "Responsable del frente de trabajo", tipo: "texto" },
              { id: "resultado", etiqueta: "Resultado (%)", tipo: "numero" },
              { id: "calificacion", etiqueta: "Calificación", tipo: "seleccion", opciones: ["Aceptable", "Mejorable", "Crítico"] },
              { id: "accionesMejora", etiqueta: "Acciones de mejora", tipo: "area" },
              { id: "fechaProgramada", etiqueta: "Fecha programada", tipo: "fecha" },
              { id: "responsableEjecucion", etiqueta: "Responsable de la ejecución", tipo: "texto" },
              { id: "fechaSeguimiento", etiqueta: "Fecha de seguimiento", tipo: "fecha" },
              { id: "responsableSeguimiento", etiqueta: "Responsable del seguimiento", tipo: "texto" },
              { id: "fechaEjecucion", etiqueta: "Fecha de ejecución (si la actividad fue ejecutada)", tipo: "fecha" },
              { id: "registroVerificacion", etiqueta: "Registro de verificación u observaciones", tipo: "area" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-068": {
    codigo: "FOR-068",
    nombre: "Control de mantenimiento preventivo de volquetas",
    grupo: "Vehículos y Maquinaria",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "mantenimientos",
            etiquetaAgregar: "Agregar registro",
            columnas: [
              { id: "placa", etiqueta: "Placa", tipo: "texto" },
              { id: "conductor", etiqueta: "Conductor", tipo: "texto" },
              { id: "mantenimiento", etiqueta: "Mantenimiento realizado", tipo: "area" },
              { id: "fecha", etiqueta: "Fecha de realización", tipo: "fecha" },
              { id: "firma", etiqueta: "Firma del conductor", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-070": {
    codigo: "FOR-070",
    nombre: "Matriz de elementos de protección personal",
    grupo: "Personal y Dotación",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "epp",
            etiquetaAgregar: "Agregar EPP",
            columnas: [
              { id: "imagen", etiqueta: "Imagen del EPP (referencia)", tipo: "texto" },
              { id: "epp", etiqueta: "EPP", tipo: "texto" },
              { id: "tipoProteccion", etiqueta: "Tipo de protección", tipo: "area" },
              { id: "cargo", etiqueta: "Cargo", tipo: "area" },
              { id: "areaUso", etiqueta: "Área donde se deben usar", tipo: "area" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-071": {
    codigo: "FOR-071",
    nombre: "Selección de proveedores - prestadores",
    grupo: "Proveedores",
    secciones: [
      {
        id: "opciones",
        campos: [
          { id: "opcion1", etiqueta: "Proveedor cotizante - Opción 1", tipo: "texto", requerido: true },
          { id: "opcion2", etiqueta: "Proveedor cotizante - Opción 2", tipo: "texto", requerido: true },
          { id: "opcion3", etiqueta: "Proveedor cotizante - Opción 3", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "tabla",
        tablas: [
          {
            id: "cotizaciones",
            etiquetaAgregar: "Agregar ítem",
            columnas: [
              { id: "item", etiqueta: "Ítem", tipo: "texto" },
              { id: "unidad", etiqueta: "Unidad", tipo: "texto" },
              { id: "cantidad", etiqueta: "Cantidad", tipo: "numero" },
              { id: "vUnitario1", etiqueta: "Opción 1: valor unitario", tipo: "numero" },
              { id: "vParcial1", etiqueta: "Opción 1: valor parcial", tipo: "numero" },
              { id: "vUnitario2", etiqueta: "Opción 2: valor unitario", tipo: "numero" },
              { id: "vParcial2", etiqueta: "Opción 2: valor parcial", tipo: "numero" },
              { id: "vUnitario3", etiqueta: "Opción 3: valor unitario", tipo: "numero" },
              { id: "vParcial3", etiqueta: "Opción 3: valor parcial", tipo: "numero" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-072": {
    codigo: "FOR-072",
    nombre: "Listado maestro de proveedores críticos",
    grupo: "Proveedores",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "proveedores",
            etiquetaAgregar: "Agregar proveedor",
            columnas: [
              { id: "nombre", etiqueta: "Nombre del proveedor", tipo: "texto" },
              { id: "productos", etiqueta: "Productos / servicios", tipo: "texto" },
              { id: "contacto", etiqueta: "Nombre de contacto", tipo: "texto" },
              { id: "telefono", etiqueta: "Teléfono / celular", tipo: "texto" },
              { id: "direccion", etiqueta: "Dirección", tipo: "texto" },
              { id: "correo", etiqueta: "Correo electrónico", tipo: "texto" },
              { id: "formaPago", etiqueta: "Forma de pago", tipo: "texto" },
              { id: "cuenta", etiqueta: "N° de cuenta bancaria", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-073": {
    codigo: "FOR-073",
    nombre: "Evaluación de proveedores críticos",
    grupo: "Proveedores",
    secciones: [
      {
        id: "general",
        titulo: "Información general del proveedor",
        campos: [
          { id: "razonSocial", etiqueta: "Nombre / razón social", tipo: "texto", requerido: true },
          { id: "cedulaNit", etiqueta: "Cédula / NIT", tipo: "texto" },
          { id: "contacto", etiqueta: "Nombre de contacto", tipo: "texto" },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "periodo", etiqueta: "Periodo a evaluar", tipo: "texto" },
          { id: "fechaEvaluacion", etiqueta: "Fecha de la evaluación", tipo: "fecha", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Evaluación (califique: Siempre, Casi Siempre, Nunca o No aplica)",
        tablas: [
          {
            id: "criterios",
            etiquetaAgregar: "Agregar criterio",
            columnas: [
              { id: "requisito", etiqueta: "Requisito", tipo: "texto" },
              { id: "criterio", etiqueta: "Criterio de aceptación", tipo: "area" },
              { id: "calificacion", etiqueta: "Calificación", tipo: "seleccion", opciones: OPCIONES_EVALUACION },
            ],
            filasIniciales: [
              { requisito: "Calidad", criterio: "Los productos/servicios suministrados cumplieron con las especificaciones de calidad establecidas.", calificacion: "" },
              { requisito: "Seguridad y Salud en el Trabajo", criterio: "El proveedor cumplió con las normas de seguridad para contratistas e independientes.", calificacion: "" },
              { requisito: "Precio", criterio: "El precio cobrado fue el precio establecido.", calificacion: "" },
              { requisito: "Colocación en sitio del producto / capacidad de traslado", criterio: "El proveedor colocó el producto en el sitio de obra acordado; el prestador de servicios se trasladó a los sitios donde fue requerido.", calificacion: "" },
              { requisito: "Tiempo de entrega", criterio: "Se cumplió con los tiempos de entrega.", calificacion: "" },
              { requisito: "Garantía", criterio: "Dio garantía del producto / servicio.", calificacion: "" },
            ],
          },
        ],
      },
      {
        id: "acciones",
        titulo: "Observaciones y acciones de mejora",
        campos: [
          { id: "observaciones", etiqueta: "Observaciones (especifique cuándo no se presentó el criterio)", tipo: "area" },
          { id: "calificacionFinal", etiqueta: "Calificación final del proveedor", tipo: "texto" },
          { id: "responsableEvaluacion", etiqueta: "Responsable de la evaluación", tipo: "texto", requerido: true },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
        ],
        tablas: [
          {
            id: "accionesMejora",
            etiquetaAgregar: "Agregar acción",
            columnas: [
              { id: "descripcion", etiqueta: "Descripción de la acción", tipo: "area" },
              { id: "fecha", etiqueta: "Fecha", tipo: "fecha" },
              { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-074": {
    codigo: "FOR-074",
    nombre: "Inspección de normas de SST de contratistas",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "contratista", etiqueta: "Contratista", tipo: "texto", requerido: true },
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
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
              { id: "numero", etiqueta: "N°", tipo: "numero" },
              { id: "aspecto", etiqueta: "Aspecto a verificar", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
            ],
            filasIniciales: [
              { numero: "1", aspecto: "Se cuenta con listado de personal actualizado, soportes de afiliaciones o planilla del pago de aportes al SG-SS.", si: "", no: "", na: "" },
              { numero: "2", aspecto: "El contratista realiza entrega de los EPP necesarios según las actividades que realizan los trabajadores y se mantiene registro de dicha entrega.", si: "", no: "", na: "" },
              { numero: "3", aspecto: "Los trabajadores del contratista usan adecuadamente los EPP suministrados por su empleador.", si: "", no: "", na: "" },
              { numero: "4", aspecto: "El contratista cuenta con personal suficiente en obra para las funciones de control y seguimiento a las condiciones de seguridad.", si: "", no: "", na: "" },
              { numero: "5", aspecto: "Los trabajadores del contratista participan de las actividades establecidas en el Plan de Trabajo del proyecto.", si: "", no: "", na: "" },
              { numero: "6", aspecto: "En caso de accidentes de trabajo, el contratista suministró el reporte realizado a la ARL y la investigación.", si: "", no: "", na: "" },
              { numero: "7", aspecto: "El contratista asegura que el área de trabajo se encuentre debidamente delimitada y señalizada para prevenir accidentes de trabajo.", si: "", no: "", na: "" },
              { numero: "8", aspecto: "El contratista asegura que el área de trabajo permanezca limpia y ordenada, y retira diariamente los escombros y residuos generados.", si: "", no: "", na: "" },
              { numero: "9", aspecto: "En caso de realizar actividades de alto riesgo, el contratista realiza las inspecciones de seguridad o permisos de trabajo.", si: "", no: "", na: "" },
              { numero: "10", aspecto: "En caso de realizar trabajos en alturas, el contratista cuenta con Coordinador de Trabajos en Alturas.", si: "", no: "", na: "" },
              { numero: "11", aspecto: "Para el alquiler de maquinaria, el contratista presentó previamente: tarjeta de registro RUNT, SOAT, cédula del operador y licencia del operador.", si: "", no: "", na: "" },
              { numero: "12", aspecto: "Para transporte de materiales, el contratista presentó: licencia de tránsito, SOAT, certificado de técnico mecánica y de gases, cédula y licencia de conducción del conductor.", si: "", no: "", na: "" },
            ],
          },
        ],
      },
      {
        id: "hallazgos",
        titulo: "Hallazgos y acciones",
        campos: [
          { id: "actosIdentificados", etiqueta: "Actos o condiciones inseguras identificadas", tipo: "area" },
          { id: "accionesMejora", etiqueta: "Acciones de mejora", tipo: "area" },
        ],
      },
      {
        id: "inspeccion",
        titulo: "Realizó la inspección",
        campos: [
          { id: "nombre", etiqueta: "Nombre", tipo: "texto", requerido: true },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "fechaFirma", etiqueta: "Fecha", tipo: "fecha" },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-075": {
    codigo: "FOR-075",
    nombre: "Gestión del cambio",
    grupo: "Planeación y Gestión",
    secciones: [
      {
        id: "solicitud",
        titulo: "Solicitud de cambio",
        campos: [
          { id: "objetivo", etiqueta: "Objetivo", tipo: "area" },
          { id: "alcance", etiqueta: "Alcance", tipo: "area" },
          { id: "cronograma", etiqueta: "Cronograma", tipo: "texto" },
          { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
          { id: "descripcion", etiqueta: "Descripción del cambio que se solicita", tipo: "area", requerido: true },
          { id: "justificacion", etiqueta: "Justificación para el cambio", tipo: "area", requerido: true },
          { id: "impactoNoRealizar", etiqueta: "Impacto de no realizar el cambio", tipo: "area" },
        ],
      },
      {
        id: "impacto",
        titulo: "Documentos / elementos impactados",
        campos: [
          { id: "documento", etiqueta: "Documento", tipo: "si-no" },
          { id: "presupuesto", etiqueta: "Presupuesto", tipo: "si-no" },
          { id: "programa", etiqueta: "Programa", tipo: "si-no" },
          { id: "matriz", etiqueta: "Matriz", tipo: "si-no" },
          { id: "procedimiento", etiqueta: "Procedimiento", tipo: "si-no" },
          { id: "diseno", etiqueta: "Diseño", tipo: "si-no" },
          { id: "formato", etiqueta: "Formato", tipo: "si-no" },
          { id: "otro", etiqueta: "Otro", tipo: "si-no" },
          { id: "otroDetalle", etiqueta: "Detalle de otro elemento", tipo: "texto" },
        ],
      },
      {
        id: "planeacion",
        titulo: "Planeación del cambio",
        tablas: [
          {
            id: "actividades",
            etiquetaAgregar: "Agregar actividad",
            columnas: [
              { id: "actividad", etiqueta: "Actividad", tipo: "texto" },
              { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
              { id: "comunicarA", etiqueta: "Comunicar cambio a", tipo: "texto" },
              { id: "firma", etiqueta: "Firma", tipo: "texto" },
              { id: "fechaEjecucion", etiqueta: "Fecha de ejecución", tipo: "fecha" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-076": {
    codigo: "FOR-076",
    nombre: "Formato único de recepción de quejas de presunto acoso laboral",
    grupo: "Convivencia Laboral",
    secciones: [
      {
        id: "recepcion",
        campos: [
          { id: "ciudadFecha", etiqueta: "Ciudad y fecha", tipo: "fecha", requerido: true },
          { id: "autorizaDatos", etiqueta: "Autoriza el tratamiento de datos personales (Ley Estatutaria 1581 de 2012)", tipo: "si-no", requerido: true },
        ],
      },
      {
        id: "acusante",
        titulo: "Acusante",
        campos: [
          { id: "acusanteNombre", etiqueta: "Nombre del acusante", tipo: "texto", requerido: true },
          { id: "acusanteTipoDoc", etiqueta: "Tipo de documento", tipo: "seleccion", opciones: ["C.C.", "T.I.", "NIT"] },
          { id: "acusanteIdentificacion", etiqueta: "Identificación", tipo: "texto", requerido: true },
          { id: "acusanteDireccion", etiqueta: "Dirección", tipo: "texto" },
          { id: "acusanteTelefono", etiqueta: "Teléfono", tipo: "texto" },
          { id: "acusanteCorreo", etiqueta: "Correo electrónico", tipo: "texto" },
          { id: "acusadoNombre", etiqueta: "Nombre del acusado", tipo: "texto", requerido: true },
          { id: "dependencia", etiqueta: "Dependencia - persona - funcionario que interpone la queja", tipo: "seleccion", opciones: ["Trabajador", "Contratista", "Administrativo", "Particular", "Otro"] },
          { id: "dependenciaOtro", etiqueta: "Otro (especifique)", tipo: "texto" },
        ],
      },
      {
        id: "caso",
        titulo: "Descripción del caso",
        campos: [
          { id: "tipoCaso", etiqueta: "Opción que mejor describe el caso", tipo: "seleccion", opciones: ["Agresión física", "Discriminación por raza, sexo, religión, origen familiar, preferencia política y estatus social", "Comentarios hostiles y humillantes", "Amenazas de despido en presencia de los compañeros de trabajo", "Descalificación humillante en presencia de los compañeros de trabajo", "Burlas sobre la apariencia física", "Alusión pública sobre la intimidad del denunciante", "Imposición de deberes y exigencias desproporcionadas sobre el cumplimiento de una labor encomendada", "Exigencia de laborar en horarios excesivos con respecto a la jornada contratada", "Trato notoriamente discriminatorio frente a los demás empleados en cuanto al otorgamiento de derechos y prerrogativas laborales", "Negativa a suministrar materiales e información indispensables para el cumplimiento de la labor", "Negativa a otorgar permisos, licencias por enfermedad, de maternidad, etc.", "Envío de anónimos, llamadas telefónicas y mensajes con contenido injurioso, ofensivo, intimidatorio, etc."] },
          { id: "pruebas", etiqueta: "¿Tiene pruebas? Descríbalas y anéxelas", tipo: "area" },
          { id: "descripcionAcoso", etiqueta: "Descripción del acoso", tipo: "area", requerido: true },
          { id: "firmaTrabajador", etiqueta: "Firma del trabajador", tipo: "texto", requerido: true },
        ],
      },
    ],
  },
  "FOR-077": {
    codigo: "FOR-077",
    nombre: "Formato único de recepción de quejas de presunto acoso sexual o violencia por razones de género",
    grupo: "Convivencia Laboral",
    secciones: [
      {
        id: "recepcion",
        campos: [
          { id: "ciudadFecha", etiqueta: "Ciudad y fecha", tipo: "fecha", requerido: true },
          { id: "numeroCaso", etiqueta: "Número consecutivo del caso", tipo: "texto", requerido: true },
          { id: "medioRecepcion", etiqueta: "Medio de recepción", tipo: "seleccion", opciones: ["Correo", "Presencial", "Telefónico"] },
          { id: "autorizaDatos", etiqueta: "Autoriza el tratamiento de datos personales (Ley Estatutaria 1581 de 2012)", tipo: "si-no", requerido: true },
        ],
      },
      {
        id: "partes",
        titulo: "Acusante y acusado",
        campos: [
          { id: "acusanteNombre", etiqueta: "Nombre del acusante", tipo: "texto", requerido: true },
          { id: "acusanteTipoDoc", etiqueta: "Tipo de documento", tipo: "seleccion", opciones: ["C.C.", "T.I.", "NIT"] },
          { id: "acusanteIdentificacion", etiqueta: "Identificación del acusante", tipo: "texto", requerido: true },
          { id: "acusanteDireccion", etiqueta: "Dirección", tipo: "texto" },
          { id: "acusanteTelefono", etiqueta: "Teléfono", tipo: "texto" },
          { id: "acusanteCorreo", etiqueta: "Correo electrónico", tipo: "texto" },
          { id: "acusadoNombre", etiqueta: "Nombre del acusado", tipo: "texto", requerido: true },
          { id: "dependencia", etiqueta: "Dependencia - persona - funcionario que interpone la queja", tipo: "seleccion", opciones: ["Trabajador", "Contratista", "Administrativo", "Particular", "Otro"] },
          { id: "dependenciaOtro", etiqueta: "Otro (especifique)", tipo: "texto" },
          { id: "recibidoPor", etiqueta: "Recibido por", tipo: "texto", requerido: true },
          { id: "recibidoIdentificacion", etiqueta: "Identificación de quien recibe", tipo: "texto" },
          { id: "recibidoCargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "recibidoFirma", etiqueta: "Firma", tipo: "texto" },
        ],
      },
      {
        id: "caso",
        titulo: "Descripción del caso (uso reservado: Talento Humano y Alta Dirección)",
        campos: [
          { id: "tipoCaso", etiqueta: "Opción que mejor describe el caso", tipo: "seleccion", opciones: ["Comentarios sexuales, insinuaciones, bromas, piropos o chistes connotación sexual", "Preguntas sobre la vida íntima o la orientación sexual", "Proposiciones persistentes con fines sexuales aun después de haber sido rechazadas", "Promesas o amenazas relacionadas con la aceptación o rechazo de propuestas sexuales", "Difundir rumores sobre la vida sexual de una persona", "Miradas o gestos lascivos, gesticulaciones obscenas", "Mostrar o enviar imágenes, videos o material sexual no solicitado", "Exposición intencional del cuerpo con fines sexuales", "Uso de emojis, memes o mensajes con connotación sexual en chats o redes de trabajo", "Tocamientos, abrazos, roces o acercamientos no consentidos", "Intentos de besos o contacto físico con acercarse físicamente", "Bloquear el paso o acercarse", "Cualquier forma de agresión sexual", "Envío de mensajes, audios o videos con contenido íntimo sin consentimiento", "Creación o difusión de contenido íntimo sin consentimiento"] },
          { id: "descripcion", etiqueta: "Descripción de los hechos", tipo: "area", requerido: true },
        ],
      },
    ],
  },
  "FOR-078": {
    codigo: "FOR-078",
    nombre: "Seguimiento de casos de presunto acoso sexual o violencia por razones de género",
    grupo: "Convivencia Laboral",
    secciones: [
      {
        id: "caso",
        titulo: "Datos del caso (uso reservado)",
        campos: [
          { id: "ciudadFecha", etiqueta: "Ciudad y fecha", tipo: "fecha", requerido: true },
          { id: "numeroCaso", etiqueta: "Número consecutivo del caso", tipo: "texto", requerido: true },
          { id: "estadoCaso", etiqueta: "Estado del caso", tipo: "seleccion", opciones: ["Abierto", "En trámite", "Cerrado"], requerido: true },
          { id: "acusanteNombre", etiqueta: "Nombre del acusante", tipo: "texto", requerido: true },
          { id: "acusanteIdentificacion", etiqueta: "Identificación del acusante", tipo: "texto" },
          { id: "acusanteCargo", etiqueta: "Cargo del acusante", tipo: "texto" },
          { id: "acusadoNombre", etiqueta: "Nombre del acusado", tipo: "texto", requerido: true },
          { id: "acusadoIdentificacion", etiqueta: "Identificación del acusado", tipo: "texto" },
          { id: "acusadoCargo", etiqueta: "Cargo del acusado", tipo: "texto" },
        ],
      },
      {
        id: "medidas",
        titulo: "Medidas de protección y remisión",
        campos: [
          { id: "seRemitio", etiqueta: "¿Se remitió a una autoridad externa el caso?", tipo: "si-no" },
          { id: "radicado", etiqueta: "N° de radicado u oficio de remisión", tipo: "texto" },
          { id: "autoridad", etiqueta: "Autoridad externa", tipo: "texto" },
          { id: "fechaRemision", etiqueta: "Fecha de remisión", tipo: "fecha" },
        ],
        tablas: [
          {
            id: "proteccion",
            etiquetaAgregar: "Agregar medida",
            columnas: [
              { id: "medida", etiqueta: "Medida de protección aplicada", tipo: "area" },
              { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
              { id: "fecha", etiqueta: "Fecha", tipo: "fecha" },
            ],
          },
        ],
      },
      {
        id: "seguimiento",
        titulo: "Seguimiento de acciones implementadas",
        tablas: [
          {
            id: "acciones",
            etiquetaAgregar: "Agregar seguimiento",
            columnas: [
              { id: "aspecto", etiqueta: "Aspectos pendientes por tramitar", tipo: "area" },
              { id: "resultado", etiqueta: "Resultado del seguimiento", tipo: "area" },
              { id: "fecha", etiqueta: "Fecha", tipo: "fecha" },
            ],
          },
        ],
      },
      {
        id: "encargado",
        titulo: "Persona encargada de realizar el seguimiento",
        campos: [
          { id: "observaciones", etiqueta: "Observaciones", tipo: "area" },
          { id: "nombre", etiqueta: "Nombre", tipo: "texto", requerido: true },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
          { id: "fechaProximo", etiqueta: "Fecha próximo seguimiento", tipo: "fecha" },
        ],
      },
    ],
  },
  "FOR-079": {
    codigo: "FOR-079",
    nombre: "Control de casos de presunto acoso sexual o violencia por razones de género",
    grupo: "Convivencia Laboral",
    secciones: [
      {
        id: "encabezado",
        titulo: "Control de uso reservado: Talento Humano y Gerencia General",
        campos: [
          { id: "responsableControl", etiqueta: "Responsable del control", tipo: "texto", requerido: true },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "area", etiqueta: "Área", tipo: "texto" },
          { id: "fechaControl", etiqueta: "Fecha del control", tipo: "fecha", requerido: true },
        ],
      },
      {
        id: "tabla",
        tablas: [
          {
            id: "casos",
            etiquetaAgregar: "Agregar caso",
            columnas: [
              { id: "fechaRecepcion", etiqueta: "Fecha de recepción de la queja", tipo: "fecha" },
              { id: "queja", etiqueta: "Queja interpuesta", tipo: "area" },
              { id: "numeroCaso", etiqueta: "Número consecutivo del caso", tipo: "texto" },
              { id: "victimaNombre", etiqueta: "Nombre de la presunta víctima", tipo: "texto" },
              { id: "victimaCargo", etiqueta: "Cargo de la víctima", tipo: "texto" },
              { id: "victimaVinculacion", etiqueta: "Tipo de vinculación", tipo: "seleccion", opciones: ["Trabajador", "Contratista", "Administrativo", "Particular"] },
              { id: "acosadorNombre", etiqueta: "Presunto acosador", tipo: "texto" },
              { id: "acosadorCargo", etiqueta: "Cargo del presunto acosador", tipo: "texto" },
              { id: "etapa", etiqueta: "Etapa del proceso", tipo: "texto" },
              { id: "accionesRealizadas", etiqueta: "Acciones realizadas", tipo: "area" },
              { id: "fechaAvance", etiqueta: "Fecha de avance", tipo: "fecha" },
              { id: "autoridadExterna", etiqueta: "Autoridad externa destinataria", tipo: "texto" },
              { id: "fechaRemision", etiqueta: "Fecha de remisión", tipo: "fecha" },
              { id: "motivoRemision", etiqueta: "Motivo de remisión", tipo: "texto" },
              { id: "documentosAnexados", etiqueta: "Documentos anexados", tipo: "texto" },
              { id: "medioEnvio", etiqueta: "Medio de envío", tipo: "texto" },
              { id: "constancia", etiqueta: "Constancia", tipo: "texto" },
              { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
              { id: "cargoResponsable", etiqueta: "Cargo", tipo: "texto" },
              { id: "tipoMedidas", etiqueta: "Tipo de medidas", tipo: "texto" },
              { id: "medidasAdoptadas", etiqueta: "Medidas adoptadas", tipo: "area" },
              { id: "estadoCaso", etiqueta: "Estado del caso", tipo: "seleccion", opciones: ["Abierto", "En trámite", "Cerrado"] },
              { id: "fechaCierre", etiqueta: "Fecha de cierre", tipo: "fecha" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "area" },
            ],
          },
        ],
      },
    ],
  },
};
