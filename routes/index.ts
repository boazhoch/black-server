import { createRouteT } from '../router-factory';

// check if type is Error.
function isError(res: Error): res is Error {
  return Boolean(res.message);
}

// Api routes, return the router itself.
export default (createRoute: createRouteT) => {
  // Possibility the data will resolved with error -> check's if the data is error.
  function handleResponse(res: string | Error) {
    if (isError(res as Error)) {
      throw res;
    }
    return res;
  }

  // Api routes.
  createRoute('get', '/get/:host?/:port?/:path?', 'reqResStreamer').then(
    handleResponse,
  );

  createRoute('post', '/post/:host?/:port?/:path?', 'reqResStreamer').then(
    handleResponse,
  );

  createRoute('get', '/connect/:host?/:port?/', 'tcpConnect').then(
    handleResponse,
  );
};
