import express from "express";
import {
  createMatch,
  publishMessageToQueue,
  consumeMessageFromQueue,
} from "../controllers/matching-controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Matching Service");
});

router.post("/createMatch", createMatch);

router.post("/publish", publishMessageToQueue);

router.post("/listen", consumeMessageFromQueue);

export default router;
