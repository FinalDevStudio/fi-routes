'use strict';

module.exports = function (router, text) {

  router.get('/', function (req, res, next) {
    res.send(text);
  });

};
