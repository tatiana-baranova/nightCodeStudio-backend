import { Router } from 'express';
import { createNewTransactionController, getAllTransactionsUserController, deleteTransactionController, patchTransactionController } from '../controllers/transaction.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateTransactionSchema } from '../validation/transaction.js';

const transactionRouter = Router();
transactionRouter.post('/', authenticate, ctrlWrapper(createNewTransactionController));
transactionRouter.get('/', authenticate, ctrlWrapper(getAllTransactionsUserController));
transactionRouter.delete('/:id', isValidId, authenticate, ctrlWrapper(deleteTransactionController));
transactionRouter.patch('/:id', isValidId, authenticate, validateBody(updateTransactionSchema), ctrlWrapper(patchTransactionController));
export default transactionRouter;
