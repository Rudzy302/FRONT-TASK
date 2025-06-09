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

import CalendarContent from "./content/CalendarContent";
import NavModal from "./components/NavModal";

export default function CalendarPage() {
 

  return (
    <Flex >
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
            Calendario
          </Heading>
        </Flex>
        <CalendarContent />
      </Box>
    </Flex>
  );
}
