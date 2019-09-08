import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';

type paramsExtractorT = {
  host: string;
  port: string;
  headers?: IncomingHttpHeaders;
  path?: string;
  ip: string;
  method: string;
};

function paramsExtractor(req: Request): paramsExtractorT {
  const {
    headers,
    ip,
    method,
    query: { host, port, path },
  } = req;

  return {
    method,
    ip,
    headers,
    host,
    port,
    path,
  };
}

export { paramsExtractorT };
export default paramsExtractor;
