import express from "express";
import {
  createMatch,
  joinQueue,
  deleteMatch,
} from "../controllers/matching-controller.js";
import setupExchangesAndQueues from "../middlewares/setup-exchange.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Matching Service");
});

router.post("/createMatch", createMatch);

router.post("/joinQueue", setupExchangesAndQueues, joinQueue);

router.post("/deleteMatch", deleteMatch);

export default router;
