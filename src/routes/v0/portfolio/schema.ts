import Joi from '@hapi/joi';

export default {
  getAsset: Joi.object().keys({
    ticker: Joi.string().required()
  }),
  postAsset: Joi.object().keys({
    type: Joi.string().required(),
    ticker: Joi.string().required(),
    quantity: Joi.string().required(),
  }),
};
