const fastify = require('fastify');

const config = require('./config/config');

const { NODE_ENV = config.NODE_ENV } = process.env;

const isNodeEnvLower = NODE_ENV !== 'production';

if (isNodeEnvLower) {
  require('dotenv').config();
}

const HOST = config.HOST;
const { PORT = config.PORT } = process.env;

const app = fastify({
  logger: {
    level: 'info',
    enabled: isNodeEnvLower,
    prettyPrint: isNodeEnvLower
  }
});

// register API routes
require('./routes/routesRegister')(app);

app.register(require('fastify-cors'), {
  origin: '*',
  methods: 'GET, PUT, POST, DELETE, OPTIONS'
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
