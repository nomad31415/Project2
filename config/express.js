'use strict';

// Module dependencies
var express    = require('express'),
  morgan       = require('morgan'),
  bodyParser   = require('body-parser');

module.exports = function (app) {
  // Configure Express
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/../views');

  // Only loaded when running in the IBM Cloud
  if (process.env.VCAP_APPLICATION) {
    require('./security')(app);
  }

  // Configure Express
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  // Setup static public directory
  app.use(express.static(__dirname + '/../public'));

};
