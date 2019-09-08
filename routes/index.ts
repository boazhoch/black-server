import { Router } from 'express';
import { createRouteT } from '../router-factory';

function isError(res: Error): res is Error {
  return Boolean(res.message);
}

export default (createRoute: createRouteT, router: Router) => {
  function handleError(err: Error) {
    throw err;
  }
  function handleResponse(res: string | Error) {
    if (isError(res as Error)) {
      throw res;
    }
    return res;
  }
  createRoute('get', '/get/:host?/:port?/:path?', 'reqResStreamer')
    .then(handleResponse)
    .catch(handleError);

  createRoute('post', '/post/:host?/:port?/:path?', 'reqResStreamer')
    .then(handleResponse)
    .catch(handleError);

  createRoute('get', '/connect/:host?/:port?/', 'tcpConnect')
    .then(handleResponse)
    .catch(handleError);

  return router;
};
