const registerRouter = require('express').Router();
const { createUser } = require('../../controllers/user.controller');
const { ErrorHandler } = require('../../helpers/ErrorHandler');

registerRouter
  .route('/')
  .get((req, res) => {
    res.json({ message: 'register route' });
  })
  .post(createUser);

module.exports = { registerRouter };
