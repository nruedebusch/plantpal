import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || "",
});

export async function getUnsplashImage(query: string): Promise<string> {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage: 1,
      orientation: undefined,
    });

    if (result.response?.results[0]) {
      return result.response.results[0].urls.regular;
    }

    throw new Error("Kein Bild gefunden");
  } catch (error) {
    console.error("Fehler beim Abrufen des Unsplash-Bildes:", error);
    return "https://via.placeholder.com/400x300?text=Kein+Bild+gefunden";
  }
}
