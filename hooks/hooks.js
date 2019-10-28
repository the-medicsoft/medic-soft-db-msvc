const { queryStringFilter } = require('../config/config');

module.exports = fastify => {
  // Hook to convert query to lowercase
  fastify.addHook('onRequest', (req, res, done) => {
    const query = req.query;

    // filter to ignore keys to be parsed to lowercase
    for (let kQuery in query) {
      if (queryParser(queryStringFilter, kQuery)) {
        query[kQuery] = query[kQuery].toLowerCase();
      }
    }
    done();
  });
};

function queryParser(filter, kQuery) {
  let result = true;
  filter.split(' ').map(path => {
    if (path.startsWith('-')) {
      if (path.replace('-', '') === kQuery) {
        return (result = false);
      }
    }
  });
  return result;
}
