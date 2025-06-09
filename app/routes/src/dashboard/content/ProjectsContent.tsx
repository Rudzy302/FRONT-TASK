import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Input,
  Textarea,
  Icon,
  HStack
} from "@chakra-ui/react";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Proyecto } from "../interface/Proyecto";

interface ProjectsContentProps {
  onAgregarProyecto: (proyecto: Proyecto) => void;
  modalOpen?: boolean;
  setModalOpen?: (open: boolean) => void;
}

export default function ProjectsContent({ onAgregarProyecto, modalOpen: modalOpenProp, setModalOpen: setModalOpenProp }: ProjectsContentProps) {
  const [modalOpenState, setModalOpenState] = useState(false);
  const modalOpen = modalOpenProp !== undefined ? modalOpenProp : modalOpenState;
  const setModalOpen = setModalOpenProp || setModalOpenState;
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState<Date | null>(null);

  const handleCrearProyecto = () => {
    if (!nombre || !descripcion || !fecha) return;
    const nuevoProyecto: Proyecto = {
      nombre,
      estado: "Activo",
      estadoColor: "green.100",
      tareas: "0 tareas pendientes",
      progreso: 0,
      fecha: fecha.toLocaleDateString(),
      barraColor: "green.400"
    };
    onAgregarProyecto(nuevoProyecto);
    setModalOpen(false);
    setNombre("");
    setDescripcion("");
    setFecha(null);
  };

  return (
    <Box>
      <Flex justify="flex-end" mb={6}>
        <Button
          bg="#A0AEC0"
          color="white"
          fontWeight="bold"
          fontSize="lg"
          borderRadius="2xl"
          px={8}
          py={4}
          boxShadow="md"
          _hover={{ bg: "#718096", boxShadow: "lg" }}
          _active={{ bg: "#4A5568" }}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <FaCheckCircle color="white" style={{ marginRight: 8 }} />
          Nuevo Proyecto
        </Button>
      </Flex>
      {/* Modal personalizado */}
      {modalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div style={{ background: "white", borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 400, boxShadow: "0 4px 24px rgba(0,0,0,0.2)" }}>
            <Box textAlign="center" mb={4} fontWeight="bold" fontSize="xl" bg="#0D1B24" color="white" borderRadius="md" p={2}>
              CREA TU PROYECTO
            </Box>
            <Box>
              <Text fontWeight="bold" fontSize="2xl" mb={1} color="black">Nombre del Proyecto</Text>
              <Input
                placeholder=""
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                mb={4}
                size="lg"
                fontWeight="bold"
                fontSize="xl"
                bg="white"
                border="1px solid"
                borderColor="black"
                borderRadius="md"
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                color="black"
                _placeholder={{ color: "gray.400" }}
              />
              <Text fontWeight="bold" fontSize="2xl" mb={1} color="black">Descripcion</Text>
              <Textarea
                placeholder=""
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                mb={4}
                size="lg"
                fontWeight="bold"
                fontSize="xl"
                bg="white"
                border="1px solid"
                borderColor="black"
                borderRadius="md"
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.400", boxShadow: "0 0 0 1px #3182ce" }}
                resize="vertical"
                color="black"
                _placeholder={{ color: "gray.400" }}
              />
              <Text fontWeight="bold" fontSize="2xl" mb={1} color="black">Fecha</Text>
              <DatePicker
                selected={fecha}
                onChange={date => setFecha(date)}
                dateFormat="dd/MM/yy"
                customInput={
                  <Box
                    bg="white"
                    mb={2}
                    border="1px solid"
                    borderColor="black"
                    borderRadius="md"
                    p="10px"
                    fontWeight="bold"
                    fontSize="xl"
                    color="black"
                    cursor="pointer"
                    _hover={{ bg: "gray.50" }}
                    userSelect="none"
                    w="100%"
                    textAlign="left"
                    minH="40px"
                    display="flex"
                    alignItems="center"
                  >
                    {fecha ? fecha.toLocaleDateString() : "Seleccionar fecha"}
                    <FaCalendarAlt color="black" style={{ marginLeft: 4 }} />
      
                  </Box>
                }
              />

              <Flex flexDir="column" gap={2}>
                <Button 
                  w="full" 
                  bg="#A0AEC0"
                  color="white"
                  fontWeight="bold"
                  fontSize="lg"
                  mb={2}
                  borderRadius="2xl"
                  _hover={{ bg: "#718096" }}
                  _active={{ bg: "#4A5568" }}
                  onClick={handleCrearProyecto}
                  disabled={!nombre || !descripcion || !fecha}
                >
                  <FaCheckCircle color="white" style={{ marginRight: 8 }} />
                  Crear Proyecto
                </Button>
                <Button 
                  onClick={() => setModalOpen(false)} 
                  bg="#CBD5E0"
                  color="#222"
                  mt={2} 
                  w="full"
                  borderRadius="2xl"
                  fontWeight="bold"
                  _hover={{ bg: "#A0AEC0" }}
                  _active={{ bg: "#718096" }}
                  px={6}
                  py={4}
                >Cerrar</Button>
              </Flex>
            </Box>
          </div>
        </div>
      )}
    </Box>
  );
}