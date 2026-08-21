/* ========================================
   FORTUNE KIDS - CATÁLOGO DE CONTENIDOS
   Modelo de datos (demo) para plantillas de
   categoría, listado y detalle.
   ======================================== */

const FK_CATEGORIAS = {
    educacion: {
        nombre: 'Educación y protección infantil',
        descripcion: 'Becas, refuerzo escolar y protección para que ningún niño se quede fuera del aula.',
        icono: 'education',
        color: 'primary'
    },
    salud: {
        nombre: 'Salud y bienestar',
        descripcion: 'Revisiones médicas, nutrición e higiene para niños y familias de Arusha.',
        icono: 'health',
        color: 'secondary'
    },
    juventud: {
        nombre: 'Juventud y formación',
        descripcion: 'Formación profesional, empleo y emprendimiento para la próxima generación.',
        icono: 'youth',
        color: 'tertiary'
    }
};

const FK_CONTENIDOS = [
    {
        id: 'amina-vuelve-a-clase',
        titulo: 'Amina vuelve a clase tras un año sin escolarizar',
        categoria: 'educacion',
        tipo: 'historia',
        fecha: '2026-06-14',
        resumen: 'Gracias al programa de becas, Amina ha retomado sus estudios y sueña con ser profesora.',
        contenido: [
            'Cuando su familia perdió los ingresos, Amina dejó la escuela con 9 años. El equipo de Fortune Kids detectó el caso durante una visita comunitaria y le ofreció una beca que cubre matrícula, uniforme y material escolar.',
            'Hoy Amina está de vuelta en 4º curso. "Cuando sea mayor quiero ser profesora para que ninguna niña de mi barrio se quede fuera del colegio", nos cuenta mientras enseña sus cuadernos.',
            'Su historia es una más de las once familias que actualmente reciben apoyo educativo directo del programa.'
        ],
        destacada: true
    },
    {
        id: 'revisiones-medicas-2026',
        titulo: 'La campaña de revisiones médicas alcanza a 40 familias',
        categoria: 'salud',
        tipo: 'noticia',
        fecha: '2026-05-28',
        resumen: 'El equipo local completó una nueva ronda de controles pediátricos con seguimiento hasta el alta.',
        contenido: [
            'En colaboración con personal sanitario local, hemos completado una nueva campaña de revisiones médicas infantiles: control de peso, vacunas, visión y estado nutricional.',
            'Cinco niños fueron derivados a tratamiento y han recibido seguimiento continuo hasta su alta médica. Las familias participaron además en talleres prácticos de alimentación equilibrada con productos locales.',
            'La próxima campaña está prevista para el próximo trimestre y ampliará la cobertura a tres barrios nuevos.'
        ],
        destacada: true
    },
    {
        id: 'taller-costura-joseph-baraka',
        titulo: 'Primeros jóvenes del programa inician su propio negocio',
        categoria: 'juventud',
        tipo: 'historia',
        fecha: '2026-05-10',
        resumen: 'Joseph y Baraka abren un taller de costura en Arusha tras completar la formación profesional.',
        contenido: [
            'Después de completar el itinerario de formación profesional, Joseph y Baraka han montado un taller de costura en el centro de Arusha.',
            'Con un microapoyo inicial y mentoría continua, el taller ya emplea a dos personas más de la comunidad y se ha convertido en lugar de prácticas para los nuevos alumnos del programa.',
            '"El programa me dio las herramientas; ahora empleo a dos personas más", explica Joseph.'
        ],
        destacada: true
    },
    {
        id: 'guia-becas-2026',
        titulo: 'Guía práctica: cómo solicitar una beca escolar',
        categoria: 'educacion',
        tipo: 'recurso',
        fecha: '2026-04-22',
        resumen: 'Paso a paso para familias: requisitos, documentación y plazos del programa de becas.',
        contenido: [
            'El programa de becas cubre matrícula, uniforme, material escolar y transporte para niños en situación de vulnerabilidad.',
            'Para solicitarla, las familias pueden acercarse a nuestra sede en Arusha o hablar directamente con el equipo comunitario durante las visitas mensuales.',
            'Documentación necesaria: documento de identidad del menor, justificante de ingresos familiares y certificado escolar del último año cursado.'
        ]
    },
    {
        id: 'talleres-nutricion-familias',
        titulo: 'Talleres de nutrición para familias: primera sesión completa',
        categoria: 'salud',
        tipo: 'noticia',
        fecha: '2026-04-03',
        resumen: 'Veinte madres y padres aprendieron a planificar menús equilibrados con productos de mercado local.',
        contenido: [
            'La primera sesión del taller de nutrición reunió a veinte familias en la sede de Fortune Kids.',
            'Durante dos horas, el equipo sanitario explicó cómo combinar ingredientes de mercado para lograr menús completos con presupuesto ajustado, con demostraciones en vivo.',
            'Las próximas sesiones tratarán higiene infantil y prevención de enfermedades estacionales.'
        ]
    },
    {
        id: 'orientacion-laboral-jovenes',
        titulo: 'Nuevo itinerario de orientación laboral para jóvenes',
        categoria: 'juventud',
        tipo: 'noticia',
        fecha: '2026-03-18',
        resumen: 'Arranca un programa de acompañamiento individualizado hacia el primer empleo formal.',
        contenido: [
            'El nuevo itinerario combina sesiones grupales de preparación (CV, entrevistas, derechos laborales) con acompañamiento individual.',
            'Cada joven contará con un mentor que le guiará durante seis meses hasta la inserción laboral o la puesta en marcha de su propio proyecto.',
            'Las plazas son limitadas; las inscripciones se realizan a través de la oficina de juventud de Fortune Kids en Arusha.'
        ]
    },
    {
        id: 'dia-internacional-nina',
        titulo: 'Celebramos el Día Internacional de la Niña con actividades abiertas',
        categoria: 'educacion',
        tipo: 'evento',
        fecha: '2026-03-08',
        resumen: 'Juegos, cuentacuentos y una charla sobre referentes femeninos reunieron a toda la comunidad.',
        contenido: [
            'Con motivo del Día Internacional de la Niña organizamos una jornada abierta con juegos cooperativos, cuentacuentos y una charla sobre mujeres referentes de Tanzania.',
            'Más de sesenta niños y niñas participaron en las actividades, facilitadas por nuestro equipo y voluntariado local.',
            'Gracias a todas las familias que se acercaron a celebrarlo con nosotros.'
        ]
    },
    {
        id: 'checkup-salud-bucal',
        titulo: 'Check-up de salud bucal para todos los niños del programa',
        categoria: 'salud',
        tipo: 'noticia',
        fecha: '2026-02-20',
        resumen: 'Revisión dental completa y kit de higiene para cada niño, con educación en cepillado.',
        contenido: [
            'Todos los niños del programa recibieron una revisión dental completa junto a un kit de higiene bucal.',
            'Los talleres de cepillado enseñaron técnica correcta y rutinas diarias adaptadas a cada edad.',
            'Los casos que necesitaban seguimiento fueron derivados a la clínica colaboradora con costes cubiertos por el programa.'
        ]
    },
    {
        id: 'microcreditos-emprendimiento',
        titulo: 'Microcréditos de emprendimiento: así funcionan',
        categoria: 'juventud',
        tipo: 'recurso',
        fecha: '2026-02-01',
        resumen: 'Explicamos los requisitos del fondo de microapoyo para proyectos jóvenes en Arusha.',
        contenido: [
            'El fondo de microcréditos ofrece apoyo económico inicial sin intereses a proyectos liderados por antiguos alumnos del programa de formación.',
            'Los requisitos: presentar un plan sencillo de negocio, contar con un mentor asignado y participar en las sesiones trimestrales de seguimiento.',
            'La devolución se adapta a los ingresos del proyecto, y los fondos recuperados se reinvierten en nuevos emprendimientos.'
        ]
    },
    {
        id: 'clases-refuerzo-resultados',
        titulo: 'Las clases de refuerzo elevan el rendimiento escolar un curso',
        categoria: 'educacion',
        tipo: 'noticia',
        fecha: '2026-01-15',
        resumen: 'La evaluación del primer trimestre muestra mejoras significativas en lectura y cálculo.',
        contenido: [
            'La evaluación del primer trimestre confirma que los asistentes habituales al refuerzo escolar han avanzado una media de un nivel completo en lectura y cálculo.',
            'El equipo atribuye el resultado a los grupos reducidos y al seguimiento individualizado de cada niño.',
            'El objetivo del próximo trimestre es incorporar a ocho nuevos alumnos a las clases de refuerzo.'
        ]
    },
    {
        id: 'jornada-puertas-abiertas',
        titulo: 'Jornada de puertas abiertas: conoce nuestra sede en Arusha',
        categoria: 'juventud',
        tipo: 'evento',
        fecha: '2025-12-12',
        resumen: 'Visita nuestras aulas y talleres, conoce al equipo y descubre cómo trabajamos día a día.',
        contenido: [
            'Abrimos las puertas de la sede para que vecinos, familias y colaboradores puedan conocer de primera mano nuestros programas.',
            'Habrá visitas guiadas por las aulas y talleres, presentación del equipo y espacio de preguntas.',
            'Si quieres visitarnos fuera de estas fechas, escríbenos a info@fortunekids.org y agendamos tu visita.'
        ]
    },
    {
        id: 'protocolo-proteccion-infantil',
        titulo: 'Nuestro protocolo de protección infantil, explicado',
        categoria: 'salud',
        tipo: 'recurso',
        fecha: '2025-11-30',
        resumen: 'Cómo garantizamos entornos seguros: formación del equipo, protocolo de actuación y comunicación responsable.',
        contenido: [
            'La seguridad de la infancia es prioridad absoluta. Todo el equipo y voluntariado recibe formación periódica en protección infantil.',
            'Nuestro protocolo define cómo detectar, comunicar y actuar ante cualquier situación de riesgo, con canales confidenciales de reporte.',
            'Además, aplicamos criterios estrictos de comunicación: nunca publicamos imágenes o datos identificativos de menores sin consentimiento informado.'
        ]
    }
];

/* Metadatos de tipos de contenido */
const FK_TIPOS = {
    historia: { etiqueta: 'Historia', badge: 'badge--primary' },
    noticia: { etiqueta: 'Noticia', badge: 'badge--info' },
    recurso: { etiqueta: 'Recurso', badge: 'badge--neutral' },
    evento: { etiqueta: 'Evento', badge: 'badge--secondary' }
};
