"use strict";

require("dotenv").config({});

const amqp = require("amqplib/callback_api");

const messageURI = process.env.MESSAGE_URI;

console.log(`Connecting to ${messageURI}`);

amqp.connect(messageURI, function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (err, channel) {
    if (err) {
      throw err;
    }
    const queue = "hello";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    channel.consume(
      queue,
      function (msg) {
        console.log(" [x] Received %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
