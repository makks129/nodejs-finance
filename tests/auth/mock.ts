import { API_KEY } from '../apikey/mock';
import { User } from '../../src/db/model/User';
import { Types } from 'mongoose';

jest.unmock('../../src/db/repo/UserRepo');
jest.unmock('../../src/auth/JWT');

export const ACCESS_TOKEN = 'test_access_token';
export const USER_ID = new Types.ObjectId(); // random id with object id format

export const mockUserFindById = jest.fn(async (id: Types.ObjectId) => {
  if (USER_ID.equals(id)) return { _id: new Types.ObjectId(id) } as User;
  else return null;
});

export const mockCreateToken = jest.fn(async () => {
   return "token";
});


jest.mock('../../src/db/repo/UserRepo', () => ({
  get findById() {
    return mockUserFindById;
  },
}));

jest.mock('../../src/auth/JWT', () => ({
  get createToken() {
    return mockCreateToken;
  },
}));

export const addHeaders = (request: any) =>
  request.set('Content-Type', 'application/json').set('x-api-key', API_KEY).timeout(2000);

export const addAuthHeaders = (request: any, accessToken = ACCESS_TOKEN) =>
  request
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${accessToken}`)
    .set('x-api-key', API_KEY)
    .timeout(2000);
