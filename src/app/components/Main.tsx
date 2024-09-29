import { VStack, Heading, SimpleGrid, Box, Container } from "@chakra-ui/react";
import RecipeCard from "./AnmiatedRecipeCard";
import { Recipe } from "@/types/recipe";

interface MainProps {
  recipes: Recipe[];
  userRecipes: Recipe[];
}

export default function Main({ recipes, userRecipes }: MainProps) {
  return (
    <Box as="main" bgGradient="linear(to-b, green.50, green.100)">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={12} as="section" mt={8}>
          <Box width="full">
            <Heading
              as="h2"
              size="xl"
              color="purple.600"
              fontWeight="extrabold"
              mb={6}
            >
              Ausgewählte Rezepte
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              width="full"
            >
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </SimpleGrid>
          </Box>

          <Box width="full">
            <Heading
              as="h2"
              size="xl"
              color="purple.600"
              fontWeight="extrabold"
              mb={6}
            >
              Community-Rezepte
            </Heading>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              width="full"
            >
              {userRecipes.slice(0, 6).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
