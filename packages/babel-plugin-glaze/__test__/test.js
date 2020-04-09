import pluginTester from 'babel-plugin-tester';
import path from 'path';

import plugin from '../src/index';

pluginTester({
  plugin,
  fixtures: path.join(__dirname, 'fixtures'),
  babelOptions: {
    parserOpts: {
      plugins: ['jsx'],
    },
  },
});
