"use client";
import { Box, Flex, Button, Text, Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <Container maxW="container.xl">
      <Flex
        as="header"
        align="center"
        justify="space-between"
        wrap="wrap"
        py={4}
        bg="white"
        color="gray.600"
      >
        <Flex align="center" mr={5}>
          <Text fontWeight="extrabold" fontSize="xl" color="gray.800">
            PlantPal
          </Text>
        </Flex>

        <Box>
          <Button variant="ghost" mr={3} onClick={() => router.push("/login")}>
            Login
          </Button>
          <Button
            colorScheme="brand"
            bg="green.600"
            _hover={{ bg: "green.500" }}
            onClick={() => router.push("/register")}
          >
            Sign Up
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;
