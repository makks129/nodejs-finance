import express from 'express';
import { SuccessResponse } from '../../../core/api-responses';
import asyncHandler from '../../../utils/async-handler';
import { authenticateJwt } from '../../../auth';
import { User } from '../../../db/model/User';
import TransactionRepo from '../../../db/repo/TransactionRepo';

const router = express.Router();

router.use('/', authenticateJwt);

router.get(
  '/',
  asyncHandler(async (req, res) => {

    const user = req.user as User;
    const transactions = await TransactionRepo.getAll(user);

    new SuccessResponse('Transaction history', { 
      transactions : transactions
    }).send(res);

  }),
);

export default router;
