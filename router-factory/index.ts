import { Router, Response, Request, NextFunction } from 'express';

import { reqResStreamerFn } from '../request-resposne-streamer';
import { tcpCreationFn } from '../tcp-connection-factory';
import { paramsExtractorT } from '../utils';

type createRouteT = (
  httpReqType: 'get' | 'post',
  routePath: string,
  type?: 'reqResStreamer' | 'tcpConnect',
) => Promise<string | Error>;

type routeFactoryFn = (
  router: Router,
  reqResStreamer: reqResStreamerFn,
  tcpConnect: tcpCreationFn,
  paramsExtractor: (req: Request) => paramsExtractorT,
) => createRouteT;

const routeFactory: routeFactoryFn = function routerFactory(
  router: Router,
  reqResStreamer: reqResStreamerFn,
  tcpConnect: tcpCreationFn,
  paramsExtractor: (req: Request) => paramsExtractorT,
): createRouteT {
  const fns = {
    reqResStreamer,
    tcpConnect,
  };

  function getFnByType(type: 'reqResStreamer' | 'tcpConnect') {
    const fn = fns[type];
    return fn || null;
  }

  return function(
    httpReqType: 'get' | 'post',
    routePath: string,
    type?: 'reqResStreamer' | 'tcpConnect',
  ) {
    return new Promise((resolve, reject) => {
      const matcher = router[httpReqType].bind(router);
      if (!matcher) {
        return reject(
          new Error(
            'No such matcher, please refer to express docs to find a matcher that suits you',
          ),
        );
      }

      console.log(`Register route at ${routePath}`);

      matcher(
        routePath,
        (req: Request, response: Response, next: NextFunction) => {
          const fn = type && getFnByType(type);
          if (fn) {
            return fn(paramsExtractor(req), response)
              .then((data) => {
                response.status(200).send(data);
                return resolve(data);
              })
              .catch((err) => {
                next(err);
                reject(err);
              });
          }
        },
      );
    });
  };
};

export { createRouteT, routeFactoryFn };
export default routeFactory;
