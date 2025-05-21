import { Router } from 'express';
import { createNewTransaction, getAllTransactionsUser } from '../controllers/transaction.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

const transactionRouter = Router();
transactionRouter.post('/', authenticate, ctrlWrapper(createNewTransaction));
transactionRouter.get('/', authenticate, ctrlWrapper(getAllTransactionsUser));
export default transactionRouter;
