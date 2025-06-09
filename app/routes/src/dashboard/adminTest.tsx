import React, { useState } from "react";
import { Box, Heading, Input, Button, Select, Textarea, Flex, Text, VStack } from "@chakra-ui/react";
import { useTasks } from "./components/task/TasksContext";
import { proyectos } from "./proyectosData";

export default function AdminTest() {
  // Proyecto
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [estadoProyecto, setEstadoProyecto] = useState("Activo");
  const [fechaProyecto, setFechaProyecto] = useState("");
  const [colorProyecto, setColorProyecto] = useState("green.100");

  // Tarea
  const [nombreTarea, setNombreTarea] = useState("");
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [fechaTarea, setFechaTarea] = useState("");
  const [proyectoTarea, setProyectoTarea] = useState("");
  const [etiquetaTarea, setEtiquetaTarea] = useState("");
  const [estadoTarea, setEstadoTarea] = useState("pendiente");

  const { agregarTarea, setTareasIniciales, tareasPendientes, tareasCompletadas } = useTasks();

  // Añadir proyecto (solo agrega al array en memoria, no persistente)
  const handleAgregarProyecto = () => {
    if (!nombreProyecto || !fechaProyecto) return;
    proyectos.push({
      nombre: nombreProyecto,
      estado: estadoProyecto,
      estadoColor: colorProyecto,
      tareasPendientes: [],
      tareasCompletadas: [],
      progreso: 0,
      fecha: fechaProyecto,
      barraColor: "green.400"
    });
    setNombreProyecto("");
    setFechaProyecto("");
  };

  // Añadir tarea
  const handleAgregarTarea = () => {
    if (!nombreTarea || !fechaTarea || !proyectoTarea) return;
    const nuevaTarea = {
      tarea: nombreTarea,
      tag: etiquetaTarea || "General",
      tagColor: "gray.200",
      fecha: fechaTarea,
      proyecto: proyectoTarea,
      descripcion: descripcionTarea
    };
    agregarTarea(nuevaTarea);
    setNombreTarea("");
    setDescripcionTarea("");
    setFechaTarea("");
    setProyectoTarea("");
    setEtiquetaTarea("");
  };

  return (
    <Box p={8}>
      <Heading as="h2" size="xl" mb={8} color="black">Panel de Pruebas / Admin</Heading>
      <Flex gap={12} wrap="wrap">
        {/* Formulario Proyecto */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" minW={320} mb={8}>
          <Heading as="h3" size="md" mb={4} color="black">Añadir Proyecto</Heading>
          <Input placeholder="Nombre del proyecto" value={nombreProyecto} onChange={e => setNombreProyecto(e.target.value)} mb={2} color="black" />
          <select
            aria-label="Estado del proyecto"
            value={estadoProyecto}
            onChange={e => setEstadoProyecto(e.target.value)}
            style={{ marginBottom: 8, color: "black", width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
          >
            <option value="Activo">Activo</option>
            <option value="En revisión">En revisión</option>
            <option value="Finalizado">Finalizado</option>
          </select>
          <Input placeholder="Color de estado (ej: green.100)" value={colorProyecto} onChange={e => setColorProyecto(e.target.value)} mb={2} color="black" />
          <Input placeholder="Fecha límite (ej: 30 Mar)" value={fechaProyecto} onChange={e => setFechaProyecto(e.target.value)} mb={2} color="black" />
          <Button colorScheme="teal" w="full" onClick={handleAgregarProyecto} mt={2}>Agregar Proyecto</Button>
        </Box>

        {/* Formulario Tarea */}
        <Box bg="white" p={6} borderRadius="lg" boxShadow="md" minW={320} mb={8}>
          <Heading as="h3" size="md" mb={4} color="black">Añadir Tarea</Heading>
          <Input placeholder="Nombre de la tarea" value={nombreTarea} onChange={e => setNombreTarea(e.target.value)} mb={2} color="black" />
          <Textarea placeholder="Descripción" value={descripcionTarea} onChange={e => setDescripcionTarea(e.target.value)} mb={2} color="black" />
          <Input placeholder="Fecha (ej: 30/03/2024)" value={fechaTarea} onChange={e => setFechaTarea(e.target.value)} mb={2} color="black" />
          <select
            aria-label="Selecciona proyecto"
            value={proyectoTarea}
            onChange={e => setProyectoTarea(e.target.value)}
            style={{ marginBottom: 8, color: "black", width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 16 }}
          >
            <option value="" disabled>Selecciona proyecto</option>
            {proyectos.map((p, i) => (
              <option key={i} value={p.nombre}>{p.nombre}</option>
            ))}
          </select>
          <Input placeholder="Etiqueta (ej: Desarrollo)" value={etiquetaTarea} onChange={e => setEtiquetaTarea(e.target.value)} mb={2} color="black" />
          <Button colorScheme="teal" w="full" onClick={handleAgregarTarea} mt={2}>Agregar Tarea</Button>
        </Box>
      </Flex>

      {/* Vista previa de tareas */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mt={8}>
        <Heading as="h3" size="md" mb={4} color="black">Vista Previa de Tareas</Heading>
        <Flex gap={8} wrap="wrap">
          <Box minW={250}>
            <Text fontWeight="bold" color="black">Pendientes:</Text>
            <VStack align="stretch" gap={1}>
              {tareasPendientes.map((t, i) => (
                <Text key={i} color="black">{t.tarea} ({t.proyecto})</Text>
              ))}
            </VStack>
          </Box>
          <Box minW={250}>
            <Text fontWeight="bold" color="black">Completadas:</Text>
            <VStack align="stretch" gap={1}>
              {tareasCompletadas.map((t, i) => (
                <Text key={i} color="black">{t.tarea} ({t.proyecto})</Text>
              ))}
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
} 