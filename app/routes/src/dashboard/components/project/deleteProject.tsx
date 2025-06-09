import React, { useState } from "react";
import { Box, Flex, Heading, Text, Button, HStack, VStack } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import NavModal from "../NavModal";
import type { Proyecto } from "../../interface/Proyecto";
import { proyectos } from "../../proyectosData";
import  CreateTaskForm  from "../task/CreateTaskForm";
import { useTasks } from "../task/TasksContext";

export default function DeleteProject() {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const proyecto: Proyecto | undefined = proyectos.find(p => p.nombre === projectName);

  if (!proyecto) return <Box p={8} color="black">Proyecto no encontrado</Box>;

  const [tareasCompletadas, setTareasCompletadas] = useState(proyecto.tareasCompletadas || []);
  const [tareasPendientes, setTareasPendientes] = useState(proyecto.tareasPendientes || []);
  const [checkedCompletadas, setCheckedCompletadas] = useState(
    (proyecto.tareasCompletadas || []).map(() => true)
  );
  const [checkedPendientes, setCheckedPendientes] = useState(
    (proyecto.tareasPendientes || []).map(() => false)
  );

  const { agregarTarea } = useTasks();

  // Calcular progreso dinámicamente
  const totalTareas =
    (proyecto.tareasCompletadas?.length || 0) +
    (proyecto.tareasPendientes?.length || 0);
  const completadas =
    checkedCompletadas.filter(Boolean).length +
    checkedPendientes.filter(Boolean).length;
  const progreso = totalTareas > 0 ? Math.round((completadas / totalTareas) * 100) : 0;

  const handleCheckCompletada = (idx: number) => {
    // Si está marcada (true), desmarcar y mover a pendientes
    if (checkedCompletadas[idx]) {
      const tarea = tareasCompletadas[idx];
      setTareasPendientes(prev => [...prev, tarea]);
      setCheckedPendientes(prev => [...prev, false]);
      setTareasCompletadas(prev => prev.filter((_, i) => i !== idx));
      setCheckedCompletadas(prev => prev.filter((_, i) => i !== idx));
      // Actualizar el array global de proyectos
      const proyectoGlobal = proyectos.find(p => p.nombre === proyecto.nombre);
      if (proyectoGlobal) {
        if (!proyectoGlobal.tareasPendientes) proyectoGlobal.tareasPendientes = [];
        proyectoGlobal.tareasPendientes.push({
          nombre: tarea.nombre,
          etiqueta: tarea.etiqueta,
          fecha: tarea.fecha,
          descripcion: tarea.descripcion
        });
        if (proyectoGlobal.tareasCompletadas) {
          proyectoGlobal.tareasCompletadas = proyectoGlobal.tareasCompletadas.filter(t => t.nombre !== tarea.nombre);
        }
      }
    }
  };
  const handleCheckPendiente = (idx: number) => {
    if (!checkedPendientes[idx]) {
      // Marcar como completada: mover tarea
      const tarea = tareasPendientes[idx];
      setTareasCompletadas(prev => [...prev, tarea]);
      setCheckedCompletadas(prev => [...prev, true]);
      setTareasPendientes(prev => prev.filter((_, i) => i !== idx));
      setCheckedPendientes(prev => prev.filter((_, i) => i !== idx));
      // Actualizar el array global de proyectos
      const proyectoGlobal = proyectos.find(p => p.nombre === proyecto.nombre);
      if (proyectoGlobal) {
        if (!proyectoGlobal.tareasCompletadas) proyectoGlobal.tareasCompletadas = [];
        proyectoGlobal.tareasCompletadas.push({
          nombre: tarea.nombre,
          etiqueta: tarea.etiqueta,
          fecha: tarea.fecha,
          descripcion: tarea.descripcion
        });
        if (proyectoGlobal.tareasPendientes) {
          proyectoGlobal.tareasPendientes = proyectoGlobal.tareasPendientes.filter(t => t.nombre !== tarea.nombre);
        }
      }
    } else {
      // Si se desmarca, no hacer nada (o podrías moverla de vuelta si lo deseas)
    }
  };

  const handleDelete = () => {
    // Elimina el proyecto del array global
    const idx = proyectos.findIndex(p => p.nombre === proyecto.nombre);
    if (idx !== -1) {
      proyectos.splice(idx, 1);
    }
    // Redirige a la lista de proyectos
    navigate('/projects');
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleAgregarTarea = (tarea: { nombre: string; rol: string; descripcion: string; fecha: string }) => {
    setTareasPendientes(prev => [...prev, { nombre: tarea.nombre, etiqueta: tarea.rol || 'General', fecha: tarea.fecha, descripcion: tarea.descripcion }]);
    setCheckedPendientes(prev => [...prev, false]);
    // Agregar también al contexto global
    agregarTarea({
      tarea: tarea.nombre,
      tag: tarea.rol || 'General',
      tagColor: 'gray.200',
      fecha: tarea.fecha,
      proyecto: proyecto.nombre,
      descripcion: tarea.descripcion
    });
    // Agregar al array global de proyectos
    const proyectoGlobal = proyectos.find(p => p.nombre === proyecto.nombre);
    if (proyectoGlobal) {
      if (!proyectoGlobal.tareasPendientes) proyectoGlobal.tareasPendientes = [];
      proyectoGlobal.tareasPendientes.push({
        nombre: tarea.nombre,
        etiqueta: tarea.rol || 'General',
        fecha: tarea.fecha,
        descripcion: tarea.descripcion
      });
    }
    setModalOpen(false);
  };

  return (
    <Flex minH="100vh" w="100vw">
      {/* Sidebar */}
      <Box
        w={{ base: "full", md: "250px" }}
        bg="#001728"
        color="white"
        p={0}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        boxShadow="md"
        position={{ base: "relative", md: "sticky" }}
        top="0"
        h={{ base: "auto", md: "100vh" }}
        zIndex="10"
      >
        <NavModal />
      </Box>
      {/* Detalle del proyecto */}
      <Box flex="1" p={{ base: 4, md: 8 }} bg="#F7F7F7" minH="100vh">
        <Flex alignItems="center" justifyContent="space-between" mb={8}>
          {/* Estado a la izquierda */}
          <Flex align="center" minW="180px" justify="flex-start" height="100%">
            <Button variant="ghost" size="sm" onClick={() => navigate("/projects")}
              bg="#CBD5E0" color="#222" borderRadius="2xl" fontWeight="bold" _hover={{ bg: "#A0AEC0" }} _active={{ bg: "#718096" }} mr={2} p={2} minW={0} display="block" alignItems="center" justifyContent="center" height="40px">
              <span style={{ fontSize: "1.2rem", marginRight: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>←</span>
            </Button>
            <Box bg="#68D391" color="#222" fontWeight="bold" fontSize="md" px={4} py={2} borderRadius="xl" boxShadow="sm">
              {proyecto.estado}
            </Box>
          </Flex>
          {/* Nombre al centro */}
          <Heading as="h2" size="xl" color="black" textAlign="center" flex="1">
            {proyecto.nombre}
          </Heading>
          {/* Botón eliminar a la derecha */}
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
            ELIMINAR PROYECTO
          </Button>
        </Flex>
        <Box bg="white" borderRadius="lg" boxShadow="md" p={6}>
          <VStack align="stretch" gap={6}>
            {/* Botón para añadir tarea */}
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
          _active={{ bg: "#4A5568" }} onClick={() => setModalOpen(true)}>Añadir Tarea</Button>
            {modalOpen && (
              <div style={{
                position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
              }}>
                <div style={{ background: "white", borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 400, boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
                  <Box textAlign="center" mb={4} fontWeight="bold" fontSize="xl" bg="#0D1B24" color="white" borderRadius="md" p={2}>
                    CREA TU TAREA
                  </Box>
                  <CreateTaskForm proyecto={proyecto.nombre} onClose={() => setModalOpen(false)} onCrearTarea={handleAgregarTarea} />
                </div>
              </div>
            )}
            <Text fontWeight="bold" fontSize="lg" mb={2} color="black">
              Estado: {proyecto.estado}
            </Text>
            <Text fontWeight="bold" fontSize="lg" mb={2} color="black">
              Fecha: {proyecto.fecha}
            </Text>
            <Box>
              <Text fontWeight="bold" fontSize="lg" mb={2} color="black">Tareas Completadas</Text>
              {tareasCompletadas.map((t, i) => (
                <Flex key={i} align="center" mb={2} p={2} borderRadius="md" border="1px solid #eee">
                  <input type="checkbox" checked={checkedCompletadas[i]} onChange={() => handleCheckCompletada(i)} style={{ marginRight: 8 }} title="Tarea completada" />
                  <Text flex="1" color="black">{t.nombre}</Text>
                  <span style={{
                    background: "#E2E8F0", color: "#222", fontWeight: "bold", marginRight: 8, padding: "0.2rem 0.8rem", borderRadius: "0.5rem"
                  }}>{t.etiqueta}</span>
                  <Text color="gray.500">{t.fecha}</Text>
                </Flex>
              ))}
            </Box>
            
            <Box>
              <Text fontWeight="bold" fontSize="lg" mb={2} color="black">Tareas Pendientes</Text>
              {tareasPendientes.map((t, i) => (
                <Flex key={i} align="center" mb={2} p={2} borderRadius="md" border="1px solid #eee">
                  <input type="checkbox" checked={checkedPendientes[i]} onChange={() => handleCheckPendiente(i)} style={{ marginRight: 8 }} title="Tarea pendiente" />
                  <Text flex="1" color="black">{t.nombre}</Text>
                  <span style={{
                    background: "#C6F6D5", color: "#222", fontWeight: "bold", marginRight: 8, padding: "0.2rem 0.8rem", borderRadius: "0.5rem"
                  }}>{t.etiqueta}</span>
                  <Text color="gray.500">{t.fecha}</Text>
                </Flex>
              ))}
            </Box>
            <Flex align="center" mt={4}>
              <Text fontWeight="bold" color="gray.600" fontSize="lg" mr={4}>Progreso: {progreso}%</Text>
              {/* Barra de progreso personalizada */}
              <div style={{
                flex: 1, height: "18px", background: "#E2E8F0", borderRadius: "8px", marginRight: "1rem", overflow: "hidden"
              }}>
                <div style={{
                  width: `${progreso}%`,
                  height: "100%",
                  background: "#38B2AC",
                  borderRadius: "8px"
                }} />
              </div>
              <Text color="gray.600" fontWeight="bold" fontSize="lg">Fecha límite: {proyecto.fecha}</Text>
            </Flex>
            <Text color="black" fontWeight="bold" fontSize="lg">
              {/* Aquí podrías mostrar algún estado extra si lo deseas */}
            </Text>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}
