import React, { useState, useEffect } from "react";
import { Box, Heading, VStack, Text, Flex, Button } from "@chakra-ui/react";
import CreateTaskForm from "./CreateTaskForm";
import { proyectos } from "../../proyectosData";
import { useNavigate } from "react-router-dom";
import { useTasks } from "./TasksContext";
import { FaPlus } from "react-icons/fa";

export default function TasksContent() {
  const [modalOpen, setModalOpen] = useState(false);
  const { tareasPendientes, tareasCompletadas, agregarTarea, setTareasIniciales, completarTarea, setTareasPendientes } = useTasks();
  const [checkedPendientes, setCheckedPendientes] = useState<boolean[]>([]);
  const [checkedCompletadas, setCheckedCompletadas] = useState<boolean[]>([]);

  const navigate = useNavigate();

  // Obtén los nombres de los proyectos
  const nombresProyectos = proyectos.map(p => p.nombre);

  // Inicializar tareas solo una vez
  useEffect(() => {
    const pendientes: any[] = [];
    const completadas: any[] = [];
    proyectos.forEach(p => {
      p.tareasPendientes?.forEach(t => pendientes.push({
        tarea: t.nombre,
        tag: t.etiqueta,
        tagColor: "gray.200",
        fecha: t.fecha,
        proyecto: p.nombre,
        descripcion: t.descripcion || ""
      }));
      p.tareasCompletadas?.forEach(t => completadas.push({
        tarea: t.nombre,
        tag: t.etiqueta,
        tagColor: "gray.200",
        fecha: t.fecha,
        proyecto: p.nombre,
        descripcion: t.descripcion || ""
      }));
    });
    setTareasIniciales(pendientes, completadas);
    setCheckedPendientes(Array(pendientes.length).fill(false));
    setCheckedCompletadas(Array(completadas.length).fill(true));
    // eslint-disable-next-line
  }, []);

  const handleAgregarTarea = (tarea: any) => {
    // 1. Agregar al contexto global
    agregarTarea({
      tarea: tarea.nombre,
      tag: tarea.rol || "General",
      tagColor: "gray.200",
      fecha: tarea.fecha,
      proyecto: tarea.proyecto,
      descripcion: tarea.descripcion || ""
    });
    // 2. Agregar al array de proyectos
    const proyecto = proyectos.find(p => p.nombre === tarea.proyecto);
    if (proyecto) {
      if (!proyecto.tareasPendientes) proyecto.tareasPendientes = [];
      proyecto.tareasPendientes.push({
        nombre: tarea.nombre,
        etiqueta: tarea.rol || "General",
        fecha: tarea.fecha,
        descripcion: tarea.descripcion || ""
      });
    }
    setCheckedPendientes(prev => [...prev, false]);
    setModalOpen(false);
  };

  // Marcar tarea pendiente como completada
  const handleCheckPendiente = (idx: number) => {
    if (!checkedPendientes[idx]) {
      const tarea = tareasPendientes[idx];
      // Actualizar el contexto global
      completarTarea(tarea.tarea);
      setCheckedCompletadas(prev => [...prev, true]);
      setCheckedPendientes(prev => prev.filter((_, i) => i !== idx));
      // Actualizar el array global de proyectos
      const proyecto = proyectos.find(p => p.nombre === tarea.proyecto);
      if (proyecto) {
        if (!proyecto.tareasCompletadas) proyecto.tareasCompletadas = [];
        proyecto.tareasCompletadas.push({
          nombre: tarea.tarea,
          etiqueta: tarea.tag,
          fecha: tarea.fecha,
          descripcion: tarea.descripcion || ""
        });
        if (proyecto.tareasPendientes) {
          proyecto.tareasPendientes = proyecto.tareasPendientes.filter(t => t.nombre !== tarea.tarea);
        }
      }
    }
  };
  // Desmarcar tarea completada
  const handleCheckCompletada = (idx: number) => {
    if (checkedCompletadas[idx]) {
      const tarea = tareasCompletadas[idx];
      // Lógica inversa: mover de completadas a pendientes
      // Actualizar el contexto global
      setTareasPendientes([...tareasPendientes, tarea]);
      // Actualizar el array global de proyectos
      const proyecto = proyectos.find(p => p.nombre === tarea.proyecto);
      if (proyecto) {
        if (!proyecto.tareasPendientes) proyecto.tareasPendientes = [];
        proyecto.tareasPendientes.push({
          nombre: tarea.tarea,
          etiqueta: tarea.tag,
          fecha: tarea.fecha,
          descripcion: tarea.descripcion || ""
        });
        if (proyecto.tareasCompletadas) {
          proyecto.tareasCompletadas = proyecto.tareasCompletadas.filter(t => t.nombre !== tarea.tarea);
        }
      }
    }
  };

  return (
    <Box>
      <Flex justify="flex-end" mb={6}>
        <Button     
          bg="#A0AEC0"
          color="white"
          fontWeight="bold"
          fontSize="lg"
          borderRadius="2xl"
          px={8}
          py={4}
          boxShadow="md"
          _hover={{ bg: "#718096", boxShadow: "lg" }}
          _active={{ bg: "#4A5568" }} onClick={() => setModalOpen(true)} 
          >
            <FaPlus color="white" style={{ marginRight: 4 }} />
            Añadir Tarea</Button>
      </Flex>
      {modalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{ background: "white", borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 400, boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
            <Box textAlign="center" mb={4} fontWeight="bold" fontSize="xl" bg="#0D1B24" color="white" borderRadius="md" p={2}>
              CREA TU TAREA
            </Box>
            <CreateTaskForm proyectos={nombresProyectos} onClose={() => setModalOpen(false)} onCrearTarea={handleAgregarTarea} />
          </div>
        </div>
      )}
      <Heading as="h3" size="lg" mb={4} color="black">Tareas Pendientes</Heading>
      <Box bg="white" p={4} borderRadius="lg" boxShadow="md" mb={8}>
        <VStack gap={2} align="stretch">
          {tareasPendientes.map((item, idx) => (
            <Flex key={idx} align="center" justify="space-between" p={2} borderRadius="md" cursor="pointer" _hover={{ bg: "gray.100" }} onClick={() => navigate(`/tasks/${encodeURIComponent(item.tarea)}`)}>
              <Flex align="center" gap={4}>
                <Text color="black" fontWeight="bold" fontSize="lg" minW="120px">{item.tarea}</Text>
                <Box as="span" bg={item.tagColor} color="black" px={3} py={1} borderRadius="xl" fontSize="sm" fontWeight="semibold" boxShadow="sm">
                  {item.tag}
                </Box>
                {item.proyecto && (
                  <Box as="span" bg="#BEE3F8" color="#222" px={3} py={1} borderRadius="xl" fontSize="sm" fontWeight="semibold" boxShadow="sm" ml={2}>
                    {item.proyecto}
                  </Box>
                )}
              </Flex>
              <Text color="black" fontSize="sm">{item.fecha}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>
      <Heading as="h3" size="lg" mb={4} color="black">Tareas Completadas</Heading>
      <Box bg="white" p={4} borderRadius="lg" boxShadow="md" mb={8}>
        <VStack gap={2} align="stretch">
          {tareasCompletadas.map((item, idx) => (
            <Flex key={idx} align="center" justify="space-between" p={2} borderRadius="md" cursor="pointer" _hover={{ bg: "gray.100" }} onClick={() => navigate(`/tasks/${encodeURIComponent(item.tarea)}`)}>
              <Flex align="center" gap={4}>
                <Text color="black" fontWeight="bold" fontSize="lg" minW="120px">{item.tarea}</Text>
                <Box as="span" bg={item.tagColor} color="black" px={3} py={1} borderRadius="xl" fontSize="sm" fontWeight="semibold" boxShadow="sm">
                  {item.tag}
                </Box>
                {item.proyecto && (
                  <Box as="span" bg="#BEE3F8" color="#222" px={3} py={1} borderRadius="xl" fontSize="sm" fontWeight="semibold" boxShadow="sm" ml={2}>
                    {item.proyecto}
                  </Box>
                )}
              </Flex>
              <Text color="black" fontSize="sm">{item.fecha}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>

    </Box>
  );
} 