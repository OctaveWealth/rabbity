// © 2015 QUILLU INC.
// RabbitMQ Client

'use strict'

var ampq = require('amqplib')

class RabbitMQ {
  constructor (channelName, options) {
    this.channelName = channelName
    this.options = options
    this.options.url = this.options.url
  }

  connect () {
    return ampq.connect(this.options.url).then((conn) => {
      this.setConnection(conn)
      return conn.createConfirmChannel()
    }).then((ch) => {
      ch.assertQueue(this.channelName)
      this.setChannel(ch)
    })
  }

  close () {
    return this.connection.close()
  }

  setChannel (channel) { this.channel = channel }

  setConnection (connection) { this.connection = connection }

  send (data) {
    return new Promise((resolve, reject) => {
      this.channel.sendToQueue(this.channelName, new Buffer(JSON.stringify(data)), {}, (err, ok) => {
        if (err) reject(err)
        else resolve(ok)
      })
    })
  }

  consume (func) {
    this.channel.consume(this.channelName, function (message) {
      var json = null
      if (message !== null) {
        json = JSON.parse(message.content.toString())
      }
      func(message, json)
    })
  }

  ack (message) {
    this.channel.ack(message)
  }
}

module.exports = RabbitMQ
