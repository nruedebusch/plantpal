import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
import { getUnsplashImage } from "@/utils/unsplash";
import { getRecipes } from "./getRecipes";

export async function GET() {
  try {
    const recipes = await getRecipes();
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (
      !body.title ||
      !body.description ||
      !body.ingredients ||
      !body.instructions
    ) {
      return NextResponse.json(
        { error: "Alle Felder müssen ausgefüllt sein" },
        { status: 400 }
      );
    }

    let imageUrl;
    try {
      imageUrl = await getUnsplashImage(body.title);
    } catch (unsplashError) {
      console.error("Fehler beim Abrufen des Unsplash-Bildes:", unsplashError);
      imageUrl =
        "https://images.unsplash.com/photo-1643094265054-8b17defec1df?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }

    const recipeData = {
      title: body.title,
      description: body.description,
      ingredients: body.ingredients,
      instructions: body.instructions,
      imageUrl,
      isFeatured: false,
    };

    const recipe = await prisma.recipe.create({
      data: recipeData,
    });

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Fehler beim Erstellen des Rezepts:", error);
    return NextResponse.json(
      {
        error: "Fehler beim Erstellen des Rezepts",
        details: error instanceof Error ? error.message : "Unbekannter Fehler",
      },
      { status: 500 }
    );
  }
}
