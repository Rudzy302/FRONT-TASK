import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Tarea {
  tarea: string;
  tag: string;
  tagColor: string;
  fecha: string;
  proyecto: string;
  descripcion?: string;
}

interface TasksContextType {
  tareasPendientes: Tarea[];
  tareasCompletadas: Tarea[];
  agregarTarea: (tarea: Tarea) => void;
  completarTarea: (nombre: string) => void;
  eliminarTarea: (nombre: string) => void;
  setTareasIniciales: (pendientes: Tarea[], completadas: Tarea[]) => void;
  setTareasPendientes: (pendientes: Tarea[]) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tareasPendientes, setTareasPendientes] = useState<Tarea[]>([]);
  const [tareasCompletadas, setTareasCompletadas] = useState<Tarea[]>([]);

  const agregarTarea = (tarea: Tarea) => {
    setTareasPendientes(prev => [...prev, tarea]);
  };

  const completarTarea = (nombre: string) => {
    setTareasPendientes(prev => {
      const tarea = prev.find(t => t.tarea === nombre);
      if (tarea) {
        setTareasCompletadas(c => [...c, tarea]);
        return prev.filter(t => t.tarea !== nombre);
      }
      return prev;
    });
  };

  const eliminarTarea = (nombre: string) => {
    setTareasPendientes(prev => prev.filter(t => t.tarea !== nombre));
    setTareasCompletadas(prev => prev.filter(t => t.tarea !== nombre));
  };

  const setTareasIniciales = (pendientes: Tarea[], completadas: Tarea[]) => {
    setTareasPendientes(pendientes);
    setTareasCompletadas(completadas);
  };

  return (
    <TasksContext.Provider value={{ tareasPendientes, tareasCompletadas, agregarTarea, completarTarea, eliminarTarea, setTareasIniciales, setTareasPendientes }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error("useTasks debe usarse dentro de un TasksProvider");
  return context;
};

export default TasksContext; 