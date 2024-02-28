import express from "express";
import {
  getQuestions,
  deleteQuestion,
  createQuestion,
  updateQuestion,
} from "../controller/question-controller.js";

const router = express.Router();

router.get("/all", getQuestions);

router.post("/", createQuestion);

router.patch("/", updateQuestion);

router.delete("/", deleteQuestion);

export default router;
