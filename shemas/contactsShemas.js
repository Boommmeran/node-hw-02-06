import Joi from 'joi';

export const contactsAddShema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string().required().messages({
    'any.required': 'missing required email field',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required phone field',
  }),
});

export const contactsUpdateShema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});