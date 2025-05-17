import { Router } from 'express';
import { updateUserSchema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
import { getCurrentUser, patchUser } from '../controllers/user.js';

const userRouter = Router();
userRouter.get('/', authenticate, ctrlWrapper(getCurrentUser));
userRouter.patch('/', authenticate, validateBody(updateUserSchema), ctrlWrapper(patchUser),
);

export default userRouter;
