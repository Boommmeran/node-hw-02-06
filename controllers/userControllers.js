import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import Jimp from 'jimp';
import path from 'path';
import fs from 'fs/promises';
import 'dotenv/config';
import User from '../models/User.js';
import { HttpError } from '../helpers/index.js';
import { ctrlWrapper } from '../decorators/index.js';

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve('public', 'avatars');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const avatarURL = gravatar.url(email);

  if (user) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, avatarURL, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '23h' });

  console.log(JWT_SECRET);

  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: '' });

  res.status(204).json('');
};

const updateSubscr = async (req, res) => {
  const { userId } = req.params;

  if (!req.body) {
    throw HttpError(400, 'Missing field subscription');
  }

  const result = await User.findByIdAndUpdate(userId, req.body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json(result);
};

const updateAvatar = async (req, res) => {
    if (!req.file) {
      throw HttpError(404, 'File not found');
    }

    const { _id } = req.user;
    const { path: oldPath, filename } = req.file;
    const resultUpload = path.join(avatarsPath, filename);
    const img = await Jimp.read(oldPath);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(oldPath);
    await fs.rename(oldPath, resultUpload);
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      avatarURL,
    });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscr: ctrlWrapper(updateSubscr),
  updateAvatar: ctrlWrapper(updateAvatar),
};