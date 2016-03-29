# rabbitmq client

A simple wrapper for rabbitmq. Handles JSON payloads.

```js
// config = {
//   rxURL: 'amqp://localhost', // heroku gives us 2
//   txURL: 'amqp://localhost',
//   url: 'amqp://localhost',
//   logger: console // or something
// }
var RabbitMQ = require('rabbitmq')(config)

// options
// * useRXURL: bool
var producer = RabbitMQ('some-channel-name', {options})
producer.connect().then(function () {
  console.log('sending');
  return producer.send({a: 'b', c: 1})
}).catch((e) => {
  console.log(e)
})

// RX URL is optimized for
var consumer = createRabbitMQ('some-channel-name', {useRXURL: true})
consumer.connect().then(function () {
  consumer.consume(function (message, json) {
    console.info('Message received:', json);
    consumer.ack(message)
  });
})
```
