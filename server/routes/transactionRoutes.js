import express from 'express';
import { depositFunds, getTransactions, transferFunds, withdrawFunds } from '../controllers/transactionController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/deposit', authMiddleware, depositFunds);
router.post('/withdraw', authMiddleware, withdrawFunds);
router.post("/transfer",authMiddleware, transferFunds)
router.get("/",authMiddleware, getTransactions);
export default router;
