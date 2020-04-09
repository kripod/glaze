import pluginTester from 'babel-plugin-tester';
const plugin = require('../src/index.ts');
const path = require('path');

pluginTester({
  plugin,
  fixtures: path.join(__dirname, 'fixtures'),
  babelOptions: {
    parserOpts: {
      plugins: ['jsx'],
    },
  },
});
