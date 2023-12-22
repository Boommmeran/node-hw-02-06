import * as contactsService from '../models/contacts/index.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const {
  listContacts,
  getContactById,
  updateContactById,
  addContact,
  removeContact,
} = contactsService;

const getContacts = async (_, res) => {
  const result = await listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContactById(contactId, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await addContact(req.body);

  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.send({
    message: 'Contact Deleted',
  });
};

export default {
  getContacts: ctrlWrapper(getContacts),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  add: ctrlWrapper(add),
  deleteContact: ctrlWrapper(deleteContact),
};
