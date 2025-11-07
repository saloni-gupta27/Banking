import express from 'express';
import { createAccount, getAccounts } from '../controllers/accountController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { getAccountTransactions } from '../controllers/transactionController.js';

const router = express.Router();

router.post("/",authMiddleware, createAccount)
router.get("/",authMiddleware, getAccounts);
router.get('/:accountId/transactions',authMiddleware,getAccountTransactions);

export default router;
