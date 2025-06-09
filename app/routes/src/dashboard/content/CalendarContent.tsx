import React, { useState } from "react";
import {
  Box,
  Grid,
  Text,
  Button,
  Badge
} from "@chakra-ui/react";
import { useTasks } from "../components/task/TasksContext";
import { Tooltips } from "../../../../components/ui/tooltip";

export default function CalendarContent() {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  const currentDate = new Date();
  const [month, setMonth] = useState(currentDate.getMonth());
  const [year, setYear] = useState(currentDate.getFullYear());
  const currentMonthName = new Date(year, month).toLocaleString("es-ES", { month: "long" });

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [modalTareas, setModalTareas] = useState<string[]>([]);
  const [modalDia, setModalDia] = useState<number | null>(null);

  // Obtener tareas del contexto
  const { tareasPendientes, tareasCompletadas } = useTasks();
  const todasTareas = [...tareasPendientes, ...tareasCompletadas];

  // Generar días del mes
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: adjustedFirstDay }, (_, i) => null);

  // Agrupar tareas por día
  const tareasPorDia: { [key: number]: string[] } = {};
  todasTareas.forEach(t => {
    if (!t.fecha) return;
    const [d, m, y] = t.fecha.split("/");
    const dia = parseInt(d, 10);
    const mes = parseInt(m, 10) - 1;
    const anio = y.length === 2 ? 2000 + parseInt(y, 10) : parseInt(y, 10);
    if (mes === month && anio === year) {
      if (!tareasPorDia[dia]) tareasPorDia[dia] = [];
      tareasPorDia[dia].push(t.tarea);
    }
  });

  // Handler para abrir el modal con las tareas del día
  const handleOpenModal = (day: number) => {
    const tareasDia = tareasPorDia[day] || [];
    if (tareasDia.length > 0) {
      setModalTareas(tareasDia);
      setModalDia(day);
      setIsOpen(true);
    }
  };
  const handleCloseModal = () => setIsOpen(false);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else {
      setMonth(m => m - 1);
    }
  };
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else {
      setMonth(m => m + 1);
    }
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap="24px">
        {/* Header del calendario */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color="black">
            {currentMonthName} {year}
          </Text>
          <Box display="flex" gap="8px">
            <Button colorScheme="blue" variant="outline" onClick={handlePrevMonth} bg="#A0AEC0" color="white" borderRadius="2xl" fontWeight="bold" _hover={{ bg: "#718096" }} _active={{ bg: "#4A5568" }}>
              Anterior
            </Button>
            <Button colorScheme="blue" variant="outline" onClick={handleNextMonth} bg="#A0AEC0" color="white" borderRadius="2xl" fontWeight="bold" _hover={{ bg: "#718096" }} _active={{ bg: "#4A5568" }}>
              Siguiente
            </Button>
          </Box>
        </Box>

        {/* Grid del calendario */}
        <Grid
          templateColumns="repeat(7, 1fr)"
          gap={2}
          bg="gray.100"
          p={4}
          borderRadius="lg"
        >
          {/* Días de la semana */}
          {days.map((day) => (
            <Text
              key={day}
              textAlign="center"
              fontWeight="bold"
              color="black"
              py={2}
            >
              {day}
            </Text>
          ))}

          {/* Días vacíos al inicio */}
          {emptyDays.map((_, index) => (
            <Box key={`empty-${index}`} />
          ))}

          {/* Días del mes */}
          {daysArray.map((day) => {
            const tareasDia = tareasPorDia[day] || [];
            return (
              <Tooltips
                key={day}
                content={tareasDia.length > 0 ? tareasDia.join(", ") : undefined}
                disabled={tareasDia.length === 0}
              >
                <Box
                  bg={
                    (day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear())
                      ? "blue.100"
                      : tareasDia.length > 0
                      ? "yellow.400"
                      : "transparent"
                  }
                  color={tareasDia.length > 0 ? "black" : "black"}
                  p={4}
                  borderRadius="md"
                  textAlign="center"
                  cursor={tareasDia.length > 0 ? "pointer" : "default"}
                  _hover={{ bg: tareasDia.length > 0 ? "yellow.300" : "blue.600" }}
                  fontWeight={tareasDia.length > 0 ? "bold" : "normal"}
                  border={(day === currentDate.getDate() && month === currentDate.getMonth() && year === currentDate.getFullYear()) ? "2px solid #3182ce" : undefined}
                  onClick={() => handleOpenModal(day)}
                >
                  {day}
                  {tareasDia.length > 0 && (
                    <Badge ml={2} colorScheme="yellow">
                      {tareasDia.length}
                    </Badge>
                  )}
                </Box>
              </Tooltips>
            );
          })}
        </Grid>
      </Box>
      {/* Modal propio para mostrar tareas del día */}
      {isOpen && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bg="rgba(0,0,0,0.4)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={2000}
        >
          <Box bg="white" borderRadius="lg" p={8} minW={300} maxW={400} boxShadow="2xl" textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" mb={4} color="black">
              Tareas para el día {modalDia}
            </Text>
            {modalTareas.length > 0 ? (
              <Box mb={4}>
                {modalTareas.map((t, i) => (
                  <Text key={i} mb={2} color="black">{t}</Text>
                ))}
              </Box>
            ) : (
              <Text color="black">No hay tareas para este día.</Text>
            )}
            <Button colorScheme="blue" onClick={handleCloseModal} mt={2} bg="#CBD5E0" color="#222" borderRadius="2xl" fontWeight="bold" _hover={{ bg: "#A0AEC0" }} _active={{ bg: "#718096" }}>
              Cerrar
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
} 