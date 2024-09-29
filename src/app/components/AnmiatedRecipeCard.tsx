"use client";
import { Box, Text, VStack, Image } from "@chakra-ui/react";
import { Recipe } from "../../types/recipe";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <Box
      as="a"
      href={`/recipes/${recipe.id}`}
      onClick={handleClick}
      maxW="sm"
      borderRadius="lg"
      overflow="hidden"
      shadow="sm"
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
      transition="all 0.2s"
      bg="white"
    >
      <Image
        src={recipe.imageUrl}
        alt={recipe.title}
        height="200px"
        width="100%"
        objectFit="cover"
      />
      <VStack p={4} align="start">
        <Text fontWeight="bold" fontSize="xl" color="green.600">
          {recipe.title}
        </Text>
        <Text noOfLines={2}>{recipe.description}</Text>
      </VStack>
    </Box>
  );
};

export default RecipeCard;
