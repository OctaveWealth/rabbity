'use strict'

var ampq = require('amqplib')
var RabbitMQ = require('./rabbitmq')

module.exports = function (conf) {
  if (conf == null) throw new Error('Need RabbitMQ conf')
  var logger = conf.logger || console

  logger.debug('Initializing RabbitMQ...')

  return function createRabbitMQ(channelName, options) {
    options = options || {}
    var url = options.useRXURL ? conf.rxURL : (conf.txURL || conf.url)

    logger.debug(`Creating RabbitMQ for channel ${channelName}...`)
    return new RabbitMQ(channelName, {url})
  };
}
