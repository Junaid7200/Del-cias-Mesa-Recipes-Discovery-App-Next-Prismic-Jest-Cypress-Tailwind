import { getRandomRecipeCards } from '../app/lib/GetRecipes';

// Mock fetch globally
global.fetch = jest.fn();

jest.mock('../app/lib/utils', () => ({
  __esModule: true, 
  default: jest.fn((str) => str),
}));

describe('getRandomRecipeCards', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch recipes and format them correctly, creating a subtitle from summary', async () => {
    const mockApiData = {
      recipes: [
        { id: 101, title: 'Test Recipe 1', image: 'image1.jpg', summary: 'This is a test summary' },
      ]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiData,
    });

    const recipes = await getRandomRecipeCards();

    expect(recipes).toHaveLength(1);
    expect(recipes[0].id).toBe(101);
    expect(recipes[0].title).toBe('Test Recipe 1');
    expect(recipes[0].subtitle).toBe('This is a test summary…');
  });

  it('should handle recipes that have no summary', async () => {
    const mockApiData = {
      recipes: [
        { id: 102, title: 'Test Recipe 2', image: 'image2.png' }, // No summary field
      ]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiData,
    });

    const recipes = await getRandomRecipeCards();

    expect(recipes).toHaveLength(1);
    expect(recipes[0].subtitle).toBe('');
  });

  it('should return an empty array if the API call fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    const recipes = await getRandomRecipeCards();

    expect(recipes).toEqual([]);
  });
});