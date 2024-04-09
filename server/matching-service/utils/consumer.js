import amqp from "amqplib/callback_api.js";
import { searchForMatchSameComplexity } from "./matcher.js";
import { searchForMatchAnyComplexity } from "./matcher.js";

// Declare usersInQueueMap outside of the function
let usersInQueueMap = new Map();

const consumeFromQueue = async (queueName, callback) => {
  amqp.connect("amqp://localhost", function (err, connection) {
    if (err) {
      throw err;
    }

    connection.createChannel(function (err, channel) {
      if (err) {
        throw err;
      }

      channel.assertQueue(queueName, { durable: false });

      channel.consume(queueName, async (msg) => {
        if (msg !== null) {
          let isMatched = false;
          const message = JSON.parse(msg.content);

          if (message.status === "JOIN") {
            // Add to the map msg.content.userId as key and the value is the msg
            if (!usersInQueueMap.has(message.userId)) {
              usersInQueueMap.set(message.userId, msg);
            }

            usersInQueueMap.size > 0 &&
              usersInQueueMap.forEach((value, key) => {
                console.log(
                  `User ID: ${key}, Message: ${
                    JSON.parse(value.content).status
                  }`
                );
              });

            // Check if there is a match
            if (usersInQueueMap.size > 1) {
              if (1) {
                isMatched = await searchForMatchSameComplexity(
                  message.userId,
                  usersInQueueMap
                );
              } else {
                isMatched = await searchForMatchAnyComplexity(
                  message.userId,
                  usersInQueueMap
                );
              }
            }
            channel.ack(msg);
          } else if (message.status === "MATCHED") {
            console.log("message status " + message.status);
            channel.ack(msg);
            try {
              usersInQueueMap.delete(message.userId);
              usersInQueueMap.delete(message.userTwoId);
            } catch (error) {
              console.error("Error deleting users from map:", error);
              // Handle the error appropriately
            }
            setTimeout(() => {
              channel.close();
              connection.close();
              console.log("Connection closed.");
            }, 5000);
          }

          callback(usersInQueueMap);
        }
      });
    });
  });
};

export default consumeFromQueue;
