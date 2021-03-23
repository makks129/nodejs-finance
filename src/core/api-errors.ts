import { Response } from 'express';
import { environment } from '../config';
import {
  AuthFailureResponse,
  InternalErrorResponse,
  NotFoundResponse,
  BadRequestResponse,
  ForbiddenResponse,
} from './api-responses';

export abstract class ApiError extends Error {
  constructor(public message: string = 'error') {
    super();
  }

  public static handle(err: ApiError, res: Response): Response {
    switch (err.constructor) {
      case ApiKeyError:
        return new ForbiddenResponse(err.message).send(res);
      case RequestValidationError:
        return new BadRequestResponse(err.message).send(res);
      case AuthFailureError:
        return new AuthFailureResponse(err.message).send(res);
      case InternalError:
        return new InternalErrorResponse(err.message).send(res);
      case NotFoundError:
        return new NotFoundResponse(err.message).send(res);
      default: {
        let message = err.message;
        // Do not send failure message in production as it may send sensitive data
        if (environment === 'production') message = 'Something wrong happened.';
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}

export class ApiKeyError extends ApiError {
  constructor(message = 'Permission denied') {
    super(message);
  }
}

export class RequestValidationError extends ApiError {
  constructor(message = 'Bad Request') {
    super(message);
  }
}

export class AuthFailureError extends ApiError {
  constructor(message = 'Invalid Credentials') {
    super(message);
  }
}

export class InternalError extends ApiError {
  constructor(message = 'Internal error') {
    super(message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(message);
  }
}
