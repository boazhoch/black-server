import { Router } from 'express';

export default (router: Router) => {
  router.get('/get', (req, res) => {
    console.log(req);
    res.send('ok');
  });

  router.post('/post', (req, res) => {
    console.log(req);
    res.send('ok');
  });

  router.get('/connect', (req, res) => {
    console.log(req);
    res.send('ok');
  });

  return router;
};
