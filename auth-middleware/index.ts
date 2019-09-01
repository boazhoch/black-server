import { Request, Response, NextFunction } from 'express';

export default (USERS: { [index: string]: string }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (USERS[req.user]) {
      console.log('yay');
    }
    console.log(req, res, next);
  };
};
