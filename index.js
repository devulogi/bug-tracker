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

app.get('/api/v1/users/:id', async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: 'Hello World!!', userID: id });
});

app.listen(port, () => {
  console.log(`Bugtracker app listening at http://localhost:${port}`);
  MongodbService();
  RedisService();
});
