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
import React, { useEffect } from "react";
import TasksContent from "./components/task/TasksContent";
import NavModal from "./components/NavModal";

export default function TaskPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Eliminar el token al cerrar sesión
    navigate("/"); // Redirige a la ruta raíz (http://localhost:5173)
  };

  const isActive = (path: string) => location.pathname === path;

  return (
     <Flex>
      <NavModal/>
      <Box
        flex="1"
        p={8}
        bg="#E6E6E6"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          mb={8}
        >
          <Heading
            as="h2"
            size="2xl"
            color="black"
          >

            Mis Tareas
          </Heading>
        </Flex>
        <TasksContent />
      </Box>
    </Flex>
  );
}
