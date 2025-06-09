import {
  Box,
  Flex,
  Heading,
  VStack,
  Text,
  HStack,
  Image,
} from "@chakra-ui/react";
import DashboardContent from "./components/DashboardContent";
import NavModal from "./components/NavModal";

export default function Welcome() {
  return (
    <Flex>
      <NavModal />
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
            Bienvenido
          </Heading>
        </Flex>
        <DashboardContent />
      </Box>
    </Flex>
  );
}
