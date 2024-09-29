import prisma from "@/utils/prisma";
import { Recipe } from "@/types/recipe";

export async function getRecipes(): Promise<{
  featured: Recipe[];
  user: Recipe[];
}> {
  try {
    const featuredRecipes = await prisma.recipe.findMany({
      where: { isFeatured: true },
      orderBy: { id: "desc" },
    });

    const userRecipes = await prisma.recipe.findMany({
      where: { isFeatured: false },
      orderBy: { id: "desc" },
    });

    return {
      featured: featuredRecipes as Recipe[],
      user: userRecipes as Recipe[],
    };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}
