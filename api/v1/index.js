const apiV1Router = require('express').Router();
const { usersRouter } = require('./users');
const { ErrorHandler } = require('../../helpers/ErrorHandler');

apiV1Router.use('/users', usersRouter);

apiV1Router.use((req, res, next) => {
  next(ErrorHandler.handle404Error(null, req));
});

module.exports = { apiV1Router };
