'use strict';

module.exports = function (router) {

  router.get('/', function (req, res, next) {
    res.send([]);
  });

  router.post('/sign-in', function (req, res) {
    if (req.body.password === '1234' && req.body.email === 'user@test.com') {
      return res.end();
    }

    res.status(403).end();
  });

};
