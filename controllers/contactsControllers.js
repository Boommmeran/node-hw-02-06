import Contact from '../models/Contact.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getContacts = async (_, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.send({
    message: 'Contact Deleted',
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  if (!req.body) {
    throw HttpError(400, 'missing field favorite');
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

export default {
  getContacts: ctrlWrapper(getContacts),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  add: ctrlWrapper(add),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
