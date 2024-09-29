"use client";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

const HeroSection: NextPage = () => {
  const router = useRouter();
  return (
    <Box
      as="section"
      bg="gray.50"
      overflow="hidden"
      position="relative"
      zIndex={1}
    >
      <Container maxW="container.xl" py={{ base: "4.25rem" }} px={4}>
        <HStack
          spacing={12}
          flexDirection={{ base: "column", lg: "row" }}
          alignItems="center"
        >
          <VStack
            spacing={4}
            alignItems={{ base: "center", lg: "flex-start" }}
            textAlign={{ base: "center", lg: "left" }}
            maxW="39.375rem"
            order={{ base: 1, lg: 2 }}
          >
            <Heading
              as="h1"
              fontSize={{ base: "2.4375rem", md: "3.8125rem" }}
              fontWeight={900}
              lineHeight="1.2"
              maxW="23ch"
            >
              Deine kulinarische Reise beginnt hier
            </Heading>
            <Text fontSize={{ base: "1rem", md: "1.25rem" }} maxW="33.1875rem">
              Tauche ein in eine Welt voller Geschmack und Kreativität. Entdecke
              inspirierende Rezepte oder teile deine eigenen kulinarischen
              Meisterwerke mit einer leidenschaftlichen Community von
              Hobbyköchen und Feinschmeckern.
            </Text>
            <Button
              size="lg"
              borderRadius="0.25rem"
              color="white"
              bg="green.600"
              _hover={{ bg: "green.500" }}
              onClick={() => router.push("/register")}
            >
              Rezepte entdecken
            </Button>
          </VStack>
          <Box
            maxW="35.625rem"
            h={{ base: "25rem", md: "44.5rem" }}
            borderRadius="0 6.25rem 0 6.25rem"
            boxShadow="0px 4px 60px rgba(0, 0, 0, 0.16)"
            overflow="hidden"
            order={{ base: 2, lg: 1 }}
          >
            <Image
              src="https://images.pexels.com/photos/3622643/pexels-photo-3622643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="HeroImg"
              objectFit="cover"
              objectPosition="top"
              w="100%"
              h="100%"
            />
          </Box>
        </HStack>
      </Container>
      <Box
        as="svg"
        viewBox="0 0 1920 179"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        position="absolute"
        left="50%"
        bottom="-1px"
        transform={{
          base: "translateX(-50%)",
          lg: "translateX(-50%) scaleX(-1)",
        }}
        w={{ base: "320%", lg: "100%" }}
        zIndex={-1}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1920 179V91.3463C1835.33 91.3463 1715.47 76.615 1549.2 32.9521C1299.48 -32.3214 1132.77 12.1006 947.32 61.5167C810.762 97.9044 664.042 137 466.533 137C331.607 137 256.468 123.447 188.082 111.113C130.974 100.812 78.5746 91.3609 0 91.3609V179H1920Z"
          fill="white"
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
