import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';
// import Logger from '../core/Logger';
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
    console.log(`Validating schema...`);
    
    const { error, value } = schema.validate(req[validateIn]);

    if (!error) {
      console.log(`Validating schema - success`);
      return next();
    }

    const message = error.details.map((i) => i.message).join(',');
    // Logger.error(message);
    console.log(`Validating schema - error: ${message}`);
    next(new BadRequestError(message));
  } catch (error) {
    console.log(`Validating schema - error: ${error}`);
    next(error);
  }
};
