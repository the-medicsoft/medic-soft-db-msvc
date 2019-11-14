const fs = require('fs');

const exportSchemas = {};

fs.readdirSync(__dirname, { withFileTypes: true })
    .filter(dirent => dirent !== 'index.js' && !dirent.isDirectory())
    .map(schema => {
        let _module = require(`./${schema.name}`);
        let kmodule = Object.keys(_module)[0];
        let vmodule = Object.values(_module)[0];

        exportSchemas[kmodule] = vmodule;
    });

module.exports = exportSchemas;