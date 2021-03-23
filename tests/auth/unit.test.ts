import {
  ACCESS_TOKEN,
  addHeaders,
  addAuthHeaders,
  mockUserFindById,
  mockCreateToken,
} from './mock';

import app from '../../src/app';
import supertest from 'supertest';

describe('authentication validation', () => {
  const endpoint = '/v0/portfolio';
  const request = supertest(app);

  beforeEach(() => {
    mockUserFindById.mockClear();
    // mockCreateToken.mockClear();
  });

  afterAll(async () => {
    // Avoid jest open handle error
    // https://github.com/visionmedia/supertest/issues/520#issuecomment-469044925
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  });

  it('Should respond with 400 if Authorization header is not passed', async () => {
    const response = await addHeaders(request.get(endpoint));
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/authorization/);
  });

  it('Should respond with 400 if Authorization header do not have Bearer', async () => {
    const response = await addHeaders(request.get(endpoint)).set('Authorization', ACCESS_TOKEN);
    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/authorization/);
  });

  // it('Should respond with 401 if wrong Authorization header is provided', async () => {
  //   const response = await addHeaders(request.get(endpoint)).set('Authorization', `Bearer WRONG_${ACCESS_TOKEN}`);
  //   expect(response.status).toBe(401);
  //   expect(mockUserFindById).not.toBeCalled();
  // });

  // it('Should respond with 404 if correct Authorization header is provided', async () => {
  //   const response = await addAuthHeaders(request.get('/v0/login'));
  //   expect(response.status).toBe(404);
  //   expect(mockCreateToken).toBeCalledTimes(1);
  // });
  
});
