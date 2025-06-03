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
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../services/auth"; // Importa las funciones de registro y login

export default function Register() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }
    if (!acceptTerms) {
      setError("Debes aceptar los términos y condiciones.");
      setLoading(false);
      return;
    }

    try {
      await registerUser(username, email, password);
      setSuccess("Registro exitoso. Iniciando sesión automáticamente...");

      const loginData = await loginUser(username, password);
      if (loginData.accessToken) {
        localStorage.setItem("authToken", loginData.accessToken);
        setTimeout(() => {
          setSuccess(null);
        }, 5000);
        navigate("/dashboard");
      } else {
        throw new Error(
          "Token de autenticación no encontrado después del registro."
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
              CREAR CUENTA
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
              <Text
                fontSize="0.8em"
                color="gray.600"
                mt={1}
              >
                La contraseña debe tener al menos 8 caracteres y contener
                letras, números y símbolos.
              </Text>
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

            <Flex
              justifyContent="flex-start"
              alignItems="center"
              mt={2}
              mb={4}
            >
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                style={{
                  marginRight: "8px",
                  width: "16px",
                  height: "16px",
                  accentColor: "blue",
                }}
              />
              <label
                htmlFor="acceptTerms"
                style={{ fontSize: "1rem", color: "black" }}
              >
                Acepto los Términos de servicio y la política de privacidad
              </label>
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
              {loading ? "Registrando..." : "Registrarse"}
            </Button>
            {error && (
              <Text
                color="red.500"
                mt={2}
              >
                Error: {error}
              </Text>
            )}

            <Text
              fontSize="md"
              mt={4}
              mb={0}
              color="black"
            >
              <RouterLink to="/login">
                <Text
                  as="span"
                  color="blue.500"
                  fontWeight="semibold"
                  _hover={{ textDecoration: "underline" }}
                >
                  Ya tengo una cuenta
                </Text>
              </RouterLink>
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}
