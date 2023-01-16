const usersRouter = require('express').Router();
const { createUser } = require('../../controllers/user.controller');

usersRouter
  .route('/')
  .get((req, res) => {
    res.json({ message: 'register route' });
  })
  .post(createUser);

module.exports = { usersRouter };
