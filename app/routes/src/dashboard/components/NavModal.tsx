import {
  Box,
  Flex,
  Heading,
  Spacer,
  VStack,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import xIcon from "../../assets/x.png";

export default function NavModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = useState("Usuario");

  useEffect(() => {
    // Acceder a localStorage solo en el cliente
    if (typeof window !== "undefined") {
      const isAuthenticated = localStorage.getItem(
        import.meta.env.VITE_TOKEN_KEY
      );
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      }
      const storedEmail = localStorage.getItem(
        import.meta.env.VITE_USER_EMAIL_KEY
      );
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
    localStorage.removeItem(import.meta.env.VITE_REFRESH_TOKEN_KEY);
    localStorage.removeItem(import.meta.env.VITE_USER_EMAIL_KEY);
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      w={{ base: "full", md: "250px" }}
      bg="#001728"
      color="white"
      p={0}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-start"
      boxShadow="md"
      position={{ base: "relative", md: "sticky" }}
      top="0"
      h={{ base: "auto", md: "100vh" }}
      zIndex="10"
    >
      <Box
        w="full"
        p={6}
        bg="#001728"
      >
        <Heading
          as="h1"
          fontSize="50px"
          color="white"
        >
          TASK
        </Heading>
      </Box>

      <VStack
        align="flex-start"
        gap={4}
        w="full"
        flexGrow={1}
        bg="#001F35"
        p={6}
        mt={-2}
      >
        {/* Navegación principal */}
        <VStack
          align="flex-start"
          gap={4}
          w="full"
        >
          <RouterLink
            to="/welcome"
            style={{ width: "100%" }}
          >
            <HStack
              gap={3}
              p={2}
              borderRadius="md"
              w="full"
              bg={isActive("/welcome") ? "#002C4B" : "transparent"}
              _hover={{ bg: "#002C4B" }}
            >
              <Box
                w="20px"
                h="20px"
                border="2px solid white"
                bg={isActive("/welcome") ? "white" : ""}
                borderRadius="sm"
              ></Box>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="white"
              >
                Inicio
              </Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/tasks"
            style={{ width: "100%" }}
          >
            <HStack
              gap={3}
              p={2}
              borderRadius="md"
              w="full"
              bg={isActive("/tasks") ? "#002C4B" : "transparent"}
              _hover={{ bg: "#002C4B" }}
            >
              <Box
                w="20px"
                h="20px"
                border="2px solid white"
                bg={isActive("/tasks") ? "white" : ""}
                borderRadius="sm"
              ></Box>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="white"
              >
                Mis Tareas
              </Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/projects"
            style={{ width: "100%" }}
          >
            <HStack
              gap={3}
              p={2}
              borderRadius="md"
              w="full"
              bg={isActive("/projects") ? "#002C4B" : "transparent"}
              _hover={{ bg: "#002C4B" }}
            >
              <Box
                w="20px"
                h="20px"
                border="2px solid white"
                bg={isActive("/projects") ? "white" : ""}
                borderRadius="sm"
              ></Box>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="white"
              >
                Proyectos
              </Text>
            </HStack>
          </RouterLink>
          <RouterLink
            to="/calendar"
            style={{ width: "100%" }}
          >
            <HStack
              gap={3}
              p={2}
              borderRadius="md"
              w="full"
              bg={isActive("/calendar") ? "#002C4B" : "transparent"}
              _hover={{ bg: "#002C4B" }}
            >
              <Box
                w="20px"
                h="20px"
                border="2px solid white"
                bg={isActive("/calendar") ? "white" : ""}
                borderRadius="sm"
              ></Box>
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="white"
              >
                Calendario
              </Text>
            </HStack>
          </RouterLink>
        </VStack>

        <HStack
          gap={3}
          mt="auto"
          w="full"
          p={2}
          borderRadius="md"
          bg="#001F35"
        >
          <RouterLink
            to="/userConfig"
            style={{ flexGrow: 1, textDecoration: "none", minWidth: 0 }} // Añadir minWidth para que el RouterLink se encoja
          >
            <HStack
              gap={3}
              p={2}
              borderRadius="md"
              _hover={{ bg: "blue.700" }}
              minW="0"
              flexShrink={1}
            >
              <Box
                w="40px"
                h="40px"
                bg="gray.300"
                borderRadius="full"
                flexShrink={0} // Evita que el icono se encoja
              ></Box>
              <Box
                flex="1"
                minW="0"
              >
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="white"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {userEmail} {/* Usar el estado userEmail */}
                </Text>
              </Box>
            </HStack>
          </RouterLink>
          <Image
            src={xIcon}
            alt="Cerrar Sesión"
            boxSize="24px"
            onClick={handleLogout}
            cursor="pointer"
            ml={2}
          />
        </HStack>
      </VStack>
    </Box>
  );
}
