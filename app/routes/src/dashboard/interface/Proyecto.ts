export interface Proyecto {
  nombre: string;
  estado: string;
  estadoColor: string;
  tareasCompletadas?: { nombre: string; etiqueta: string; fecha: string; descripcion?: string }[];
  tareasPendientes?: { nombre: string; etiqueta: string; fecha: string; descripcion?: string }[];
  tareasAgregar?: { nombre: string; etiqueta: string; fecha: string; descripcion?: string }[];
  tareas?: string;
  progreso: number;
  fecha: string;
  barraColor?: string;
} 