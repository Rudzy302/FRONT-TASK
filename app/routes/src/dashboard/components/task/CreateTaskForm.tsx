import React, { useState } from "react";
import { Box, Button, Input, Textarea, VStack, Flex, Text } from "@chakra-ui/react";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Tarea {
  nombre: string;
  rol: string;
  descripcion: string;
  fecha: string;
  proyecto?: string;
}

interface CreateTaskFormProps {
  proyecto?: string;
  proyectos?: string[];
  onClose: () => void;
  onCrearTarea: (tarea: Tarea) => void;
}

export default function CreateTaskForm({ proyecto, proyectos, onClose, onCrearTarea }: CreateTaskFormProps) {
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState<Date | null>(null);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(
    proyectos ? "" : (proyecto || "")
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !descripcion || !fecha) return;
    const nuevaTarea: Tarea = {
      nombre,
      rol,
      descripcion,
      fecha: fecha.toLocaleDateString(),
      proyecto: proyectoSeleccionado
    };
    onCrearTarea(nuevaTarea);
    onClose();
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      {proyectos && (
        <>
          <Text fontWeight="bold" fontSize="2xl" mb={1} color="black">Proyecto</Text>
          <select
            value={proyectoSeleccionado}
            onChange={e => setProyectoSeleccionado(e.target.value)}
            aria-label="Seleccionar proyecto"
            style={{ marginBottom: 16, padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: 18, color: 'black' }}
            required
          >
            <option value="" disabled style={{ color: '#888' }}>Selecciona el proyecto</option>
            {proyectos.map((p, i) => (
              <option key={i} value={p} style={{ color: 'black' }}>{p}</option>
            ))}
          </select>
        </>
      )}
      <Text fontWeight="bold" fontSize="2xl" mb={1} color="black">Nombre de la Tarea</Text>
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
      <Text fontWeight="bold" fontSize="2xl" mb={1} color="black">Rol</Text>
      <Input
        placeholder=""
        value={rol}
        onChange={e => setRol(e.target.value)}
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
            <FaCalendarAlt color="black" style={{ marginLeft: 8 }} />
          </Box>
        }
      />
      <Flex flexDir="column" gap={2} mt={4}>
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
          type="submit"
          disabled={!nombre || !descripcion || !fecha}
        >
          <FaCheckCircle color="white" style={{ marginRight: 8 }} />
          Crear Tarea
        </Button>
        <Button 
          onClick={onClose} 
          bg="#CBD5E0"
          color="#222"
          mt={2} 
          w="full"
          borderRadius="2xl"
          fontWeight="bold"
          _hover={{ bg: "#A0AEC0" }}
          _active={{ bg: "#718096" }}
        >Cerrar</Button>
      </Flex>
    </Box>
  );
} 