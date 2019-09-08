import { Request, Response, NextFunction } from 'express';
import { paramsExtractorT } from '../../utils';
import { PolicyEngineI } from '../../policy-engine';

// Policy middleware get incoming request,
// checks allowance of request against the policy engine and reject if request is not allowed.
export default (
  policyEngine: PolicyEngineI,
  paramsExtractor: (req: Request) => paramsExtractorT,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const params = paramsExtractor(req);
    const { user } = req;
    if (policyEngine.isAllowed({ ...params, user })) {
      return next();
    }
    return res.sendStatus(401);
  };
};
