'use strict';

// security.js
var secure = require('express-secure-only');
var rateLimit = require('express-rate-limit');
var helmet = require('helmet');

module.exports = function(app) {

  // 1. redirects http to https
  app.enable('trust proxy'); // required when running on bluemix or similar to know if users originally came in on HTTPS and avoid endless redirects
  app.use(secure());
  app.use(helmet({
    frameguard: false
  }));

  // 3. rate limiting
  var translateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10
  });
  app.use('/api/translate', translateLimiter);

  var identifyLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10
  });
  app.use('/api/identify', identifyLimiter);

};
