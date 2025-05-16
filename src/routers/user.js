import { Router } from 'express';
// import { updateUserSchema } from '../validation/user.js';
import { getUserByIdController } from '../controllers/user.js';
// import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';


const userRouter = Router();

userRouter.get('/user/:userLoginId', ctrlWrapper(getUserByIdController),
);

export default userRouter;
