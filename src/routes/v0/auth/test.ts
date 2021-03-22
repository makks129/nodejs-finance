import express from 'express';
import { SuccessResponse } from '../../../core/api-responses';
import asyncHandler from '../../../utils/async-handler';
import { authenticateJwt } from '../../../auth';

const router = express.Router();

router.use('/', authenticateJwt);

router.get(
  '/',
  asyncHandler(async (req, res) => {
    new SuccessResponse('Test success', {}).send(res);
  }),
);

export default router;
