import express from "express";
import publishToQueue from "../services/publisher.js";
import consumeFromQueue from "../services/consumer.js";
import amqp from "amqplib/callback_api.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Matching Service");
});

router.post("/create", (req, res) => {
  const queueName = req.body.queueName;
  const data = req.body.data;
  publishToQueue(queueName, data);
  res.send(
    `Message with data: ${JSON.stringify(data)} Successfully Sent to Queue`
  );
});

router.post("/listen", (req, res) => {
  // Define your callback function
  const queueName = req.body.queueName;
  const myCallback = (messageContent) => {
    // Here you can do whatever you want with the message content
    // For example, you could make a HTTP request to an endpoint
    console.log("Received message:", messageContent);
  };

  //   // Call consumeFromQueue with your callback
  consumeFromQueue(queueName, myCallback);
  res.send("Started listening to queue " + queueName);
  //   res.send("Listening to Queue" + queueName);
});

export default router;
