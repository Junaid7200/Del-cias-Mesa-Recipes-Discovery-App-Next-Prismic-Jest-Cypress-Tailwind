import "server-only";
import type { RecipeDetail } from "@/app/types/RecipeDetail";
import { BASE, HOST } from "@/app/lib/utils";


export async function getRecipeById(id: number): Promise<RecipeDetail | null> {
  try {
    const response = await fetch(
      `${BASE}/recipes/${id}/information`,
      {
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host": HOST,
        },
        next: { revalidate: 172800 }, // Cache results for one hour
      }
    );
    
    const data: RecipeDetail = await response.json();
    
    return data;
  } catch (error) {
    return null;
  }
}