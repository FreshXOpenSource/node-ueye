let addon;

try {
  addon = require('./build/Release/addon.node');
} catch (err) {
  addon = require('./build/Debug/addon.node');
}

module.exports = addon;

const defines = require('./lib/defines');
const single = require('./lib/single');

Object.keys(defines).forEach(k => module.exports[k] = defines[k]);
Object.keys(single).forEach(k => module.exports[k] = single[k]);
