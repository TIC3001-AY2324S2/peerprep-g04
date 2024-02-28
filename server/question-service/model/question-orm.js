import {
  createQuestion,
  deleteQuestion,
  findAllQuestions,
} from "./repository.js";

export async function ormCreateQuestion() {
  try {
    const newQuestion = await createQuestion();
    await newQuestion.save();
    return true;
  } catch (err) {
    console.log("ERROR: Could not create new question");
    return { err };
  }
}

export async function ormDeleteQuestion(id) {
  try {
    const result = await deleteQuestion(id);

    if (result.deletedCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.log("ERROR: Could not delete question");
    return { err };
  }
}

export async function ormUpdateQuestion() {}

export async function ormFindAllQuestions() {
  try {
    const result = await findAllQuestions();

    if (result.length !== 0) {
      return result;
    }
    return null;
  } catch (err) {
    return { err };
  }
}
