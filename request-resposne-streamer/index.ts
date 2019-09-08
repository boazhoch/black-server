import request from 'request';
import { Response } from 'express-serve-static-core';

import { paramsExtractorT } from '../utils';

type reqResStreamerFn = (
  paramsExtractor: paramsExtractorT,
  res: Response,
) => Promise<string | Error>;

// Streams request and response
const reqResStreamer: reqResStreamerFn = function reqResStreamer(
  paramsExtractor: paramsExtractorT,
  res: Response,
) {
  return new Promise((_resolve, reject) => {
    const options = {
      headers: paramsExtractor.headers,
      url: `${paramsExtractor.host}:${paramsExtractor.port}/${paramsExtractor.path}`,
    };

    request(options)
      .on('response', (response) => {
        console.log(response);
        // resolve('responded');
      })
      .on('error', function(err) {
        reject(err);
      })
      .pipe(res);
  });
};

export { reqResStreamerFn };
export default reqResStreamer;
