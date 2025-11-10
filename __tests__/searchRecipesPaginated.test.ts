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
    
    const mockApiData = {
      results: [
        { id: 201, title: 'Pizza', image: 'pizza.jpg', summary: 'A pizza summary' },
      ],
      totalResults: 1,
    };
    mockedAxios.get.mockResolvedValue({ data: mockApiData });

    const result = await searchRecipes('pizza', 1);

    expect(result.results).toHaveLength(1);
    expect(result.totalResults).toBe(1);
    expect(result.results[0].title).toBe('Pizza');
    expect(result.results[0].subtitle).toBe('A pizza summary');
  });

  it('should return an empty state if the query is empty', async () => {
    const result = await searchRecipes('');

    expect(result.results).toEqual([]);
    expect(result.totalResults).toBe(0);
    expect(mockedAxios.get).not.toHaveBeenCalled();
  });

  it('should return an empty state if the API call fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('API Error'));

    const result = await searchRecipes('error-query', 1);

    expect(result.results).toEqual([]);
    expect(result.totalResults).toBe(0);
  });
});