"use client";
import { Box, Flex, Button, Text, Container } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { barlowElastic } from "../fonts/fonts";

const DashboardHeader = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
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
            <Button variant="ghost" mr={3} onClick={handleLogout}>
              Logout
            </Button>
            <Button
              colorScheme="brand"
              bg="purple.600"
              _hover={{ bg: "purple.500" }}
              onClick={() => router.push("/create-recipe")}
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
