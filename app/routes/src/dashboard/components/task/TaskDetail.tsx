import { useParams, useNavigate } from "react-router-dom";
import { proyectos } from "../../proyectosData";
import { Box, Heading, Text, Button, Flex, Textarea } from "@chakra-ui/react";
import NavModal from "../NavModal";
import { useState } from "react";
import { useTasks } from "./TasksContext";

interface Tarea {
  nombre: string;
  etiqueta: string;
  fecha: string;
  descripcion?: string;
}

export default function TaskDetail() {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const { completarTarea, eliminarTarea } = useTasks();

  // Buscar la tarea en todos los proyectos
  let tarea: string = "", proyecto: string | undefined, descripcion, fecha, tag;
  proyectos.forEach(p => {
    p.tareasPendientes?.forEach(t => {
      if (t.nombre === nombre) {
        tarea = t.nombre;
        proyecto = p.nombre;
        descripcion = (t as Tarea).descripcion || ""; // Valor por defecto
        fecha = t.fecha;
        tag = t.etiqueta;
      }
    });
    p.tareasCompletadas?.forEach(t => {
      if (t.nombre === nombre) {
        tarea = t.nombre;
        proyecto = p.nombre;
        descripcion = (t as Tarea).descripcion || ""; // Valor por defecto
        fecha = t.fecha;
        tag = t.etiqueta;
      }
    });
  });

  if (!tarea) return <Box p={8}>Tarea no encontrada</Box>;

  const handleDelete = () => {
    setIsDeleting(true);
    // Eliminar del contexto global
    eliminarTarea(tarea);
    // Eliminar del array global de proyectos
    const proyectoGlobal = proyectos.find(p => p.nombre === proyecto);
    if (proyectoGlobal) {
      if (proyectoGlobal.tareasPendientes) {
        proyectoGlobal.tareasPendientes = proyectoGlobal.tareasPendientes.filter(t => t.nombre !== tarea);
      }
      if (proyectoGlobal.tareasCompletadas) {
        proyectoGlobal.tareasCompletadas = proyectoGlobal.tareasCompletadas.filter(t => t.nombre !== tarea);
      }
    }
    // Redirigir inmediatamente a la vista de tareas
    navigate("/tasks");
  };

  const handleMarkAsCompleted = () => {
    // Si la tarea está en completadas, mover a pendientes (inversa)
    const proyectoGlobal = proyectos.find(p => p.nombre === proyecto);
    if (!proyectoGlobal) return;
    const tareaCompletada = proyectoGlobal.tareasCompletadas?.find(t => t.nombre === tarea);
    if (tareaCompletada) {
      // Mover a pendientes
      if (!proyectoGlobal.tareasPendientes) proyectoGlobal.tareasPendientes = [];
      proyectoGlobal.tareasPendientes.push({
        nombre: tareaCompletada.nombre,
        etiqueta: tareaCompletada.etiqueta,
        fecha: tareaCompletada.fecha,
        descripcion: tareaCompletada.descripcion
      });
      proyectoGlobal.tareasCompletadas = proyectoGlobal.tareasCompletadas?.filter(t => t.nombre !== tarea);
      navigate("/tasks");
      return;
    }
    // Si no, marcar como completada (flujo normal)
    completarTarea(tarea);
    const tareaPendiente = proyectoGlobal.tareasPendientes?.find(t => t.nombre === tarea);
    if (tareaPendiente) {
      if (!proyectoGlobal.tareasCompletadas) proyectoGlobal.tareasCompletadas = [];
      proyectoGlobal.tareasCompletadas.push({
        nombre: tareaPendiente.nombre,
        etiqueta: tareaPendiente.etiqueta,
        fecha: tareaPendiente.fecha,
        descripcion: tareaPendiente.descripcion
      });
      proyectoGlobal.tareasPendientes = proyectoGlobal.tareasPendientes?.filter(t => t.nombre !== tarea);
    }
    navigate("/tasks");
  };

  // Determinar si la tarea está completada
  const proyectoGlobal = proyectos.find(p => p.nombre === proyecto);
  const isCompleted = proyectoGlobal?.tareasCompletadas?.some(t => t.nombre === tarea);

  return (
    <Flex>
      <NavModal />
      <Box bg="white" borderRadius="lg" boxShadow="md" p={8} flex="1" mt={8}>
        <Flex justify="space-between" align="center" mb={4}>
          <Button variant="ghost" size="sm" onClick={() => navigate("/tasks")} bg="#CBD5E0" color="#222" borderRadius="2xl" fontWeight="bold" _hover={{ bg: "blue.200" }} _active={{ bg: "#718096" }} mr={2} p={2} minW={0}>
            <span style={{ fontSize: "1.2rem", marginRight: 4 }}>←</span>
          </Button>
          <Box as="span" bg="yellow.200" color="#222" fontWeight="bold" px={4} py={2} borderRadius="lg" fontSize="lg">
            {tag}
          </Box>
          <Button
            bg="#FEB2B2"
            color="#C53030"
            fontWeight="bold"
            borderRadius="2xl"
            px={6}
            py={3}
            boxShadow="md"
            _hover={{ bg: "#FC8181", color: "white", boxShadow: "lg" }}
            _active={{ bg: "#C53030", color: "white" }}
            onClick={handleDelete}
            fontSize="md"
          >
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: 8 }}>🗑️</span>
            ELIMINAR TAREA
          </Button>
        </Flex>
        <Text fontWeight="bold" fontSize="lg" mb={1} color="black">
          Tarea: {tarea}
        </Text>
        <Text fontWeight="bold" fontSize="lg" mb={1} color="black">
          Proyecto: {proyecto}
        </Text>
        <Text fontWeight="bold" fontSize="lg" mb={1} color="black">
          Fecha: {fecha}
        </Text>
        <Text fontWeight="bold" fontSize="lg" mb={1} color="black">
          Descripción:
        </Text>
        <Textarea value={descripcion} readOnly size="lg" fontWeight="bold" fontSize="xl" bg="white" border="1px solid" borderColor="black" borderRadius="md" color="black" mb={8} />
        <Flex justify="space-between" align="center" mt={8}>
          <Button 
            colorScheme={isCompleted ? undefined : undefined}
            bg={isCompleted ? "#F6E05E" : "#A0AEC0"}
            color={isCompleted ? "#222" : "white"}
            fontWeight="bold"
            borderRadius="2xl"
            onClick={handleMarkAsCompleted}
            _hover={{ bg: isCompleted ? "#ECC94B" : "#718096" }}
            _active={{ bg: isCompleted ? "#B7791F" : "#4A5568" }}
          >
            {isCompleted ? "MARCAR COMO PENDIENTE" : "MARCAR TAREA COMO COMPLETADA"}
          </Button>
          <Text color="black" fontWeight="bold" fontSize="lg">
            {/* Aquí podrías mostrar algún estado extra si lo deseas */}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
} 