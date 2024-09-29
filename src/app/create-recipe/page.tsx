"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  useToast,
  Container,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { barlowElastic } from "../fonts/fonts";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import ProtectedRoute from "../components/ProtectedRoute";

const recipeSchema = z.object({
  title: z.string().min(1, "Titel ist erforderlich"),
  description: z.string().min(1, "Beschreibung ist erforderlich"),
  ingredients: z.string().min(1, "Zutaten sind erforderlich"),
  instructions: z.string().min(1, "Anleitung ist erforderlich"),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

export default function CreateRecipe() {
  const router = useRouter();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
  });

  const onSubmit: SubmitHandler<RecipeFormData> = async (data) => {
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          ingredients: data.ingredients.split("\n"),
          instructions: data.instructions.split("\n"),
        }),
      });

      if (!response.ok) {
        throw new Error("Fehler beim Erstellen des Rezepts");
      }

      toast({
        title: "Rezept erstellt",
        description: "Ihr Rezept wurde erfolgreich erstellt.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Fehler beim Erstellen des Rezepts:", error);
      toast({
        title: "Fehler",
        description: "Beim Erstellen des Rezepts ist ein Fehler aufgetreten.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <ProtectedRoute>
      <Box
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="green.50"
        position="relative"
        overflow="hidden"
      >
        <Container maxWidth="lg" centerContent position="relative" zIndex={1}>
          <Box
            width="100%"
            maxWidth="500px"
            padding={{ base: "20px", md: "40px" }}
            borderRadius="md"
            boxShadow="md"
            bg="white"
          >
            <Heading
              as="h1"
              size="xl"
              textAlign="center"
              mb={6}
              color="gray.800"
            >
              Neues Rezept erstellen
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel color="gray.600">
                    Titel
                    <Tooltip
                      label="Der Titel wird verwendet, um ein passendes Rezeptbild zu generieren. Einfache Titel funktionieren am besten."
                      aria-label="Titel-Tooltip"
                      hasArrow
                    >
                      <InfoOutlineIcon ml={2} color="gray.500" />
                    </Tooltip>
                  </FormLabel>
                  <Input {...register("title")} bg="white" color="gray.800" />
                  <Text color="red.500" fontSize="sm">
                    {errors.title?.message}
                  </Text>
                </FormControl>
                <FormControl isInvalid={!!errors.description}>
                  <FormLabel color="gray.600">Beschreibung</FormLabel>
                  <Textarea
                    {...register("description")}
                    bg="white"
                    color="gray.800"
                  />
                  <Text color="red.500" fontSize="sm">
                    {errors.description?.message}
                  </Text>
                </FormControl>
                <FormControl isInvalid={!!errors.ingredients}>
                  <FormLabel color="gray.600">
                    Zutaten (eine pro Zeile)
                  </FormLabel>
                  <Textarea
                    {...register("ingredients")}
                    bg="white"
                    color="gray.800"
                  />
                  <Text color="red.500" fontSize="sm">
                    {errors.ingredients?.message}
                  </Text>
                </FormControl>
                <FormControl isInvalid={!!errors.instructions}>
                  <FormLabel color="gray.600">
                    Anleitung (ein Schritt pro Zeile)
                  </FormLabel>
                  <Textarea
                    {...register("instructions")}
                    bg="white"
                    color="gray.800"
                  />
                  <Text color="red.500" fontSize="sm">
                    {errors.instructions?.message}
                  </Text>
                </FormControl>
                <Button
                  type="submit"
                  bg="purple.600"
                  width="full"
                  color="white"
                  _hover={{ bg: "purple.500" }}
                >
                  Rezept erstellen
                </Button>
              </VStack>
            </form>
          </Box>
        </Container>
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
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          opacity={0.1}
          zIndex={0}
        >
          Plantpal
        </Text>
      </Box>
    </ProtectedRoute>
  );
}
