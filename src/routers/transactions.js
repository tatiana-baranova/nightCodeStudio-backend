import { Router } from 'express';
import { createNewTransactionController, getAllTransactionsUserController, deleteTransactionController } from '../controllers/transaction.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

const transactionRouter = Router();
transactionRouter.post('/', authenticate, ctrlWrapper(createNewTransactionController));
transactionRouter.get('/', authenticate, ctrlWrapper(getAllTransactionsUserController));
transactionRouter.delete('/:id', isValidId,authenticate, ctrlWrapper(deleteTransactionController));
export default transactionRouter;
