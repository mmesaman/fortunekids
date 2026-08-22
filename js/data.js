/* ========================================
   FORTUNE KIDS - CONTENT CATALOG
   Demo data model for the category,
   listing and detail templates.
   ======================================== */

const FK_CATEGORIAS = {
    educacion: {
        nombre: 'Education &amp; child protection',
        descripcion: 'Scholarships, learning support and protection so that no child is left out of the classroom.',
        icono: 'education',
        color: 'primary'
    },
    salud: {
        nombre: 'Health &amp; well-being',
        descripcion: 'Medical check-ups, nutrition and hygiene for children and families in Arusha.',
        icono: 'health',
        color: 'secondary'
    },
    juventud: {
        nombre: 'Youth &amp; training',
        descripcion: 'Vocational training, employment and entrepreneurship for the next generation.',
        icono: 'youth',
        color: 'tertiary'
    }
};

const FK_CONTENIDOS = [
    {
        id: 'amina-vuelve-a-clase',
        titulo: 'Amina returns to school after a year out of the classroom',
        categoria: 'educacion',
        tipo: 'historia',
        fecha: '2026-06-14',
        resumen: 'Thanks to the scholarship program, Amina has resumed her studies and dreams of becoming a teacher.',
        contenido: [
            'When her family lost its income, Amina left school at the age of 9. The Fortune Kids team found her case during a community visit and offered her a scholarship covering tuition, uniform and school supplies.',
            'Today Amina is back in 4th grade. \u201CWhen I grow up I want to be a teacher so that no girl in my neighborhood is left out of school,\u201D she tells us while showing us her notebooks.',
            'Her story is one of eleven families currently receiving direct educational support from the program.'
        ],
        destacada: true
    },
    {
        id: 'revisiones-medicas-2026',
        titulo: 'The medical check-up campaign reaches 40 families',
        categoria: 'salud',
        tipo: 'noticia',
        fecha: '2026-05-28',
        resumen: 'The local team completed a new round of pediatric check-ups with follow-up until discharge.',
        contenido: [
            'Working with local health professionals, we have completed a new campaign of children\u2019s medical check-ups: weight monitoring, vaccinations, eyesight and nutritional status.',
            'Five children were referred for treatment and received continuous follow-up until medical discharge. Families also took part in hands-on workshops on balanced meals using local products.',
            'The next campaign is planned for next quarter and will expand coverage to three new neighborhoods.'
        ],
        destacada: true
    },
    {
        id: 'taller-costura-joseph-baraka',
        titulo: 'First program graduates launch their own business',
        categoria: 'juventud',
        tipo: 'historia',
        fecha: '2026-05-10',
        resumen: 'Joseph and Baraka open a sewing workshop in Arusha after completing vocational training.',
        contenido: [
            'After completing the vocational training pathway, Joseph and Baraka have opened a sewing workshop in central Arusha.',
            'With an initial micro-grant and ongoing mentoring, the workshop already employs two more people from the community and has become a training placement for the program\u2019s new students.',
            '\u201CThe program gave me the tools; now I employ two more people,\u201D explains Joseph.'
        ],
        destacada: true
    },
    {
        id: 'guia-becas-2026',
        titulo: 'Practical guide: how to apply for a school scholarship',
        categoria: 'educacion',
        tipo: 'recurso',
        fecha: '2026-04-22',
        resumen: 'Step by step for families: requirements, paperwork and deadlines of the scholarship program.',
        contenido: [
            'The scholarship program covers tuition, uniform, school supplies and transport for children in vulnerable situations.',
            'To apply, families can visit our office in Arusha or talk directly with the community team during monthly visits.',
            'Required documents: the child\u2019s ID document, proof of household income and the school certificate from the last year completed.'
        ]
    },
    {
        id: 'talleres-nutricion-familias',
        titulo: 'Nutrition workshops for families: first session fully booked',
        categoria: 'salud',
        tipo: 'noticia',
        fecha: '2026-04-03',
        resumen: 'Twenty mothers and fathers learned how to plan balanced menus with products from the local market.',
        contenido: [
            'The first session of the nutrition workshop brought twenty families together at the Fortune Kids office.',
            'Over two hours, the health team explained how to combine market ingredients to build complete menus on a tight budget, with live demonstrations.',
            'Upcoming sessions will cover child hygiene and prevention of seasonal illnesses.'
        ]
    },
    {
        id: 'orientacion-laboral-jovenes',
        titulo: 'New career guidance pathway for young people',
        categoria: 'juventud',
        tipo: 'noticia',
        fecha: '2026-03-18',
        resumen: 'A new individualized support program towards a first formal job is underway.',
        contenido: [
            'The new pathway combines group preparation sessions (CV writing, interviews, labor rights) with one-to-one support.',
            'Each young person will have a mentor guiding them for six months until job placement or the launch of their own project.',
            'Places are limited; registration takes place through the Fortune Kids youth office in Arusha.'
        ]
    },
    {
        id: 'dia-internacional-nina',
        titulo: 'We celebrate International Day of the Girl with open activities',
        categoria: 'educacion',
        tipo: 'evento',
        fecha: '2026-03-08',
        resumen: 'Games, storytelling and a talk on female role models brought the whole community together.',
        contenido: [
            'To mark International Day of the Girl we organized an open day with cooperative games, storytelling and a talk about women role models from Tanzania.',
            'More than sixty boys and girls took part in the activities, led by our team and local volunteers.',
            'Thank you to all the families who came to celebrate with us.'
        ]
    },
    {
        id: 'checkup-salud-bucal',
        titulo: 'Oral health check-up for every child in the program',
        categoria: 'salud',
        tipo: 'noticia',
        fecha: '2026-02-20',
        resumen: 'Full dental check-up and hygiene kit for each child, along with brushing education.',
        contenido: [
            'Every child in the program received a full dental check-up together with an oral hygiene kit.',
            'Brushing workshops taught proper technique and daily routines adapted to each age group.',
            'Cases requiring follow-up were referred to the partner clinic with costs covered by the program.'
        ]
    },
    {
        id: 'microcreditos-emprendimiento',
        titulo: 'Entrepreneurship micro-loans: how they work',
        categoria: 'juventud',
        tipo: 'recurso',
        fecha: '2026-02-01',
        resumen: 'We explain the requirements of the micro-support fund for youth projects in Arusha.',
        contenido: [
            'The micro-loan fund offers interest-free start-up support to projects led by former students of the training program.',
            'Requirements: submit a simple business plan, have an assigned mentor and take part in the quarterly follow-up sessions.',
            'Repayment adapts to the project\u2019s income, and recovered funds are reinvested into new ventures.'
        ]
    },
    {
        id: 'clases-refuerzo-resultados',
        titulo: 'Tutoring classes boost school performance by a full grade',
        categoria: 'educacion',
        tipo: 'noticia',
        fecha: '2026-01-15',
        resumen: 'First-term assessment shows significant improvements in reading and arithmetic.',
        contenido: [
            'The first-term assessment confirms that regular attendees of the tutoring classes have advanced by an average of one full level in reading and arithmetic.',
            'The team attributes the result to small groups and individualized attention for each child.',
            'The goal for next term is to bring eight new students into the tutoring classes.'
        ]
    },
    {
        id: 'jornada-puertas-abiertas',
        titulo: 'Open day: visit our office in Arusha',
        categoria: 'juventud',
        tipo: 'evento',
        fecha: '2025-12-12',
        resumen: 'Tour our classrooms and workshops, meet the team and discover how we work day by day.',
        contenido: [
            'We are opening the doors of our office so that neighbors, families and partners can experience our programs first hand.',
            'There will be guided tours of the classrooms and workshops, an introduction to the team and time for questions.',
            'If you would like to visit us outside these dates, write to info@fortunekids.org and we will schedule your visit.'
        ]
    },
    {
        id: 'protocolo-proteccion-infantil',
        titulo: 'Our child protection protocol, explained',
        categoria: 'salud',
        tipo: 'recurso',
        fecha: '2025-11-30',
        resumen: 'How we guarantee safe environments: staff training, action protocol and responsible communication.',
        contenido: [
            'Child safety is our absolute priority. All staff and volunteers receive regular training in child protection.',
            'Our protocol defines how to detect, report and act on any risk situation, with confidential reporting channels.',
            'In addition, we apply strict communication criteria: we never publish identifying images or data of minors without informed consent.'
        ]
    }
];

/* Content type metadata */
const FK_TIPOS = {
    historia: { etiqueta: 'Story', badge: 'badge--primary' },
    noticia: { etiqueta: 'News', badge: 'badge--info' },
    recurso: { etiqueta: 'Resource', badge: 'badge--neutral' },
    evento: { etiqueta: 'Event', badge: 'badge--secondary' }
};
