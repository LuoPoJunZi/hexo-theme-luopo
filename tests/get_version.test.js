const assert = require('assert');

// Mock hexo object to capture helper function
const registered = {};

global.hexo = {
  extend: {
    helper: {
      register(name, fn) {
        registered[name] = fn;
      },
    },
  },
};

require('../scripts/helpers/get_version');

const getVersionHelper = registered['get_version'];

const pkg = require('../package.json');

assert.strictEqual(
  typeof getVersionHelper, 'function',
  'get_version helper should be registered'
);

const version = getVersionHelper();
assert.strictEqual(version, pkg.version, 'helper should return package.json version');

