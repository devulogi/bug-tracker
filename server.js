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
const { ErrorHandler } = require('./helpers/ErrorHandler');
const { apiV1Router } = require('./api/v1');

const app = Express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(Express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', apiV1Router);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(ErrorHandler.handle404Error(error, req));
});

app.use((error, req, res, next) => {
  res.status(error.statusCode).json(error);
});

app.listen(port, () => {
  console.log(`Bugtracker app listening at http://localhost:${port}`);
  MongodbService();
  RedisService();
});
