import { isValidObjectId } from 'mongoose';
import { HttpError } from '../helpers/index.js';

const isValidContactId = (req, _, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(HttpError(400, `${contactId} is not valid id`));
  }

  next();
};

const isValidUserId = (req, _, next) => {
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    return next(HttpError(400, `${userId} is not valid id`));
  }

  next();
};

export default {
  isValidContactId,
  isValidUserId,
};
