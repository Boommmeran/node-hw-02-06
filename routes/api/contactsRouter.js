import express from 'express';
import contactsControllers from '../../controllers/contactsControllers.js';
import { isEmptyBody, isValidId } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import {
  contactsAddSchema,
  contactsUpdateSchema,
  updateFavoriteSchema,
} from '../../schemas/contactsSchemas.js';

const contactsRouter = express.Router();

const {
  getContacts,
  getById,
  updateById,
  add,
  deleteContact,
  updateStatusContact,
} = contactsControllers;

contactsRouter.get('/', getContacts);

contactsRouter.get('/:contactId', isValidId, getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactsAddSchema), add);

contactsRouter.delete('/:contactId', isValidId, deleteContact);

contactsRouter.put(
  '/:contactId',
  isEmptyBody,
  isValidId,
  validateBody(contactsUpdateSchema),
  updateById
);

contactsRouter.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
