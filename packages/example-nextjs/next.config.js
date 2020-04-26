const withTM = require('next-transpile-modules')(['glaze']);
const withTreat = require('next-treat')();

module.exports = withTM(withTreat());
