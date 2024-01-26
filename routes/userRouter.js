import express from 'express';
import userControllers from '../controllers/userControllers.js';
import { validateBody } from '../decorators/index.js';
import {
  isEmptyBody,
  authenticate,
  isValidId,
  upload,
} from '../middlewares/index.js';
import {
  userJoiSchema,
  updateSubscrSchema,
  userVerifySchema,
} from '../schemas/userSchemas.js';

const userRouter = express.Router();

const { register, verify, resendVerification, login, getCurrent, logout, updateSubscr, updateAvatar } =
  userControllers;
const { isValidUserId } = isValidId;

userRouter.post(
  '/register',
  isEmptyBody,
  validateBody(userJoiSchema),
  register
);

userRouter.get('/verify/:verificationToken', verify);

userRouter.post(
  '/verify',
  validateBody(userVerifySchema),
  resendVerification
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

userRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  updateAvatar
);

export default userRouter;
