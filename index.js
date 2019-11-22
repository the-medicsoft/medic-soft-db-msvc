const { server } = require('@the-medicsoft/webapi-framework');

// hook registration
require('./hooks/hooks')(server);

// register API routes
require('./routes/routesRegister')(server);

// logger plugin
// require("@the-medicsoft/logger")(server);

server.get('/', (req, res) => res.send('Welcome to The MedicSoft'));

exports.server = server;
