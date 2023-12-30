import { model } from 'mongoose';
import { contactSchema } from '../schemas/contactsSchemas.js';
import { handleSaveError, addUpdateSettings } from './hooks.js';

contactSchema
  .pre('findOneAndUpdate', addUpdateSettings)
  .post('save', handleSaveError)
  .post('findOneAndUpdate', handleSaveError);

const Contact = model('contact', contactSchema);

export default Contact;
