module.exports = {
  cmdLineParser
};

function cmdLineParser(args) {
  const keys = [],
    values = [];

  args.splice(2).map(val => {
    if (val.startsWith('--')) {
      let key = val.replace('--', '');
      keys.push(key);
    } else {
      values.push(val);
    }
  });

  const configObj = {};

  for (let i = 0; i < keys.length && i < values.length; i++) {
    let key = keys[i].toUpperCase();
    let value = values[i];
    configObj[key] = value;
  }

  return Object.freeze(configObj);
}
