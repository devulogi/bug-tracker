const mongoose = require('mongoose');
const { db } = require('../configs');
const connection = mongoose.connection;

const MongodbService = () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', function () {
    console.log('Connected to MongoDB');
  });

  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
  });
};

module.exports = { MongodbService };
