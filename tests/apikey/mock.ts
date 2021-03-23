import ApiKey from '../../src/db/model/ApiKey';

export const API_KEY = 'test_api_key';

jest.unmock('../../src/db/repo/ApiKeyRepo');

export const mockFindApiKey = jest.fn(async (key: string) => {
  if (key == API_KEY) return { key: API_KEY } as ApiKey;
  else return null;
});

jest.mock('../../src/db/repo/ApiKeyRepo', () => ({
  get findByKey() {
    return mockFindApiKey;
  },
}));
