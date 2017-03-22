const defines = require('./lib/defines');

let addon;

try {
  addon = require('./build/Release/addon.node');
} catch (err) {
  addon = require('./build/Debug/addon.node');
}

module.exports = addon;

Object.keys(defines).forEach(k => module.exports[k] = defines[k]);
