import { getSimilarRecipes } from '../app/lib/SimilarRecipes';
import axios from 'axios';
import type { SimilarRecipe } from '@/app/types/SimilarRecipe';

// This tells Jest to "mock" the axios library.
// Instead of making a real network request, it will let us provide a fake response.
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// 'describe' groups related tests together.
describe('getSimilarRecipes', () => {
  
  // 'it' defines an individual test case.
  // The string describes what the test should do.
  it('should fetch similar recipes and format them correctly', async () => {
    // 1. Arrange: Set up the test data
    const mockApiData: SimilarRecipe[] = [
      { id: 101, title: 'Test Recipe 1', imageType: 'jpg', readyInMinutes: 30 },
      { id: 102, title: 'Test Recipe 2', imageType: 'png', readyInMinutes: 45 },
    ];

    // Tell our mocked axios to return our fake data when 'get' is called
    mockedAxios.get.mockResolvedValue({ data: mockApiData });

    // 2. Act: Call the function we are testing
    const recipes = await getSimilarRecipes(123);

    // 3. Assert: Check if the result is what we expect
    expect(recipes).toHaveLength(2); // We expect 2 recipes back
    expect(recipes[0].id).toBe(101);
    expect(recipes[0].title).toBe('Test Recipe 1');
    expect(recipes[0].image).toBe('https://img.spoonacular.com/recipes/101-556x370.jpg');
    expect(recipes[0].subtitle).toBe('Ready in 30 minutes.');
  });

  it('should return an empty array if the API call fails', async () => {
    // Arrange: Tell axios to simulate an error
    mockedAxios.get.mockRejectedValue(new Error('API Error'));

    // Act: Call the function
    const recipes = await getSimilarRecipes(123);

    // Assert: Check for an empty array
    expect(recipes).toEqual([]);
  });
});