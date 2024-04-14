import amqp from "amqplib/callback_api.js";
import { ormCreateMatch as _createMatch } from "../model/matching-orm.js";

const publishToQueue = async (queueName, data) => {
  const exchange_name = "user-matching";
  const exchange_type = "fanout";
  const amqpUrl = process.env.AMQP_URL;

  amqp.connect(amqpUrl, function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(async function (error1, channel) {
      if (error1) {
        throw error1;
      }
      try {
        channel.assertExchange(exchange_name, exchange_type, {
          durable: false,
        });

        channel.assertQueue(queueName, { durable: false });

        // Bind the queue to the exchange
        channel.bindQueue(queueName, exchange_name, "");

        channel.publish(
          exchange_name,
          queueName,
          Buffer.from(JSON.stringify(data))
        );
      } catch (e) {
        console.error(e);
      }
    });
  });
};

export default publishToQueue;
