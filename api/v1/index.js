const apiV1Router = require('express').Router();
const { usersRouter } = require('./users');
const { ErrorHandler } = require('../../helpers/ErrorHandler');

apiV1Router.use('/users', usersRouter);

module.exports = { apiV1Router };
