const User = require('../models/user.model');

module.exports = {
  GetUserById: function (req, res) {
    User.getUserById(req.params.id, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  },
};
