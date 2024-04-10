import amqp from "amqplib/callback_api.js";
import { searchForMatch } from "./matcher.js";
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
          const message = JSON.parse(msg.content);
          let isMatched = false;

          if (message.status.toUpperCase() === "JOIN") {
            // Add to the map msg.content.userId as key and the value is the msg
            usersInQueueMap.set(message.userId, msg);

            channel.ack(msg);

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
              if (
                !isMatched &&
                message.matchType &&
                message.matchType.toString().toUpperCase() !== "ANY"
              ) {
                console.log("Checking for SAME complexity match...");
                isMatched = await searchForMatch(
                  message.userId,
                  usersInQueueMap
                );
              } else {
                console.log("Checking for ANY complexity match...");
                await searchForMatch(message.userId, usersInQueueMap, true);
              }
            }
          } else if (message.status.toUpperCase() === "MATCHED") {
            console.log(
              message.userId + " " + message.userTwoId + " " + message.status
            );
            console.log(usersInQueueMap.size - 2 + " users left in queue");
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
