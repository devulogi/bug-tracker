const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  bugs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Bug',
    },
  ],
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

/**
 * @function comparePassword - compares the password entered by the user with the password stored in the database
 * @param candidatePassword
 * @param cb
 */
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

UserSchema.statics = {
  /**
   * Find user by id and return user object if found else return an error
   * @param id {string} - user id to find user by
   * @return {Error | this} - error if user not found else user object
   */
  getUserById: function (id) {
    return this.findById(id).exec((err, user) => {
      if (err) {
        return err;
      }
      return user;
    });
  },
};

UserSchema.methods = {
  /**
   * Compare the passed password with the value in the database. A model method.
   * @param candidatePassword {String} Password to compare against the stored password
   * @param cb {Function} A callback that takes two parameters: an error and a boolean
   */
  comparePassword: function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return cb(err);
      cb(null, isMatch);
    });
  },
  /**
   * Add a bug to the user's list of bugs and save the user. A model method.
   * @param bug {Object} The bug to add to the user's list of bugs and save the user
   */
  addBugToUserById: function (bug) {
    const user = this;
    user.bugs.push(bug);
    user.save(err => {
      if (err) return err;
      return {
        status: 200,
        message: 'Bug added successfully',
      };
    });
  },
  /**
   * Remove a bug from the user's list of bugs and save the user. A model method.
   * @param bug {Object} The bug to remove from the user's list of bugs and save the user
   */
  removeBugToUserById: function (bug) {
    const user = this;
    user.bugs.remove(bug);
    user.save(err => {
      if (err) return err;
      return {
        status: 200,
        message: 'Bug removed successfully',
      };
    });
  },
};

module.exports = mongoose.model('User', UserSchema);
