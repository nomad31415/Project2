'use strict';

module.exports = function(app) {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.code = 404;
    err.message = 'Not Found';
    next(err);
  });

  // error handler
  // eslint-disable-next-line
  app.use(function(err, req, res, next) {
    var error = {
      code: err.code || 500,
      error: err.message || err.error
    };
    console.log('error:', error);
    res.status(error.code).json(error);
  });
};
