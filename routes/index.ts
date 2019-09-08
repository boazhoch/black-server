import { Router } from 'express';
import { createRouteT } from '../router-factory';

// check if type is Error.
function isError(res: Error): res is Error {
  return Boolean(res.message);
}

// Api routes, return the router itself.
export default (createRoute: createRouteT, router: Router) => {
  // Handle error from promise, throw the error to express
  // global error middleware will catch it and handle the error.
  function handleError(err: Error) {
    throw err;
  }

  // Possibility the data will resolved with error -> check's if the data is error.
  function handleResponse(res: string | Error) {
    if (isError(res as Error)) {
      throw res;
    }
    return res;
  }

  // Api routes.
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
