import { getSimilarRecipes } from '../app/lib/SimilarRecipes';
import type { SimilarRecipe } from '@/app/types/SimilarRecipe';

global.fetch = jest.fn();

describe('getSimilarRecipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should fetch similar recipes and format them correctly', async () => {
    const mockApiData: SimilarRecipe[] = [
      { id: 101, title: 'Test Recipe 1', imageType: 'jpg', readyInMinutes: 30 },
      { id: 102, title: 'Test Recipe 2', imageType: 'png', readyInMinutes: 45 },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiData,
    });

    const recipes = await getSimilarRecipes(123);

    expect(recipes).toHaveLength(2); 
    expect(recipes[0].id).toBe(101);
    expect(recipes[0].title).toBe('Test Recipe 1');
    expect(recipes[0].image).toBe('https://img.spoonacular.com/recipes/101-556x370.jpg');
    expect(recipes[0].subtitle).toBe('Ready in 30 minutes.');
  });

  it('should return an empty array if the API call fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const recipes = await getSimilarRecipes(123);

    expect(recipes).toEqual([]);
  });
});