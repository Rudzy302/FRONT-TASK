import React from "react";
import { Box, Heading, VStack, Text, Flex } from "@chakra-ui/react";
import { useTasks } from "../components/task/TasksContext";
import { proyectos } from "../proyectosData";

export default function DashboardContent() {
  const { tareasPendientes, tareasCompletadas } = useTasks();

  // Proyectos recientes: los 2 más recientes
  const proyectosRecientes = proyectos.slice(-2).reverse();

  // Calcular progreso real de cada proyecto
  const getProgreso = (proy: any) => {
    const total = (proy.tareasPendientes?.length || 0) + (proy.tareasCompletadas?.length || 0);
    const completadas = proy.tareasCompletadas?.length || 0;
    return total > 0 ? Math.round((completadas / total) * 100) : 0;
  };

  return (
    <Box>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
        <Heading as="h3" size="lg" mb={4} color="black">Tareas Pendientes</Heading>
        <VStack gap={3} align="stretch">
          {tareasPendientes.length === 0 && (
            <Text color="black">No tienes tareas pendientes.</Text>
          )}
          {tareasPendientes.slice(0, 5).map((item, idx) => (
            <Flex key={idx} align="center" justify="space-between" p={2} borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center" gap={2}>
                <Text color="black">{item.tarea}</Text>
                <Box as="span" bg={item.tagColor} color="black" px={3} py={1} borderRadius="md" fontSize="sm" fontWeight="bold">
                  {item.tag}
                </Box>
                {item.proyecto && (
                  <Box as="span" bg="gray.100" color="black" px={2} py={1} borderRadius="md" fontSize="xs" fontWeight="bold" ml={2}>
                    {item.proyecto}
                  </Box>
                )}
              </Flex>
              <Text color="black" fontSize="sm">{item.fecha}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>

      <Box bg="white" p={6} borderRadius="lg" boxShadow="md" mb={8}>
        <Heading as="h3" size="lg" mb={4} color="black">Tareas Completadas</Heading>
        <VStack gap={3} align="stretch">
          {tareasCompletadas.length === 0 && (
            <Text color="black">No tienes tareas completadas.</Text>
          )}
          {tareasCompletadas.slice(0, 5).map((item, idx) => (
            <Flex key={idx} align="center" justify="space-between" p={2} borderRadius="md" _hover={{ bg: "gray.50" }}>
              <Flex align="center" gap={2}>
                <Text color="black">{item.tarea}</Text>
                <Box as="span" bg={item.tagColor} color="black" px={3} py={1} borderRadius="md" fontSize="sm" fontWeight="bold">
                  {item.tag}
                </Box>
                {item.proyecto && (
                  <Box as="span" bg="gray.100" color="black" px={2} py={1} borderRadius="md" fontSize="xs" fontWeight="bold" ml={2}>
                    {item.proyecto}
                  </Box>
                )}
              </Flex>
              <Text color="black" fontSize="sm">{item.fecha}</Text>
            </Flex>
          ))}
        </VStack>
      </Box>

      <Heading as="h3" size="lg" mb={4} color="black">Proyectos Recientes</Heading>
      <Box maxW="100%" overflowX="auto" pb={2}>
        <Flex direction="row" gap={6} minW={0}>
          {proyectosRecientes.map((proy, idx) => (
            <Box key={idx} bg="white" p={6} borderRadius="lg" boxShadow="md" minW="300px" maxW="340px" flexShrink={0} mb={2}>
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="bold" fontSize="xl" color="black">{proy.nombre}</Text>
                <Box as="span" bg={proy.estadoColor} color="black" px={3} py={1} borderRadius="md" fontSize="sm" fontWeight="bold">
                  {proy.estado}
                </Box>
              </Flex>
              <Text color="black" fontSize="sm" mb={2}>{(proy.tareasPendientes?.length || 0) + (proy.tareasCompletadas?.length || 0)} tareas</Text>
              <Box w="100%" h="2" bg="gray.200" borderRadius="md" mb={2}>
                <Box w={`${getProgreso(proy)}%`} h="2" bg={proy.barraColor || "green.400"} borderRadius="md" />
              </Box>
              <Flex justify="space-between" color="black" fontSize="sm">
                <Text color="black">Progreso: {getProgreso(proy)}%</Text>
                <Text color="black">Fecha límite: {proy.fecha}</Text>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
} 