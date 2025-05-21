import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import categoriesRouter from './categories.js';
import transactionRouter from './transactions.js';
import summaryRouter from './summary.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/users', userRouter);
router.use('/transactions', transactionRouter);
router.use('/transactions/summary', summaryRouter);

export default router;
