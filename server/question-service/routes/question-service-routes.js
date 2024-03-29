import express from "express";
import {
  getQuestions,
  getQuestionById,
  getPaginatedQuestions,
  deleteQuestion,
  createQuestion,
  updateQuestion,
} from "../controller/question-controller.js";

const router = express.Router();

router.get("/all", getQuestions);

router.get("/find", getQuestionById);

router.get("/paginatedQuestions", getPaginatedQuestions);

router.post("/", createQuestion);

router.patch("/", updateQuestion);

router.delete("/", deleteQuestion);

export default router;
