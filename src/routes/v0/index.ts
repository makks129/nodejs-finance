import express from 'express';
import apiKeyValidator from '../../auth/api-key-validator';
import signup from './auth/signup';
import login from './auth/login';
import test from './auth/test';

const router = express.Router();


// Below all APIs are public APIs protected by api key
router.use('/', apiKeyValidator);

router.use('/signup', signup);
router.use('/login', login);
router.use('/test', test);
// router.use('/blogs', blogList);

export default router;