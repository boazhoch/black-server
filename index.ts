import express, { Request, Response } from 'express';
import apiRoutes from './routes';
import authMiddleware from './middleware/auth-middleware';
import net from 'net';
import session from 'express-session';
import passport from 'passport';

import CONFIG, { conf } from './config';
import routerFactory, { createRouteT } from './router-factory';
import tcpFactory from './tcp-connection-factory';
import reqResStreamer from './request-resposne-streamer';
import { logErrors, errorHandler } from './middleware/error-handler';
import USERS from './config/users';
import auth from './auth';
import paramsExtractor from './utils';
import PolicyEngine from './policy-engine';
import policy from './middleware/policy';
import blackList from './config/blacklist';

const app = express();
const router = express.Router();

const createRoute = routerFactory(
  router,
  reqResStreamer,
  tcpFactory(net.Socket).create,
  paramsExtractor,
);

// Passport config
auth(USERS, passport);

function init(
  CONFIG: conf,
  router: express.Router,
  app: express.Application,
  createRoute: createRouteT,
) {
  app.use(
    express.urlencoded({ extended: false }),
    session({
      secret: 'mySecret',
      saveUninitialized: true,
      resave: true,
    }),
    passport.initialize(),
    passport.session(),
  );
  app.get(
    '/login',
    passport.authenticate('basic'),
    authMiddleware,
    (_req: Request, res: Response) => {
      res.sendStatus(200);
    },
  );
  app.use(
    '/api',
    authMiddleware,
    policy(new PolicyEngine(blackList), paramsExtractor),
    apiRoutes(createRoute, router),
  );
  app.use(logErrors, errorHandler);
  app.listen(CONFIG.PORT, () => {
    console.log(`Listen on port ${CONFIG.PORT}`);
  });
}

const server = net.createServer(function(socket) {
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');

init(CONFIG, router, app, createRoute);
