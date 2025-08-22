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




// Payments

export interface Plan {
  id: string;
  name: string;
  price: number;
  code: string;
}