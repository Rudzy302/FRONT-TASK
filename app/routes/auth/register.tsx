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
  Grid,
  // Checkbox ya no se importa, ya que usaremos el input nativo
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export default function Register() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [acceptTerms, setAcceptTerms] = React.useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ firstName, lastName, email, password, confirmPassword, acceptTerms });
    // Aquí iría la lógica de registro real
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

      {/* HStack que centrará el formulario de registro en el espacio restante */}
      <HStack justify="center" align="center" flexGrow={1} w="full">
        {/* Cuadro centrado donde irá el formulario de registro */}
        <Box
          p={8}
          maxW={{ base: "xs", sm: "sm", md: "md" }}
          minW={{ base: "xs", sm: "sm", md: "sm" }}
          borderWidth={1}
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
          textAlign="center"
          color="black"
        >
          {/* Contenido del formulario */}
          <VStack gap={4} align="stretch" position="relative" zIndex="2">
            <Text fontSize="2em" fontWeight="bold" color="black">CREAR CUENTA</Text>

            {/* Campos Nombre y Apellido en una fila */}
            <HStack>
                <Box textAlign="left" flex={1}>
                    <label htmlFor="firstName" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Nombre</label>
                    <Input
                        placeholder=""
                        type="text"
                        value={firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                        borderRadius="md"
                        size="lg"
                        color="blue.600 !important"
                        _placeholder={{ color: "gray.500 !important" }}
                    />
                </Box>
                <Box textAlign="left" flex={1}>
                    <label htmlFor="lastName" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Apellido</label>
                    <Input
                        placeholder=""
                        type="text"
                        value={lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                        borderRadius="md"
                        size="lg"
                        color="blue.600 !important"
                        _placeholder={{ color: "gray.500 !important" }}
                    />
                </Box>
            </HStack>

            <Box textAlign="left">
              <label htmlFor="email" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Correo Electrónico</label>
              <Input
                placeholder=""
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                borderRadius="md"
                size="lg"
                color="blue.600 !important"
                _placeholder={{ color: "gray.500 !important" }}
              />
            </Box>

            <Box textAlign="left">
              <label htmlFor="password" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Contraseña</label>
              <Input
                placeholder=""
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                borderRadius="md"
                size="lg"
                color="blue.600 !important"
                _placeholder={{ color: "gray.500 !important" }}
              />
              <Text fontSize="0.8em" color="gray.600" mt={1}>La contraseña debe tener al menos 8 caracteres y contener letras, números y símbolos.</Text>
            </Box>

            <Box textAlign="left">
              <label htmlFor="confirmPassword" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Confirmar Contraseña</label>
              <Input
                placeholder=""
                type="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                borderRadius="md"
                size="lg"
                color="blue.600 !important"
                _placeholder={{ color: "gray.500 !important" }}
              />
            </Box>

            {/* Checkbox "Acepto los Términos" usando input nativo */}
            <Flex justifyContent="flex-start" alignItems="center" mt={2} mb={4}>
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                style={{ marginRight: '8px', width: '16px', height: '16px', accentColor: 'blue' }} // Estilo básico para el checkbox
              />
              <label htmlFor="acceptTerms" style={{ fontSize: '1rem', color: 'black' }}>Acepto los Términos de servicio y la política de privacidad</label>
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
              Registrarse
            </Button>

            <Text fontSize="md" mt={4} mb={0} color="black">
              <RouterLink to="/login">
                <Text as="span" color="blue.500" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>Ya tengo una cuenta</Text>
              </RouterLink>
            </Text>

            {/* Separador "O regístrate con" */}
            <Flex align="center" my={6}>
              <Box flex="1" h="1px" bg="gray.300" />
              <Text px={2} fontSize="sm" color="black" whiteSpace="nowrap">
                O regístrate con
              </Text>
              <Box flex="1" h="1px" bg="gray.300" />
            </Flex>

            {/* Botones de Google y Facebook en una cuadrícula */}
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
