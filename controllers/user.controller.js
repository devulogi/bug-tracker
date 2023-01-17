const User = require('../models/user.model');
const { ErrorHandler } = require('../helpers/ErrorHandler');

const createUser = async (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) {
      next(ErrorHandler.handle400Error(err, req));
    } else {
      res.status(201).json(user);
    }
  });
};

const getUserById = async (req, res, next) => {
  User.findById(req.params.userId, (err, user) => {
    if (err) {
      next(ErrorHandler.handle404Error(err, req));
    } else {
      res.status(200).json(user);
    }
  });
};

module.exports = {
  createUser,
  getUserById,
};
