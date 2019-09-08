import { Request, NextFunction, Response } from 'express';

// Global log error.
function logErrors(
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  console.log('*************************************************');
  console.error(err.stack);
  next(err);
}

export { logErrors };
