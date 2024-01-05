import { model } from 'mongoose';
import { userSchema } from '../schemas/userSchemas.js';
import { handleSaveError, addUpdateSettings } from './hooks.js';

userSchema
  .pre('findOneAndUpdate', addUpdateSettings)
  .post('save', handleSaveError)
  .post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
