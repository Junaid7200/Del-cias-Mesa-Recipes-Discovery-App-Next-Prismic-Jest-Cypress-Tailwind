import { getRecipeById } from '../app/lib/GetRecipeById';
import type { RecipeDetail } from '@/app/types/RecipeDetail';

global.fetch = jest.fn();

describe('getRecipeById', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should fetch and return the details for a single recipe', async () => {
    const mockApiData: RecipeDetail = {
      id: 716429,
      title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
      image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
      summary: 'A delicious pasta dish.',
      readyInMinutes: 45,
      servings: 2,
      extendedIngredients: [{ 
        original: '1 lb pasta',
        amount: 1,
        unit: 'lb',
        name: 'pasta'
      }],
      analyzedInstructions: [
        {
          steps: [{ number: 1, step: 'Cook the pasta.' }],
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiData,
    });

    const recipe = await getRecipeById(716429);

    expect(recipe).not.toBeNull();
    expect(recipe?.id).toBe(716429);
    expect(recipe?.title).toBe('Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs');
    expect(recipe?.extendedIngredients).toHaveLength(1);
  });

  it('should return null if the API call fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const recipe = await getRecipeById(999999);

    expect(recipe).toBeNull();
  });
});