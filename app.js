'use strict';

var express = require('express');
var app = express();
var LanguageTranslatorV3 = require('watson-developer-cloud/language-translator/v3');

// Bootstrap application settings
require('./config/express')(app);

var translator = new LanguageTranslatorV3({
  // LANGUAGE_TRANSLATOR_IAM_APIKEY if apikey is present
  // After that, the SDK will fall back to the ibm-cloud-provided VCAP_SERVICES environment property
  username: 'xxxxxx@mail.com',
  password: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
  version: '2019-05-01',
  headers: {
    'X-Watson-Technology-Preview': '2018-05-01',
    'X-Watson-Learning-Opt-Out': true,
  },
});

// render index page
app.get('/', function(req, res) {
  // If hide_header is found in the query string and is set to 1 or true,
  // the header should be hidden. Default is to show header
  res.render('index', {
    hideHeader: !!(req.query.hide_header == 'true' || req.query.hide_header == '1'),
  });
});

app.get('/api/models', function(req, res, next) {
  console.log('/v3/models');
  translator.listModels({}, function(err, models) {
    if (err) return next(err);
    else res.json(models);
  });
});

app.post('/api/identify', function(req, res, next) {
  console.log('/v3/identify');
  translator.identify(req.body, function(err, models) {
    if (err) return next(err);
    else res.json(models);
  });
});

app.get('/api/identifiable_languages', function(req, res, next) {
  console.log('/v3/identifiable_languages');
  translator.listIdentifiableLanguages({}, function(err, models) {
    if (err) return next(err);
    else res.json(models);
  });
});

app.post('/api/translate', function(req, res, next) {
  console.log('/v3/translate');
  translator.translate(req.body, function(err, models) {
    if (err) return next(err);
    else res.json(models);
  });
});

// express error handler
require('./config/error-handler')(app);
module.exports = app;
