import { getRecipeById } from '../app/lib/GetRecipeById';
import axios from 'axios';
import type { RecipeDetail } from '@/app/types/RecipeDetail';

// Mock the axios library
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getRecipeById', () => {
  
  it('should fetch and return the details for a single recipe', async () => {
    // 1. Arrange: Set up the mock data for a detailed recipe
    const mockApiData: RecipeDetail = {
      id: 716429,
      title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
      image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
      summary: 'A delicious pasta dish.',
      readyInMinutes: 45,
      servings: 2,
      // FIX: This now matches your type definition for ingredients
      extendedIngredients: [{ 
        original: '1 lb pasta',
        amount: 1,
        unit: 'lb',
        name: 'pasta'
      }],
      // FIX: This now matches your type definition for instructions
      analyzedInstructions: [
        {
          steps: [{ number: 1, step: 'Cook the pasta.' }],
        },
      ],
    };
    // Tell our mocked axios to return our fake data
    mockedAxios.get.mockResolvedValue({ data: mockApiData });

    // 2. Act: Call the function we are testing
    const recipe = await getRecipeById(716429);

    // 3. Assert: Check if the result is what we expect
    expect(recipe).not.toBeNull(); // Ensure it's not null
    expect(recipe?.id).toBe(716429);
    expect(recipe?.title).toBe('Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs');
    expect(recipe?.extendedIngredients).toHaveLength(1);
  });

  it('should return null if the API call fails', async () => {
    // Arrange: Tell axios to simulate an error
    mockedAxios.get.mockRejectedValue(new Error('API Error'));

    // Act: Call the function
    const recipe = await getRecipeById(999999); // Use a non-existent ID

    // Assert: Check that the function returns null as designed
    expect(recipe).toBeNull();
  });
});