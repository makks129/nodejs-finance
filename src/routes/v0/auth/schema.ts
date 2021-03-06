import Joi from '@hapi/joi';

export default {
  signup: Joi.object().keys({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    profilePicUrl: Joi.string().optional().uri(),
  }),
  userCredential: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
};
