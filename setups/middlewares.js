//import morgan npm for development purpose
const logger = require('morgan'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  express = require('express'),
  i18next = require('i18next'),
  i18nextbackend = require('i18next-fs-backend'),
  i18nextmiddleware = require('i18next-http-middleware');

module.exports = function (app) {
  /** Language Detectopn  */
  i18next
    .use(i18nextbackend)
    .use(i18nextmiddleware.LanguageDetector)
    .init({
      fallbackLng: 'en',
      lng: 'en',
      ns: ['translation'],
      defaultNS: 'translation',
      backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        lookupHeader: 'accept-language',
      },
    });
  app.use(i18nextmiddleware.handle(i18next));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
};
