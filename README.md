A simple wrapper for rabbitmq. Handles JSON payloads.

```js
// config = {
//   rxURL: 'amqp://localhost',
//   txURL: 'amqp://localhost',
//   url: 'amqp://localhost',
//   logger: console // or something
// }
var RabbitMQ = require('rabbity')(config)

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
var consumer = RabbitMQ('some-channel-name', {useRXURL: true})
consumer.connect().then(function () {
  consumer.consume(function (message, json) {
    console.info('Message received:', json);
    consumer.ack(message)
  });
})
```
