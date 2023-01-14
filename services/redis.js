const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

const RedisService = () => {
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
    redis.disconnect(() => {
      console.log('Redis disconnected on app termination');
      process.exit(0);
    });
  });
};

module.exports = { RedisService };
