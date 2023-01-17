const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * User schema - defines the structure of the user document
 * @constructor User
 */
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email already exists'],
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
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
 * Takes an email and returns a user object if the email exists in the database or null if it does not. A model method.
 * @param {string} email - The email to search for
 * @param {function} cb - A callback that takes a user object and an error argument (if an error occurred)
 * @returns {function} callback - A callback that takes a user object and an error argument (if an error occurred)
 */
UserSchema.static('findByEmail', function (email, cb) {
  return this.findOne({ email }, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
});

/**
 * Compare the passed password with the value in the database. A model method.
 * @param {string} candidatePassword - The password to compare with the database
 * @param {function} cb - A callback that takes a boolean argument (true if the passwords match) and an error argument (if an error occurred)
 * @returns {function} callback - A callback that takes a boolean argument (true if the passwords match) and an error argument (if an error occurred)
 */
UserSchema.method('comparePassword', function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
});

/**
 * Add a bug to the user's bugs array. A model method.
 * @param {Object} bug - The id of the bug to add to the user's bugs array
 * @param {function} cb - A callback that takes an error argument (if an error occurred) and a user object (if the bug was added successfully)
 * @returns {function} callback - A callback that takes an error argument (if an error occurred) and a user object (if the bug was added successfully)
 */
UserSchema.method('addBug', function (bug, cb) {
  this.bugs.push(bug);
  return this.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
});

/**
 * Remove a bug from the user's bugs array. A model method.
 * @param {Object} bugId - The id of the bug to remove from the user's bugs array
 * @param {function} cb - A callback that takes an error argument (if an error occurred) and a user object (if the bug was removed successfully)
 * @return {function} callback - A callback that takes an error argument (if an error occurred) and a user object (if the bug was removed successfully)
 */
UserSchema.method('removeBug', function (bugId, cb) {
  this.bugs.pull(bugId);
  return this.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
});

module.exports = mongoose.model('User', UserSchema);
