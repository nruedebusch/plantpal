"use client";
import { Box, Flex, Button, Text, Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { barlowElastic } from "../fonts/fonts";
import { useState } from "react";

const DashboardHeader = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleCreateRecipe = () => {
    setIsLoading(true);
    router.push("/create-recipe");
  };

  return (
    <Box bg="green.50">
      <Container maxW="container.xl">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          wrap="wrap"
          py={4}
          color="purple.700"
        >
          <Flex align="center" mr={5}>
            <Text
              fontSize="3xl"
              color="purple.600"
              className={barlowElastic.className}
            >
              Plantpal
            </Text>
          </Flex>

          <Box>
            <Button
              variant="ghost"
              mr={3}
              onClick={handleLogout}
              isLoading={isLoading}
            >
              Logout
            </Button>
            <Button
              colorScheme="brand"
              bg="purple.600"
              _hover={{ bg: "purple.500" }}
              onClick={handleCreateRecipe}
              isLoading={isLoading}
            >
              Rezept erstellen
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default DashboardHeader;
