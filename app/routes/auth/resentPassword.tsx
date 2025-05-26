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
import React from "react";

export default function ResentPassword() {
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ email, phoneNumber });
  };

  return (
    <Box display="flex" flexDirection="column" w="full" minH="100vh" bg="gray.50">

      <Flex as="header" w="full" px={8} py={4} align="center" bg="white" boxShadow="sm">
        <Heading as="h1" size="4xl" color="blue.600">
          Task
        </Heading>
        <Spacer />
      </Flex>

      <HStack justify="center" align="center" flexGrow={1} w="full">
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
            <Text fontSize="2em" fontWeight="bold" color="black">RECUPERACION DE CONTRASEÑA</Text>

            <Box textAlign="left">
              <label htmlFor="email" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Recuperar con Correo Electrónico</label>
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
              <label htmlFor="phoneNumber" style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '4px', color: 'black', display: 'block' }}>Recuperar con Numero de telefono</label>
              <Input
                placeholder=""
                type="tel"
                value={phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                borderRadius="md"
                size="lg"
                color="blue.600 !important"
                _placeholder={{ color: "gray.500 !important" }}
              />
            </Box>

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
              RECUPERAR
            </Button>

            <Text fontSize="md" mt={4} mb={0} color="black">
              <RouterLink to="/login">
                <Text as="span" color="blue.500" fontWeight="semibold" _hover={{ textDecoration: 'underline' }}>Recorde mi contraseña</Text>
              </RouterLink>
            </Text>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
}
