"use client";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { barlowElastic } from "../fonts/fonts";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewHero: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
    router.push("/register");
  };
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems={{ base: "center", lg: "start" }}
      justifyContent="center"
      px={4}
      bg="green.50"
    >
      <Container maxW="70ch">
        <VStack textAlign="center" spacing={8} py={0}>
          <Text
            as="h1"
            fontSize={{
              base: "7xl",
              sm: "8xl",
              md: "10rem",
              lg: "14rem",
              xl: "18rem",
              "2xl": "22rem",
            }}
            className={barlowElastic.className}
            color="purple.700"
          >
            Plantpal
          </Text>
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            color="purple.700"
            maxW="4xl"
          >
            Finde köstliche vegane Rezepte und entdecke den pflanzlichen
            Lebensstil. Die ideale App für einfaches, nährstoffreiches und
            umweltfreundliches Kochen.
          </Text>
          <Button
            bg="purple.700"
            color={"white"}
            size="lg"
            fontSize="xl"
            fontWeight="bold"
            borderRadius="full"
            px={8}
            _hover={{ bg: "purple.600" }}
            onClick={handleStart}
            isLoading={isLoading}
          >
            Jetzt Starten
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default NewHero;
