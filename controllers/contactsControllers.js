import Contact from '../models/Contact.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  const query = { owner };

  if (favorite) {
    query.favorite = true;
  }

  const contacts = await Contact.find(query, '-createdAt -updatedAt', {
    skip,
    limit,
  }).populate('owner', 'email');

  res.json({
    contacts,
    page,
    perPage: limit,
    total: contacts.length,
  });
};

const getById = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOne({ _id, owner });

  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

const updateById = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndUpdate({ _id, owner }, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOneAndDelete({ _id, owner });

  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.send({
    message: 'Contact Deleted',
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: owner } = req.user;

  if (!req.body) {
    throw HttpError(400, 'missing field favorite');
  }

  const result = await Contact.findByIdAndUpdate({ _id, owner }, req.body);

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
