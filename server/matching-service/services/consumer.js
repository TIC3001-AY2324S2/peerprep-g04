import amqp from "amqplib/callback_api.js";

const consumeFromQueue = (queueName, callback) => {
  amqp.connect("amqp://localhost", function (err, connection) {
    if (err) {
      throw err;
    }

    connection.createChannel(function (err, channel) {
      if (err) {
        throw err;
      }

      channel.assertQueue(queueName, { durable: false });

      // Consume messages from the queue
      channel.consume(queueName, async (msg) => {
        if (msg !== null) {
          console.log(`[x] Received: ${msg.content.toString()}`);
          // Acknowledge the message
          channel.ack(msg);
          callback(msg.content.toString());
        }
      });

      setTimeout(() => {
        channel.close();
        connection.close();
        console.log("Connection closed.");
      }, 10000);
    });
  });
};

export default consumeFromQueue;
