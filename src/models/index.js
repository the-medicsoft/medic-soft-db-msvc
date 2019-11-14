const fs = require('fs');

const exportModels = {};

fs.readdirSync(__dirname)
    .filter(fileName => fileName !== 'index.js')
    .map(model => {
        let _module = require(`./${model}`);
        let kmodule = Object.keys(_module)[0];
        let vmodule = Object.values(_module)[0];

        exportModels[kmodule] = vmodule;
    });

module.exports = exportModels;