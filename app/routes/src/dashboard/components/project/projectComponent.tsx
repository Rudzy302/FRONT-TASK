import React from "react";
import { Box, Heading, Text, Flex, SimpleGrid } from "@chakra-ui/react";
import type { Proyecto } from "../../interface/Proyecto";
import { useNavigate } from "react-router-dom";

interface ProjectComponentProps {
  proyectos: Proyecto[];
}

export default function ProjectComponent({ proyectos }: ProjectComponentProps) {
  const navigate = useNavigate();
  return (
    <Box>
      <Heading as="h3" size="lg" mb={4} color="black">Todos los Proyectos</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={6}>
        {proyectos.map((proy, idx) => {
          // Calcular progreso real
          const totalTareas =
            (proy.tareasCompletadas?.length || 0) +
            (proy.tareasPendientes?.length || 0);
          const completadas = proy.tareasCompletadas?.length || 0;
          const progresoReal = totalTareas > 0 ? Math.round((completadas / totalTareas) * 100) : 0;
          return (
            <Box
              key={idx}
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              minW="250px"
              maxW="350px"
              mx="auto"
              cursor="pointer"
              _hover={{ boxShadow: "xl", transform: "scale(1.02)", transition: "all 0.2s" }}
              onClick={() => navigate(`/projects/${encodeURIComponent(proy.nombre)}`)}
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text fontWeight="bold" fontSize="xl" color="black">{proy.nombre}</Text>
                <Box as="span" bg={proy.estadoColor} color="black" px={3} py={1} borderRadius="md" fontSize="sm" fontWeight="bold">
                  {proy.estado}
                </Box>
              </Flex>
              <Text color="black" fontSize="sm" mb={2}>{proy.tareas}</Text>
              <Box w="100%" h="18px" bg="#E2E8F0" borderRadius="8px" mb={2} overflow="hidden" position="relative">
                <Box w={`${progresoReal}%`} h="18px" bg="#38B2AC" borderRadius="8px" position="absolute" top={0} left={0} />
                <Text position="absolute" left={2} top="50%" transform="translateY(-50%)" color="white" fontWeight="bold" fontSize="sm" zIndex={1}>
                  {progresoReal}%
                </Text>
              </Box>
              <Flex justify="space-between" color="gray.500" fontSize="sm">
                <Text>Fecha límite: {proy.fecha}</Text>
              </Flex>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
} 