import express from 'express';
import { SuccessResponse } from '../../../core/api-responses';
import asyncHandler from '../../../utils/async-handler';
import { authenticateJwt } from '../../../auth';
import { User } from '../../../db/model/User';
import PortfolioRepo from '../../../db/repo/PortfolioRepo';
import validate, { Validate } from '../../../utils/validator';
import schema from './schema';

const router = express.Router();

router.use('/', authenticateJwt);

router.get(
  '/',
  validate(schema.getAsset, Validate.QUERY),
  asyncHandler(async (req, res) => {

    const user = req.user as User;
    const ticker = req.query.ticker as string;
    const asset = await PortfolioRepo.getAsset(user, ticker);

    new SuccessResponse('Asset', { 
      asset : asset
    }).send(res);

  }),
);

router.post(
  '/',
  validate(schema.postAsset),
  asyncHandler(async (req, res) => {

    const user = req.user as User;
    const updatedPortfolio = await PortfolioRepo.addAsset(user, req.body);

    new SuccessResponse('Asset added', { 
      portfolio : updatedPortfolio
    }).send(res);

  }),
);

export default router;
