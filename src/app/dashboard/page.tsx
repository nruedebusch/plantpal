"use client";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Main from "../components/Main";
import { Recipe } from "@/types/recipe";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Dashboard() {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/api/recipes");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const { featured, user } = await response.json();
        setFeaturedRecipes(featured);
        setUserRecipes(user);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <ProtectedRoute>
      <Box>
        <DashboardHeader />
        <Main recipes={featuredRecipes} userRecipes={userRecipes} />
      </Box>
    </ProtectedRoute>
  );
}
