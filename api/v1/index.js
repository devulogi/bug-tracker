const apiV1Router = require('express').Router();
const { registerRouter } = require('./register');
const { ErrorHandler } = require('../../helpers/ErrorHandler');

apiV1Router.use('/register', registerRouter);

apiV1Router.use((req, res, next) => {
  next(ErrorHandler.handle404Error(null, req));
});

module.exports = { apiV1Router };
