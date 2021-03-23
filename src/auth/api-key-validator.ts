import express from 'express';
import ApiKeyRepo from '../db/repo/ApiKeyRepo';
import { ApiKeyError } from '../core/api-errors';
import { PublicRequest } from 'app-request';
import schema from './schema';
import validate, { Validate } from '../utils/validator';
import asyncHandler from '../utils/async-handler';
import Log from '../utils/Log';

const router = express.Router();

export default router.use(
  validate(schema.apiKey, Validate.HEADERS),
  asyncHandler(async (req: PublicRequest, res, next) => {
    // @ts-ignore
    req.apiKey = req.headers['x-api-key'].toString();

    const apiKey = await ApiKeyRepo.findByKey(req.apiKey);
    
    if (!apiKey) {
      Log.error(`x-api-key not found`);
      throw new ApiKeyError();
    }
    
    Log.info(`x-api-key: ${apiKey.key}`);
    
    return next();
  }),
);
