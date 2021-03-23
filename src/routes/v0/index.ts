import express from 'express';
import apiKeyValidator from '../../auth/api-key-validator';
import signup from './auth/signup';
import login from './auth/login';
import portfolio from './portfolio/portfolio';
import asset from './portfolio/asset';
import transactions from './portfolio/transactions';

const router = express.Router();

// Below all APIs are public APIs protected by api key
router.use('/', apiKeyValidator);

router.use('/signup', signup);
router.use('/login', login);
router.use('/portfolio', portfolio);
router.use('/asset', asset);
router.use('/transactions', transactions);

export default router;