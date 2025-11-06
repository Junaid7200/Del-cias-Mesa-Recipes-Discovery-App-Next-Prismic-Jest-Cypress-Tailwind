import { searchRecipes } from '../app/lib/SearchRecipesPaginated';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../app/lib/utils', () => ({
  __esModule: true,
  default: jest.fn((str) => str),
}));

describe('searchRecipes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch search results and format them correctly', async () => {
    // Arrange
    const mockApiData = {
      results: [
        { id: 201, title: 'Pizza', image: 'pizza.jpg', summary: 'A pizza summary' },
      ],
      totalResults: 1,
    };
    mockedAxios.get.mockResolvedValue({ data: mockApiData });

    // Act
    const result = await searchRecipes('pizza', 1);

    // Assert
    expect(result.results).toHaveLength(1);
    expect(result.totalResults).toBe(1);
    expect(result.results[0].title).toBe('Pizza');
    expect(result.results[0].subtitle).toBe('A pizza summary');
  });

  it('should return an empty state if the query is empty', async () => {
    // Act
    const result = await searchRecipes('');

    // Assert
    expect(result.results).toEqual([]);
    expect(result.totalResults).toBe(0);
    // Ensure axios was NOT called
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('should return an empty state if the API call fails', async () => {
    // Arrange
    mockedAxios.get.mockRejectedValue(new Error('API Error'));

    // Act
    const result = await searchRecipes('error-query', 1);

    // Assert
    expect(result.results).toEqual([]);
    expect(result.totalResults).toBe(0);
  });
});