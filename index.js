const fastify = require('fastify');

const config = require('./config/config');

const { NODE_ENV = config.NODE_ENV } = process.env;

const isNodeEnvLower = NODE_ENV !== 'production';

if (isNodeEnvLower) {
  require('dotenv').config();
}

const { HOST = config.HOST, PORT = config.PORT } = process.env;

const app = fastify({
  logger: {
    level: 'info',
    enabled: isNodeEnvLower,
    prettyPrint: isNodeEnvLower
  }
});

// register v1 API routes
require('./routes/v1/')(app);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'origin, token, x-origin, auth'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, DELETE'
  );
  next();
});

app.get('/', (req, res) => res.send('Welcome to The MedicSoft'));

app.listen(PORT, HOST, err => {
  if (err) throw err;

  if (!HOST || !PORT) {
    app.log.error('either HOST or, PORT is undefined');
    process.exit(1);
  }
});

exports.app = app;
