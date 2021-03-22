import express from 'express';
import { SuccessResponse } from '../../../core/api-responses';
import asyncHandler from '../../../utils/async-handler';
import { authenticateJwt } from '../../../auth';
import { User } from '../../../db/model/User';
import PortfolioRepo from '../../../db/repo/PortfolioRepo';

const router = express.Router();

router.use('/', authenticateJwt);

router.get(
  '/',
  asyncHandler(async (req, res) => {

    const user = req.user as User;
    const portfolio = await PortfolioRepo.findByUser(user);

    new SuccessResponse('Portfolio', { 
      portfolio : portfolio
    }).send(res);

  }),
);

export default router;
