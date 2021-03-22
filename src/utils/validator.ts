import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
import Log from '../utils/Log';
import { BadRequestError } from '../core/api-errors';
import { Types } from 'mongoose';

export enum Validate {
  BODY = 'body',
  HEADERS = 'headers',
  QUERY = 'query',
  PARAMS = 'params',
}

export const JoiObjectId = () =>
  Joi.string().custom((value: string, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error('any.invalid');
    return value;
  }, 'Object Id Validation');

export const JoiUrlEndpoint = () =>
  Joi.string().custom((value: string, helpers) => {
    if (value.includes('://')) return helpers.error('any.invalid');
    return value;
  }, 'Url Endpoint Validation');


export default (schema: Joi.ObjectSchema, validateIn: Validate = Validate.BODY) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    Log.info(`Validating schema...`);
    
    const { error, value } = schema.validate(req[validateIn]);

    if (!error) {
      Log.info(`Validating schema - success`);
      return next();
    }

    const message = error.details.map((i) => i.message).join(',');

    Log.error(`Validating schema - error: ${message}`);

    next(new BadRequestError(message));
  } catch (error) {
    Log.error(`Validating schema - error: ${error}`);
    next(error);
  }
};
