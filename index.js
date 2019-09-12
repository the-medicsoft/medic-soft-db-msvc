const fastify = require('fastify');

const config = require('./config/config');

const { NODE_ENV = config.NODE_ENV } = process.env;

const isNodeEnvLower = NODE_ENV !== 'production';

if (isNodeEnvLower) {
  require('dotenv').config();
}

const { PORT, HOST } = config;

const app = fastify({
  logger: {
    level: config.LOGGER_LEVEL,
    enabled: isNodeEnvLower,
    prettyPrint: isNodeEnvLower
  }
});

// hook registration
require('./hooks/hooks')(app);

// register API routes
require('./routes/routesRegister')(app);

app.register(require('fastify-cors'), {
  origin: '*',
  methods: 'GET, PUT, PATCH, POST, DELETE, OPTIONS'
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
