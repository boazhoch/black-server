import { Request, NextFunction, Response } from 'express';

// Global error handler.
function errorHandler(err: Error, _req: Request, res: Response) {
  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}

// Global log error.
function logErrors(
  err: Error,
  _req: Request,
  _res: Response,
  next: NextFunction,
) {
  console.error(err.stack);
  next(err);
}

export { logErrors, errorHandler };
