import { user } from '../config/users';
import { paramsExtractorT } from '../utils';
import { blackList } from '../config/blacklist';

type allowedParams = paramsExtractorT & {
  user?: Express.User;
  sourceIP: string;
};

interface PolicyEngineI {
  isAllowed(params: allowedParams): boolean;
}

class PolicyEngine implements PolicyEngineI {
  private blackList: blackList[];
  constructor(blackList: blackList[] = []) {
    this.blackList = blackList;
  }

  isAllowed(params: allowedParams) {
    const isMatching = this.blackList.find((item) => {
      if (
        params.user &&
        (params.user as user).username === item.sourceUser &&
        params.method === item.destMethod &&
        params.host === item.destHostname &&
        params.port === item.destPort
      ) {
        return item;
      }
    });

    return !Boolean(isMatching);
  }
}

export { PolicyEngineI, allowedParams };
export default PolicyEngine;
