module.exports = function(variables) {
  var missing = [];

  variables.forEach(function(variable) {
    var name = '';
    if (typeof variable === 'object') {
      if (typeof variable.title !== 'string') throw new Error('Invalid format passed');
      if (typeof variable.cb !== 'function') throw new Error('Invalid format passed');
      name = variable.title;
    } else {
      name = variable;
    }
    if (!process.env[name]) {
      missing.push(variable);
    }
  });

  if (missing.length) {
    if (missing.length === 1) {
      if (typeof missing[0] === 'object') {
        missing[0].cb();
      } else {
        throw new Error('Missing environment variable ' + missing[0]);
      }
    }
    var errorMessage = 'Missing environment variables ';
    for (var i = 0; i < missing.length; i++) {
      if (typeof missing[i] === 'object') {
        missing[i].cb();
      } else {
        errorMessage += 'Missing environment variables ' + missing[i] + ',';
      }
    }
  }
};
