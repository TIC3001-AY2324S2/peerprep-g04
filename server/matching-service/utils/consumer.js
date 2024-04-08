import amqp from "amqplib/callback_api.js";
import searchForMatch from "./matcher.js";

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

      // Prefetch one message
      channel.prefetch(1);

      // Consume messages from the queue
      channel.consume(queueName, async (msg) => {
        if (msg !== null) {
          // Acknowledge the message
          let matched = await searchForMatch({ category: queueName });

          if (matched === "true") {
            channel.ack(msg, false, true);
            return;
          }
          console.log("Received message: ", msg.content.toString());
          channel.nack(msg, false, true);
          callback(msg.content.toString());
        }
      });

      setTimeout(() => {
        channel.close();
        connection.close();
        console.log("Connection closed.");
      }, 30000);
    });
  });
};

export default consumeFromQueue;
