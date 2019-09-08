import { Request, Response, NextFunction } from 'express';

// Auth middleware, user not logged in get a 403.
export default (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(403);
};
