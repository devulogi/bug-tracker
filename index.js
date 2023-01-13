const Express = require('express');
const mongoose = require('mongoose');
const connection = mongoose.connection;
const { port, db } = require('./configs');
const Redis = require('ioredis');

const app = Express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!!' });
});

app.listen(port, () => {
  console.log(`Bugtracker app listening at http://localhost:${port}`);

  mongoose.connect(db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
  connection.on('error', console.error.bind(console, 'connection error:'));
  connection.once('open', function () {
    console.log('Connected to MongoDB');
  });

  const redis = new Redis(process.env.REDIS_URL);
  redis.on('connect', () => {
    console.log('Connected to Redis');
  });
  redis.on('error', err => {
    console.log('Error ' + err);
  });
  redis.on('disconnect', () => {
    console.log('Disconnected from Redis');
  });

  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('Mongoose disconnected on app termination');
      process.exit(0);
    });
    redis.disconnect();
  });
});
