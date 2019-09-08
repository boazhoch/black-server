import net from 'net';

import { paramsExtractorT } from '../utils';

type tcpCreationFn = (
  paramExtractor: paramsExtractorT,
) => Promise<string | Error>;

type tcpFactoryFn = (SC: typeof net.Socket) => { create: tcpCreationFn };

const tcpFactory: tcpFactoryFn = function(SC: typeof net.Socket) {
  return {
    create: (paramExtractor: paramsExtractorT): Promise<string | Error> => {
      return new Promise((resolve, reject) => {
        const client = new SC();
        const { port, host } = paramExtractor;

        try {
          client.connect(port, host, () => {
            resolve('Successful connection');
          });
        } catch (e) {
          console.log(e);
        }

        client.on('data', (data) => {
          console.info(data.toString('utf-8'));
        });

        client.on('timeout', () => {
          client.destroy();
          reject(new Error(`Connection is idle, closing connection...`));
        });

        client.on('error', (err) => {
          client.destroy();
          reject(err);
        });

        client.on('close', () => {
          console.log('Connection close');
        });
      });
    },
  };
};

export { tcpFactoryFn, tcpCreationFn };
export default tcpFactory;
