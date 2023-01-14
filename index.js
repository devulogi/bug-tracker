const Express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const helmet = require('helmet');
const cors = require('cors');
const swaggerDocument = YAML.load('./docs/openapi.yaml');

const { port } = require('./configs');
const { MongodbService } = require('./services/mongodb');
const { RedisService } = require('./services/redis');

const app = Express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(Express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!!' });
});

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Bugtracker app listening at http://localhost:${port}`);
  MongodbService();
  RedisService();
});
