import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Heading, Text, Button, Flex, VStack, Spacer, Image, Grid } from '@chakra-ui/react';

// Importa la imagen con la ruta correcta
import taskLogo3D from './src/assets/TASK.jpg'; // Asegúrate de que la ruta sea correcta

export type Route = {};

export function meta({}: Route) {
  return [
    { title: "TASK" },
    { name: "description", content: "Bienvenido a TASK tu app web de registro de notas" },
  ];
}

export default function Home() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Flex as="header" w="full" px={8} py={4} align="center" bg="white" boxShadow="0 4px 6px rgba(0, 0, 0, 0.2)">
        <Heading as="h1" size="4xl" color="blue.600">
          Task
        </Heading>
        <Spacer />
        <Flex align="center" gap={6}>
          <Button
            as={Link}
            to="/login" // Navega a /login
            variant="ghost"
            color="black"
            fontSize="2xl"
            px={8}
            py={4}
            _hover={{ backgroundColor: '#E9E9E9' }}
          >
            Iniciar Sesión
          </Button>
          <Button
            as={Link}
            to="/register"  // Navega a /register
            bg="blue.600"
            color="white"
            variant="solid"
            borderRadius="md"
            px={12}
            py={6}
            fontSize="2xl"
            _hover={{ backgroundColor: 'blue.700' }}
          >
            Registrarse
          </Button>
        </Flex>
      </Flex>

      <Flex
        as="main"
        py={8}
        px={4}
        align="center"
        bg="#E5E4FF"
        direction={{ base: 'column', md: 'row' }}
        justifyContent="space-around"
        maxWidth="container.xl"
        mx="auto"
        gap={8}
      >
        <Box textAlign={{ base: 'center', md: 'left' }} maxW="xl">
          <Heading as="h1" size="4xl" color="#001728" mb={4}>
            Gestiona tus tareas de manera eficiente
          </Heading>
          <Text fontSize="xl" color="gray.700" mb={6}>
            TaskMaster te ayuda a organizar proyectos, establecer prioridades y cumplir tus objetivos.
          </Text>
        </Box>
        <Box
          borderRadius="15px"
          overflow="hidden"
          boxShadow="md"
          maxWidth="2xl"
        >
          <Image src={taskLogo3D} alt="Logo TASK 3D" width="100%" />
        </Box>
      </Flex>

      <Box as="section" textAlign="center" mt={0} px={0} maxWidth="container.lg" mx="auto">
        <Heading as="h2" size="xl" fontWeight="semibold" color="gray.800" mb={0}>
          Características Principales
        </Heading>
        <Text fontSize="lg" color="gray.600" mb={8}>
          Simplifica tu día a día con nuestras herramientas
        </Text>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={100}>
          <Box
            border="2px solid #ccc"
            borderRadius="8px"
            padding={4}
            textAlign="left"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Heading as="h3" size="xl" fontWeight="bold" color="gray.800" mb={2}>
              Gestión de Tareas
            </Heading>
            <Text fontSize="md" color="gray.600">
              Crea, organiza y prioriza tus tareas con facilidad. Establece fechas límite y recordatorios.
            </Text>
          </Box>
          <Box
            border="2px solid #ccc"
            borderRadius="8px"
            padding={4}
            textAlign="left"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Heading as="h3" size="xl" fontWeight="bold" color="gray.800" mb={2}>
              Proyectos Personalizados
            </Heading>
            <Text fontSize="md" color="gray.600">
              Agrupa tus tareas en proyectos.
              {"\n"}
              Visualiza el progreso y mantén todo organizado.
            </Text>
          </Box>
          <Box
            border="2px solid #ccc"
            borderRadius="8px"
            padding={4}
            textAlign="left"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Heading as="h3" size="xl" fontWeight="bold" color="gray.800" mb={2}>
              Seguimiento de Progreso
            </Heading>
            <Text fontSize="md" color="gray.600">
              Visualiza tu productividad con gráficos y estadísticas.{'\n'}
              Identifica áreas de mejora.
            </Text>
          </Box>
        </Grid>
      </Box>

      <Box bg="#E9E9E9" py={8} borderRadius="md">
        <VStack as="section" textAlign="center" mt={0} gap={16} maxWidth="container.md" mx="auto" px={4}>
          <Heading as="h2" size="2xl" color="blue.600">¿Cómo Funciona?</Heading>
          <Flex justifyContent="space-around" alignItems="center" w="full">
            <Box w="80px" display="flex" flexDirection="column" alignItems="center">
              <Box
                w="80px"
                h="80px"
                borderRadius="full"
                bg="#E9E9E9"
                color="blue.700"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="3xl"
                fontWeight="bold"
                backgroundColor={'white'}
                mb={2}
              >
                1
              </Box>
              <Text fontWeight="semibold" color="gray.800">
                Regístrate
              </Text>
            </Box>
            <Box w="50px" h="2px" bg="black" display={{ base: 'none', md: 'block' }} />
            <Box w="120px" display="flex" flexDirection="column" alignItems="center">
              <Box
                w="80px"
                h="80px"
                borderRadius="full"
                bg="#E9E9E9"
                color="blue.700"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="3xl"
                fontWeight="bold"
                backgroundColor={'white'}
                mb={2}
              >
                2
              </Box>
              <Text fontWeight="semibold" color="gray.800">
                Crea Proyectos y Tareas
              </Text>
            </Box>
            <Box w="50px" h="2px" bg="black" display={{ base: 'none', md: 'block' }} />
            <Box w="120px" display="flex" flexDirection="column" alignItems="center">
              <Box
                w="80px"
                h="80px"
                borderRadius="full"
                borderColor={'black'}
                bg="#E9E9E9"
                color="blue.700"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="3xl"
                fontWeight="bold"
                backgroundColor={'white'}
                mb={2}
              >
                3
              </Box>
              <Text fontWeight="semibold" color="gray.800">
                Aumenta tu Productividad
              </Text>
            </Box>
          </Flex>
        </VStack>
      </Box>

      <Box as="footer" bg="#001728" color="white" py={1} px={1}>
        <Flex direction="column" maxWidth="container.xl" mx="auto">
          <Flex justifyContent="space-between" mb={4}>
            <Box textAlign="center" flex="1">
              <Heading as="h3" size="xl" fontWeight="bold">
                TaskMaster
              </Heading>
            </Box>

            <Box textAlign="center" flex="1">
              <Heading as="h4" size="lg" fontWeight="bold">
                Enlaces Rápidos
              </Heading>
            </Box>
          </Flex>

          <Flex justifyContent="space-between">
            <Box textAlign="center" flex="1">
              <Text fontSize="sm" whiteSpace="pre-line">
                La solución definitiva para la gestión de tareas,{'\n'}
                y proyectos personales y profesionales.
              </Text>
            </Box>

            <Flex direction="row" justifyContent="space-around" flex="1">
              <Box textAlign="center">
                <VStack align="center" gap={2}>
                  <Link to="/inicio" color="white">
                    Inicio
                  </Link>
                  <Link to="/planes" color="white">
                    Planes
                  </Link>
                </VStack>
              </Box>

              <Box textAlign="center">
                <VStack align="center" gap={2}>
                  <Link to="/caracteristicas" color="white">
                    Características
                  </Link>
                  <Link to="/contacto" color="white">
                    Contacto
                  </Link>
                </VStack>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

