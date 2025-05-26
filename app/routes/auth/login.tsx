import {
  HStack,
  Box,
  Flex,
  Heading,
  Spacer,
  VStack,
  Input,
  Text,
  Button,
  Grid, // Importamos Grid para la cuadrícula de botones
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rememberMe, setRememberMe] = React.useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ email, password, rememberMe });
    // Aquí iría la lógica de autenticación real
  };

  return (
    // Contenedor principal de la página (header + contenido)
    <Box display="flex" flexDirection="column" w="full" minH="100vh" bg="gray.50">

      {/* Header que ocupa todo el ancho superior de la página */}
      <Flex as="header" w="full" px={8} py={4} align="center" bg="white" boxShadow="sm">
        <Heading as="h1" size="4xl" color="blue.600">
          Task
        </Heading>
        <Spacer />
      </Flex>

      {/* HStack que centrará el formulario de login en el espacio restante */}
      <HStack justify="center" align="center" flexGrow={1} w="full">
        {/* Cuadro centrado donde irá el formulario de login */}
        <Box
          p={8}
          maxW={{ base: "xs", sm: "sm", md: "md" }}
          minW={{ base: "xs", sm: "sm", md: "sm" }}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
          textAlign="center"
          color="black" // Aseguramos que todo el texto dentro de este Box sea negro
        >
          {/* Contenido del formulario */}
          <VStack gap={4} align="stretch" position="relative" zIndex="2">
            <Text fontSize="2em" fontWeight="bold" color="black">INICIAR SESIÓN</Text>

            <Text fontSize="md" mt={0} mb={4} color="black">
              ¿No tienes una cuenta?{" "}
              <RouterLink to="/register">
                <Text as="span" color="blue.500" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>Regístrate</Text>
              </RouterLink>
            </Text>

            <Box textAlign="left">
              {/* Cambiado de Text as="label" a <label> nativo */}
              <label htmlFor="email" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Correo Electrónico</label>
              <Input
                placeholder="Ingresa tu correo electrónico"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                borderRadius="md"
                size="lg"
                color="blue.600 !important" // <--- ¡Texto del Input ahora es azul y forzado!
                _placeholder={{ color: "gray.500 !important" }} // <--- El placeholder es gris y forzado!
              />
            </Box>

            <Box textAlign="left">
              {/* Cambiado de Text as="label" a <label> nativo */}
              <label htmlFor="password" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Contraseña</label>
              <Input
                placeholder="Ingresa tu contraseña"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                borderRadius="md"
                size="lg"
                color="blue.600 !important" // <--- ¡Texto del Input ahora es azul y forzado!
                _placeholder={{ color: "gray.500 !important" }} // <--- El placeholder es gris y forzado!
              />
            </Box>

            {/* Checkbox "Recordarme" y enlace "¿Olvidaste tu contraseña?" */}
            <Flex justifyContent="space-between" alignItems="center" mt={2} mb={4}>
              <Box display="flex" alignItems="center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ marginRight: '8px', width: '16px', height: '16px', accentColor: 'blue' }}
                />
                {/* Reemplazado Text as="label" por <label> nativo para solucionar el error htmlFor */}
                <label htmlFor="rememberMe" style={{ fontSize: '1rem', color: 'black' }}>Recordarme</label>
              </Box>
              <RouterLink to="/resent-password">
                <Text color="blue.500" _hover={{ textDecoration: 'underline' }} fontSize="sm">
                  ¿Olvidaste tu contraseña?
                </Text>
              </RouterLink>
            </Flex>

            <Button
              bg="blue.600"
              color="white"
              size="lg"
              w="full"
              mt={4}
              onClick={handleSubmit}
              _hover={{ bg: "blue.700" }}
              borderRadius="md"
            >
              Iniciar Sesión
            </Button>

            {/* Separador "O continuar con" */}
            <Flex align="center" my={6}>
              <Box flex="1" h="1px" bg="gray.300" />
              <Text px={2} fontSize="sm" color="black" whiteSpace="nowrap">
                O continuar con
              </Text>
              <Box flex="1" h="1px" bg="gray.300" />
            </Flex>

            {/* Botones de Google y Facebook en una cuadrícula */}
            {/* Aseguramos que el Grid se comporte como una cuadrícula y justifique el contenido */}
            <Grid templateColumns="1fr 1fr" gap={4} w="full" justifyContent="space-between">
              <Button
                size="lg"
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                borderRadius="md"
              >
                <Box as="span" className="fab fa-google" mr={2} />Google
              </Button>
              <Button
                size="lg"
                boxShadow="sm"
                _hover={{ boxShadow: "md" }}
                borderRadius="md"
              >
                <Box as="span" className="fab fa-facebook" mr={2} />Facebook
              </Button>
            </Grid>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}
