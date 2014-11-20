'use strict';

var config = require('./config');

if (config.get('NODE_ENV') === 'production') {
  require('newrelic');
}

require('./src/server').start(function () {
  console.log('server running');
});
