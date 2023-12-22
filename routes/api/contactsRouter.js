import express from 'express';
import contactsControllers from '../../controllers/contactsControllers.js';
import { isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import {
  contactsAddShema,
  contactsUpdateShema,
} from '../../shemas/contactsShemas.js';

const contactsRouter = express.Router();

const { getContacts, getById, updateById, add, deleteContact } =
  contactsControllers;

contactsRouter.get('/', getContacts);

contactsRouter.get('/:contactId', getById);

contactsRouter.post('/', isEmptyBody, validateBody(contactsAddShema), add);

contactsRouter.delete('/:contactId', deleteContact);

contactsRouter.put(
  '/:contactId',
  isEmptyBody,
  validateBody(contactsUpdateShema),
  updateById
);

export default contactsRouter;
