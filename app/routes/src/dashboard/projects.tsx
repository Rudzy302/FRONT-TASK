import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Image,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import xIcon from "../assets/x.png";
import ProjectComponent from "./components/project/projectComponent";
import NavModal from "./components/NavModal";
import type { Proyecto } from "./interface/Proyecto";
import { proyectos } from "./proyectosData";
import ProjectsContent from "./content/ProjectsContent";

export default function ProjectsPage() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [_, forceUpdate] = useState(0);

  const navItems = [
    { path: "/welcome", label: "Inicio" },
    { path: "/tasks", label: "Mis Tareas" },
    { path: "/projects", label: "Proyectos" },
    { path: "/calendar", label: "Calendario" },
  ];

  const handleLogout = () => {
    // Implementar lógica de cierre de sesión
    console.log("Logout clicked");
  };

  const handleAgregarProyecto = (nuevoProyecto: Proyecto) => {
    proyectos.push(nuevoProyecto);
    forceUpdate(n => n + 1);
  };

  return (
    <Flex w="full" h="full">
      <NavModal/>

      <Box
        flex="1"
        p={{ base: 4, md: 8 }}
        bg="#E6E6E6"
        minH="100vh"
        overflowX="auto"
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
            Proyectos
          </Heading>
        </Flex>
        <Box mt={8}>
          <ProjectsContent onAgregarProyecto={handleAgregarProyecto} modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <ProjectComponent proyectos={proyectos} />
        </Box>
      </Box>
    </Flex>
  );
}
