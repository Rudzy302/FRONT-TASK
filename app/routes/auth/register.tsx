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
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError('Debes aceptar los términos y condiciones');
      setLoading(false);
      return;
    }

    try {
      await registerUser(username, email, password);
      setSuccess('¡Registro exitoso! Redirigiendo...');
      
      // Esperar 2 segundos antes de redirigir para que el usuario vea el mensaje de éxito
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      w="full"
      minH="100vh"
      bg="gray.50"
    >
      <Flex
        as="header"
        w="full"
        px={8}
        py={4}
        align="center"
        bg="white"
        boxShadow="sm"
      >
        <Heading
          as="h1"
          size="4xl"
          color="blue.600"
        >
          Task
        </Heading>
        <Spacer />
      </Flex>

      <HStack
        justify="center"
        align="center"
        flexGrow={1}
        w="full"
      >
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
          <VStack
            gap={4}
            align="stretch"
            position="relative"
            zIndex="2"
          >
            <Text
              fontSize="2em"
              fontWeight="bold"
              color="black"
            >
              CREAR CUENTA
            </Text>

            {error && (
              <Box
                p={4}
                bg="red.50"
                color="red.500"
                borderRadius="md"
                borderWidth={1}
                borderColor="red.200"
                mb={2}
              >
                <Text fontWeight="bold">Error</Text>
                <Text>{error}</Text>
              </Box>
            )}

            {success && (
              <Box
                p={4}
                bg="green.50"
                color="green.500"
                borderRadius="md"
                borderWidth={1}
                borderColor="green.200"
              >
                <Text fontWeight="bold">Éxito</Text>
                <Text>{success}</Text>
              </Box>
            )}

            <Box textAlign="left">
              <label
                htmlFor="username"
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "black",
                  display: "block",
                }}
              >
                Nombre de Usuario
              </label>
              <Input
                placeholder="Ingresa tu nombre de usuario"
                type="text"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                borderRadius="md"
                size="lg"
                color="blue.600 !important"
                _placeholder={{ color: "gray.500 !important" }}
              />
            </Box>

            <Box textAlign="left">
              <label
                htmlFor="email"
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "black",
                  display: "block",
                }}
              >
                Correo Electrónico
              </label>
              <Input
                placeholder=""
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                borderRadius="md"
                size="lg"
                color="blue.600 !important"
                _placeholder={{ color: "gray.500 !important" }}
              />
            </Box>

            <Box textAlign="left">
              <label
                htmlFor="password"
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "black",
                  display: "block",
                }}
              >
                Contraseña
              </label>
              <Input
                placeholder=""
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                borderRadius="md"
                size="lg"
                color="blue.600 !important"
                _placeholder={{ color: "gray.500 !important" }}
              />
            </Box>

            <Box textAlign="left">
              <label
                htmlFor="confirmPassword"
                style={{
                  fontSize: "1.2em",
                  fontWeight: "bold",
                  marginBottom: "4px",
                  color: "black",
                  display: "block",
                }}
              >
                Confirmar Contraseña
              </label>
              <Input
                placeholder=""
                type="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setConfirmPassword(e.target.value)
                }
                borderRadius="md"
                size="lg"
                color="blue.600 !important"
                _placeholder={{ color: "gray.500 !important" }}
              />
            </Box>

            <Box textAlign="left">
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  style={{ width: "20px", height: "20px" }}
                />
                <Text>
                  Acepto los{" "}
                  <RouterLink
                    to="/terms"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    términos y condiciones
                  </RouterLink>
                </Text>
              </label>
            </Box>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              onClick={handleSubmit}
              loading={loading}
              loadingText="Registrando..."
            >
              {loading ? "Registrando..." : "Registrarse"}
            </Button>

            <Text>
              ¿Ya tienes una cuenta?{" "}
              <RouterLink
                to="/login"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Iniciar sesión
              </RouterLink>
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}
