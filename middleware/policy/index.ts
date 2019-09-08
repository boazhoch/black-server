import { Request, Response, NextFunction } from 'express';
import { paramsExtractorT } from '../../utils';
import { PolicyEngineI } from '../../policy-engine';

export default (
  policyEngine: PolicyEngineI,
  paramsExtractor: (req: Request) => paramsExtractorT,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const params = paramsExtractor(req);
    const { user, ip: sourceIP } = req;
    if (policyEngine.isAllowed({ ...params, user, sourceIP })) {
      return next();
    }
    return res.sendStatus(401);
  };
};
