import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import categoriesRouter from './categories.js';
import transactionRouter from './transactions.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
router.use('/user', userRouter);
router.use('/transactions', transactionRouter);

export default router;
