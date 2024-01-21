import express from 'express';
import contactsControllers from '../../controllers/contactsControllers.js';
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from '../../middlewares/index.js';
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

const { isValidContactId } = isValidId;

contactsRouter.use(authenticate);

contactsRouter.get('/', getContacts);

contactsRouter.get('/:contactId', isValidContactId, getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactsAddSchema), add);

contactsRouter.delete('/:contactId', isValidContactId, deleteContact);

contactsRouter.put(
  '/:contactId',
  isEmptyBody,
  isValidContactId,
  validateBody(contactsUpdateSchema),
  updateById
);

contactsRouter.patch(
  '/:contactId/favorite',
  isValidContactId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
