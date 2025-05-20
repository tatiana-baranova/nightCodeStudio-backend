import { Router } from 'express';
import { createNewTransaction } from '../controllers/transaction.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const transactionRouter = Router();
transactionRouter.post('/', authenticate,  ctrlWrapper(createNewTransaction));
export default transactionRouter;
