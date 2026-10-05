import type { FormatoConfig } from "../tipos";

export const configsLote1: Record<string, FormatoConfig> = {
  "FOR-001": {
    codigo: "FOR-001",
    nombre: "Listado maestro de documentos",
    grupo: "Listados y Maestros",
    secciones: [
      {
        id: "tabla",
        titulo: "Documentos del SGIC",
        tablas: [
          {
            id: "documentos",
            etiquetaAgregar: "Agregar documento",
            columnas: [
              { id: "nombre", etiqueta: "Nombre del documento", tipo: "texto" },
              { id: "codigo", etiqueta: "Código", tipo: "texto" },
              { id: "version", etiqueta: "Versión actual", tipo: "texto" },
              {
                id: "tipo",
                etiqueta: "Tipo de documento",
                tipo: "seleccion",
                opciones: ["Política", "Manual", "Procedimiento", "Instructivo", "Formato", "Registro"],
              },
              {
                id: "estado",
                etiqueta: "Estado actual",
                tipo: "seleccion",
                opciones: ["Vigente", "En revisión", "Obsoleto"],
              },
              { id: "fechaAprobacion", etiqueta: "Fecha de aprobación", tipo: "fecha" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-002": {
    codigo: "FOR-002",
    nombre: "Listado maestro de registros",
    grupo: "Listados y Maestros",
    secciones: [
      {
        id: "tabla",
        titulo: "Registros del SGIC",
        tablas: [
          {
            id: "registros",
            etiquetaAgregar: "Agregar registro",
            columnas: [
              { id: "nombre", etiqueta: "Nombre del registro", tipo: "texto" },
              { id: "responsable", etiqueta: "Responsable del registro", tipo: "texto" },
              { id: "almacenamiento", etiqueta: "Forma de almacenamiento", tipo: "seleccion", opciones: ["Físico", "Magnético", "Físico y magnético"] },
              { id: "lugar", etiqueta: "Lugar físico / ruta magnética", tipo: "texto" },
              { id: "retencion", etiqueta: "Tiempo de retención", tipo: "texto" },
              { id: "disposicion", etiqueta: "Disposición", tipo: "texto" },
              { id: "documentoAsociado", etiqueta: "Documento asociado", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-004": {
    codigo: "FOR-004",
    nombre: "Listado de herramientas y equipos",
    grupo: "Listados y Maestros",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "herramientas",
            etiquetaAgregar: "Agregar herramienta o equipo",
            columnas: [
              { id: "nombre", etiqueta: "Herramienta / equipo", tipo: "texto" },
              { id: "cantidad", etiqueta: "Cantidad", tipo: "numero" },
              { id: "estado", etiqueta: "Estado", tipo: "seleccion", opciones: ["Bueno", "Malo"] },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-005": {
    codigo: "FOR-005",
    nombre: "Listado de sustancias químicas",
    grupo: "Listados y Maestros",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "sustancias",
            etiquetaAgregar: "Agregar sustancia",
            columnas: [
              { id: "nombre", etiqueta: "Sustancia química", tipo: "texto" },
              { id: "fichaSeguridad", etiqueta: "Ficha de seguridad en obra", tipo: "si-no" },
              { id: "envaseRotulado", etiqueta: "Envase rotulado", tipo: "si-no" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-007": {
    codigo: "FOR-007",
    nombre: "Registro de entrega de dotación y EPP",
    grupo: "Personal y Dotación",
    secciones: [
      {
        id: "tabla",
        titulo: "Entregas de dotación y EPP (indique la cantidad por elemento)",
        tablas: [
          {
            id: "entregas",
            etiquetaAgregar: "Agregar entrega",
            columnas: [
              { id: "trabajador", etiqueta: "Nombre del trabajador", tipo: "texto" },
              { id: "identificacion", etiqueta: "Identificación", tipo: "texto" },
              { id: "casco", etiqueta: "Casco", tipo: "numero" },
              { id: "guantes", etiqueta: "Guantes", tipo: "numero" },
              { id: "gafas", etiqueta: "Gafas", tipo: "numero" },
              { id: "mascarilla", etiqueta: "Mascarilla", tipo: "numero" },
              { id: "botas", etiqueta: "Botas", tipo: "numero" },
              { id: "protectorAuditivo", etiqueta: "Protector auditivo", tipo: "numero" },
              { id: "chaleco", etiqueta: "Chaleco", tipo: "numero" },
              { id: "camisa", etiqueta: "Camisa", tipo: "numero" },
              { id: "pantalon", etiqueta: "Pantalón", tipo: "numero" },
              { id: "otro", etiqueta: "Otro", tipo: "texto" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
              { id: "fechaEntrega", etiqueta: "Fecha de entrega", tipo: "fecha" },
              { id: "firma", etiqueta: "Firma del trabajador", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-011": {
    codigo: "FOR-011",
    nombre: "Remisión a exámenes médicos ocupacionales",
    grupo: "Salud",
    secciones: [
      {
        id: "carta",
        titulo: "Datos de la solicitud",
        campos: [
          { id: "fecha", etiqueta: "Ciudad y fecha", tipo: "fecha" },
          { id: "ips", etiqueta: "IPS / médico ocupacional", tipo: "texto" },
          { id: "direccion", etiqueta: "Dirección de la IPS", tipo: "texto" },
          { id: "telefono", etiqueta: "Teléfono", tipo: "texto" },
          { id: "ciudad", etiqueta: "Ciudad", tipo: "texto" },
          {
            id: "tipoExamen",
            etiqueta: "Tipo de examen médico ocupacional",
            tipo: "seleccion",
            opciones: ["Pre-Ingreso", "Periódica", "Egreso", "Retorno Laboral", "Post-Incapacidad", "De Seguimiento", "De Control"],
          },
          { id: "examenesComplementarios", etiqueta: "Exámenes complementarios solicitados", tipo: "area", placeholder: "Audiometría, Visiometría, Espirometría, Perfil Lipídico, Electrocardiograma, Glicemia, Alturas, Espacios Confinados, Otros" },
        ],
      },
      {
        id: "trabajadores",
        titulo: "Trabajadores a remitir",
        tablas: [
          {
            id: "listado",
            etiquetaAgregar: "Agregar trabajador",
            columnas: [
              { id: "nombres", etiqueta: "Nombres y apellidos", tipo: "texto" },
              { id: "identificacion", etiqueta: "Cédula", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-012": {
    codigo: "FOR-012",
    nombre: "Cronograma de trabajo",
    grupo: "Planeación y Gestión",
    secciones: [
      {
        id: "planeacion",
        campos: [
          { id: "objetivo", etiqueta: "Objetivo", tipo: "area" },
          { id: "metas", etiqueta: "Metas", tipo: "area" },
        ],
      },
      {
        id: "cronograma",
        titulo: "Plan / programa",
        tablas: [
          {
            id: "actividades",
            etiquetaAgregar: "Agregar actividad",
            columnas: [
              { id: "plan", etiqueta: "Plan / programa", tipo: "texto" },
              { id: "actividad", etiqueta: "Actividades", tipo: "texto" },
              { id: "periodicidad", etiqueta: "Periodicidad", tipo: "texto" },
              { id: "dirigida", etiqueta: "A quién va dirigida", tipo: "texto" },
              { id: "recursos", etiqueta: "Recursos necesarios", tipo: "texto" },
              { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
              { id: "estado", etiqueta: "Estado de ejecución", tipo: "seleccion", opciones: ["Planificada", "En ejecución", "Ejecutada", "No aplica"] },
              { id: "evaluacion", etiqueta: "Evaluación del cumplimiento", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-013": {
    codigo: "FOR-013",
    nombre: "Encuesta de perfil sociodemográfico",
    grupo: "Salud",
    secciones: [
      {
        id: "datos",
        titulo: "I. Registre los siguientes datos",
        campos: [
          { id: "nombre", etiqueta: "1. Nombre del trabajador", tipo: "texto", requerido: true },
          { id: "identificacion", etiqueta: "2. Identificación", tipo: "texto", requerido: true },
          { id: "cargo", etiqueta: "3. Cargo", tipo: "texto" },
          { id: "area", etiqueta: "4. Área", tipo: "seleccion", opciones: ["Administrativa", "Operativa"] },
          { id: "fechaNacimiento", etiqueta: "5. Fecha de nacimiento", tipo: "fecha" },
          { id: "edad", etiqueta: "Edad actual", tipo: "numero" },
          { id: "direccion", etiqueta: "6. Dirección de residencia", tipo: "texto" },
          { id: "barrio", etiqueta: "Barrio", tipo: "texto" },
          { id: "municipio", etiqueta: "7. Municipio", tipo: "texto" },
        ],
      },
      {
        id: "encuesta",
        titulo: "II. Respuestas de la encuesta",
        campos: [
          { id: "respuestas", etiqueta: "Respuestas", tipo: "area", placeholder: "Registre las respuestas a las preguntas de la encuesta sociodemográfica" },
        ],
      },
    ],
  },
  "FOR-014": {
    codigo: "FOR-014",
    nombre: "Perfil sociodemográfico",
    grupo: "Salud",
    secciones: [
      {
        id: "tabla",
        titulo: "Parte 1",
        tablas: [
          {
            id: "personal",
            etiquetaAgregar: "Agregar trabajador",
            columnas: [
              { id: "nombres", etiqueta: "Nombres y apellidos", tipo: "texto" },
              { id: "cedula", etiqueta: "Cédula de ciudadanía", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "vinculacion", etiqueta: "Tipo de vinculación", tipo: "seleccion", opciones: ["Contrato a término fijo", "Contrato a término indefinido", "Prestación de servicios", "Obra o labor contratada"] },
              { id: "fechaIngreso", etiqueta: "Fecha de ingreso", tipo: "fecha" },
              { id: "eps", etiqueta: "EPS", tipo: "texto" },
              { id: "arl", etiqueta: "ARL", tipo: "texto" },
              { id: "afp", etiqueta: "AFP", tipo: "texto" },
              { id: "area", etiqueta: "Área", tipo: "texto" },
              { id: "sueldo", etiqueta: "Sueldo / honorarios", tipo: "texto" },
              { id: "antiguedadEmpresa", etiqueta: "Antigüedad en la empresa", tipo: "texto" },
              { id: "antiguedadCargo", etiqueta: "Antigüedad en el cargo", tipo: "texto" },
              { id: "fechaRetiro", etiqueta: "Fecha de retiro", tipo: "fecha" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-015": {
    codigo: "FOR-015",
    nombre: "Control de ausentismo",
    grupo: "Salud",
    secciones: [
      {
        id: "periodo",
        titulo: "Periodo reportado",
        campos: [
          { id: "desde", etiqueta: "Desde", tipo: "fecha" },
          { id: "hasta", etiqueta: "Hasta", tipo: "fecha" },
        ],
      },
      {
        id: "tabla",
        titulo: "Ausentismos",
        tablas: [
          {
            id: "ausentismos",
            etiquetaAgregar: "Agregar ausentismo",
            columnas: [
              { id: "cedula", etiqueta: "Cédula", tipo: "texto" },
              { id: "trabajador", etiqueta: "Apellidos y nombres del trabajador", tipo: "texto" },
              { id: "edad", etiqueta: "Edad", tipo: "numero" },
              { id: "cargo", etiqueta: "Cargo actual", tipo: "texto" },
              { id: "fechaInicio", etiqueta: "Fecha de inicio de ausentismo", tipo: "fecha" },
              { id: "motivoTipo", etiqueta: "Tipo de motivo", tipo: "seleccion", opciones: ["Incapacidad médica", "Personal", "S (Suspensión)", "SJC (Sin justa causa)"] },
              { id: "motivoCodigo", etiqueta: "Código del motivo (EG, LM, LP, AT, EP, CM, D, EST, CD)", tipo: "texto" },
              { id: "horas", etiqueta: "Duración horas", tipo: "numero" },
              { id: "dias", etiqueta: "Duración días", tipo: "numero" },
              { id: "fechaTerminacion", etiqueta: "Fecha de terminación", tipo: "fecha" },
              { id: "diagnostico", etiqueta: "Diagnóstico", tipo: "texto" },
              { id: "observaciones", etiqueta: "Observaciones", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-016": {
    codigo: "FOR-016",
    nombre: "Determinación de la presencia del riesgo",
    grupo: "Planeación y Gestión",
    secciones: [
      {
        id: "estudio",
        titulo: "1. Estudio preliminar de la presencia de factores de riesgo",
        campos: [{ id: "fecha", etiqueta: "Fecha", tipo: "fecha" }],
        tablas: [
          {
            id: "factores",
            etiquetaAgregar: "Agregar factor de riesgo",
            columnas: [
              { id: "fuente", etiqueta: "Fuente de información", tipo: "texto" },
              { id: "factor", etiqueta: "Factor de riesgo identificado", tipo: "texto" },
              { id: "actividad", etiqueta: "Actividad donde se presenta", tipo: "texto" },
              { id: "valoracion", etiqueta: "Valoración del riesgo", tipo: "seleccion", opciones: ["Bajo", "Medio", "Alto", "Muy alto"] },
              { id: "cargos", etiqueta: "Cargos que participan en la actividad", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "intervenciones",
        titulo: "2. Intervenciones realizadas frente al factor de riesgo",
        tablas: [
          {
            id: "intervenciones",
            etiquetaAgregar: "Agregar intervención",
            columnas: [
              { id: "medida", etiqueta: "Medidas de intervención implementadas", tipo: "texto" },
              { id: "fecha", etiqueta: "Fecha", tipo: "fecha" },
              { id: "resultados", etiqueta: "Resultados obtenidos", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-017": {
    codigo: "FOR-017",
    nombre: "Determinación de la presencia de casos diagnosticados",
    grupo: "Salud",
    secciones: [
      {
        id: "tabla",
        tablas: [
          {
            id: "casos",
            etiquetaAgregar: "Agregar caso",
            columnas: [
              { id: "trabajador", etiqueta: "Nombre del trabajador", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "diagnostico", etiqueta: "Diagnóstico de la enfermedad presuntamente asociada al riesgo", tipo: "texto" },
              { id: "diasAusencia", etiqueta: "N° de días de ausencia", tipo: "numero" },
              { id: "fuentes", etiqueta: "Fuentes de información", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-018": {
    codigo: "FOR-018",
    nombre: "Planeación de medidas de intervención",
    grupo: "Planeación y Gestión",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "riesgo", etiqueta: "Riesgo a controlar", tipo: "texto", requerido: true },
          { id: "objetivo", etiqueta: "Objetivo", tipo: "area" },
          { id: "poblacion", etiqueta: "Población objetivo", tipo: "texto" },
          { id: "periodo", etiqueta: "Periodo de implementación del plan", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Medidas de intervención",
        tablas: [
          {
            id: "medidas",
            etiquetaAgregar: "Agregar medida",
            columnas: [
              { id: "actividad", etiqueta: "Actividad", tipo: "texto" },
              { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
              { id: "frecuencia", etiqueta: "Frecuencia", tipo: "texto" },
              { id: "registro", etiqueta: "Registro", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-019": {
    codigo: "FOR-019",
    nombre: "Seguimiento y control de medidas de intervención",
    grupo: "Planeación y Gestión",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "riesgo", etiqueta: "Riesgo a controlar", tipo: "texto", requerido: true },
          { id: "objetivo", etiqueta: "Objetivo", tipo: "area" },
          { id: "poblacion", etiqueta: "Población objetivo", tipo: "texto" },
          { id: "periodo", etiqueta: "Periodo de ejecución del plan", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Seguimiento de la implementación de medidas de intervención",
        tablas: [
          {
            id: "seguimiento",
            etiquetaAgregar: "Agregar registro de seguimiento",
            columnas: [
              { id: "actividad", etiqueta: "Actividad", tipo: "texto" },
              { id: "responsable", etiqueta: "Responsable", tipo: "texto" },
              { id: "frecuencia", etiqueta: "Frecuencia en que se realizó", tipo: "texto" },
              { id: "registro", etiqueta: "Registro", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-020": {
    codigo: "FOR-020",
    nombre: "Notificación de actos y condiciones inseguras",
    grupo: "Seguridad",
    secciones: [
      {
        id: "notificacion",
        campos: [
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "notificante", etiqueta: "Nombre de quien notifica", tipo: "texto", requerido: true },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "contratista", etiqueta: "Contratista", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        titulo: "Descripción de la situación",
        tablas: [
          {
            id: "situaciones",
            etiquetaAgregar: "Agregar notificación",
            columnas: [
              { id: "actividad", etiqueta: "Actividad", tipo: "texto" },
              { id: "descripcion", etiqueta: "Descripción del acto / condición insegura", tipo: "area" },
              { id: "consecuencia", etiqueta: "Consecuencia probable", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-021": {
    codigo: "FOR-021",
    nombre: "Control de notificaciones de actos y condiciones seguras",
    grupo: "Seguridad",
    secciones: [
      {
        id: "tabla",
        titulo: "Control de notificaciones",
        tablas: [
          {
            id: "notificaciones",
            etiquetaAgregar: "Agregar notificación",
            columnas: [
              { id: "notificante", etiqueta: "Nombre y apellidos de quien notifica", tipo: "texto" },
              { id: "cedula", etiqueta: "Cédula de ciudadanía", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "fechaNotificacion", etiqueta: "Fecha de notificación", tipo: "fecha" },
              { id: "actividad", etiqueta: "Actividad", tipo: "texto" },
              { id: "clasificacion", etiqueta: "Clasificación", tipo: "seleccion", opciones: ["Acto inseguro (AI)", "Condición insegura (CI)"] },
              { id: "descripcion", etiqueta: "Descripción del acto / condición insegura", tipo: "area" },
              { id: "consecuencia", etiqueta: "Consecuencia sobre la seguridad", tipo: "texto" },
              { id: "controlesPropuestos", etiqueta: "Controles propuestos", tipo: "texto" },
              { id: "controlesImplementados", etiqueta: "¿Se implementaron los controles?", tipo: "si-no" },
              { id: "condicionesAdecuadas", etiqueta: "¿Se cuentan con condiciones adecuadas para realizar la actividad?", tipo: "si-no" },
              { id: "autorizaNombre", etiqueta: "Si no: quién autoriza (nombre y apellidos)", tipo: "texto" },
              { id: "autorizaCargo", etiqueta: "Cargo de quien autoriza", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-027": {
    codigo: "FOR-027",
    nombre: "Lista de chequeo de elementos de botiquín",
    grupo: "Salud",
    secciones: [
      {
        id: "tabla",
        titulo: "Elementos del botiquín",
        tablas: [
          {
            id: "elementos",
            etiquetaAgregar: "Agregar elemento",
            columnas: [
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cantidad", etiqueta: "Cantidad", tipo: "numero" },
              { id: "fechaVencimiento", etiqueta: "Fecha de vencimiento", tipo: "fecha" },
              { id: "observacion", etiqueta: "Observación", tipo: "texto" },
            ],
            filasIniciales: [
              { nombre: "Gasa precortada y estéril", cantidad: "", fechaVencimiento: "", observacion: "" },
              { nombre: "Aplicadores ó copitos", cantidad: "", fechaVencimiento: "", observacion: "" },
              { nombre: "Esparadrapo antialérgico (Micropore)", cantidad: "", fechaVencimiento: "", observacion: "" },
              { nombre: "Esparadrapo de tela", cantidad: "", fechaVencimiento: "", observacion: "" },
              { nombre: "Curitas", cantidad: "", fechaVencimiento: "", observacion: "" },
              { nombre: "Algodón", cantidad: "", fechaVencimiento: "", observacion: "" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-028": {
    codigo: "FOR-028",
    nombre: "Control de salidas de elementos del botiquín",
    grupo: "Salud",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "responsable", etiqueta: "Responsable del botiquín", tipo: "texto" },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        tablas: [
          {
            id: "salidas",
            etiquetaAgregar: "Agregar salida",
            columnas: [
              { id: "nombre", etiqueta: "Nombre y apellidos", tipo: "texto" },
              { id: "elemento", etiqueta: "Elemento del botiquín", tipo: "texto" },
              { id: "cantidad", etiqueta: "Cantidad", tipo: "numero" },
              { id: "sintoma", etiqueta: "Síntoma", tipo: "texto" },
              { id: "fechaEntrega", etiqueta: "Fecha de entrega", tipo: "fecha" },
              { id: "firma", etiqueta: "Firma de recibido", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-029": {
    codigo: "FOR-029",
    nombre: "Inspección de almacenamiento seguro de sustancias químicas",
    grupo: "Inspecciones",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "lugar", etiqueta: "Lugar de inspección", tipo: "texto", requerido: true },
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
              { id: "numero", etiqueta: "N°", tipo: "numero" },
              { id: "aspecto", etiqueta: "Aspecto a verificar", tipo: "area" },
              { id: "si", etiqueta: "Sí", tipo: "si-no" },
              { id: "no", etiqueta: "No", tipo: "si-no" },
              { id: "na", etiqueta: "N. A.", tipo: "si-no" },
            ],
            filasIniciales: [
              { numero: "1", aspecto: "Se cuenta con un sitio destinado para el almacenamiento de sustancias químicas, debidamente identificado y delimitado.", si: "", no: "", na: "" },
              { numero: "2", aspecto: "El sitio de almacenamiento tiene acceso restringido del personal y se utiliza únicamente para almacenar sustancias químicas.", si: "", no: "", na: "" },
              { numero: "3", aspecto: "El sitio de almacenamiento tiene adecuada ventilación de acuerdo con la ficha de seguridad de las sustancias almacenadas.", si: "", no: "", na: "" },
              { numero: "4", aspecto: "Se cuentan con las fichas de seguridad de las sustancias químicas almacenadas disponibles en el almacén.", si: "", no: "", na: "" },
              { numero: "5", aspecto: "El personal conoce los peligros asociados a la manipulación de sustancias químicas.", si: "", no: "", na: "" },
              { numero: "6", aspecto: "Se cuenta con inventario de sustancias químicas en el almacén o bodega.", si: "", no: "", na: "" },
              { numero: "7", aspecto: "El almacén se encuentra con la señalización necesaria.", si: "", no: "", na: "" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-030": {
    codigo: "FOR-030",
    nombre: "Acta de asignación de presupuesto y recursos",
    grupo: "Gobernanza y COPASST",
    secciones: [
      {
        id: "acta",
        campos: [
          { id: "lugar", etiqueta: "Lugar", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "representante", etiqueta: "Representante legal", tipo: "texto", requerido: true },
          { id: "organizacion", etiqueta: "Organización que asigna los recursos", tipo: "texto" },
          { id: "vigencia", etiqueta: "Vigencia", tipo: "texto", placeholder: "Ej. 2026" },
          { id: "recursosHumanos", etiqueta: "Recursos humanos", tipo: "area", requerido: true },
          { id: "recursosTecnicos", etiqueta: "Recursos técnicos, físicos y financieros", tipo: "area", requerido: true },
          { id: "ciudad", etiqueta: "Ciudad de firma", tipo: "texto" },
          { id: "firmanteNombre", etiqueta: "Nombre de quien firma", tipo: "texto", requerido: true },
          { id: "firmanteCargo", etiqueta: "Cargo", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-031": {
    codigo: "FOR-031",
    nombre: "Acta de designación de responsabilidades y autoridades",
    grupo: "Gobernanza y COPASST",
    secciones: [
      {
        id: "acta",
        campos: [
          { id: "rol", etiqueta: "Rol", tipo: "seleccion", opciones: ["Representante del empleador", "Miembro del COPASST", "Miembro del comité de convivencia laboral", "Investigador de accidentes"] },
          { id: "designado", etiqueta: "Nombre de quien se designa", tipo: "texto", requerido: true },
          { id: "identificacion", etiqueta: "Cédula de ciudadanía", tipo: "texto", requerido: true },
          { id: "responsabilidades", etiqueta: "Responsabilidades y autoridades asumidas", tipo: "area", requerido: true },
          { id: "fecha", etiqueta: "Fecha de aceptación", tipo: "fecha", requerido: true },
          { id: "nombre", etiqueta: "Nombre de quien firma", tipo: "texto", requerido: true },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-033": {
    codigo: "FOR-033",
    nombre: "Inscripción de candidatos al comité",
    grupo: "Gobernanza y COPASST",
    secciones: [
      {
        id: "candidato",
        campos: [
          { id: "comite", etiqueta: "Comité", tipo: "seleccion", opciones: ["COPASST", "Comité de convivencia laboral"] },
          { id: "periodo", etiqueta: "Periodo", tipo: "texto" },
          { id: "centroTrabajo", etiqueta: "Centro de trabajo", tipo: "texto" },
          { id: "nombres", etiqueta: "Nombres y apellidos", tipo: "texto", requerido: true },
          { id: "identificacion", etiqueta: "Identificación", tipo: "texto", requerido: true },
          { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
          { id: "firma", etiqueta: "Firma", tipo: "texto" },
        ],
      },
      {
        id: "competencias",
        titulo: "Marque con una X las competencias actitudinales y comportamentales con las que cuenta",
        campos: [
          { id: "respeto", etiqueta: "Respeto", tipo: "si-no" },
          { id: "imparcialidad", etiqueta: "Imparcialidad", tipo: "si-no" },
          { id: "tolerancia", etiqueta: "Tolerancia", tipo: "si-no" },
          { id: "serenidad", etiqueta: "Serenidad", tipo: "si-no" },
          { id: "discrecion", etiqueta: "Discreción y confidencialidad", tipo: "si-no" },
          { id: "etica", etiqueta: "Ética", tipo: "si-no" },
          { id: "objetividad", etiqueta: "Objetividad", tipo: "si-no" },
          { id: "escuchaActiva", etiqueta: "Escucha activa", tipo: "si-no" },
          { id: "trabajoEquipo", etiqueta: "Trabajo en equipo", tipo: "si-no" },
          { id: "comunicacionAsertiva", etiqueta: "Comunicación asertiva", tipo: "si-no" },
          { id: "liderazgo", etiqueta: "Liderazgo", tipo: "si-no" },
          { id: "resolucionConflictos", etiqueta: "Resolución de conflictos", tipo: "si-no" },
        ],
      },
      {
        id: "preguntas",
        titulo: "Preguntas del proceso de inscripción",
        campos: [
          { id: "quejaAcoso", etiqueta: "1. ¿A usted le han formulado una queja de presunto acoso laboral?", tipo: "si-no" },
          { id: "observaciones", etiqueta: "Observaciones / respuestas adicionales", tipo: "area" },
        ],
      },
    ],
  },
  "FOR-034": {
    codigo: "FOR-034",
    nombre: "Acta de apertura del proceso de votación",
    grupo: "Gobernanza y COPASST",
    secciones: [
      {
        id: "acta",
        campos: [
          { id: "centroTrabajo", etiqueta: "Centro de trabajo", tipo: "texto", requerido: true },
          { id: "horaApertura", etiqueta: "Hora de apertura", tipo: "texto", placeholder: "Ej. 8:00 a. m." },
          { id: "fechaApertura", etiqueta: "Fecha de apertura", tipo: "fecha", requerido: true },
          { id: "comite", etiqueta: "Comité", tipo: "seleccion", opciones: ["COPASST", "Comité de convivencia laboral"] },
          { id: "periodoDesde", etiqueta: "Periodo desde", tipo: "fecha" },
          { id: "periodoHasta", etiqueta: "Periodo hasta", tipo: "fecha" },
        ],
      },
      {
        id: "jurados",
        titulo: "Jurados de votación",
        tablas: [
          {
            id: "jurados",
            etiquetaAgregar: "Agregar jurado",
            columnas: [
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "identificacion", etiqueta: "Identificación", tipo: "texto" },
              { id: "rol", etiqueta: "Rol", tipo: "seleccion", opciones: ["Coordinador de la mesa de votación", "Colaborador de la mesa de votación"] },
            ],
          },
        ],
      },
    ],
  },
  "FOR-035": {
    codigo: "FOR-035",
    nombre: "Listado de participantes en la votación",
    grupo: "Gobernanza y COPASST",
    secciones: [
      {
        id: "encabezado",
        campos: [
          { id: "lugar", etiqueta: "Lugar de votación", tipo: "texto", requerido: true },
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "hora", etiqueta: "Hora", tipo: "texto" },
          { id: "centroTrabajo", etiqueta: "Centro de trabajo", tipo: "texto" },
        ],
      },
      {
        id: "tabla",
        tablas: [
          {
            id: "participantes",
            etiquetaAgregar: "Agregar participante",
            columnas: [
              { id: "numero", etiqueta: "N°", tipo: "numero" },
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cedula", etiqueta: "N° de cédula o registro", tipo: "texto" },
              { id: "firma", etiqueta: "Firma del trabajador", tipo: "texto" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-036": {
    codigo: "FOR-036",
    nombre: "Tarjetón para el voto",
    grupo: "Gobernanza y COPASST",
    secciones: [
      {
        id: "voto",
        campos: [
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "centroTrabajo", etiqueta: "Centro de trabajo", tipo: "texto" },
          { id: "comite", etiqueta: "Comité", tipo: "seleccion", opciones: ["COPASST", "Comité de convivencia laboral"] },
          { id: "candidato1", etiqueta: "Candidato 1", tipo: "texto", requerido: true },
          { id: "candidato2", etiqueta: "Candidato 2", tipo: "texto", requerido: true },
          { id: "candidato3", etiqueta: "Candidato 3", tipo: "texto" },
          { id: "candidato4", etiqueta: "Candidato 4", tipo: "texto" },
        ],
      },
    ],
  },
  "FOR-037": {
    codigo: "FOR-037",
    nombre: "Acta de cierre de votación y escrutinio",
    grupo: "Gobernanza y COPASST",
    secciones: [
      {
        id: "acta",
        campos: [
          { id: "ciudad", etiqueta: "Ciudad", tipo: "texto" },
          { id: "fecha", etiqueta: "Fecha", tipo: "fecha", requerido: true },
          { id: "horaCierre", etiqueta: "Hora de cierre", tipo: "texto" },
          { id: "comite", etiqueta: "Comité", tipo: "seleccion", opciones: ["COPASST", "Comité de convivencia laboral"] },
          { id: "periodo", etiqueta: "Periodo", tipo: "texto" },
          { id: "centroTrabajo", etiqueta: "Centro de trabajo", tipo: "texto" },
        ],
      },
      {
        id: "jurados",
        titulo: "Jurados de votación",
        tablas: [
          {
            id: "jurados",
            etiquetaAgregar: "Agregar jurado",
            columnas: [
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "identificacion", etiqueta: "Identificación", tipo: "texto" },
              { id: "rol", etiqueta: "Rol del jurado", tipo: "texto" },
            ],
          },
        ],
      },
      {
        id: "escrutinio",
        titulo: "Resultado del escrutinio",
        campos: [
          { id: "votosBlanco", etiqueta: "Votos en blanco", tipo: "numero" },
          { id: "votosAnulados", etiqueta: "Votos anulados", tipo: "numero" },
          { id: "totalVotos", etiqueta: "Total de votos", tipo: "numero" },
        ],
        tablas: [
          {
            id: "resultados",
            etiquetaAgregar: "Agregar candidato",
            columnas: [
              { id: "persona", etiqueta: "Persona", tipo: "texto" },
              { id: "votos", etiqueta: "Número de votos", tipo: "numero" },
            ],
          },
        ],
      },
    ],
  },
  "FOR-038": {
    codigo: "FOR-038",
    nombre: "Acta de conformación del COPASST",
    grupo: "Gobernanza y COPASST",
    secciones: [
      {
        id: "acta",
        campos: [
          { id: "centroTrabajo", etiqueta: "Centro de trabajo", tipo: "texto", requerido: true },
          { id: "fecha", etiqueta: "Fecha de la reunión", tipo: "fecha", requerido: true },
          { id: "hora", etiqueta: "Hora", tipo: "texto" },
          { id: "periodoVigencia", etiqueta: "Periodo de vigencia del comité", tipo: "texto", placeholder: "Duración del proyecto o hasta 2 años" },
          { id: "observaciones", etiqueta: "Observaciones", tipo: "area" },
        ],
      },
      {
        id: "empleador",
        titulo: "Representantes del empleador",
        tablas: [
          {
            id: "empleadorMiembros",
            etiquetaAgregar: "Agregar miembro",
            columnas: [
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cedula", etiqueta: "C.C.", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "categoria", etiqueta: "Categoría", tipo: "seleccion", opciones: ["Principal", "Suplente"] },
            ],
          },
        ],
      },
      {
        id: "trabajadores",
        titulo: "Representantes elegidos por los trabajadores",
        tablas: [
          {
            id: "trabajadoresMiembros",
            etiquetaAgregar: "Agregar miembro",
            columnas: [
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cedula", etiqueta: "C.C.", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "categoria", etiqueta: "Categoría", tipo: "seleccion", opciones: ["Principal", "Suplente"] },
            ],
          },
        ],
      },
    ],
  },
  "FOR-039": {
    codigo: "FOR-039",
    nombre: "Acta de conformación del comité de convivencia laboral",
    grupo: "Gobernanza y COPASST",
    secciones: [
      {
        id: "acta",
        campos: [
          { id: "centroTrabajo", etiqueta: "Centro de trabajo", tipo: "texto", requerido: true },
          { id: "fecha", etiqueta: "Fecha de la reunión", tipo: "fecha", requerido: true },
          { id: "hora", etiqueta: "Hora", tipo: "texto" },
          { id: "periodoVigencia", etiqueta: "Periodo de vigencia del comité", tipo: "texto", placeholder: "2 años" },
          { id: "observaciones", etiqueta: "Observaciones", tipo: "area" },
        ],
      },
      {
        id: "empleador",
        titulo: "Representantes del empleador",
        tablas: [
          {
            id: "empleadorMiembros",
            etiquetaAgregar: "Agregar miembro",
            columnas: [
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cedula", etiqueta: "C.C.", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "categoria", etiqueta: "Categoría", tipo: "seleccion", opciones: ["Principal", "Suplente"] },
            ],
          },
        ],
      },
      {
        id: "trabajadores",
        titulo: "Representantes elegidos por los trabajadores",
        tablas: [
          {
            id: "trabajadoresMiembros",
            etiquetaAgregar: "Agregar miembro",
            columnas: [
              { id: "nombre", etiqueta: "Nombre", tipo: "texto" },
              { id: "cedula", etiqueta: "C.C.", tipo: "texto" },
              { id: "cargo", etiqueta: "Cargo", tipo: "texto" },
              { id: "categoria", etiqueta: "Categoría", tipo: "seleccion", opciones: ["Principal", "Suplente"] },
            ],
          },
        ],
      },
    ],
  },
};
