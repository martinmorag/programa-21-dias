export const items = [
    { name: "Día 1", nombre: "La Visión del Éxito", href: "#" },
    { name: "Día 2", nombre: "Identificando tu Propósito", href: "#" },
    { name: "Día 3", nombre: "Plan de Acción Estratégico", href: "#" },
    { name: "Día 4", nombre: "Finanzas para Emprendedores", href: "#" },
    { name: "Día 5", nombre: "Creando tu Propuesta de Valor", href: "#" },
    { name: "Día 6", nombre: "Estrategias de Marketing Digital", href: "#" },
    { name: "Día 7", nombre: "Comunicación Efectiva", href: "#" },
    { name: "Día 8", nombre: "Construyendo tu Marca Personal", href: "#" },
    { name: "Día 9", nombre: "Herramientas de Productividad", href: "#" },
    { name: "Día 10", nombre: "Gestión del Tiempo y Hábitos", href: "#" },
    { name: "Día 11", nombre: "Celebrando los Logros y Próximos Pasos", href: "#" },
];


export const people = [
    {id: "1", nombre: "Sofía", profesion: "Artesana", herramienta: "Transforma tu futuro", logros: {
    items: [
        {logro: "Crea joyería hecha a mano y la vende en ferias locales"},
        {logro: "Está dando sus primeros pasos con la Academia"},
        {logro: "Sueña con expandir su pasión en un negocio sostenible y reconocido"}
        ]
    }, origen: "Colombia", color: "#320D6D", src: "/sofia.png"},
    {id: "2", nombre: "Ana", profesion: "Propietaria de una Librería", herramienta: "¡Impulsa tu Negocio!", logros: {
            items: [
                {logro: "Sueña con hacer de su librería un negocio próspero y autosuficiente"},
                {logro: "Gestiona su tienda desde un pequeño local en su barrio"},
                {logro: "Lleva algunos meses en la Academia"},
            ]
    }, origen: "Argentina", color: "#4C1C00", src: "/ana.png"},
    {id: "3", nombre: "Carlos", profesion: "Vendedor de Accesorios Online", herramienta: "¡Hazlo Crecer!", logros: {
            items: [
                {logro: "Opera su tienda desde su oficina en casa"},
                {logro: "Es miembro de la Academia desde hace varios meses"},
                {logro: "Está ampliando su equipo y planea llegar a más clientes"},
            ]
    }, origen: "Colombira", color: "#FFBFB7", src: "/carlos.png"}
]



export type Recurso = {
  id: string;
  titulo: string;
  orden: number;
  temaId: string;
  video: Video | null;
  pdf: Pdf | null;
  preguntas: Pregunta[]; // Now explicitly an array of Pregunta objects
  progreso: ProgresoRecurso[];
};

export type Tema = {
  id: string;
  orden: number;
  nombre: string;
  descripcion: string;
  tipo: 'EMPRENDEDOR' | 'PERSONAL';
  progresoGeneral: number;
  recursos: Recurso[];
};

export interface ClaseBonus {
  id: string;
  titulo: string;
  descripcion: string;
  linkVideo: string;
  fechaDisponible: string | null;
}

export interface UserStatus {
  currentPlanCode: string | null;
  isProgramCompleted: boolean;
  requiredExamCompleted: boolean;
  examenEmprendedorCompleto: boolean;
  examenPersonalCompleto: boolean;
  previouslyCompletedPersonal: boolean;
}

export interface InicioData {
  temas: Tema[];
  clasesBonus: ClaseBonus[];
}




// Details page

export interface TemaPageProps {
  params: {
    temaId: string;
  };
}

export interface ProgressProps {
  value: number;
}

export type PropsQuiz = {
  recursoId: string;
  preguntas: Pregunta[];
  isCompleted: boolean;
};

export type Pregunta = {
  id: string;
  texto: string;
  opciones: Opcion[] | null; 
  respuesta: string;
  orden: number;
  recursoId: string;
};

export type Opcion = {
  id: string;
  texto: string;
};

export type Video = {
  id: string;
  url: string;
  recursoId: string;
};

export type Pdf = {
  id: string;
  url: string;
  recursoId: string;
};

export type ProgresoRecurso = {
  completado: boolean;
};



// Bonus page

export type ClaseBonusType = {
  id: string;
  titulo: string;
  descripcion: string;
  linkVideo: string;
  orden: number;
};






// Payments

export interface Plan {
  id: string;
  name: string;
  price: number;
  code: string;
}



// Examen

export interface ExamenData {
    planCode: string;
    preguntas: ExamenPregunta[];
}

export interface ExamenPregunta {
  id: string;
  pregunta: string;
  opciones: Opcion[];
  respuestaCorrectaId: string;
}

export interface CertificateProps {
  userName: string;
  isEmprendedorPersonal: boolean;
  completionDate: string;
}







export interface Package {
  id: string,
  ETA: string,
  weight: number,
  fragile: boolean,
  dispatchDate: string,
  notes: string | null,
}

export interface PackageStatus {
  id: string,
  arrived: string,
  canceled: string,
  transit: string,
  package: Package[],
}

export interface Location {
  id: string,
  name: string,
  location: Package[],
  origin: Package[],
}


export interface Address {
  id: string,
  name: string,
  package: Package[],
}