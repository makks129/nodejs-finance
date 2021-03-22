import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/// Makes execution of async functions easier by adding the catch block for a Promise
export default (execution: AsyncFunction) => (req: Request, res: Response, next: NextFunction) => {
  execution(req, res, next).catch(next);
};
