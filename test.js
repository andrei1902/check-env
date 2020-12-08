var assert = require('assert');
var checkEnv = require('./index');

describe('check-env', function() {
  before(function() {
    process.env.OTHER_VAR = 'test';
  });

  it('should throw an error if one env var is missing', function() {
    assert.throws(
      function() {
        checkEnv(['ENV_VAR', 'OTHER_VAR']);
      },
      /Missing environment variable ENV_VAR/
    );
  });

  it('should throw an error if multiple env vars are missing', function() {
    assert.throws(
      function() {
        checkEnv(['ENV_VAR', 'NEW_VAR', 'OTHER_VAR']);
      },
      /Missing environment variables ENV_VAR, NEW_VAR/
    );
  });

  it('should throw an error if object is passed is missing title attribute', function() {
    assert.throws(
      function() {
        checkEnv(['ENV_VAR', { cb: function () {} }]);
      },
      /Invalid format passed/
    );
  });

  it('should throw an error if object is passed is missing cb attribute', function() {
    assert.throws(
      function() {
        checkEnv(['ENV_VAR', { title: 'OTHER_VAR' }]);
      },
      /Invalid format passed/
    );
  });

  it('should run callbacks for object parameters and throw error for string parameters', function() {
    value = 0;
    assert.ok(value === 1);
    assert.throws(
      function() {
        checkEnv(['ENV_VAR', { title: 'OTHER_VAR', cb: function () { value = 1; } }]);
      },
      /Missing environment variables ENV_VAR/
    );
  });
});
