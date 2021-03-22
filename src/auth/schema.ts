import Joi from '@hapi/joi';

const JoiXApiKey = () => Joi.string();

const JoiBearerToken = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!value.startsWith('Bearer ')) return helpers.error('any.invalid');
    if (!value.split(' ')[1]) return helpers.error('any.invalid');
    return value;
  }, 'Authorization Header Validation');

export default {
  apiKey: Joi.object()
    .keys({
      'x-api-key': JoiXApiKey().required(),
    })
    .unknown(true),
  auth: Joi.object()
    .keys({
      authorization: JoiBearerToken().required(),
    })
    .unknown(true),
};
