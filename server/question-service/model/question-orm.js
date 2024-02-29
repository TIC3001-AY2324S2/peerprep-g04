import {
  createQuestion,
  deleteQuestion,
  findAllQuestions,
  updateQuestion,
} from "./repository.js";

export async function ormCreateQuestion(
  title,
  description,
  category,
  complexity
) {
  try {
    const newQuestion = await createQuestion({
      title,
      description,
      category,
      complexity,
    });
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

export async function ormUpdateQuestion(
  id,
  title,
  description,
  category,
  complexity
) {
  try {
    const result = await updateQuestion(
      id,
      title,
      description,
      category,
      complexity
    );
    console.log(result);

    // Checking if Question  Modified
    if (result.modifiedCount === 0) {
      return false;
    }

    return true;
  } catch (err) {
    console.log("ERROR: Could not update Question data");
    return { err };
  }
}

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
