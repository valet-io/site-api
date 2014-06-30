var hapi    = require('hapi');
var iron_mq = require('iron_mq');
var Promise = require('bluebird');
var config  = require('../config');

 var server = new hapi.Server('0.0.0.0', +config.get('PORT'), {
  cors: {
    origin: ['http*://' + config.get('site:host')]
  }
});

var queue = Promise.promisifyAll(new iron_mq.Client(config.get('ironmq')));

server.route({
  method: 'POST',
  path: '/leads',
  handler: function (request, reply) {
    queue.postAsync(JSON.stringify(request.payload))
      .then(function () {
        reply().code(201);
      })
      .catch(function (err) {
        reply(hapi.error.internal('Could not add error to queue', err));
      });
  }
});

module.exports = server;
