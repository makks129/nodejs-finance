import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import ApiKeyRepo from '../db/repo/ApiKeyRepo';
import { ForbiddenError } from '../core/api-errors';
// import Logger from '../core/Logger';
import { PublicRequest } from 'app-request';
import schemas from './schemas';
import validator, { Validate } from '../utils/validator';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

export default router.use(
  validator(schemas.apiKey, Validate.HEADERS),
  asyncHandler(async (req: PublicRequest, res, next) => {
    // @ts-ignore
    req.apiKey = req.headers['x-api-key'].toString();

    const apiKey = await ApiKeyRepo.findByKey(req.apiKey);
    // Logger.info(apiKey);
    console.log(apiKey);

    if (!apiKey) throw new ForbiddenError();
    return next();
  }),
);
