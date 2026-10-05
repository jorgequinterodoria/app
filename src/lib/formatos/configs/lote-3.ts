import type { FormatoConfig } from "../tipos";
import { checklistsIniciales } from "./checklists-iniciales";

const OPCIONES_SIMULACRO = ["1 - Deficiente", "2 - Aceptable", "3 - Bueno", "4 - Muy bueno", "5 - Excelente"];

export const configsLote3: Record<string, FormatoConfig> = {
  "FOR-081": {
    codigo: "FOR-081",
    nombre: "Informe de auditorías internas",
    grupo: "Auditorías",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fechaInforme", etiqueta: "Fecha del informe", tipo: "fecha", requerido: true },
          { id: "ciclo", etiqueta: "Ciclo de auditoría N°", tipo: "numero" },
          { id: "documentosReferencia", etiqueta: "Documentos de referencia", tipo: "area" },
          { id: "auditorLider", etiqueta: "Auditor líder", tipo: "texto", requerido: true },
          { id: "auditoresAcompanantes", etiqueta: "Auditores acompañantes", tipo: "area" },
        ],
      },
      {
        id: "auditados",
        titulo: "Auditados",
        tablas: [
          {
            id: "auditados",
            etiquetaAgregar: "Agregar auditado",
            columnas: [
              { id: "numero", etiqueta: "N°", tipo: "numero" },
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "alcance",
        campos: [
          { id: "alcance", etiqueta: "Alcance de la auditoría", tipo: "area", requerido: true },
          { id: "objetivo", etiqueta: "Objetivo de la auditoría", tipo: "area", requerido: true },
          { id: "hallazgos", etiqueta: "Hallazgos encontrados", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-082": {
    codigo: "FOR-082",
    nombre: "Control de ensayos",
    grupo: "Calidad",
    secciones: [
      {
        id: "periodo",
        campos: [
          { id: "periodoDesde", etiqueta: "Periodo desde", tipo: "fecha", requerido: true },
          { id: "periodoHasta", etiqueta: "Hasta", tipo: "fecha", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Anexe copia de los resultados de ensayos de laboratorio",
        tablas: [
          {
            id: "ensayos",
            etiquetaAgregar: "Agregar ensayo",
            columnas: [
              { id: "fechaToma", etiqueta: "Fecha de toma de muestra", tipo: "fecha" },
              { id: "fechaResultado", etiqueta: "Fecha de resultado", tipo: "fecha" },
              { id: "material", etiqueta: "Material", tipo: "texto" },
              { id: "prueba", etiqueta: "Nombre de prueba / ensayo", tipo: "texto" },
              { id: "localizacion", etiqueta: "Localización", tipo: "texto" },
              { id: "laboratorio", etiqueta: "Laboratorio", tipo: "texto" },
              { id: "norma", etiqueta: "Norma / especificación", tipo: "texto" },
              { id: "resultados", etiqueta: "Resultados", tipo: "area" },
              { id: "cumple", etiqueta: "¿Cumple? Sí / No", tipo: "si-no" },
              { id: "analisis", etiqueta: "Análisis de resultados / decisiones cuando no cumple", tipo: "area" },
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
  "FOR-083": {
    codigo: "FOR-083",
    nombre: "Inspección de trabajo seguro con volquetas",
    grupo: "Vehículos y Maquinaria",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "localizacion", etiqueta: "Localización del frente de trabajo", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Descripción de la tarea", tipo: "area", requerido: true },
          { id: "empresa", etiqueta: "Empresa ejecutante (si es subcontratada)", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Requisito a inspeccionar",
        tablas: [
          {
            id: "requisitos",
            etiquetaAgregar: "Agregar requisito",
            columnas: [
              { id: "requisito", etiqueta: "Requisito", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: checklistsIniciales["FOR-083"],
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
  "FOR-084": {
    codigo: "FOR-084",
    nombre: "Inspección de trabajo seguro de transporte, cargue y descargue de materiales",
    grupo: "Vehículos y Maquinaria",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "localizacion", etiqueta: "Localización del frente de trabajo", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Descripción de la tarea", tipo: "area", requerido: true },
          { id: "empresa", etiqueta: "Empresa ejecutante (si es subcontratada)", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Requisito a inspeccionar",
        tablas: [
          {
            id: "requisitos",
            etiquetaAgregar: "Agregar requisito",
            columnas: [
              { id: "requisito", etiqueta: "Requisito", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: checklistsIniciales["FOR-084"],
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
  "FOR-085": {
    codigo: "FOR-085",
    nombre: "Inspección de trabajo seguro con maquinaria",
    grupo: "Vehículos y Maquinaria",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "localizacion", etiqueta: "Localización del frente de trabajo", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Descripción de la tarea", tipo: "area", requerido: true },
          { id: "empresa", etiqueta: "Empresa ejecutante (si es subcontratada)", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha de la inspección", tipo: "fecha", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Requisito a inspeccionar",
        tablas: [
          {
            id: "requisitos",
            etiquetaAgregar: "Agregar requisito",
            columnas: [
              { id: "requisito", etiqueta: "Requisito", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: checklistsIniciales["FOR-085"],
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
  "FOR-087": {
    codigo: "FOR-087",
    nombre: "Control de mantenimiento de maquinaria",
    grupo: "Vehículos y Maquinaria",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "mantenimientos",
            etiquetaAgregar: "Agregar registro",
            columnas: [
              { id: "maquinaria", etiqueta: "Maquinaria", tipo: "texto" },
              { id: "marca", etiqueta: "Marca", tipo: "texto" },
              { id: "runt", etiqueta: "RUNT", tipo: "texto" },
              { id: "mantenimiento", etiqueta: "Mantenimiento realizado", tipo: "area" },
              { id: "horometro", etiqueta: "Horómetro", tipo: "numero" },
              { id: "fecha", etiqueta: "Fecha de realización", tipo: "fecha" },
              { id: "firma", etiqueta: "Firma del conductor", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "actualizacion",
        titulo: "Actualización de la información",
        campos: [
          { id: "fechaActualizacion", etiqueta: "Fecha de actualización de la información", tipo: "fecha" },
          { id: "actualizo", etiqueta: "Nombre de quien actualizó la información", tipo: "texto" },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-088": {
    codigo: "FOR-088",
    nombre: "Inspección de señalizaciones",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha de la inspección", tipo: "fecha", requerido: true },
          { id: "frente", etiqueta: "Frente", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Identifique la señalización que aplica al frente y su estado",
        tablas: [
          {
            id: "senalizaciones",
            etiquetaAgregar: "Agregar señalización",
            columnas: [
              { id: "senalizacion", etiqueta: "Señalización", tipo: "texto" },
              { id: "aplicaSi", etiqueta: "Aplica: Sí", tipo: "si-no" },
              { id: "aplicaNo", etiqueta: "Aplica: No", tipo: "si-no" },
              { id: "estadoBueno", etiqueta: "Estado: Bueno", tipo: "si-no" },
              { id: "estadoMalo", etiqueta: "Estado: Malo", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "inspeccion",
        campos: [
          { id: "inspeccionadoPor", etiqueta: "Inspeccionado por", tipo: "texto", requerido: true },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-089": {
    codigo: "FOR-089",
    nombre: "Manejo y disposición de RCD",
    grupo: "Ambiental",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "rcd",
            etiquetaAgregar: "Agregar registro de RCD",
            columnas: [
              { id: "rcdGenerado", etiqueta: "RCD generado", tipo: "texto" },
              { id: "periodo", etiqueta: "Periodo o fecha", tipo: "fecha" },
              { id: "frente", etiqueta: "Frente de obra de donde proviene el RCD", tipo: "texto" },
              { id: "cantidadGenerada", etiqueta: "Cantidad de RCD generada", tipo: "numero" },
              { id: "unidad", etiqueta: "Unidad", tipo: "seleccion", opciones: ["m³", "kg"] },
              { id: "disposicion", etiqueta: "Disposición que se dará al material", tipo: "area" },
              { id: "responsable", etiqueta: "Nombre, cédula y cargo del responsable de la disposición", tipo: "texto" },
              { id: "firma", etiqueta: "Firma", tipo: "texto" },
              { id: "cantidadDispuesta", etiqueta: "Cantidad de RCD dispuesta", tipo: "numero" },
              { id: "quienRecibe", etiqueta: "Nombre y cédula de quien recibe (entrega a tercero)", tipo: "texto" },
              { id: "firmaRecibe", etiqueta: "Firma de quien recibe", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-090": {
    codigo: "FOR-090",
    nombre: "Manejo de campamentos e instalaciones temporales",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "items",
            etiquetaAgregar: "Agregar ítem",
            columnas: [
              { id: "numero", etiqueta: "N°", tipo: "texto" },
              { id: "item", etiqueta: "Ítem", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: checklistsIniciales["FOR-090"],
          },
        ],
      },
      {
        id: "actualizacion",
        campos: [
          { id: "fechaActualizacion", etiqueta: "Fecha de actualización de la información", tipo: "fecha" },
          { id: "actualizo", etiqueta: "Nombre de quien actualizó la información", tipo: "texto" },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-091": {
    codigo: "FOR-091",
    nombre: "Cuestionario nórdico DME",
    grupo: "Salud",
    secciones: [
      {
        id: "datos",
        titulo: "I. Registre los siguientes datos",
        campos: [
          { id: "nombre", etiqueta: "1. Nombre del trabajador", tipo: "texto", requerido: true },
          { id: "identificacion", etiqueta: "2. Identificación", tipo: "texto", requerido: true },
          { id: "cargo", etiqueta: "3. Cargo", tipo: "texto" },
          { id: "frenteObra", etiqueta: "4. Frente de obra", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Detección de síntomas de desórdenes musculoesqueléticos (DME)",
        tablas: [
          {
            id: "cuerpo",
            etiquetaAgregar: "Agregar parte del cuerpo",
            columnas: [
              { id: "parte", etiqueta: "Partes del cuerpo", tipo: "texto" },
              { id: "molestias12Meses", etiqueta: "Problemas en los últimos 12 meses", tipo: "si-no" },
              { id: "impedido", etiqueta: "¿Ha estado impedido para su rutina habitual?", tipo: "si-no" },
              { id: "molestias7Dias", etiqueta: "Problemas en los últimos 7 días", tipo: "si-no" },
            ],
            filasIniciales: [
              { parte: "Cuello", molestias12Meses: "", impedido: "", molestias7Dias: "" },
              { parte: "Hombros", molestias12Meses: "", impedido: "", molestias7Dias: "" },
              { parte: "Codos", molestias12Meses: "", impedido: "", molestias7Dias: "" },
              { parte: "Muñecas", molestias12Meses: "", impedido: "", molestias7Dias: "" },
              { parte: "Espalda alta", molestias12Meses: "", impedido: "", molestias7Dias: "" },
              { parte: "Espalda baja", molestias12Meses: "", impedido: "", molestias7Dias: "" },
              { parte: "Una o ambas caderas - muslos", molestias12Meses: "", impedido: "", molestias7Dias: "" },
              { parte: "Una o ambas rodillas", molestias12Meses: "", impedido: "", molestias7Dias: "" },
              { parte: "Tobillos", molestias12Meses: "", impedido: "", molestias7Dias: "" },
              { parte: "Pies", molestias12Meses: "", impedido: "", molestias7Dias: "" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-092": {
    codigo: "FOR-092",
    nombre: "Tabulación cuestionario nórdico",
    grupo: "Salud",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "tabulacion",
            etiquetaAgregar: "Agregar trabajador",
            columnas: [
              { id: "numero", etiqueta: "N°", tipo: "numero" },
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "apellido", etiqueta: "Apellido", tipo: "texto" },
              { id: "tipoDocumento", etiqueta: "Tipo de documento", tipo: "seleccion", opciones: ["C.C.", "T.I.", "C.E.", "P.P."] },
              { id: "numeroDocumento", etiqueta: "Número de documento", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "proceso", etiqueta: "Proceso - subproceso", tipo: "texto" },
              { id: "partesConMolestias", etiqueta: "Partes del cuerpo con molestias y respuestas (SI/NO)", tipo: "area" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-093": {
    codigo: "FOR-093",
    nombre: "Inspección de trabajo seguro de tareas en caliente",
    grupo: "Trabajos en Caliente",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fechaTrabajo", etiqueta: "Fecha de realización del trabajo", tipo: "fecha", requerido: true },
          { id: "lugar", etiqueta: "Lugar de trabajo", tipo: "texto", requerido: true },
          { id: "horaInicio", etiqueta: "Hora de inicio", tipo: "texto" },
          { id: "horaFin", etiqueta: "Hora de finalización", tipo: "texto" },
          { id: "descripcionTarea", etiqueta: "Descripción de la tarea a realizar", tipo: "area", requerido: true },
        ],
      },
      {
        id: "permisos",
        titulo: "Para este trabajo se requiere permiso de",
        campos: [
          { id: "permisoAltura", etiqueta: "Trabajo en altura", tipo: "si-no" },
          { id: "espacioConfinado", etiqueta: "Espacio confinado", tipo: "si-no" },
          { id: "caliente", etiqueta: "Caliente", tipo: "si-no" },
          { id: "energiaPeligrosa", etiqueta: "Energía peligrosa", tipo: "si-no" },
          { id: "otroPermiso", etiqueta: "Otro, ¿cuál?", tipo: "texto" },
        ],
      },
      {
        id: "trabajadores",
        titulo: "Trabajadores ejecutores",
        tablas: [
          {
            id: "trabajadores",
            etiquetaAgregar: "Agregar trabajador",
            columnas: [
              { id: "trabajador", etiqueta: "Cédula, nombres y apellidos", tipo: "texto" },
              { id: "firma", etiqueta: "Firma", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "equipos",
        titulo: "Equipos y herramientas a utilizar",
        tablas: [
          {
            id: "equipos",
            etiquetaAgregar: "Agregar equipo",
            columnas: [
              { id: "equipo", etiqueta: "Equipos y herramientas", tipo: "texto" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "detalle", etiqueta: "Indique cada una de las herramientas a utilizar", tipo: "texto" },
            ],
            filasIniciales: [
              { equipo: "Manuales", si: "", no: "", detalle: "" },
              { equipo: "Eléctricas", si: "", no: "", detalle: "" },
              { equipo: "Neumáticas", si: "", no: "", detalle: "" },
              { equipo: "Hidráulicas", si: "", no: "", detalle: "" },
              { equipo: "Mecánicas", si: "", no: "", detalle: "" },
              { equipo: "Otras", si: "", no: "", detalle: "" },
            ],
          },
        ],
      },
      {
        id: "analisis",
        titulo: "Análisis de la tarea",
        tablas: [
          {
            id: "aspectos",
            etiquetaAgregar: "Agregar aspecto",
            columnas: [
              { id: "aspecto", etiqueta: "Aspecto a verificar", tipo: "area" },
              { id: "condicion", etiqueta: "Condición identificada", tipo: "area" },
            ],
            filasIniciales: checklistsIniciales["FOR-093"],
          },
          {
            id: "pasos",
            etiquetaAgregar: "Agregar paso",
            columnas: [
              { id: "paso", etiqueta: "Pasos detallados de la tarea", tipo: "texto" },
              { id: "peligros", etiqueta: "Peligros existentes y potenciales", tipo: "texto" },
              { id: "consecuencias", etiqueta: "Consecuencias", tipo: "texto" },
              { id: "controles", etiqueta: "Controles requeridos", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "evaluacion",
        titulo: "Evaluación del riesgo",
        campos: [
          { id: "incidentePosible", etiqueta: "¿Es posible, probable o casi-seguro que ocurra un incidente?", tipo: "si-no" },
          { id: "procederConControles", etiqueta: "¿Es seguro procedar con la tarea con los controles adicionales?", tipo: "si-no" },
        ],
      },
      {
        id: "firmas",
        titulo: "Firmas",
        campos: [
          { id: "ejecutores", etiqueta: "Nombre y cédula de los trabajadores (ejecutor)", tipo: "area" },
          { id: "emisor", etiqueta: "Nombre y cédula de la persona (emisor)", tipo: "texto" },
          { id: "firmaEmisor", etiqueta: "Firma del emisor", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-094": {
    codigo: "FOR-094",
    nombre: "Permiso de trabajo seguro de tareas en caliente",
    grupo: "Trabajos en Caliente",
    secciones: [
      {
        id: "vigencia",
        campos: [
          { id: "desde", etiqueta: "Desde (fecha)", tipo: "fecha", requerido: true },
          { id: "horaDesde", etiqueta: "Desde (hora)", tipo: "texto" },
          { id: "hasta", etiqueta: "Hasta (fecha)", tipo: "fecha", requerido: true },
          { id: "horaHasta", etiqueta: "Hasta (hora)", tipo: "texto" },
          { id: "descripcionTarea", etiqueta: "Descripción de la tarea", tipo: "area", requerido: true },
          { id: "areaTrabajo", etiqueta: "Área donde se realizará la tarea", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "bloqueo",
        titulo: "Permisos adicionales y bloqueo de energía peligrosa",
        campos: [
          { id: "bloqueoEnergia", etiqueta: "Bloqueo de energía peligrosa", tipo: "si-no" },
          { id: "electrica", etiqueta: "Eléctrica", tipo: "si-no" },
          { id: "neumatica", etiqueta: "Neumática", tipo: "si-no" },
          { id: "mecanica", etiqueta: "Mecánica", tipo: "si-no" },
          { id: "hidraulica", etiqueta: "Hidráulica", tipo: "si-no" },
          { id: "termica", etiqueta: "Térmica", tipo: "si-no" },
          { id: "equiposBloquear", etiqueta: "Indique qué equipos deben ser bloqueados", tipo: "area" },
          { id: "mecanismoBloqueo", etiqueta: "Mecanismo utilizado para el bloqueo", tipo: "texto" },
          { id: "bloqueadoPor", etiqueta: "Bloqueado por", tipo: "texto" },
          { id: "permisoAltura", etiqueta: "Permiso de trabajo en altura", tipo: "si-no" },
          { id: "permisoEspacios", etiqueta: "Permiso de espacios confinados", tipo: "si-no" },
        ],
      },
      {
        id: "tabla",
        titulo: "Verificación del permiso",
        tablas: [
          {
            id: "verificacion",
            etiquetaAgregar: "Agregar ítem",
            columnas: [
              { id: "numero", etiqueta: "N°", tipo: "texto" },
              { id: "item", etiqueta: "Ítem a verificar", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
            ],
            filasIniciales: checklistsIniciales["FOR-094"],
          },
        ],
      },
      {
        id: "compromisos",
        campos: [
          { id: "verificadoSeguro", etiqueta: "Personalmente hemos verificado los puntos anteriores y consideramos seguro realizar el trabajo", tipo: "si-no" },
          { id: "compromisoTrabajador", etiqueta: "Como trabajador me comprometo a dar por terminado el trabajo si durante la ejecución se presentan condiciones inseguras", tipo: "si-no" },
        ],
      },
      {
        id: "firmas",
        titulo: "Firmas (inicio y fin del permiso)",
        campos: [
          { id: "trabajador1", etiqueta: "Trabajador 1 (nombre y firma/C.C.)", tipo: "texto" },
          { id: "trabajador2", etiqueta: "Trabajador 2 (nombre y firma/C.C.)", tipo: "texto" },
          { id: "trabajador3", etiqueta: "Trabajador 3 (nombre y firma/C.C.)", tipo: "texto" },
          { id: "trabajador4", etiqueta: "Trabajador 4 (nombre y firma/C.C.)", tipo: "texto" },
          { id: "emisor", etiqueta: "Emisor (nombre y firma/C.C.)", tipo: "texto" },
          { id: "liberador", etiqueta: "Liberador (nombre y firma/C.C.)", tipo: "texto" },
          { id: "ingenieroSst", etiqueta: "Ingeniero SST (nombre y firma/C.C.)", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-095": {
    codigo: "FOR-095",
    nombre: "Evaluación inicial del sistema Resolución 0312 del 2019",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "tabla",
        titulo: "Estándares mínimos SG-SST (tabla de valores y calificación)",
        tablas: [
          {
            id: "estandares",
            etiquetaAgregar: "Agregar ítem",
            columnas: [
              { id: "ciclo", etiqueta: "Ciclo PHVA", tipo: "texto" },
              { id: "estandar", etiqueta: "Estándar", tipo: "texto" },
              { id: "subestandar", etiqueta: "Subestándar", tipo: "area" },
              { id: "item", etiqueta: "Ítem del estándar", tipo: "area" },
              { id: "criterio", etiqueta: "Criterio", tipo: "area" },
              { id: "modoVerificacion", etiqueta: "Modo de verificación", tipo: "area" },
              { id: "cumple", etiqueta: "Cumple totalmente", tipo: "si-no" },
              { id: "noCumple", etiqueta: "No cumple (justifica)", tipo: "si-no" },
              { id: "noAplica", etiqueta: "No aplica (no justifica)", tipo: "si-no" },
              { id: "observacion", etiqueta: "Observación", tipo: "area" },
              { id: "planAccion", etiqueta: "Plan de acción", tipo: "area" },
              { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
              { id: "fecha", etiqueta: "Fecha (plazo de cumplimiento)", tipo: "fecha" },
              { id: "fundamentos", etiqueta: "Fundamentos y soportes de efectividad", tipo: "area" },
            ],
            filasIniciales: checklistsIniciales["FOR-095"],
          },
        ],
      },
      {
        id: "conclusiones",
        campos: [{ id: "conclusiones", etiqueta: "Conclusiones", tipo: "area" }],
      },
    ],
  },
  "FOR-096": {
    codigo: "FOR-096",
    nombre: "Planeación de simulacros",
    grupo: "Emergencias",
    secciones: [
      {
        id: "planeacion",
        titulo: "Planeación",
        campos: [
          { id: "lugar", etiqueta: "1. Lugar", tipo: "texto", requerido: true },
          { id: "objetivo", etiqueta: "2. Objetivo del simulacro", tipo: "area", requerido: true },
          { id: "fecha", etiqueta: "3. Fecha", tipo: "fecha", requerido: true },
          { id: "hora", etiqueta: "4. Hora", tipo: "texto" },
          { id: "evento", etiqueta: "5. Evento a simular", tipo: "texto", requerido: true },
          { id: "sitio", etiqueta: "6. Sitio donde se realizará el simulacro", tipo: "texto" },
          { id: "divulgacion", etiqueta: "7. Mecanismos de divulgación de la información", tipo: "area" },
          { id: "alarma", etiqueta: "8. Alarma a utilizar", tipo: "texto" },
          { id: "puntoEncuentro", etiqueta: "9. Punto de encuentro establecido", tipo: "texto" },
          { id: "actores", etiqueta: "10. Actores del simulacro, roles y responsabilidades", tipo: "area" },
          { id: "equipoCoordinador", etiqueta: "11. Equipo coordinador del simulacro", tipo: "area" },
          { id: "primerosAuxilios", etiqueta: "12. Personal de primeros auxilios", tipo: "area" },
          { id: "apoyoExterno", etiqueta: "13. Apoyo externo que se utilizará", tipo: "area" },
          { id: "recursosFisicos", etiqueta: "14. Recursos físicos", tipo: "area" },
          { id: "documentos", etiqueta: "15. Documentos", tipo: "area" },
          { id: "suspender", etiqueta: "16. Situaciones que harían suspender el ejercicio", tipo: "area" },
        ],
      },
      {
        id: "previas",
        titulo: "17. Actividades a realizar antes del ejercicio",
        tablas: [
          {
            id: "previas",
            etiquetaAgregar: "Agregar actividad",
            columnas: [
              { id: "actividad", etiqueta: "Actividad", tipo: "texto" },
              { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
              { id: "fecha", etiqueta: "Fecha", tipo: "fecha" },
            ],
          },
        ],
      },
      {
        id: "guion",
        titulo: "18. Guión del simulacro",
        tablas: [
          {
            id: "guion",
            etiquetaAgregar: "Agregar paso",
            columnas: [
              { id: "hora", etiqueta: "Hora", tipo: "texto" },
              { id: "actividad", etiqueta: "Actividad", tipo: "area" },
            ],
          },
        ],
      },
      {
        id: "aprobacion",
        titulo: "19. Aprobación",
        campos: [
          { id: "responsableNombre", etiqueta: "Nombre del responsable de la planeación y aprobación", tipo: "texto", requerido: true },
          { id: "responsableCargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-097": {
    codigo: "FOR-097",
    nombre: "Evaluación de simulacros",
    grupo: "Emergencias",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "evaluador", etiqueta: "Evaluador", tipo: "texto", requerido: true },
          { id: "sitio", etiqueta: "Sitio asignado", tipo: "texto" },
          { id: "personasEvacuadas", etiqueta: "Número de personas evacuadas", tipo: "numero" },
          { id: "tiempoUtilizado", etiqueta: "Tiempo utilizado", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Criterios de calificación (1 Deficiente - 5 Excelente)",
        tablas: [
          {
            id: "criterios",
            etiquetaAgregar: "Agregar criterio",
            columnas: [
              { id: "item", etiqueta: "Ítem", tipo: "area" },
              { id: "calificacion", etiqueta: "Calificación", tipo: "seleccion", opciones: OPCIONES_SIMULACRO },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: [
              { item: "¿Se activó la alarma de emergencia?", calificacion: "", observaciones: "" },
              { item: "¿Todas las personas presentes acataron la señal de alarma?", calificacion: "", observaciones: "" },
              { item: "¿Considera que el tiempo de respuesta del personal, ante la alarma de emergencia, fue adecuado?", calificacion: "", observaciones: "" },
              { item: "¿Se cuenta con señalización de las rutas de evacuación de acuerdo a los planos?", calificacion: "", observaciones: "" },
              { item: "¿Las rutas de evacuación fueron suficientes para la evacuación del personal?", calificacion: "", observaciones: "" },
              { item: "¿Se mantuvo la calma y el orden durante la evacuación?", calificacion: "", observaciones: "" },
              { item: "¿Se identificó al personal de las brigadas de evacuación?", calificacion: "", observaciones: "" },
              { item: "¿Los brigadistas ejercieron con claridad sus funciones?", calificacion: "", observaciones: "" },
              { item: "¿El personal siguió las normas de seguridad durante la evacuación?", calificacion: "", observaciones: "" },
              { item: "¿Considera que el tiempo de evacuación fue adecuado?", calificacion: "", observaciones: "" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-098": {
    codigo: "FOR-098",
    nombre: "Evaluación de capacitaciones",
    grupo: "Salud",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "evaluador", etiqueta: "Nombre del evaluador", tipo: "texto", requerido: true },
          { id: "evaluadorFirma", etiqueta: "Firma del evaluador", tipo: "texto" },
          { id: "capacitador", etiqueta: "Nombre del capacitador", tipo: "texto", requerido: true },
          { id: "capacitadorFirma", etiqueta: "Firma del capacitador", tipo: "texto" },
          { id: "fechaEvaluacion", etiqueta: "Fecha de evaluación", tipo: "fecha", requerido: true },
        ],
      },
      {
        id: "asistentes",
        titulo: "Asistentes",
        tablas: [
          {
            id: "asistentes",
            etiquetaAgregar: "Agregar asistente",
            columnas: [
              { id: "nombres", etiqueta: "Nombres y apellidos", tipo: "texto" },
              { id: "identificacion", etiqueta: "Identificación", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "firma", etiqueta: "Firma", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "evaluacion",
        titulo: "Evaluación de aprendizaje",
        campos: [
          { id: "tema", etiqueta: "Tema de la capacitación", tipo: "texto", requerido: true },
          { id: "fechaCapacitacion", etiqueta: "Fecha de la capacitación", tipo: "fecha" },
          { id: "calificacion", etiqueta: "Calificación", tipo: "texto" },
        ],
        tablas: [
          {
            id: "preguntas",
            etiquetaAgregar: "Agregar pregunta",
            columnas: [
              { id: "pregunta", etiqueta: "Pregunta", tipo: "area" },
              { id: "respuesta", etiqueta: "Respuesta", tipo: "area" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-099": {
    codigo: "FOR-099",
    nombre: "Listado de vehículos",
    grupo: "Vehículos y Maquinaria",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "vehiculos",
            etiquetaAgregar: "Agregar vehículo",
            columnas: [
              { id: "numero", etiqueta: "N°", tipo: "numero" },
              { id: "placa", etiqueta: "Placa", tipo: "texto" },
              { id: "anio", etiqueta: "Año", tipo: "numero" },
              { id: "capacidad", etiqueta: "Capacidad", tipo: "texto" },
              { id: "propietario", etiqueta: "Propietario", tipo: "texto" },
              { id: "identificacion", etiqueta: "Identificación propietario", tipo: "texto" },
              { id: "tarjetaPropiedad", etiqueta: "¿Tiene tarjeta de propiedad?", tipo: "si-no" },
              { id: "tecnicoMecanica", etiqueta: "¿Tiene técnico mecánica vigente?", tipo: "si-no" },
              { id: "soat", etiqueta: "¿Tiene SOAT vigente?", tipo: "si-no" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-100": {
    codigo: "FOR-100",
    nombre: "Inspección de condiciones seguras para trabajos en altura",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "localizacion", etiqueta: "Localización del frente de trabajo", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Descripción de la tarea (incluya la altura aproximada)", tipo: "area", requerido: true },
          { id: "empresa", etiqueta: "Empresa ejecutante (si es subcontratada)", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
        ],
      },
      {
        id: "tabla",
        titulo: "Inspección del personal, medidas colectivas, EPP y sistemas de acceso",
        tablas: [
          {
            id: "requisitos",
            etiquetaAgregar: "Agregar requisito",
            columnas: [
              { id: "requisito", etiqueta: "Requisito", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: checklistsIniciales["FOR-100"],
          },
        ],
      },
    ],
  },
  "FOR-101": {
    codigo: "FOR-101",
    nombre: "Análisis de trabajo seguro para trabajos en altura",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "general",
        campos: [
          { id: "objetivo", etiqueta: "Objetivo", tipo: "area" },
          { id: "actividad", etiqueta: "Actividad", tipo: "texto", requerido: true },
          { id: "tareas", etiqueta: "Tareas", tipo: "area" },
          { id: "rutinaria", etiqueta: "¿Es rutinaria?", tipo: "si-no" },
          { id: "fechaAnalisis", etiqueta: "Fecha de análisis", tipo: "fecha", requerido: true },
          { id: "condicionesClimaticas", etiqueta: "Condiciones climáticas", tipo: "texto" },
          { id: "horaInicio", etiqueta: "Hora de inicio de la actividad", tipo: "texto" },
          { id: "horaFin", etiqueta: "Hora de finalización de la actividad", tipo: "texto" },
          { id: "sitio", etiqueta: "Sitio donde se realizará la actividad", tipo: "texto" },
          { id: "empresaEjecutante", etiqueta: "Empresa ejecutante (si es contratada)", tipo: "texto" },
          { id: "altura", etiqueta: "Altura en que se realizará la actividad", tipo: "texto" },
          { id: "estadoEstructura", etiqueta: "Estado de la estructura donde se realizará la actividad", tipo: "texto" },
        ],
      },
      {
        id: "espacioLibreCaida",
        titulo: "Requerimiento de claridad o espacio libre de caída (RC = DCL + DD + HT + FS)",
        campos: [
          { id: "dcl", etiqueta: "DCL: Distancia de caída libre (m)", tipo: "numero" },
          { id: "dd", etiqueta: "DD: Distancia de desaceleración (m)", tipo: "numero" },
          { id: "ht", etiqueta: "HT: Estatura normal del trabajador (m)", tipo: "numero" },
          { id: "fs", etiqueta: "FS: Factor de seguridad (mín. 1 m)", tipo: "numero" },
          { id: "rc", etiqueta: "RC: Espacio libre de caída requerido (m)", tipo: "numero" },
          { id: "trabajadores", etiqueta: "¿Cuántos trabajadores se requieren?", tipo: "numero" },
        ],
      },
      {
        id: "recursos",
        titulo: "Recursos que se utilizarán",
        campos: [
          { id: "materiales", etiqueta: "Materiales", tipo: "area" },
          { id: "equiposMenores", etiqueta: "Equipos menores", tipo: "area" },
          { id: "herramientas", etiqueta: "Herramientas", tipo: "area" },
          { id: "sustancias", etiqueta: "Sustancias químicas", tipo: "area" },
        ],
      },
      {
        id: "peligros",
        titulo: "Peligros identificados",
        campos: [
          { id: "elementosCaer", etiqueta: "¿Qué elementos pueden caer?", tipo: "area" },
          { id: "hoyos", etiqueta: "¿Existen hoyos o grietas debajo o alrededor del área de trabajo?", tipo: "area" },
          { id: "resbalar", etiqueta: "¿Hay peligro de resbalar o tropezar alrededor del área de trabajo?", tipo: "area" },
          { id: "otrosPeligros", etiqueta: "¿Qué otros peligros hay en el área de trabajo?", tipo: "area" },
        ],
        tablas: [
          {
            id: "peligrosControles",
            etiquetaAgregar: "Agregar peligro",
            columnas: [
              { id: "peligro", etiqueta: "Peligro", tipo: "texto" },
              { id: "control", etiqueta: "Control necesario", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "procedimiento",
        titulo: "Procedimiento de trabajo seguro",
        campos: [
          { id: "antes", etiqueta: "Antes", tipo: "area" },
          { id: "durante", etiqueta: "Durante", tipo: "area" },
          { id: "despues", etiqueta: "Después", tipo: "area" },
        ],
      },
      {
        id: "colectivas",
        titulo: "Medidas colectivas de prevención necesarias",
        campos: [
          { id: "delimitacion", etiqueta: "1. Delimitación del área con peligro de caída", tipo: "area" },
          { id: "lineaAdvertencia", etiqueta: "2. Línea de advertencia", tipo: "area" },
          { id: "senalizacion", etiqueta: "3. Señalización del área", tipo: "area" },
          { id: "barandas", etiqueta: "4. Barandas", tipo: "area" },
          { id: "controlAcceso", etiqueta: "5. Control de acceso", tipo: "area" },
          { id: "desniveles", etiqueta: "6. Manejo de desniveles y orificios (huecos)", tipo: "area" },
          { id: "sistemasAcceso", etiqueta: "Sistemas de acceso para trabajo en altura", tipo: "area" },
          { id: "medidasProteccion", etiqueta: "Medidas de protección contra caídas", tipo: "area" },
          { id: "planRescate", etiqueta: "Plan de rescate", tipo: "area" },
        ],
      },
      {
        id: "evaluacion",
        titulo: "Evaluación del riesgo",
        campos: [
          { id: "incidentePosible", etiqueta: "¿Es posible, probable o casi-seguro que ocurra un incidente?", tipo: "si-no" },
          { id: "procederConControles", etiqueta: "¿Es seguro proceder con la tarea con los controles adicionales?", tipo: "si-no" },
        ],
      },
    ],
  },
  "FOR-102": {
    codigo: "FOR-102",
    nombre: "Inspección pre uso de arnés",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "localizacion", etiqueta: "Localización del frente de trabajo", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Descripción de la tarea (incluya la altura aproximada)", tipo: "area", requerido: true },
          { id: "empresa", etiqueta: "Empresa ejecutante (si es subcontratada)", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
          { id: "serie", etiqueta: "Serie del equipo N°", tipo: "texto" },
          { id: "marca", etiqueta: "Marca", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Inspección pre uso (marque Sí/No según el estándar esperado)",
        tablas: [
          {
            id: "aspectos",
            etiquetaAgregar: "Agregar aspecto",
            columnas: [
              { id: "equipo", etiqueta: "Equipo", tipo: "texto" },
              { id: "partes", etiqueta: "Partes", tipo: "texto" },
              { id: "aspecto", etiqueta: "Aspecto a inspeccionar", tipo: "area" },
              { id: "estandar", etiqueta: "Estándar esperado", tipo: "texto" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: checklistsIniciales["FOR-102"],
          },
        ],
      },
    ],
  },
  "FOR-103": {
    codigo: "FOR-103",
    nombre: "Inspección pre uso de eslingas, tie off y mosquetones",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "localizacion", etiqueta: "Localización del frente de trabajo", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Descripción de la tarea (incluya la altura aproximada)", tipo: "area", requerido: true },
          { id: "empresa", etiqueta: "Empresa ejecutante (si es subcontratada)", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
          { id: "serie", etiqueta: "Serie del equipo N°", tipo: "texto" },
          { id: "marca", etiqueta: "Marca", tipo: "texto" },
          { id: "tipoEslinga", etiqueta: "Tipo de eslinga", tipo: "seleccion", opciones: ["Posicionamiento", "En y con absorbedor", "Tie off (anclaje portátil)"] },
        ],
      },
      {
        id: "tabla",
        titulo: "Inspección pre uso (marque Sí/No según el estándar esperado)",
        tablas: [
          {
            id: "aspectos",
            etiquetaAgregar: "Agregar aspecto",
            columnas: [
              { id: "equipo", etiqueta: "Equipo", tipo: "texto" },
              { id: "partes", etiqueta: "Partes", tipo: "texto" },
              { id: "aspecto", etiqueta: "Aspecto a inspeccionar", tipo: "area" },
              { id: "estandar", etiqueta: "Estándar esperado", tipo: "texto" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: checklistsIniciales["FOR-103"],
          },
        ],
      },
    ],
  },
  "FOR-104": {
    codigo: "FOR-104",
    nombre: "Inspección línea de vida y freno",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "localizacion", etiqueta: "Localización del frente de trabajo", tipo: "texto", requerido: true },
          { id: "tarea", etiqueta: "Descripción de la tarea (incluya la altura aproximada)", tipo: "area", requerido: true },
          { id: "empresa", etiqueta: "Empresa ejecutante (si es subcontratada)", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha de inspección", tipo: "fecha", requerido: true },
          { id: "responsable", etiqueta: "Responsable de la inspección", tipo: "texto", requerido: true },
          { id: "serie", etiqueta: "Serie del equipo N°", tipo: "texto" },
          { id: "marca", etiqueta: "Marca", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Inspección pre uso (marque Sí/No según el estándar esperado)",
        tablas: [
          {
            id: "aspectos",
            etiquetaAgregar: "Agregar aspecto",
            columnas: [
              { id: "equipo", etiqueta: "Equipo", tipo: "texto" },
              { id: "partes", etiqueta: "Partes", tipo: "texto" },
              { id: "aspecto", etiqueta: "Aspecto a inspeccionar", tipo: "area" },
              { id: "estandar", etiqueta: "Estándar esperado", tipo: "texto" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
            filasIniciales: checklistsIniciales["FOR-104"],
          },
        ],
      },
    ],
  },
  "FOR-105": {
    codigo: "FOR-105",
    nombre: "Inventario de equipos de protección contra caídas",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "frenteObra", etiqueta: "Frente de obra", tipo: "texto", requerido: true },
          { id: "actualizo", etiqueta: "Actualizó", tipo: "texto", requerido: true },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
        ],
      },
      {
        id: "tabla",
        tablas: [
          {
            id: "equipos",
            etiquetaAgregar: "Agregar equipo",
            columnas: [
              { id: "equipo", etiqueta: "Equipo", tipo: "texto" },
              { id: "marca", etiqueta: "Marca", tipo: "texto" },
              { id: "modelo", etiqueta: "Modelo", tipo: "texto" },
              { id: "serie", etiqueta: "Serie", tipo: "texto" },
              { id: "fechaFabricacion", etiqueta: "Fecha de fabricación", tipo: "fecha" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-106": {
    codigo: "FOR-106",
    nombre: "Hoja de vida de equipos de trabajos en altura",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "equipo",
        titulo: "Equipo (marque con una X)",
        campos: [
          { id: "tipoEquipo", etiqueta: "Tipo de equipo", tipo: "seleccion", opciones: ["Arnés", "Tie off (anclaje portátil)", "Eslinga de posicionamiento", "Eslinga con absorbedor", "Eslinga y línea de vida", "Escalera", "Andamio", "Otro"], requerido: true },
          { id: "otroTipo", etiqueta: "Otro (especifique)", tipo: "texto" },
        ],
      },
      {
        id: "datos",
        titulo: "Datos del equipo",
        campos: [
          { id: "fechaFabricacion", etiqueta: "Fecha de fabricación", tipo: "fecha", requerido: true },
          { id: "fechaVencimiento", etiqueta: "Fecha de vencimiento", tipo: "fecha" },
          { id: "marca", etiqueta: "Marca", tipo: "texto" },
          { id: "modelo", etiqueta: "Modelo", tipo: "texto" },
          { id: "serial", etiqueta: "Serial", tipo: "texto" },
          { id: "localizacion", etiqueta: "Localización", tipo: "texto" },
        ],
      },
      {
        id: "historial",
        titulo: "Historial de inspecciones y mantenimientos",
        tablas: [
          {
            id: "historial",
            etiquetaAgregar: "Agregar registro",
            columnas: [
              { id: "fecha", etiqueta: "Fecha", tipo: "fecha" },
              { id: "tipoRegistro", etiqueta: "Tipo de registro", tipo: "seleccion", opciones: ["Inspección pre uso", "Inspección periódica", "Mantenimiento", "Prueba de laboratorio", "Retiro de servicio"] },
              { id: "resultado", etiqueta: "Resultado / observaciones", tipo: "area" },
              { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-108": {
    codigo: "FOR-108",
    nombre: "Inventario de tareas con alto riesgo de caídas de altura",
    grupo: "Altura e Izaje",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "tareas",
            etiquetaAgregar: "Agregar tarea",
            columnas: [
              { id: "numero", etiqueta: "N°", tipo: "numero" },
              { id: "actividad", etiqueta: "Actividad a desarrollar", tipo: "area" },
              { id: "rutinariaSi", etiqueta: "¿Es rutinaria? Sí", tipo: "si-no" },
              { id: "rutinariaNo", etiqueta: "¿Es rutinaria? No", tipo: "si-no" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "area" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-109": {
    codigo: "FOR-109",
    nombre: "Matriz de control de calidad, inspección y ensayos",
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
      {
        id: "aprobacion",
        titulo: "Control de aprobación",
        campos: [
          { id: "contratistaFirma", etiqueta: "Contratista de obra: firma", tipo: "texto" },
          { id: "interventoriaFirma", etiqueta: "Interventoría: firma", tipo: "texto" },
          { id: "supervisorFirma", etiqueta: "Supervisor de la entidad: firma", tipo: "texto" },
        ],
      },
    ],
  },
};
