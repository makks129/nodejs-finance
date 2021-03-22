import express from 'express';
import ApiKeyRepo from '../db/repo/ApiKeyRepo';
import { ForbiddenError } from '../core/api-errors';
// import Logger from '../core/Logger';
import { PublicRequest } from 'app-request';
import schema from './schema';
import validate, { Validate } from '../utils/validator';
import asyncHandler from '../utils/async-handler';

const router = express.Router();

export default router.use(
  validate(schema.apiKey, Validate.HEADERS),
  asyncHandler(async (req: PublicRequest, res, next) => {
    // @ts-ignore
    req.apiKey = req.headers['x-api-key'].toString();

    const apiKey = await ApiKeyRepo.findByKey(req.apiKey);

    if (!apiKey) {
      console.log(`x-api-key not found`);
      throw new ForbiddenError();
    }

    console.log(`x-api-key: ${apiKey.key}`);
    return next();
  }),
);
