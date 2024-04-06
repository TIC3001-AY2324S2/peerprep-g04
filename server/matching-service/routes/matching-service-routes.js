import express from "express";
import publishToQueue from "../services/publisher.js";
import consumeFromQueue from "../services/consumer.js";
import { createMatch } from "../controllers/matching-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Matching Service");
});

router.post("/createMatch", createMatch);

router.post("/publish", (req, res) => {
  const queueName = req.body.queueName;
  const data = req.body.data;
  publishToQueue(queueName, data);
  res.send(
    `Message with data: ${JSON.stringify(data)} Successfully Sent to Queue`
  );
});

router.post("/listen", (req, res) => {
  const queueName = req.body.queueName;
  const userId = req.body.userId; // This is the user who wants to listen to the queue
  const myCallback = (messageContent) => {
    console.log("Received message:", messageContent);
  };

  consumeFromQueue(queueName, myCallback);
  res.send(`${userId.toString()} is now waiting for messages in ${queueName}.`);
});

export default router;
