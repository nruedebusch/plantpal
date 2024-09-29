import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Image,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { getRecipes } from "@/app/api/recipes/getRecipes";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const { featured, user } = await getRecipes();
  const allRecipes = [...featured, ...user];
  const recipe = allRecipes.find((r) => r.id === parseInt(params.id, 10));

  if (!recipe) {
    return <Box>Rezept nicht gefunden</Box>;
  }

  return (
    <Box bg="gray .50" minH="100vh" py={12}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
          <GridItem>
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              borderRadius="lg"
              objectFit="cover"
              w="full"
              h={{ base: "200px", md: "300px" }}
            />
          </GridItem>
          <GridItem>
            <VStack align="start" spacing={4}>
              <Heading as="h1" size="2xl">
                {recipe.title}
              </Heading>
              <Text fontSize="xl" color="gray.600">
                {recipe.description}
              </Text>
            </VStack>
          </GridItem>
        </Grid>

        <Divider my={8} borderColor="gray.200" />

        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={8}>
          <GridItem>
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              border="1px"
              borderColor="gray.200"
            >
              <Heading as="h2" size="lg" mb={4}>
                Zutaten
              </Heading>
              <UnorderedList spacing={2}>
                {recipe.ingredients.map((ingredient, index) => (
                  <ListItem key={index}>{ingredient}</ListItem>
                ))}
              </UnorderedList>
            </Box>
          </GridItem>
          <GridItem>
            <Box
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              border="1px"
              borderColor="gray.200"
            >
              <Heading as="h2" size="lg" mb={4}>
                Anleitung
              </Heading>
              <UnorderedList spacing={4}>
                {recipe.instructions.map((instruction, index) => (
                  <ListItem key={index}>
                    <Text fontWeight="bold" mb={1}>
                      Schritt {index + 1}
                    </Text>
                    {instruction}
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
