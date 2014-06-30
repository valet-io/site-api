module.exports = require('nconf')
  .env('__')
  .defaults({
    PORT: 8000,
    site: {
      host: 'www.valet.io'
    },
    ironmq: {
      queue_name: 'www-leads'
    }
  });
