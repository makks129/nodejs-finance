import express from 'express';
import { SuccessResponse } from '../../../core/api-responses';
import validate from '../../../utils/validator';
import schema from './schema';
import asyncHandler from '../../../utils/async-handler';
import lodash from 'lodash';
import JWT from '../../../auth/JWT';
import { User } from '../../../db/model/User';
import { authenticateLocal } from '../../../auth';

const router = express.Router();

router.post(
  '/',
  validate(schema.userCredential),
  authenticateLocal,
  asyncHandler(async (req, res) => {

    const user = req.user as User; // req.user is populated by authenticateLocal
    const token = await JWT.createToken({ _id: user!._id });

    new SuccessResponse('Login Success', {
      user: lodash.pick(user, ['_id', 'name', 'email', 'profilePicUrl']),
      token: token,
    }).send(res);
    
  }),
);

export default router;
