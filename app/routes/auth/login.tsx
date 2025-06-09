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
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth"; // Importa la función de login

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    if (isAuthenticated) {
      navigate("/welcome", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginUser(username, password);

      if (data.accessToken) {
        localStorage.setItem("authToken", data.accessToken);
        navigate("/welcome");
      } else {
        throw new Error(
          "Token de autenticación no encontrado en la respuesta."
        );
      }
    } catch (err: any) {
      setError(err.message);
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
              INICIAR SESIÓN
            </Text>

            <Text
              fontSize="md"
              mt={0}
              mb={4}
              color="black"
            >
              ¿No tienes una cuenta?{" "}
              <RouterLink to="/register">
                <Text
                  as="span"
                  color="blue.500"
                  fontWeight="semibold"
                  _hover={{ textDecoration: "underline" }}
                >
                  Regístrate
                </Text>
              </RouterLink>
            </Text>

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
                type="text" // Cambiado a text para username
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
                placeholder="Ingresa tu contraseña"
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

            <Flex
              justifyContent="space-between"
              alignItems="center"
              mt={2}
              mb={4}
            >
              <Box
                display="flex"
                alignItems="center"
              >
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    marginRight: "8px",
                    width: "16px",
                    height: "16px",
                    accentColor: "blue",
                  }}
                />
                <label
                  htmlFor="rememberMe"
                  style={{ fontSize: "1rem", color: "black" }}
                >
                  Recordarme
                </label>
              </Box>
              <RouterLink to="/resent-password">
                <Text
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                  fontSize="sm"
                >
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
              disabled={loading}
            >
              {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
            </Button>
            {error && (
              <Text
                color="red.500"
                mt={2}
              >
                Error: {error}
              </Text>
            )}
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}
