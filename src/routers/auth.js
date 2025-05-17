import { Router } from 'express';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import {
  registerUserCtrlr,
  loginUserCtrlr,
  refreshUsersSessionCtrlr,
  logoutUserCtrlr,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { getCurrentUser } from '../controllers/user.js';
// import { authenticate } from '../middlewares/authenticate.js';
const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserCtrlr),
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserCtrlr),
);

// authRouter.get('/me', authenticate, ctrlWrapper(getCurrentUser));

authRouter.post('/refresh', ctrlWrapper(refreshUsersSessionCtrlr));

authRouter.post('/logout', ctrlWrapper(logoutUserCtrlr));

export default authRouter;
