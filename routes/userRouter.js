import express from 'express';
import userControllers from '../controllers/userControllers.js';
import { validateBody } from '../decorators/index.js';
import { isEmptyBody, authenticate, isValidId } from '../middlewares/index.js';
import { userJoiSchema, updateSubscrSchema } from '../schemas/userSchemas.js';

const userRouter = express.Router();

const { register, login, getCurrent, logout, updateSubscr } = userControllers;
const { isValidUserId } = isValidId;

userRouter.post(
  '/register',
  isEmptyBody,
  validateBody(userJoiSchema),
  register
);

userRouter.post('/login', isEmptyBody, validateBody(userJoiSchema), login);

userRouter.get('/current', authenticate, getCurrent);

userRouter.post('/logout', authenticate, logout);

userRouter.patch(
  '/:userId/subscription',
  validateBody(updateSubscrSchema),
  isValidUserId,
  updateSubscr
);

export default userRouter;
