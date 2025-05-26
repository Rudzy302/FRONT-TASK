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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = React.useState('');
  const [verificationCode, setVerificationCode] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ newPassword, verificationCode });
    // Aquí iría la lógica para restablecer la contraseña real
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

      {/* HStack que centrará el formulario en el espacio restante */}
      <HStack justify="center" align="center" flexGrow={1} w="full">
        {/* Cuadro centrado donde irá el formulario */}
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
            <Text fontSize="2em" fontWeight="bold" color="black">RESTABLECER CONTRASEÑA</Text>

            <Box textAlign="left">
              <label htmlFor="newPassword" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Nueva Contraseña</label>
              <Input
                placeholder=""
                type="password"
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
                borderRadius="md"
                size="lg"
                color="blue.600 !important" // Texto del Input azul
                _placeholder={{ color: "gray.500 !important" }} // Placeholder visible
              />
            </Box>

            <Box textAlign="left">
              <label htmlFor="verificationCode" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Código de Verificación</label>
              <Input
                placeholder=""
                type="text" // Tipo de texto para el código de verificación
                value={verificationCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVerificationCode(e.target.value)}
                borderRadius="md"
                size="lg"
                color="blue.600 !important" // Texto del Input azul
                _placeholder={{ color: "gray.500 !important" }} // Placeholder visible
              />
            </Box>

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
              RESTABLECER
            </Button>

            <Text fontSize="md" mt={4} mb={0} color="black">
              <RouterLink to="/login">
                <Text as="span" color="blue.500" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>Recorde mi contraseña</Text>
              </RouterLink>
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}
