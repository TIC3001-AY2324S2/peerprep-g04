import express from "express";
import {
  getQuestions,
  getQuestionById,
  getPaginatedQuestions,
  getAllCategories,
  deleteQuestion,
  createQuestion,
  updateQuestion,
} from "../controller/question-controller.js";

const router = express.Router();

router.get("/all", getQuestions);

router.get("/find", getQuestionById);

router.get("/categories", getAllCategories);

router.get("/paginatedQuestions", getPaginatedQuestions);

router.post("/", createQuestion);

router.patch("/", updateQuestion);

router.delete("/", deleteQuestion);

export default router;
