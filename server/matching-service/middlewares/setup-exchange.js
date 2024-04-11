import amqp from "amqplib/callback_api.js";

const setupExchangesAndQueues = async (req, res, next) => {
  const data = req.body.data;
  const queueName = data.category;
  const exchange_name = "user-matching";
  const exchange_type = "fanout";

  amqp.connect("amqp://localhost", function (error0, connection) {
    if (error0) {
      console.error("Error connecting to RabbitMQ:", error0);
      res.status(503).send("Service Unavailable");
      return;
    }
    connection.createChannel(async function (error1, channel) {
      if (error1) {
        console.error("Error creating channel:", error1);
        res.status(503).send("Service Unavailable");
        return;
      }
      try {
        channel.assertExchange(exchange_name, exchange_type, {
          durable: false,
        });

        channel.assertQueue(queueName, { durable: false });

        // Bind the queue to the exchange
        channel.bindQueue(queueName, exchange_name, "");
        next();
      } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
      }
    });
  });
};

export default setupExchangesAndQueues;
