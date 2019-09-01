import express from 'express';
import routes from './routes';
import authMiddleware from './auth-middleware';

import CONFIG, { conf } from './config';

const app = express();
const router = express.Router();

function init(CONFIG: conf, router: express.Router, app: express.Application) {
  app.use(authMiddleware(CONFIG.USERS));
  app.use('/', routes(router));

  app.listen(4444);
}

init(CONFIG, router, app);
