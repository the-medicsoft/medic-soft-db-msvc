const fastify = require('fastify');

const config = require('./config/config');

const { PORT, HOST, LOGGER_LEVEL, isNodeEnvLower } = config;

const app = fastify({
  logger: {
    level: LOGGER_LEVEL,
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
  methods: 'GET, PATCH, POST, DELETE, OPTIONS'
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
