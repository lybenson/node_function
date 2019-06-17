const fs = require('fs')

fs.mkdir('./helloDir',0777, function (err) {
  if (err) throw err;
});

module.exports = {
  a: 100
}

console.log(module);
const builtin = require('module').builtinModules;

console.log(builtin);
