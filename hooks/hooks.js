module.exports = function(fastify) {
  // Hook to convert query to lowercase
  fastify.addHook('onRequest', (req, res, done) => {
    const query = req.query;

    // filter: To ignore keys to be parsed to lowercase
    const filter = '-firstName -lastName';

    for (let kQuery in query) {
      if (typeof query[kQuery] === 'string' && queryParser(filter, kQuery)) {
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
