require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    uri: `${process.env.MONGO_URL}/${process.env.MONGO_DB}` || 'mongodb://localhost:27017/bugtracker',
  },
};
