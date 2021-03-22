import express from 'express';
import { SuccessResponse } from '../../../core/api-responses';
import validate from '../../../utils/validator';
import schema from '../auth/schema';
import asyncHandler from '../../../utils/async-handler';
import { PublicRequest } from '../../../types/app-request';
import UserRepo from '../../../db/repo/UserRepo';
import { authenticateLocal } from '../../../auth';

const router = express.Router();

router.post(
  '/',
  validate(schema.signup),
  asyncHandler(async (req: PublicRequest, res, next) => {
    console.log(`Starting signup...`);

    const user = await UserRepo.create(
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.profilePicUrl,
    );

    console.log(`Signup -  success`);

    authenticateLocal(req, res, () => {
      console.log(`passport.authenticate('local') - success`);

      new SuccessResponse('Signup Successful', {
        user: user,
      }).send(res);
    });
  }),
);

export default router;
