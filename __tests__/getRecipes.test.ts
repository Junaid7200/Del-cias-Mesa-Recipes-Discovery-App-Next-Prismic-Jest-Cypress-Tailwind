import { getRandomRecipeCards } from '../app/lib/GetRecipes';
import axios from 'axios';

// Mock the axios library
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the stripHtml utility. We'll just make it return the input string for this test.
jest.mock('../app/lib/utils', () => ({
  __esModule: true, // This is needed for ES modules
  default: jest.fn((str) => str),
}));

describe('getRandomRecipeCards', () => {
  
  // Clear mock history before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch recipes and format them correctly, creating a subtitle from summary', async () => {
    // 1. Arrange
    const mockApiData = {
      recipes: [
        { id: 101, title: 'Test Recipe 1', image: 'image1.jpg', summary: 'This is a test summary' },
      ]
    };
    mockedAxios.get.mockResolvedValue({ data: mockApiData });

    // 2. Act
    const recipes = await getRandomRecipeCards();

    // 3. Assert
    expect(recipes).toHaveLength(1);
    expect(recipes[0].id).toBe(101);
    expect(recipes[0].title).toBe('Test Recipe 1');
    // Check that the subtitle is created correctly from the summary
    expect(recipes[0].subtitle).toBe('This is a test summary…');
  });

  it('should handle recipes that have no summary', async () => {
    // 1. Arrange
    const mockApiData = {
      recipes: [
        { id: 102, title: 'Test Recipe 2', image: 'image2.png' }, // No summary field
      ]
    };
    mockedAxios.get.mockResolvedValue({ data: mockApiData });

    // 2. Act
    const recipes = await getRandomRecipeCards();

    // 3. Assert
    expect(recipes).toHaveLength(1);
    // Check that the subtitle is an empty string with no ellipsis
    expect(recipes[0].subtitle).toBe('');
  });

  it('should return an empty array if the API call fails', async () => {
    // Arrange
    mockedAxios.get.mockRejectedValue(new Error('API Error'));

    // Act
    const recipes = await getRandomRecipeCards();

    // Assert
    expect(recipes).toEqual([]);
  });
});