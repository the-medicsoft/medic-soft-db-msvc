const app = require('@the-medicsoft/webapi-framework').server;

// hook registration
require('./hooks/hooks')(app);

// register API routes
require('./routes/routesRegister')(app);

app.get('/', (req, res) => res.send('Welcome to The MedicSoft'));

exports.app = app;
